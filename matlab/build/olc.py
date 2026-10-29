# İki geçişli derlemenin ölçüm adımı: PDF'teki her sayfanın metninden
# başlıkların ve tablo/grafik başlıklarının hangi sayfada olduğunu bulur.
# Kullanım: python3 olc.py <pdf> <aramalar.json> <cikti.json>
import json, subprocess, sys
pdf, aramalar, cikti = sys.argv[1:4]
spec = json.load(open(aramalar, encoding="utf-8"))
n = int([l for l in subprocess.run(["pdfinfo", pdf], capture_output=True, text=True).stdout.splitlines()
         if l.startswith("Pages:")][0].split()[1])
sayfalar = []
for i in range(1, n + 1):
    t = subprocess.run(["pdftotext", "-layout", "-f", str(i), "-l", str(i), pdf, "-"],
                       capture_output=True, text=True).stdout
    satirlar = [l.strip() for l in t.splitlines() if l.strip()]
    sayfalar.append((t, satirlar[-1] if satirlar else ""))
basla = spec.pop("_basla")          # içindekiler sayfasını atlamak için ilk aranacak sayfa metni
ilk = next(i for i, (t, _) in enumerate(sayfalar) if basla in " ".join(t.split()))
sonuc = {"toplam": str(n)}
for k, aranan in spec.items():
    # ["metin", "bastan"] biçimindeki aramalar ilk sayfadan başlar (ön sayfalar için)
    bas = 0 if isinstance(aranan, list) else ilk
    aranan = aranan[0] if isinstance(aranan, list) else aranan
    bul = [i for i in range(bas, n) if aranan in " ".join(sayfalar[i][0].split())]
    sonuc[k] = sayfalar[bul[0]][1] if bul else "?"
json.dump(sonuc, open(cikti, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(json.dumps(sonuc, ensure_ascii=False))
