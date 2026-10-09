"""Rapora gömülecek grafikleri üretir.

Notebook'taki grafiklerle aynı içeriktedir; tek fark, resim içindeki
"Grafik N:" başlıklarının kaldırılmış olmasıdır. Ödev yazım kılavuzuna göre
grafiğin numarası ve adı resmin ALTINA, ayrı bir satır olarak yazılmaktadır;
başlığın resmin içinde de yer alması tekrara yol açmaktadır.
"""
import pandas as pd
import numpy as np
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import seaborn as sns
import os, sys

sns.set_theme(style="whitegrid")
plt.rcParams["figure.dpi"] = 110

CIKTI = sys.argv[1]
os.makedirs(CIKTI, exist_ok=True)

df = pd.read_csv(sys.argv[2])

def kaydet(fig, ad):
    yol = os.path.join(CIKTI, ad)
    fig.savefig(yol, bbox_inches="tight", facecolor="white")
    plt.close(fig)
    print("  ", ad)

# ---- Grafik 1: eksik veri oranlari ----
# Filtre, oran uzerinden degil ADET uzerinden yapilir; aksi halde %0,003 oranindaki
# children sutunu yuvarlandiginda 0 olup grafikten dusmektedir.
eksik_adet = df.isna().sum()
eksik = (eksik_adet / len(df) * 100).round(3)
eksik = eksik[eksik_adet > 0].sort_values()
fig, ax = plt.subplots(figsize=(9, 4))
renkler = ["#c0392b" if o > 50 else "#e67e22" if o > 5 else "#27ae60" for o in eksik.values]
cubuklar = ax.barh(eksik.index, eksik.values, color=renkler, edgecolor="black", linewidth=0.6)
def yuzde_etiketi(o):
    """Turkce ondalik ayraci ile yuzde etiketi. Cok kucuk oranlarda basamak artirilir."""
    return (f"%{o:.3f}" if o < 0.01 else f"%{o:.2f}").replace(".", ",")

for cubuk, oran in zip(cubuklar, eksik.values):
    ax.text(oran + 1.5, cubuk.get_y() + cubuk.get_height()/2, yuzde_etiketi(oran),
            va="center", fontsize=10, fontweight="bold")
ax.set_xlabel("Eksik Veri Oranı (%)")
ax.set_xlim(0, 108)
fig.tight_layout(); kaydet(fig, "grafik1.png")

# ---- on isleme (grafik 2-5 icin) ----
df = df.drop(columns=["company"])
df["agent"] = df["agent"].fillna(0)
df["country"] = df["country"].fillna(df["country"].mode()[0])
df["children"] = df["children"].fillna(0).astype(int)
df = df.drop(columns=["reservation_status", "reservation_status_date"])

# ---- Grafik 2: sinif dagilimi ----
sayilar = df["is_canceled"].value_counts().sort_index()
etiketler = ["İptal Edilmedi (0)", "İptal Edildi (1)"]
renkler = ["#2980b9", "#c0392b"]
fig, ekseler = plt.subplots(1, 2, figsize=(12, 4.5))
cubuklar = ekseler[0].bar(etiketler, sayilar.values, color=renkler, edgecolor="black", linewidth=0.7)
for cubuk, adet in zip(cubuklar, sayilar.values):
    ekseler[0].text(cubuk.get_x() + cubuk.get_width()/2, adet + 1500,
                    f"{adet:,}\n(%{adet/len(df)*100:.1f})",
                    ha="center", fontsize=10, fontweight="bold")
ekseler[0].set_ylabel("Rezervasyon Sayısı")
ekseler[0].set_ylim(0, sayilar.max() * 1.22)
ekseler[1].pie(sayilar.values, labels=etiketler, colors=renkler, autopct="%1.1f%%",
               startangle=90, wedgeprops={"edgecolor": "black", "linewidth": 0.7},
               textprops={"fontsize": 11})
fig.tight_layout(); kaydet(fig, "grafik2.png")

# ---- Grafik 3: lead_time dagilimi ----
fig, ax = plt.subplots(figsize=(10, 5))
ax.hist(df.loc[df["is_canceled"] == 0, "lead_time"], bins=50, alpha=0.7,
        label="İptal Edilmedi", color="#2980b9", edgecolor="white", linewidth=0.3)
ax.hist(df.loc[df["is_canceled"] == 1, "lead_time"], bins=50, alpha=0.7,
        label="İptal Edildi", color="#c0392b", edgecolor="white", linewidth=0.3)
ax.set_xlabel("Rezervasyon ile Giriş Arasındaki Gün Sayısı")
ax.set_ylabel("Rezervasyon Sayısı")
ax.legend()
fig.tight_layout(); kaydet(fig, "grafik3.png")

# ---- Grafik 4: pazar segmentine gore iptal oranlari ----
seg = df.groupby("market_segment").agg(oran=("is_canceled", "mean"),
                                       adet=("is_canceled", "size")).sort_values("oran", ascending=False)
seg["oran"] = (seg["oran"] * 100).round(1)
ortalama = df["is_canceled"].mean() * 100
fig, ax = plt.subplots(figsize=(10, 5))
renkler = ["#c0392b" if o > ortalama else "#2980b9" for o in seg["oran"]]
cubuklar = ax.bar(seg.index, seg["oran"], color=renkler, edgecolor="black", linewidth=0.7)
for cubuk, oran, adet in zip(cubuklar, seg["oran"], seg["adet"]):
    ax.text(cubuk.get_x() + cubuk.get_width()/2, oran + 1.5, f"%{oran}\n(n={adet:,})",
            ha="center", fontsize=9, fontweight="bold")
ax.axhline(ortalama, color="black", linestyle="--", linewidth=1.3,
           label=f"Genel ortalama (%{ortalama:.1f})")
ax.set_ylabel("İptal Oranı (%)"); ax.set_xlabel("Pazar Segmenti")
ax.set_ylim(0, 85); ax.legend()
plt.setp(ax.get_xticklabels(), rotation=30, ha="right")
fig.tight_layout(); kaydet(fig, "grafik4.png")

# ---- Grafik 5: korelasyon isi haritasi ----
secilen = ["is_canceled", "lead_time", "adr", "total_of_special_requests",
           "required_car_parking_spaces", "booking_changes", "previous_cancellations",
           "previous_bookings_not_canceled", "is_repeated_guest",
           "stays_in_week_nights", "stays_in_weekend_nights", "adults", "children"]
kor = df[secilen].corr()
fig, ax = plt.subplots(figsize=(11, 8.5))
maske = np.triu(np.ones_like(kor, dtype=bool))
sns.heatmap(kor, mask=maske, annot=True, fmt=".2f", cmap="coolwarm", center=0,
            vmin=-1, vmax=1, square=True, linewidths=0.6, linecolor="white",
            cbar_kws={"shrink": 0.75, "label": "Korelasyon Katsayısı"},
            annot_kws={"size": 8}, ax=ax)
fig.tight_layout(); kaydet(fig, "grafik5.png")

print("rapor grafikleri hazir ->", CIKTI)
