# Proje Hafızası — Hasan İNCİLER

Bu depoda **üç ayrı dersin final projesi** yürüyor. Üçü de aynı Kaggle veri setini
(Hotel Booking Demand) kullanıyor ama **birbirinden bağımsız projelerdir**: ayrı hoca,
ayrı klasör, ayrı kod, ayrı rapor. Birinin kodu/metni diğerine kopyalanmaz.

## Öğrenci

| | |
|---|---|
| Ad Soyad | Hasan İNCİLER |
| Öğrenci No | 250184009 |
| Bölüm / Program | Bilgisayar Teknolojileri / Ön Yüz Yazılım Geliştirme |
| Okul | İstanbul Gelişim Üniversitesi, İstanbul Gelişim Meslek Yüksekokulu |

| Ders | Klasör | Ödev Danışmanı |
|---|---|---|
| 1 — Yapay Zeka Uygulamaları (OYG201) | `asama1/`, `build/` | Öğr. Gör. Çisem Yaşar |
| 2 — Bulanık Mantık (BLP274) | `bulanik-mantik/` | Öğr. Gör. İpek Ebru KARAÇAY |
| 3 — MATLAB Programlama (BLP272) | `matlab/` | Öğr. Gör. Kübra ÇETİNBERK |

---

## DERS 1 — OYG201 Yapay Zeka Uygulamaları

**Ödev türü:** 5 aşamalı final projesi (her aşama ayrı teslim)
**Proje konusu:** Otel Rezervasyon İptal Tahmini (makine öğrenmesi, ikili sınıflandırma)
**Konu kilitli:** Aşama 1'de seçilen konu 5 aşama boyunca değişmeyecek.

### Durum

| Aşama | Ağırlık | Durum |
|---|---|---|
| Aşama 1 — Veri analizi ve ön işleme | %15 | **Tamamlandı**, teslim tarihi 13/10/2026 |
| Aşama 2-5 | %85 | Henüz yayınlanmadı |

### Klasörler

- `asama1/250184009_Hasan_Inciler_VeriAnalizi.ipynb` — 46 hücreli notebook, çıktılar gömülü
- `build/olustur.js`, `build/rapor.js` — Word/PDF rapor üreticisi (docx-js)
- `build/rapor_grafikleri.py` — rapordaki grafikler
- `build/pages.json` — içindekiler sayfa numaraları (ölçülmüş)
- `docs/asama1-analiz-ve-plan.md` — gereksinim analizi ve yol haritası
- `docs/kaynaklar/` — ödev PDF'i ve yazım kılavuzu
- `teslim/` — LMS'ye yüklenen ZIP (git'e dahil değil)

### Teknik kararlar (korunacak)

- Hedef değişken: `is_canceled` (%62,96 iptal yok / %37,04 iptal → dengesiz)
- **Veri sızıntısı:** `reservation_status` ve `reservation_status_date` hedefin
  kopyasıdır, çıkarıldı. Tekrar eklenmeyecek.
- `company` çıkarıldı (%94,31 eksik); `agent`→0, `country`→mod, `children`→0
- Kodlama: `country` frekans (177 kategori), `arrival_date_month` sıralı,
  kalan 8 sütun one-hot (`drop_first=True`)
- Grafikler **sadece matplotlib** ile (hocanın derste öğrettiği kütüphane),
  seaborn kullanılmayacak. Yüzdelerde Türkçe virgül (`%94,31`).
- Başarı ölçütü accuracy değil precision/recall/F1 (sınıf dengesizliği)

---

## DERS 2 — Bulanık Mantık

**Ders kodu:** BLP274 — **Hoca:** Öğr. Gör. İpek Ebru KARAÇAY
**Ödev türü:** Aşamalı final projesi
**Hocanın sınırı:** **En fazla 27 kural.** Fazlası öğrenci için zor olacağından sınırlandı.

### Aşama 1 — Plan Aşaması (%10) — **Tamamlandı**, teslim tarihi 29/10/2026

Ödev soruları: `bulanik-mantik/kaynaklar/BLP274_plan_asamasi.pdf` (7 madde:
1 proje adı, 2 öğrenci adı, 3 amaç, 4 problem + mevcut çözümler ve dezavantajları,
5 piyasadakilerden farkı, 6 avantajlar ve özgün yanlar, 7 veri seti nereden bulundu).
Duyuru "6 soru" diyor ama PDF'te 7 madde var → hepsi cevaplanacak.

Teslim (tek ZIP, klasör adı `250184009_Hasan_Inciler_ProjeAsama1`):
1. `250184009_Hasan_Inciler_Rapor.pdf` — 7 maddenin cevabı, yazım kılavuzuna uygun
2. `250184009_Hasan_Inciler_VeriSetiTanitim.pdf` — ayrı doküman; başlıklar:
   (1) ad + kaynak bağlantısı, (2) neden seçildi / amaçla ilişkisi,
   (3) satır, sütun sayısı, dosya formatı, (4) **her değişkenin** adı, açıklaması,
   veri tipi, değer aralığı (32 sütun)
