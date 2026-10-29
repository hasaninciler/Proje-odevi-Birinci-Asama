# Plan raporundaki iki grafiği üretir.
# Kullanım: python3 grafikler.py <veri.csv> <cikti_klasoru>
import sys
import pandas as pd
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

veri, cikti = sys.argv[1], sys.argv[2]
df = pd.read_csv(veri)

MAVI, TURUNCU, YESIL = "#2a78d6", "#eb6834", "#1baf7a"
MUREKKEP, SOLUK, IZGARA = "#222222", "#666666", "#e5e5e5"

plt.rcParams.update({
    "font.family": "Liberation Serif", "font.size": 12,
    "axes.edgecolor": SOLUK, "axes.labelcolor": MUREKKEP,
    "xtick.color": SOLUK, "ytick.color": SOLUK,
    "axes.spines.top": False, "axes.spines.right": False,
})

def yuzde(x):
    return "%" + f"{x:.0f}"

# ---------- Grafik-2: rezervasyon süresine göre iptal oranı ----------
sinirlar = list(range(0, 361, 30)) + [800]
etiketler = [f"{a}-{b - 1}" for a, b in zip(sinirlar[:-2], sinirlar[1:-1])] + ["360+"]
gruplar = pd.cut(df["lead_time"], sinirlar, right=False, labels=etiketler)
oran = df.groupby(gruplar, observed=True)["is_canceled"].mean() * 100

fig, ax = plt.subplots(figsize=(6.6, 3.7), dpi=200)
ax.bar(range(len(oran)), oran.values, color=MAVI, width=0.8, zorder=2)
ax.axhline(df["is_canceled"].mean() * 100, color=SOLUK, linestyle="--", linewidth=1, zorder=3,
           label="Genel iptal oranı (%" + f"{df['is_canceled'].mean()*100:.1f}".replace(".", ",") + ")")
ax.legend(loc="upper left", frameon=False)
for i in [0, len(oran) - 1]:
    ax.text(i, oran.values[i] + 1, yuzde(oran.values[i]), ha="center", va="bottom",
            color=MUREKKEP, fontsize=11)
ax.set_xticks(range(len(oran)))
ax.set_xticklabels(oran.index, rotation=45, ha="right")
ax.set_xlabel("Rezervasyon ile giriş tarihi arasındaki gün sayısı")
ax.set_ylabel("İptal oranı")
ax.yaxis.set_major_formatter(matplotlib.ticker.FuncFormatter(lambda v, _: yuzde(v)))
ax.set_ylim(0, 80)
ax.grid(axis="y", color=IZGARA, zorder=0)
fig.tight_layout()
fig.savefig(f"{cikti}/grafik2_sureye_gore_iptal.png", facecolor="white")
plt.close(fig)

# ---------- Grafik-1: "kısa / orta / uzun" bulanık kümeleri ----------
import numpy as np
x = np.linspace(0, 400, 801)

def yamuk(x, a, b, c, d):
    sol = np.where(b > a, (x - a) / max(b - a, 1e-9), 1.0)
    sag = np.where(d > c, (d - x) / max(d - c, 1e-9), 1.0)
    return np.clip(np.minimum(np.minimum(sol, 1), np.minimum(sag, 1)), 0, 1)

kisa = np.clip((60 - x) / 40, 0, 1); kisa[x <= 20] = 1
orta = yamuk(x, 20, 60, 120, 180)
uzun = np.clip((x - 120) / 60, 0, 1)

fig, ax = plt.subplots(figsize=(6.6, 3.2), dpi=200)
ax.plot(x, kisa, color=MAVI, linewidth=2, linestyle="-", label="Kısa")
ax.plot(x, orta, color=TURUNCU, linewidth=2, linestyle="--", label="Orta")
ax.plot(x, uzun, color=YESIL, linewidth=2, linestyle="-.", label="Uzun")
ax.text(8, 1.04, "Kısa", color=MUREKKEP, fontsize=11)
ax.text(78, 1.04, "Orta", color=MUREKKEP, fontsize=11)
ax.text(300, 1.04, "Uzun", color=MUREKKEP, fontsize=11)
ax.set_xlabel("Rezervasyon ile giriş tarihi arasındaki gün sayısı")
ax.set_ylabel("Üyelik derecesi")
ax.set_xlim(0, 400); ax.set_ylim(0, 1.15)
ax.set_yticks([0, 0.5, 1]); ax.set_yticklabels(["0", "0,5", "1"])
ax.grid(axis="y", color=IZGARA, zorder=0)
ax.legend(loc="center right", frameon=False)
fig.tight_layout()
fig.savefig(f"{cikti}/grafik1_bulanik_kumeler.png", facecolor="white")
plt.close(fig)

# metinde kullanılacak sayılar
print("kısa-orta sınırında 40 gün: kisa=%.2f orta=%.2f" % (np.interp(40, x, kisa), np.interp(40, x, orta)))
print("150 gün: orta=%.2f uzun=%.2f" % (np.interp(150, x, orta), np.interp(150, x, uzun)))
print(oran.round(1).to_dict())
