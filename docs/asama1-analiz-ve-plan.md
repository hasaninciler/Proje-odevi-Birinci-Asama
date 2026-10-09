# OYG201 – Yapay Zeka Uygulamaları | Proje Aşama 1 (%15) — Analiz ve Çalışma Planı

> Bu dosya, hocanın yayınladığı iki kaynağın (LMS duyurusu + `planAsamasi.pdf`) birleştirilmiş
> analizidir. Amaç: ne teslim edeceğimizi, hangi soruya ne yazacağımızı ve hangi sırayla
> çalışacağımızı net hale getirmek.

---

## 1. Teslim Paketi — Birebir Uyulması Gerekenler

Hoca "dosya formatı ve adlandırma kurallarına **birebir** uymanız gerekmektedir" diyor.
Bu, puan kaybedilen en kolay yer; en sona bırakmayalım.

```
OgrenciNo_Ad_Soyad_ProjeAsama1/          <- klasör
├── OgrenciNo_Ad_Soyad_Rapor.pdf         <- rapor (PDF, Word değil)
└── OgrenciNo_Ad_Soyad_VeriAnalizi.ipynb <- Colab notebook
```
Bu klasör ZIP/RAR yapılıp LMS'e **tek dosya** olarak yüklenecek:
`OgrenciNo_Ad_Soyad_ProjeAsama1.zip`

Kontrol listesi:
- [ ] Türkçe karakter ve boşluk yok (`Ad_Soyad`, "Ad Soyad" değil)
- [ ] Rapor `.pdf` (Word'den PDF'e export edilmiş)
- [ ] Notebook `.ipynb` (Colab > Dosya > İndir > .ipynb)
- [ ] ZIP'in içinde **klasör** var, dosyalar ZIP köküne serbest atılmamış
- [ ] ZIP adı klasör adıyla aynı

---

## 2. Rapor İçeriği — 5 Zorunlu Başlık

PDF'teki başlıklar birebir rapor başlığı olarak kullanılacak. Her alt soru **ayrı ayrı**
cevaplanmalı; soruları atlamak doğrudan puan kaybı.

### 1–2. Öğrenci Adı Soyadı / Projenin Adı
Proje adı teknik + anlaşılır olsun. Örn: "Makine Öğrenmesi Tabanlı ... Tahmin Sistemi".

### 3. Problem Tanımı ve Projenin Amacı  (raporun en ağır bölümü)
Cevaplanacak 8 soru:
1. Projenin amacı nedir?
2. Temel hedef nedir? (ölçülebilir yaz: "%85+ doğrulukla sınıflandırma")
3. ML/DL **ve web arayüzü** bu amaç için nasıl kullanılacak? ← ikisi birden sorulmuş
4. Çözüm getirilen problem durumu nedir?
5. Ele alınan **sektörsel veya günlük yaşam** problemi nedir?
6. Mevcut (geleneksel/manuel) çözümler ve dezavantajları nelerdir?
7. Projeyi piyasadaki benzer uygulamalardan farklı kılan yönler nelerdir?
8. Kullanıcıya/sektöre ne tür avantaj/yenilik sağlayacak?

> **Kritik nokta:** 6, 7 ve 8 bir hikâye zinciri. "Mevcut yöntem yavaş/pahalı/uzman gerektiriyor"
> → "biz şunu farklı yapıyoruz" → "kazanç şu". Projeyi seçerken bu zincirin kurulabilir olmasına
> bakmalıyız; kurulamıyorsa konu zayıf demektir.

Hedef uzunluk: ~1,5–2 sayfa.

### 4. Veri Seti ve Ön İşleme Planı
1. Veri seti nereden temin edildi? (Kaggle / UCI ML Repository — **link + erişim tarihi**, kaynakçaya da girecek)
2. Türü (tabüler, görsel, metin) ve boyutu (**satır sayısı × sütun sayısı** — sayı ver)
3. Eksik veriler (null/nan) nasıl ele alınacak? (sütun bazında strateji + gerekçe)
4. Kategorik değişkenler sayısala nasıl çevrilecek? (one-hot / label encoding — hangisi nerede, neden)
5. **En az 3 farklı grafik** (matplotlib/seaborn) + her birinin altında açıklama yorumu

