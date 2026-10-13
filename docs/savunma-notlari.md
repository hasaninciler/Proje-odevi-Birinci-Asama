# Aşama 1 — Savunma Notları

Bu dosya teslim edilmez. Amacı: notebook'taki her bölümü hocanın sorabileceği
sorularla birlikte kendi ağzından anlatabilmen.

Her bölümde üç şey var:
- **Ne yapıyor** — kodun işi
- **Neden böyle** — alternatifi varken bunu neden seçtik
- **Hoca sorarsa** — muhtemel soru ve kısa cevap

---

## 1. Kütüphaneler (hücre 2)

**Ne yapıyor:** `pandas` tabloyu okumak/işlemek için, `matplotlib.pyplot` grafik için.
`pd.set_option` sadece ekran ayarı — geniş tabloyu kesmeden göstersin diye.

**Neden böyle:** Derste bu ikisini öğrendik. seaborn/plotly kullanmadım çünkü
derste işlenen kütüphane pyplot.

**Hoca sorarsa:**
- *"Neden seaborn kullanmadın?"* → Derste pyplot işlendi, grafiklerin hepsi
  `plt.bar`, `plt.barh`, `plt.hist`, `plt.scatter` ile yapıldı.
- *"set_option ne işe yarıyor?"* → Sadece görüntü; 32 sütunlu tabloyu
  `...` ile kesmeden yazdırıyor. Veriye dokunmuyor.

---

## 2. Veri setini yükleme (hücre 4)

**Ne yapıyor:** CSV'yi internetten doğrudan `read_csv` ile okuyor.
`df_ham = df.copy()` ile ham halinin yedeğini alıyor.

**Neden böyle:** Colab'da dosya yükleme derdi olmasın, notebook kimde
çalışırsa çalışsın aynı veriyi çekiyor. Yedek kopyayı sonda
"önce/sonra" karşılaştırması yapmak için aldık.

**Hoca sorarsa:**
- *"Niye Kaggle linki değil GitHub linki?"* → Kaggle indirmek için giriş
  istiyor, `read_csv` oradan okuyamaz. Bu adresteki dosya Kaggle'daki
  `hotel_bookings.csv`'nin birebir aynısı (119.390 satır × 32 sütun).
- *"`copy()` olmasa ne olurdu?"* → `df_ham = df` yazsaydım ikisi aynı
  tabloyu gösterirdi; `df`'yi değiştirdiğimde yedek de değişirdi.

---

## 3. Keşifsel inceleme (hücre 6-12)

**Ne yapıyor:** `head()` ilk 5 satır, `info()` veri tipleri + dolu değer sayısı,
`describe().T` sayısal sütunların istatistikleri. Sonra sütunları
`select_dtypes` ile sayısal / kategorik diye ikiye ayırıyor.

**Neden böyle:** Eksik veriyi ve kategorik sütunları bulmadan hangi işlemi
yapacağıma karar veremem. Bu üç komut o kararın girdisi.

**Hoca sorarsa:**
- *"`describe().T` neden `.T`?"* → `describe()` istatistikleri satıra,
  sütunları kolona koyuyor. 31 sayısal sütun olduğu için tablo yana
  taşıyor; `.T` devirerek okunur hale getiriyor.
- *"Kaç kategorik sütun var?"* → 32 sütunun 12'si metinsel (object),
  20'si sayısal.
- *"`nunique()` niye yazdırdın?"* → Kardinaliteyi (kaç farklı değer)
  görmek için. Bölüm 7'deki kodlama stratejisi bu sayıya göre seçiliyor:
  `country` 177 farklı değer, `hotel` sadece 2.

---

## 4. Eksik veri incelemesi + Grafik 1 (hücre 14-17)

**Ne yapıyor:** `isna().sum()` her sütundaki eksik sayısını, bölü satır sayısı
ile oranını veriyor. Tabloyu sadece eksiği olan sütunlara indiriyor,
`plt.barh` ile çiziyor.

**Neden böyle:** Yatay çubuk seçtim çünkü sütun adları uzun (`previous_cancellations`
gibi); dikey çubukta etiketler üst üste biner. Derste de "uzun etiket → barh"
kuralını işledik.

**Sonuç:** Eksik veri sadece 4 sütunda:

| Sütun | Eksik oranı | Neden eksik |
|---|---|---|
| `company` | %94,31 | Rezervasyonu şirket değil birey yapmış |
| `agent` | %13,69 | Acente aracılığı olmamış |
| `country` | %0,41 | Gerçek veri girişi hatası |
| `children` | %0,003 | Gerçek veri girişi hatası (4 satır) |

