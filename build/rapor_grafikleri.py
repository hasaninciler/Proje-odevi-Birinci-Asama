"""Rapora gömülecek grafikleri üretir.

Notebook'taki grafiklerle aynı koddur; tek fark, resim içindeki başlıkların
kaldırılmış olmasıdır. Ödev yazım kılavuzuna göre grafiğin numarası ve adı
resmin ALTINA ayrı bir satır olarak yazılır; başlığın resimde de yer alması
tekrara yol açar.

Dersin 4. haftasında işlenen kalıba uyulmuştur: yalnızca matplotlib.pyplot,
plt.bar / plt.barh / plt.hist / plt.scatter ve plt.axvline kullanılmıştır.
"""
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import os, sys

CIKTI = sys.argv[1]
os.makedirs(CIKTI, exist_ok=True)
df = pd.read_csv(sys.argv[2])

def kaydet(ad):
    plt.savefig(os.path.join(CIKTI, ad), dpi=150, bbox_inches="tight", facecolor="white")
    plt.close()
    print("  ", ad)

# ---- Grafik 1: eksik veri oranlari (yatay cubuk) ----
# Filtre ADET uzerinden yapilir; oran uzerinden yapilsa %0,003'luk children sutunu duserdi.
eksik_adet = df.isna().sum()
eksik_oranlari = (eksik_adet / len(df) * 100)[eksik_adet > 0].sort_values()

plt.figure(figsize=(9, 4))
plt.barh(eksik_oranlari.index, eksik_oranlari.values)
plt.xlabel("Eksik veri oranı (%)")
kaydet("grafik1.png")

# ---- on isleme (kalan grafikler icin) ----
df = df.drop(columns=["company"])
df["agent"] = df["agent"].fillna(0)
df["country"] = df["country"].fillna(df["country"].mode()[0])
df["children"] = df["children"].fillna(0).astype(int)
df = df.drop(columns=["reservation_status", "reservation_status_date"])

# ---- Grafik 2: sinif dagilimi (dikey cubuk) ----
sinif_sayilari = df["is_canceled"].value_counts().sort_index()
plt.figure(figsize=(7, 4.5))
plt.bar(["İptal edilmedi", "İptal edildi"], sinif_sayilari.values)
plt.ylabel("Rezervasyon sayısı")
kaydet("grafik2.png")

# ---- Grafik 3: bekleme suresi dagilimi (histogram) ----
iptal_edilmeyen = df[df["is_canceled"] == 0]["lead_time"]
iptal_edilen    = df[df["is_canceled"] == 1]["lead_time"]

plt.figure(figsize=(10, 5))
plt.hist(iptal_edilmeyen, bins=40, edgecolor="white", alpha=0.7, label="İptal edilmedi")
plt.hist(iptal_edilen,    bins=40, edgecolor="white", alpha=0.7, label="İptal edildi")
plt.axvline(iptal_edilmeyen.mean(), color="blue", linestyle="--")
plt.axvline(iptal_edilen.mean(),    color="red",  linestyle="--")
plt.xlabel("Rezervasyon ile giriş arasındaki gün sayısı")
plt.ylabel("Rezervasyon sayısı")
plt.legend()
kaydet("grafik3.png")

# ---- Grafik 4: pazar segmentine gore iptal orani (yatay cubuk) ----
segment_iptal = df.groupby("market_segment")["is_canceled"].mean().sort_values() * 100
plt.figure(figsize=(9, 4.5))
plt.barh(segment_iptal.index, segment_iptal.values)
plt.axvline(df["is_canceled"].mean() * 100, color="red", linestyle="--", label="Genel ortalama")
plt.xlabel("İptal oranı (%)")
plt.legend()
kaydet("grafik4.png")

# ---- Grafik 5: bekleme suresi ve oda fiyati (sacilim) ----
ornek = df.sample(1000, random_state=42)
etiketler = {0: "İptal edilmedi", 1: "İptal edildi"}

plt.figure(figsize=(9, 5.5))
for durum, grup in ornek.groupby("is_canceled"):
    plt.scatter(grup["lead_time"], grup["adr"], label=etiketler[durum], s=25, alpha=0.6)
plt.xlabel("Rezervasyon ile giriş arasındaki gün sayısı")
plt.ylabel("Günlük ortalama oda fiyatı (adr)")
plt.legend()
kaydet("grafik5.png")

print("rapor grafikleri hazir ->", CIKTI)