> Grafikler hem notebook'ta hem raporda olmalı. Raporda "Şekil 1. ..." şeklinde numaralı ve
> altında 2–3 cümle yorumlu. Grafik koyup yorumsuz bırakmak puan kaybı ("eklenip **açıklanmalıdır**").

Hedef uzunluk: ~1,5–2 sayfa (grafikler dahil).

### 5. Kullanıcı Deneyimi ve Uygulama Senaryosu
1. Kullanıcı web arayüzünde hangi adımları yapacak? (veri/görsel yükleme, form doldurma…)
2. Model kullanıcıya çıktı olarak ne sunacak? (tahmin sınıfı, güven skoru/yüzdesi…)

> Burada 4–6 adımlık numaralı bir akış + basit bir ekran taslağı (wireframe) çizmek iyi puan getirir.
> Çıktıya mutlaka **güven skoru (%)** eklediğimizi yazalım; PDF'te örnek olarak o veriliyor.

Hedef uzunluk: ~1 sayfa.

---

## 3. Notebook (.ipynb) İçeriği

Hocanın net şartları:
- Tüm hücreler **çalıştırılmış** olacak
- **Yorum satırları** eklenmiş olacak
- Grafik çıktıları **görünür** olacak
- "Kodların çıktısız hali kabul edilmeyecektir"

> Dikkat: Colab'da "Çalışma zamanını sıfırla"dan sonra indirirsen çıktılar gider.
> Doğru sıra: **tüm hücreleri çalıştır → kaydet → .ipynb indir**. İndirdikten sonra
> `nbformat` ile `outputs` alanının dolu olduğunu doğrulayacağız.

Planlanan hücre iskeleti:
1. Markdown: başlık, öğrenci bilgisi, proje adı, veri seti kaynağı
2. Kütüphane importları (pandas, numpy, matplotlib, seaborn)
3. Veri setini yükleme (Kaggle API veya doğrudan dosya)
4. `df.head()`, `df.shape`, `df.info()`, `df.describe()` — yapı tanıma
5. Eksik veri analizi: `df.isna().sum()` + eksik veri ısı haritası / çubuk grafik
6. Eksik veri işleme (sütun bazında: doldurma / silme / "bilinmiyor" kategorisi) + öncesi-sonrası kanıtı
7. Kategorik değişkenleri çevirme (label + one-hot) + `df.shape` değişimini gösterme
8. **Grafik 1:** Hedef değişkenin sınıf dağılımı (countplot) ← "sınıf dağılımı" şartını karşılar
9. **Grafik 2:** Sayısal bir özniteliğin dağılımı (histogram / KDE)
10. **Grafik 3:** Korelasyon ısı haritası (heatmap)
11. (Bonus) **Grafik 4:** Sınıf ile bir kategorik özniteliğin çapraz kırılımı
12. Markdown: her grafiğin altında "Bu grafikten çıkan sonuç ..." yorumu
13. Markdown: sonuç ve Aşama 2'ye hazırlık notu

> Her grafik **farklı tür** olsun — "en az 3 farklı görselleştirme" deniyor, 3 tane bar chart değil.

---

## 4. Ödev Yazım Kılavuzu Kuralları (kılavuzdan çıkarıldı)

Kaynak: *İstanbul Gelişim Meslek Yüksekokulu – Bilgisayar Teknolojileri Bölümü
Ödev Yazım Kılavuzu* (16 sayfa, `docs/kaynaklar/odev-yazim-kilavuzu.pdf`).

### 4.1. Biçim Kuralları

| Konu | Kural |
|---|---|
| Yazı tipi | **Times New Roman** |
| Harf boyutu | **11** (sayfa numaraları dâhil) |
| Dipnot | Times New Roman **9** |
| Kenar boşlukları | **Sol 4 cm**, diğer üç kenar **2,5 cm** |
| Satır aralığı | **1,5 satır** |
| Hizalama | **İki yana yasla** |
| Girinti (sol/sağ) | **0 cm** |
| Paragraf aralığı (önce/sonra) | **0 nk** — paragraflar arasına fazladan boşluk konmaz |
| Tablo/grafik/şekil açıklamaları, dipnotlar, kaynakça | Satır aralığı **1 satır** |
| Sayfa numarası konumu | Alt kenar **ortası**, alt kenardan **1 cm** yükseklikte |