**Hoca sorarsa:**
- *"Tabloyu niye orana göre değil sayıya göre filtreledin?"* → Oranı
  `.round(2)` ile yuvarladığım için `children`'ın oranı 0,00 çıkıyor ve
  "oran > 0" filtresine takılmayıp tablodan düşüyordu. Sayıya göre
  filtreleyince 4 satırlık eksiklik de görünüyor.
- *"`children`'ın çubuğu niye görünmüyor?"* → %0,003; `company`'nin %94'ü
  yanında grafik ölçeğinde çizilemeyecek kadar küçük. Değerleri yazdırarak
  gösterdim.

---

## 5. Eksik verilerin işlenmesi (hücre 19)

**Ne yapıyor:** Dört sütuna dört farklı işlem:

| Sütun | İşlem | Gerekçe |
|---|---|---|
| `company` | Sütunu sil | %94,31 eksik; kalan %6 ile güvenilir bilgi üretilemez |
| `agent` | `fillna(0)` | Eksiklik rastgele değil, "acente yok" demek. 0 = "acente yok" kodu |
| `country` | `fillna(mode)` | Kategorik; ortalaması alınamaz. Mod = PRT (Portekiz) |
| `children` | `fillna(0).astype(int)` | 4 satır; çocuk sayısı belirtilmemiş = 0 çocuk |

**Neden böyle — en önemli nokta:** Hepsine aynı işlemi yapmadım. Eksikliğin
**sebebi** her sütunda farklı. `agent`'ta eksiklik bilginin kendisi
("acente kullanılmamış"), `country`'de ise gerçek bir kayıp.
Dolayısıyla biri 0 ile doldurulur, diğeri mod ile.

**Sonuç:** 129.425 eksik değer → 0. Boyut 32 → 31 sütun.

**Hoca sorarsa:**
- *"Niye hepsini ortalama ile doldurmadın?"* → `country` ve `agent`
  kategorik; ülke kodunun ortalaması diye bir şey yok. `children`'da
  ortalama 0,10 gibi bir ondalık çıkar, "0,1 çocuk" anlamsız.
- *"`company`'yi silmek yerine 0 ile dolduramaz mıydın?"* → Doldurabilirdim
  ama sütunun %94'ü tek bir uydurma değerden oluşurdu; model için bilgi
  taşımaz, sadece gürültü ekler.
- *"`agent`'ta 0 gerçek bir acente numarası olabilir mi?"* → Hayır, veri
  setinde 0 numaralı acente yok. Bu yüzden 0'ı "acente yok" kodu olarak
  güvenle kullanabiliyoruz.
- *"Mod nedir?"* → En sık tekrar eden değer. `country` için PRT, çünkü
  veri seti Portekiz'deki iki otele ait.

---

## 6. Veri sızıntısı — BU BÖLÜM EN KRİTİK (hücre 21-23)

**Ne yapıyor:** `reservation_status` ile `is_canceled`'ın çapraz tablosunu
çıkarıyor, sonra `reservation_status` ve `reservation_status_date`
sütunlarını siliyor.

**Neden böyle:** Çapraz tablo gösteriyor ki `reservation_status`:
- "Canceled" veya "No-Show" → `is_canceled = 1`
- "Check-Out" → `is_canceled = 0`

Yani bu sütun hedef değişkenin başka kelimelerle yazılmış hali. Modele
verirsem %100 doğruluk alırım ama bu sahte bir başarı: gerçek hayatta
rezervasyon **yeni alınırken** bu bilgi henüz yok. Tahmin etmeye
çalıştığım şeyin cevabını girdiye koymuş olurum. Buna **veri sızıntısı
(data leakage)** deniyor.

`reservation_status_date` de aynı sebeple gitti — iptal tarihini taşıyor.

**Sonuç:** 31 → 29 sütun.

**Hoca sorarsa:**
- *"Veri sızıntısı nedir, bir cümleyle?"* → Eğitim verisinde, tahmin
  anında elimizde olmayacak bir bilginin bulunması.
- *"Nasıl fark ettin?"* → `is_canceled` ile çapraz tablosunu aldım;
  her hücre ya 0 ya da tüm satırları içeriyordu, yani birebir eşleşme vardı.
- *"Çıkarmasan ne olurdu?"* → Doğruluk %100'e çıkardı, rapor harika
  görünürdü, ama model gerçek bir rezervasyonda hiçbir şey tahmin edemezdi.