3. `250184009_Hasan_Inciler_VeriSeti.csv` — veri seti dosyası (~17 MB, 50 MB sınırının altında)

Dikkat: tanıtım dokümanındaki sayılar teslim edilen CSV ile **birebir aynı** olmalı
(değer aralıkları doğrudan o dosyadan hesaplanacak). Bu aşamada kod/notebook istenmiyor.
Yazım kılavuzu Ders 1'deki ile aynı dosya (md5 aynı).

Teslim ZIP'inin adı Ders 1'inkiyle aynı çıkıyor → yerelde `teslim/bulanik-mantik/` altında tutulur.

**Öğrencinin bu ders için istekleri (korunacak):** kaynakça yazılmaz, yabancı yazar
adı geçmez (Kaggle bağlantısı ödev istediği için kalır), anlatım basit ve sade olur;
F1/precision gibi teknik terimler kullanılmaz.

Aşama 1 dosyaları:
- `bulanik-mantik/build/plan_raporu.js` — Plan Raporu (18 sayfa, 7 sorunun hepsi, Tablo-1..4, Grafik-1..2)
- `bulanik-mantik/build/veri_tanitim.js` — Veri Seti Tanıtım Dokümanı (9 sayfa, 32 değişken, Tablo-1..8)
- `bulanik-mantik/build/grafikler.py` — Grafik-1 (lead_time bulanık kümeleri), Grafik-2 (süreye göre iptal oranı)
- `bulanik-mantik/build/derle.sh` — iki geçişli derleme: docx → PDF → sayfa numaralarını ölç → tekrar derle
  (ör. `build/derle.sh plan_raporu.js aramalar_rapor.json sayfalar_rapor.json <çıktı> rapor`)
- Bulanık kümeler (Grafik-1): kısa 0–20 tam / 20–60 geçiş; orta 60–120 tam; uzun 180+ tam
- Ölçülebilir hedef raporda yazılı: "yüksek risk" grubunda gerçek iptal ≥ %55, "düşük risk" ≤ %25
- PDF'te yazı tipi Liberation Serif (Times New Roman ile aynı ölçüler; ortamda TNR yok).
  Word dosyaları `teslim/bulanik-mantik/word/` altında.

### Kararlaştırılan tasarım — 3 girdi × 3 bulanık küme = tam 27 kural

| Girdi | Kümeler | Veri setindeki iptal oranı |
|---|---|---|
| `lead_time` | kısa 0-30 / orta 31-120 / uzun 121+ gün | %18,6 → %39,5 → %52,2 |
| `total_of_special_requests` | yok 0 / az 1 / çok 2+ | %47,7 → %22,0 → %21,1 |
| `previous_cancellations` | yok 0 / az 1 / çok 2+ | %33,9 → **%94,4** → %52,7 |

**Çıktı:** iptal riski 0-100 (düşük / orta / yüksek)

Kural tabanının dayanağı — `lead_time` × özel istek çaprazı (gerçek iptal oranları):

| | istek yok | az | çok |
|---|---|---|---|
| kısa | %22,6 | %14,1 | %12,5 |
| orta | %50,6 | %25,7 | %23,2 |
| uzun | %65,8 | %27,4 | %28,3 |

En riskli köşe: uzun vadeli + hiç özel istek yok. En güvenli: kısa vadeli + çok istek.
Kurallar bu tablodan türetilecek, uydurulmayacak.

**Önemli ayrım:** Bulanık mantıkta kurallar elle yazılır, model veriden öğrenmez.
Veri seti burada iki işe yarar: (1) üyelik fonksiyonu sınırlarını belirlemek,
(2) sistemin çıktısını gerçek iptallerle karşılaştırıp doğruluk ölçmek.

### Klasör

- `bulanik-mantik/` — Diğer derslerin dosyalarıyla karıştırılmayacak.

---

## DERS 3 — MATLAB Programlama

**Ders kodu:** BLP272 — **Hoca:** Öğr. Gör. Kübra ÇETİNBERK
**Değerlendirme:** %100 uygulama. 4 aşama: Plan %10, Yapı %40, Geliştirme %40, **Sunum %10**
(öğrenci uygulamayı kendisi sunacak → her parçayı anlatabilmeli).
**Not:** Kod MATLAB dilinde (Python değil). Bu ortamda MATLAB/Octave yok; MATLAB'da
çalıştırma ve `readtable` kontrolünü öğrenci kendisi yapar.

### Aşama 1 — Plan (%10) — **Hazırlandı** (teslim tarihi 29/10/2026 varsayıldı, öğrenci teyit etmedi)