### 4.2. Sayfa Numaralandırma

- **Numara verilmeyen sayfalar:** dış kapak, boş sayfa, ödev tanıtım formu, iç kapak,
  kabul ve onay sayfası
- **Özet'ten metin başlangıcına kadar:** büyük Romen rakamları → `I, II, III, IV`
- **Metin kısmı:** normal rakamlar → `1, 2, 3, 4`
- Bölüm numarası ile birlikte numaralandırma yapılmaz (`1-5`, `2-3` gibi değil)
- Eklere kadar numaralar kesintisiz devam eder

### 4.3. Başlık Biçimleri

| Düzey | Biçim | Numaralandırma |
|---|---|---|
| Bölüm başlığı | Yeni sayfada başlar, sayfanın **üst ortasında**, tamamı **BÜYÜK ve KALIN**. Bölüm numarası **yazıyla** üst satıra, bölüm adı alt satıra | `BİRİNCİ BÖLÜM` / `BÖLÜM ADI` |
| Ana başlık | Tamamı **BÜYÜK ve KALIN** | `1.1.`, `1.2.`, `1.3.` |
| Alt başlık | Yalnızca **ilk harfler büyük**, **kalın** | `1.1.1.`, `1.1.2.` |

- Rakamlardan sonra **nokta** konur.
- Başlıklarda *ve, ile, ya, veya, yahut, ki, da, de* ve *mı/mi/mu/mü*: tamamı büyük
  yazılan başlıkta büyük, ilk harfler büyük yazılan başlıkta **küçük** harfle yazılır.
- Giriş, bölüm başlıkları ve Sonuç **yeni bir sayfada** başlar.

### 4.4. Tablo, Grafik, Şekil ve Resimler  ← bizim için kritik

- İlgili metnin **altında**, sayfanın **ortasında** konumlandırılır.
- Numaralandırma **kalın** yazı tipiyle ve **kendi cinsi içinde**: `Grafik-1`, `Grafik-2`,
  `Tablo-1`, `Şekil-1` (tireli yazım, kılavuzdaki örnek: "Tablo-2", "Grafik-4").
- **Konum farkı:**
  - **Tablo** ve **harita** → numara ve isim **ÜSTTE**
  - **Grafik**, **şekil** ve **resim** → numara ve isim **ALTTA**
