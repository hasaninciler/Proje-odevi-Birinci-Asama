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

## 4. Ödev Yazım Kılavuzu Uyumu

Hoca iki yerde de vurguluyor: *"Kılavuza uyum puanlamayı doğrudan etkileyecektir."*

Kılavuz adresi (PDF'te verilen):
`https://panel.gelisim.edu.tr/assets/2023/dokumanlar/web_tasarimi_ve_kodlama/bilgisayar-teknolojileri-bolumuodev-yazim-klavuzu_ac7803a051774255af21aa91271aea17.pdf`

> **YAPILACAK:** Bu PDF indirilip bu klasöre eklenecek. Oturumun ağ politikası üniversite
> sunucusuna erişime izin vermediği için otomatik indirilemedi. Kılavuz elimize geçtiğinde
> sayfa düzeni / yazı tipi / punto / satır aralığı / başlık biçimi / şekil-tablo numaralandırma /
> kaynakça stili (APA vs. IEEE) tek tek buraya maddelenecek ve raporda uygulanacak.
> Kılavuzu görmeden kesin biçim kuralı varsayılmayacak.

Kılavuzdan teyit edilecek maddeler:
- [ ] Kapak sayfası düzeni (üniversite/bölüm/ders/öğrenci bilgileri)
- [ ] Yazı tipi ve punto
- [ ] Satır aralığı ve paragraf aralığı
- [ ] Sayfa kenar boşlukları
- [ ] Başlık numaralandırma biçimi
- [ ] Şekil ve tablo başlıklarının konumu (şekil altta, tablo üstte?)
- [ ] Sayfa numarası konumu
- [ ] Kaynakça / atıf stili
- [ ] İçindekiler tablosu gerekli mi

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

**Öneri: A (birinci), B (ikinci).** Gerekçe: ödev Aşama 1'de **model değil ön işleme planı**
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