Sorular: `matlab/kaynaklar/BLP272_plan_asamasi.pdf` (8 madde: 1 ad, 2 öğrenci, 3 amaç,
4 problem + mevcut çözümler/dezavantajlar, 5 piyasadan farkı, 6 avantaj/özgün yanlar,
7 veri nasıl elde edilecek + hangi yol ve gerekçesi, 8 kullanıcı işlemleri, arayüz bileşenleri, çıktılar).

Teslim (tek ZIP, `250184009_Hasan_Inciler_ProjeAsama1`): `_Rapor.pdf`, `_VeriSetiTanitim.pdf`, `_VeriSeti.csv`.
Tanıtım dokümanında Bulanık Mantık'takinden **fazladan** istenenler: MATLAB'a aktarma biçimi
(readtable, sütun ayracı, ondalık ayracı, UTF-8) ve kalite sorunları (eksik hücre,
aralık dışı kayıt, **yinelenen satır**: veri setinde 31.994 tam kopya satır var).
Veri en az 2 sayısal + 1 kategorik + mümkünse 1 tarih sütunu içermeli.
Konu sonradan değiştirilemez.

**Öğrencinin isteği:** "çok abartmıyacağız" — kapsam mütevazı, öğrenci seviyesinde.
**Hoca web sitesine de izin verdi.** Önerilen yapı: MATLAB veriyi okur/temizler/filtreler/gruplar,
sonuçları `jsonencode` ile JSON + PNG olarak dışa aktarır; tek sayfalık basit bir web sitesi
(HTML/CSS/JS) bu JSON'u gösterir. Ana iş MATLAB'da kalmalı (ders MATLAB). Kesinleşmedi —
öğrencinin onayı ve hocaya "web sitesi MATLAB çıktısını gösterebilir mi" teyidi bekleniyor.
Yapay Zeka dersinde hoca ödevin Claude ile yapıldığını anladı (öğrenci söyledi, 29/10/2026 sonrası).

Aşama 1 dosyaları:
- `matlab/build/plan_raporu.js` — Plan Raporu (17 sayfa, 8 sorunun hepsi, Tablo-1..5, grafik yok)
- `matlab/build/veri_tanitim.js` — Veri Seti Tanıtım (11 sayfa; değişkenler türe göre: 20 sayısal,
  11 kategorik, 1 tarih + oluşturulacak varis_tarihi; MATLAB aktarma ayarları ve kodu; kalite sorunları)
- `matlab/veri_aktar.m` — tanıtım dokümanındaki aktarma kodu. **Bu ortamda test edilmedi**;
  öğrenci MATLAB'da çalıştırıp 119390×33 sonucunu doğrulamalı.
- Arayüz kararı (MATLAB uygulaması mı web sitesi mi) raporda Yapı aşamasına bırakıldı;
  öğrenci "2. aşamada düşünürüz" dedi.
- Bulanık Mantık'taki gibi: kaynakça yok, yabancı isim yok, sade dil.

### Klasör

- `matlab/` — diğer derslerle karıştırılmayacak.

---

## Ortak veri seti

| | |
|---|---|
| Adı | Hotel Booking Demand |
| Kaynak | Kaggle (jessemostipak) — orijinali Antonio, de Almeida & Nunes (2019) |
| İndirme | `https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2020/2020-02-11/hotels.csv` |
| Boyut | 119.390 satır × 32 sütun (ham) |
| Temizlik sonrası | 29 sütun → kodlama sonrası 62 sütun (61 girdi + 1 hedef) |
| Eksik veri | ham 129.425 → işlenmiş 0 |

---

## Çalışma kuralları

1. **Üç dersi karıştırma.** Bir istek geldiğinde hangi derse ait olduğu belli
   değilse sor. "Ödev" / "aşama 1" tek başına hangisi olduğunu belirtmez.
   Projeler bağımsız: Ders 1'in analizleri, grafikleri veya rapor metni
   diğer derslere taşınmaz; her ders kendi hocasının istediği şekilde sıfırdan yapılır.
2. Raporlar İGÜ Bilgisayar Teknolojileri Ödev Yazım Kılavuzu'na uyar:
   Times New Roman 11, 1,5 satır aralığı, kenar boşlukları üst/sağ/alt 2,5 cm
   sol 4 cm, ön sayfalar büyük Romen rakamı, gövde Arap rakamı.
3. Kaynakça formatı hocaya sorulacak — kılavuz Giriş bölümünde numaralı (IEEE),
   Kaynakça örneklerinde APA gösteriyor; kendisiyle çelişiyor. **Henüz sorulmadı.**
4. `docs/imza/` ve `teslim/` git'e dahil edilmez (kişisel veri + büyük dosya).
5. Geliştirme dalı: `claude/busy-heisenberg-amm41e`