- Alıntı ise kaynağı **mutlaka** belirtilir (dipnot sistemiyle).
- Tüm yazılar **Türkçe** olmalıdır → matplotlib grafiklerindeki eksen etiketleri,
  başlıklar ve açıklamalar Türkçe yazılacak. (Notebook'ta bu kurala uyuldu.)

> **Dikkat:** Bizim 5 görselimiz "Grafik" cinsindendir → `Grafik-1` … `Grafik-5`
> şeklinde numaralandırılacak ve isimleri grafiğin **altına** yazılacak.
> Ayrıca raporda bir **Grafikler Listesi** sayfası gerekir.

### 4.5. Sayfa Sırası (zorunlu)

1. Kapak
2. Ödev Tanıtım Formu
3. Beyan
4. Öğretim Görevlisinin Kabul ve Onay Sayfası
5. Özet
6. İçindekiler
7. Kısaltmalar *(var ise)*
8. Tablolar Listesi *(var ise)*
9. Haritalar Listesi *(var ise)*
10. **Grafikler Listesi** *(bizde var — 5 grafik)*
11. Şekiller Listesi *(var ise)*
12. Resimler Listesi *(var ise)*
13. Ön Söz
14. **Metin Kısmı**
15. Kaynakça
16. Ekler *(var ise)*

### 4.6. Özel Sayfaların İçeriği

- **Özet:** En fazla **300 kelime**. Çalışmanın amacı, diğer çalışmalardan farkı ve
  önemli bulguları vurgulanır. Altına **Anahtar Kelimeler**: alfabetik sırayla, küçük
  harfle (ilk kelimenin ilk harfi büyük), aralarında virgül.
- **Ön Söz:** Teknik detaya girmeden yazarın görüşleri, karşılaşılan güçlükler ve
  teşekkür. **Bir sayfayı geçmez.** Başlık sayfanın üst ortasında `ÖN SÖZ`, metnin
  altına **sağa dayalı** ad soyad.
- **Beyan:** Kılavuzdaki metin birebir kullanılır; altına tarih, ad soyad, imza.
- **Giriş:** Literatür taraması + çalışmanın yapılma gereği ve amacı. Amaç "Ne?",
  "Nasıl?", "Niçin?" sorularına cevap vermeli; hedefler **spesifik ve ölçülebilir** olmalı.

### 4.7. Kaynakça Biçimi (APA tabanlı, Türkçe)

Yazar soyadı tam, adı yalnızca ilk harf. DOI varsa en sona eklenir.

```
Kitap:
Sarı, G. (2013). Ermeni meselesi ışığında Süryaniler. Ankara: Barış Platin Yayınevi.

Makale:
Ak, T. (2018, Mayıs). Silahlı insansız hava araçlarının kullanımında karar
mekanizmaları. Güvenlik Bilimleri Dergisi, 7(1), 111-130. doi:10.28956/gbd.422803

Elektronik kaynak:
Shotton, M.A. (1989). Computer addiction? A study of computer dependency.
Erişim tarihi: 18 Ağustos 2011, http://www.ebookstore.tandf.co.uk/html/index
```

Bizim kaynaklarımızın bu biçime göre yazılmış hali:

```
Antonio, N., de Almeida, A. ve Nunes, L. (2019). Hotel booking demand datasets.
Data in Brief, 22, 41-49. doi:10.1016/j.dib.2018.11.126

Mostipak, J. (2020). Hotel booking demand [Veri seti]. Erişim tarihi: 9 Ekim 2026,
https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand
```

### 4.8. Kapak ve Tanıtım Formu Bilgileri

```
İSTANBUL GELİŞİM MESLEK YÜKSEKOKULU
BİLGİSAYAR TEKNOLOJİLERİ BÖLÜMÜ
ÖN YÜZ YAZILIM GELİŞTİRME PROGRAMI

[ÖDEVİN ADI]

FİNAL PROJE ÖDEVİ

Hazırlayan
250184009 - Hasan İNCİLER

Ödev Danışmanı
Öğr. Gör. Çisem YAŞAR

İSTANBUL - 2026
```

Ödev Tanıtım Formu:

| Alan | Değer |
|---|---|
| YAZAR ADI SOYADI | Hasan İNCİLER |
| ÖDEVİN DİLİ | Türkçe |
| ÖDEVİN ADI | *[proje adı]* |
| BÖLÜM | Bilgisayar Teknolojileri |
| PROGRAM | Ön Yüz Yazılım Geliştirme |
| ÖDEVİN TÜRÜ | Final |
| ÖDEVİN TES. TARİHİ | *[teslim tarihi]* |
| SAYFA SAYISI | *[rapor bitince]* |
| ÖDEV DANIŞMANI | Öğr. Gör. Çisem Yaşar |

> **Not:** Kılavuzda `BÖLÜM` alanı sabittir ve "Bilgisayar Teknolojileri" olarak
> basılı gelmiştir. "Ön Yüz Yazılım Geliştirme" ise **PROGRAM** alanına yazılır.

---

## 5. Proje Konusu Adayları

Seçim kriterleri (ödevin sorularından türetildi):
- **K1** ML/DL + web arayüzü senaryosu doğal kurulabiliyor mu?
- **K2** Veri setinde gerçek **eksik veri** var mı? (soru 4.3 için somut cevap gerekir)
- **K3** Veri setinde bol **kategorik sütun** var mı? (soru 4.4 için gerekir)
- **K4** **Sınıflandırma** mı? (grafiklerde "sınıf dağılımı" isteniyor → regresyon dezavantajlı)
- **K5** "Mevcut çözümler zayıf, biz farklıyız" hikâyesi kurulabiliyor mu?
- **K6** Aşama 2'de Colab'ın ücretsiz kaynaklarıyla eğitilebilir mi?

| # | Konu | Veri Seti | Tür | K2 Eksik | K3 Kategorik | K4 Sınıf | Zorluk |
|---|------|-----------|-----|----------|--------------|----------|--------|
| A | Otel rezervasyon iptal tahmini | Hotel Booking Demand (Kaggle) | Tabüler ~119.390 × 32 | ✅ Güçlü (country/agent/company/children) | ✅ Çok | ✅ 2 sınıf | Orta-Kolay |
| B | Deprem sonrası bina hasar derecesi | Richter's Predictor (DrivenData/Kaggle) | Tabüler ~260.000 × ~39 | ⚠️ Az | ✅ Çok | ✅ 3 sınıf | Orta |
| C | Türkçe ürün yorumlarından duygu analizi | Turkish Product Reviews (Kaggle) | Metin | ⚠️ Az | ❌ (metin → TF-IDF) | ✅ 2–3 sınıf | Orta |
| D | Bitki hastalığı tespiti (yaprak görüntüsü) | PlantVillage (Kaggle) | Görsel | ❌ | ❌ | ✅ Çok sınıf | Zor (CNN) |

Notlar:
- **A** ödevin ön işleme sorularına en çok "malzeme" veren seçenek: 4 sütunda 3 farklı eksik veri
  stratejisi (company %90+ eksik → sütunu sil; agent → "acente yok" olarak doldur; country → mod;
  children → medyan) ve çok sayıda kategorik sütun. Hedef dengesiz (~%37 iptal) → sınıf dağılımı
  grafiği anlamlı çıkar. Web arayüzü: rezervasyon formu → "iptal riski %XX".
- **B** Türkiye bağlamı sebebiyle "sektörsel problem" ve "fark" hikâyesi en güçlü olan.
  Veri Nepal (2015 Gorkha) kaynaklı; bunu raporda dürüstçe belirtip "Türkiye'ye uyarlanabilirlik"
  olarak tartışmak gerekir. Kategorik sütunlar harf kodlu, veri sözlüğü şart.
- **C** Türkçe NLP olması iyi bir farklılaştırıcı ama "eksik veri" ve "kategorik dönüşüm"
  sorularına zayıf cevap verir — bu iki soru ödevde açıkça puanlanıyor.
- **D** görsel olarak en etkileyici, ama görsel veride null/kategorik soruları boşlukta kalır
  ve Aşama 2'de eğitim maliyeti yüksek.

**KARAR: A — Otel rezervasyon iptal tahmini seçildi (9 Ekim 2026).**

(Öneri sırası A birinci, B ikinci idi.) Gerekçe: ödev Aşama 1'de **model değil ön işleme planı**
istiyor; en çok puan ön işleme ve grafik sorularından geliyor; tabüler ve eksik verisi bol bir
veri seti bu soruları doğrudan besliyor.

---

## 6. Yol Haritası

| Adım | İş | Çıktı |
|------|-----|-------|
| 0 | Öğrenci no + ad soyad netleştir | Dosya adları |
| 1 | Proje konusunu seç | Proje adı |
| 2 | Ödev yazım kılavuzunu indir ve kurallarını maddele | Bölüm 4 doldurulmuş |
| 3 | Veri setini indir, `shape` / `isna()` / `dtypes` çıkar | Rapor 4.2–4.4 için gerçek sayılar |
| 4 | Notebook'u yaz, tüm hücreleri çalıştır | `..._VeriAnalizi.ipynb` |
| 5 | Grafikleri PNG olarak dışa aktar | Rapora gömülecek şekiller |
| 6 | Raporu kılavuz formatında yaz | `..._Rapor.pdf` |
| 7 | Klasör + ZIP adlandırmasını kontrol et | LMS'e yüklenecek ZIP |

---

## 7. Sık Yapılan Hatalar (kaçınılacaklar)

1. Notebook'u çıktısız teslim etmek → **doğrudan ret**
2. 3 grafiğin aynı türden olması ("3 **farklı** görselleştirme" deniyor)
3. Grafiği koyup yorum yazmamak
4. Rapor sorularından birini sessizce atlamak (özellikle 3.6 / 3.7)
5. Veri seti boyutunu "büyük" diye geçmek, sayı vermemek
6. Kaynakça/atıf vermemek (veri seti linki kaynakçaya girmeli)
7. Kılavuz biçim kurallarını yoksaymak
8. Dosya/klasör adlandırmasını bozmak, ZIP içinde klasör olmaması
9. Aşama 1'de model eğitmeye kalkıp ön işlemeyi yüzeysel bırakmak — istenen bu değil