- *"Başka sızıntı var mı?"* → Bu veri setinde bu iki sütun. Aşama 2'de
  eğitim/test ayrımını yapmadan önce ölçekleme/kodlama yapmamaya da
  dikkat edeceğim, o da bir sızıntı türü.

---

## 7. Grafikler (hücre 26-36)

### Grafik 2 — Sınıf dağılımı (`plt.bar`)
İptal edilmeyen 75.166 (%62,96), iptal edilen 44.224 (%37,04).

**Neden önemli:** Sınıflar dengesiz. Hiç düşünmeyen bir model "hepsi iptal
edilmez" derse %62,96 doğruluk alır. Yani **accuracy tek başına yetersiz**;
precision / recall / F1 kullanacağım.

- *"%63 doğruluk iyi mi?"* → Hayır, sıfır bilgiyle ulaşılan taban değer.
  Modelin bunu geçmesi gerekir.

### Grafik 3 — Bekleme süresi histogramı (`plt.hist`)
İki sınıf üst üste, `alpha=0.7` ile yarı saydam. Kesikli dikey çizgiler
ortalamalar: iptal edilmeyen ~80 gün, iptal edilen ~145 gün.

- *"`alpha` ne yapıyor?"* → Çubukları yarı saydam yapıyor, iki histogram
  üst üste binince ikisi de görünüyor.
- *"Dağılım nasıl?"* → Sağa çarpık; çoğu rezervasyon girişe yakın
  yapılmış, uzun kuyrukta 700 güne kadar giden kayıtlar var.
- *"Buradan ne çıkarıyorsun?"* → Erken yapılan rezervasyonlar daha çok
  iptal ediliyor. `lead_time` güçlü bir öznitelik.

### Grafik 4 — Pazar segmentine göre iptal oranı (`plt.barh`)
`groupby("market_segment")["is_canceled"].mean()`. `is_canceled` 0/1
olduğu için ortalaması doğrudan iptal oranını veriyor. Kırmızı kesikli
çizgi genel ortalama (%37,04).

- *"Ortalama neden oran veriyor?"* → Sütun sadece 0 ve 1'lerden oluşuyor;
  1'lerin ortalaması = 1'lerin payı = iptal oranı.
- *"`Undefined` segmenti %100 iptal, bu ne demek?"* → **Dikkat edilmesi
  gereken yer:** o segmentte sadece 2 rezervasyon var. 2 kayıtla
  "%100 iptal" diyemeyiz, istatistiksel olarak anlamsız. Bu yüzden
  grafiğin yanına rezervasyon sayılarını da yazdırdım.

### Grafik 5 — Saçılım (`plt.scatter`)
1000 rastgele kayıt (`random_state=42` ile her çalıştırmada aynısı),
derste öğrendiğimiz `groupby` döngüsüyle her sınıf ayrı renkte.

- *"`random_state` ne?"* → Rastgeleliği sabitliyor; notebook'u yeniden
  çalıştırınca aynı 1000 kayıt geliyor, grafik değişmiyor.
- *"Niye 1000 kayıt, hepsi değil?"* → 119 bin noktayı çizince grafik
  simsiyah bir blok oluyor, hiçbir şey görünmüyor.
- *"Grafikten ne anlıyorsun?"* → İki sınıfın noktaları büyük ölçüde
  iç içe; tek bir düz çizgiyle ayrılamıyorlar. Korelasyonlar da zayıf
  (`lead_time` 0,29 en yükseği). Yani **doğrusal olmayan bir model**
  (karar ağacı, random forest) gerekiyor. Bu Aşama 2'nin gerekçesi.

---

## 8. Kategorik → sayısal dönüşüm (hücre 38-42)

**Ne yapıyor:** Üç farklı kodlama, kardinaliteye göre:

| Sütun(lar) | Kategori sayısı | Yöntem | Gerekçe |
|---|---|---|---|
| `country` | 177 | Frekans kodlama | One-hot yapsam 177 yeni sütun açılır |
| `arrival_date_month` | 12 | Sıralı kodlama (1-12) | Ayların doğal sırası var |
| 8 sütun (`hotel`, `meal`, `market_segment`, `distribution_channel`, `reserved_room_type`, `assigned_room_type`, `deposit_type`, `customer_type`) | 2-8 | One-hot (`drop_first=True`) | Az kategori, sıralama yok |

**Frekans kodlama nedir:** Her ülkeyi, o ülkenin veri setindeki görülme
oranıyla değiştiriyorum. PRT çok sık görülüyorsa yüksek, nadir bir ülke
düşük sayı alıyor.

**`drop_first=True` neden:** 2 kategorili bir sütun için 2 yeni sütun
gereksiz — biri diğerinin tam tersi olur. Birini atınca bilgi kaybolmuyor
(kukla değişken tuzağı / dummy variable trap).

**Sonuç:** 29 → 62 sütun (+33). Metinsel sütun sayısı 0.

**Hoca sorarsa:**
- *"`country`'ye niye one-hot yapmadın?"* → 177 kategori = 176 yeni sütun.
  Veri seti 62 sütun yerine 237 sütun olurdu, çoğu neredeyse hep sıfır.
  Buna boyut patlaması (curse of dimensionality) deniyor.
- *"Aylara niye 1-12 verdin, one-hot değil?"* → Ocak < Şubat < Mart diye
  gerçek bir sıra var. Bu sırayı korumak bilgi kazancı.
- *"Oda tiplerine (`A`, `B`, `C`...) niye sıra vermedin?"* → Oda tipi A'nın
  B'den "küçük" olduğu gibi bir anlam yok, harfler sadece etiket. Sıra
  verseydim modele yanlış bilgi vermiş olurdum.
- *"`dtype=int` niye?"* → `get_dummies` varsayılan olarak True/False
  üretiyor; model için 0/1 sayısı daha uygun.

---

## 9. Özet ve Aşama 2 (hücre 44-45)

| | Ham | İşlenmiş |
|---|---|---|
| Boyut | 119.390 × 32 | 119.390 × 62 |
| Eksik değer | 129.425 | 0 |
| Metinsel sütun | 12 | 0 |

Aşama 2'de yapılacak: eğitim/test ayrımı, karar ağacı ve random forest
denemesi, precision/recall/F1 ile değerlendirme.

---

## En zor 5 soru — hazır cevaplar

1. **"Bu projeyi neden seçtin?"**
   Veri seti hem eksik veri hem kategorik değişken bakımından zengin —
   ödevin sorduğu iki konu tam burada çalışılıyor. Ayrıca 119 bin satır
   Colab'ın ücretsiz sürümünde rahat dönüyor, 5 aşama boyunca sorun çıkarmaz.

2. **"Verini nasıl değerlendireceksin, doğruluk mu?"**
   Hayır. Sınıflar %63/%37 dengesiz; her şeye "iptal edilmez" diyen bir
   model %63 doğruluk alır. Precision, recall ve F1 kullanacağım. Otel
   için recall daha kritik — iptal edecek müşteriyi kaçırmak, yanlış
   alarmdan pahalı.

3. **"Hangi öznitelik en önemli?"**
   Korelasyonlara göre `lead_time` (0,29). Ama korelasyonların hepsi zayıf,
   bu yüzden tek öznitelikle değil doğrusal olmayan bir modelle
   öznitelik etkileşimlerinden faydalanmak gerekiyor.

4. **"Verinde bir sorun fark ettin mi?"**
   Üç tane: (a) `reservation_status` hedefin kopyası, sızıntı — çıkardım;
   (b) `Undefined` pazar segmenti %100 iptal görünüyor ama sadece 2 kayıt var;
   (c) `adr` sütununda -6,38 gibi negatif ve 5400 gibi aşırı değerler var,
   Aşama 2'de aykırı değer olarak ele alacağım.

5. **"Bu kodu sen mi yazdın?"**
   Hocanın izin verdiği şekilde yapay zekadan yardım aldım. Her hücrenin
   ne yaptığını, neden o yöntemi seçtiğimi ve alternatifini neden
   seçmediğimi açıklayabiliyorum — yukarıdaki her soru buna örnek.

---

## Anlatamayacağını düşündüğün yerler

Aşağıdakilerden biri sana zor geliyorsa söyle, daha basit haline çeviririm.
Savunamayacağın bir satır notebook'ta kalmasın:

- [ ] `df.groupby("market_segment")["is_canceled"].agg(...)` içindeki `lambda`
- [ ] `for durum, grup in ornek.groupby("is_canceled")` döngüsü (Grafik 5)
- [ ] `corrwith()` ve korelasyon yorumu
- [ ] Frekans kodlamadaki `value_counts(normalize=True)` + `map()` ikilisi
- [ ] `select_dtypes(include=[...])` kullanımı
