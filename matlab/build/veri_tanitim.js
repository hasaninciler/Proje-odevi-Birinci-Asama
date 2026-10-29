// BLP272 MATLAB Programlama — Dönem Projesi 1. Aşama: Veri Seti Tanıtım Dokümanı
// Buradaki bütün sayılar teslim edilen CSV dosyasından ölçülmüştür.
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Footer, AlignmentType, PageNumber,
  NumberFormat, CM, SP, SP1, sayfalar, kir,
  p, bos, ortali, tekBaslik, anaBaslik, altBaslik, madde,
  icSatir, tablo, tabloBasligi,
} = require("./yardimci.js");

const pg = sayfalar("sayfalar_tanitim.json");
const PROJE_ADI = "MATLAB ile Otel Rezervasyon Analiz Uygulaması";
const DANISMAN = "Öğr. Gör. Kübra ÇETİNBERK";
const link = (u) => u.replace(/\//g, "/​");

const kapak = [
  bos(),
  ortali("İSTANBUL GELİŞİM MESLEK YÜKSEKOKULU", { bold: true }),
  ortali("BİLGİSAYAR TEKNOLOJİLERİ BÖLÜMÜ", { bold: true }),
  ortali("ÖN YÜZ YAZILIM GELİŞTİRME PROGRAMI", { bold: true }),
  bos(), bos(), bos(),
  ortali("VERİ SETİ TANITIM DOKÜMANI", { bold: true }),
  bos(),
  ortali(PROJE_ADI, { caps: true }),
  bos(), bos(),
  ortali("BLP272 MATLAB PROGRAMLAMA DERSİ", { bold: true }),
  ortali("DÖNEM PROJESİ – PLAN AŞAMASI", { bold: true }),
  bos(), bos(), bos(),
  ortali("Hazırlayan"),
  ortali("250184009 - Hasan İNCİLER"),
  bos(), bos(),
  ortali("Ödev Danışmanı"),
  ortali(DANISMAN),
  bos(), bos(), bos(), bos(),
  ortali("İSTANBUL – 2026", { bold: true }),
];

const G = 280;
const icindekiler = [
  ...tekBaslik("İÇİNDEKİLER", { ilk: true }),
  icSatir("TABLOLAR LİSTESİ", pg("tablolar")),
  icSatir("GİRİŞ", pg("giris")),
  icSatir("1. VERİ KAYNAĞININ ADI VE ERİŞİM BİLGİSİ", pg("b1"), { bold: true }),
  icSatir("2. SEÇME GEREKÇESİ VE PROJE AMACIYLA İLİŞKİSİ", pg("b2"), { bold: true }),
  icSatir("3. VERİNİN GENEL YAPISI", pg("b3"), { bold: true }),
  icSatir("4. DEĞİŞKENLER", pg("b4"), { bold: true }),
  icSatir("4.1. Sayısal Değişkenler", pg("b4_1"), { girinti: G }),
  icSatir("4.2. Kategorik Değişkenler", pg("b4_2"), { girinti: G }),
  icSatir("4.3. Tarih Değişkenleri", pg("b4_3"), { girinti: G }),
  icSatir("5. VERİNİN MATLAB’A AKTARILMASI", pg("b5"), { bold: true }),
  icSatir("6. KALİTE SORUNLARI", pg("b6"), { bold: true }),
  icSatir("6.1. Eksik Hücreler", pg("b6_1"), { girinti: G }),
  icSatir("6.2. Aralık Dışı ve Şüpheli Kayıtlar", pg("b6_2"), { girinti: G }),
  icSatir("6.3. Yinelenen Satırlar", pg("b6_3"), { girinti: G }),
  icSatir("6.4. Tanımsız ve Tutarsız Kategoriler", pg("b6_4"), { girinti: G }),
];

const tablolarListesi = [
  ...tekBaslik("TABLOLAR LİSTESİ"),
  icSatir("Tablo-1. Veri Kaynağının Bilgileri", pg("t1")),
  icSatir("Tablo-2. Dersin Veri Şartları ve Karşılayan Sütunlar", pg("t2")),
  icSatir("Tablo-3. Verinin Genel Yapısı", pg("t3")),
  icSatir("Tablo-4. Sayısal Değişkenler", pg("t4")),
  icSatir("Tablo-5. Kategorik Değişkenler", pg("t5")),
  icSatir("Tablo-6. Tarih Değişkenleri", pg("t6")),
  icSatir("Tablo-7. Eksik Hücre İçeren Sütunlar", pg("t7")),
  icSatir("Tablo-8. Aralık Dışı ve Şüpheli Kayıtlar", pg("t8")),
];

const W4 = [2200, 2650, 1400, 1971];
const degisken = (satirlar, sec = {}) =>
  tablo(["Değişken", "Açıklama", "MATLAB Tipi", "Değer Aralığı"],
    satirlar.map(([ad, ...r]) => [kir(ad), ...r]), W4, sec);

const giris = [
  ...tekBaslik("GİRİŞ", { ilk: true }),
  p(`Bu doküman, BLP272 MATLAB Programlama dersi dönem projesi olan “${PROJE_ADI}” için ` +
    "kullanılacak veriyi tanıtmaktadır. Dokümanda veri kaynağı, seçilme gerekçesi, verinin genel " +
    "yapısı, değişkenler, verinin MATLAB’a nasıl aktarılacağı ve veride görülen kalite sorunları " +
    "anlatılmıştır."),
  p("Dokümandaki bütün sayılar, proje ile birlikte teslim edilen “" +
    kir("250184009_Hasan_Inciler_VeriSeti.csv") + "” dosyasından ölçülmüştür."),
];

const b1 = [
  anaBaslik("1.", "Veri Kaynağının Adı ve Erişim Bilgisi"),
  p("Veri, Kaggle sitesinde yayımlanan “Hotel Booking Demand” (Otel Rezervasyon Talebi) veri " +
    "setidir. Veri hazır bir CSV dosyası olarak indirilmiştir; herhangi bir API kullanılmamıştır. " +
    "Kaynağın bilgileri Tablo-1’de verilmiştir."),
  tabloBasligi(1, "Veri Kaynağının Bilgileri"),
  tablo(["Bilgi", "Açıklama"], [
    ["Veri setinin adı", "Hotel Booking Demand (Otel Rezervasyon Talebi)"],
    ["Kaynak", "Kaggle"],
    ["Erişim bağlantısı", link("https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand")],
    ["Giriş yapmadan indirme", link("https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2020/2020-02-11/hotels.csv")],
    ["Elde etme yolu", "Hazır dosya (CSV)"],
    ["Orijinal dosya adı", "hotel_bookings.csv"],
    ["Teslim edilen dosya adı", "250184009_Hasan_Inciler_VeriSeti.csv"],
    ["İçerik", "Portekiz’deki bir şehir oteli ve bir tatil otelinin gerçek rezervasyon kayıtları; kimlik bilgileri çıkarılmış"],
    ["Kapsadığı dönem", "Otele giriş tarihi 1 Temmuz 2015 – 31 Ağustos 2017"],
    ["Erişim", "Ücretsiz ve herkese açık"],
  ], [2600, 5621], { birArada: true }),
];

const b2 = [
  anaBaslik("2.", "Seçme Gerekçesi ve Proje Amacıyla İlişkisi"),
  p("Projenin amacı, rezervasyon kayıtlarını MATLAB ile temizleyip filtreleyen, gruplayan ve " +
    "grafiğe döken bir uygulama geliştirmektir. Bu veri aşağıdaki nedenlerle seçilmiştir:"),
  madde("Gerçek kayıtlardan oluşur; uygulamanın vereceği sonuçlar gerçek bir otelin durumunu yansıtır."),
  madde("119.390 satır içerir. Bu büyüklük, elle yapılması zor olan işlerin MATLAB ile yapılmasının faydasını göstermek için uygundur."),
  madde("Gerçek kalite sorunları içerir: eksik hücreler, aralık dışı değerler ve yinelenen satırlar. Bu sayede temizleme adımı gerçek veri üzerinde gösterilebilir."),
  madde("Filtreleme, gruplama ve grafik için gereken sayısal, kategorik ve tarih sütunlarının hepsini içerir."),
  p("Ders kapsamında verinin en az 2 sayısal, 1 kategorik ve mümkünse 1 tarih sütunu içermesi " +
    "istenmektedir. Bu şartları karşılayan sütunlar Tablo-2’de verilmiştir."),
  tabloBasligi(2, "Dersin Veri Şartları ve Karşılayan Sütunlar"),
  tablo(["Şart", "Karşılayan Sütunlar", "Projedeki Kullanımı"], [
    ["En az 2 sayısal sütun", "lead_time, adr, stays_in_week_nights, adults (toplam 20 sayısal sütun var)", "Ortalama fiyat, ortalama bekleme süresi gibi hesaplar"],
    ["En az 1 kategorik sütun", "hotel, market_segment, customer_type (toplam 11 kategorik sütun var)", "Filtreleme ve gruplama"],
    ["Mümkünse 1 tarih sütunu", "reservation_status_date; ayrıca yıl, ay ve gün sütunlarından giriş tarihi oluşturulacak", "Tarih aralığı filtresi ve aylık grafikler"],
  ], [2000, 3721, 2500], { birArada: true }),
];

const b3 = [
  anaBaslik("3.", "Verinin Genel Yapısı"),
  p("Verinin genel yapısı Tablo-3’te verilmiştir."),
  tabloBasligi(3, "Verinin Genel Yapısı"),
  tablo(["Özellik", "Değer"], [
    ["Satır sayısı", "119.390 (başlık satırı hariç)"],
    ["Sütun sayısı", "32"],
    ["Dosya formatı", "CSV (virgülle ayrılmış değerler)"],
    ["Dosya boyutu", "16.855.599 bayt (yaklaşık 16,1 MB)"],
    ["Sütun türleri", "20 sayısal, 11 kategorik, 1 tarih"],
    ["Otellere göre satır sayısı", "City Hotel: 79.330, Resort Hotel: 40.060"],
    ["Yıllara göre satır sayısı", "2015: 21.996, 2016: 56.707, 2017: 40.687"],
    ["İptal durumu", "İptal edilmeyen: 75.166 (%62,96), iptal edilen: 44.224 (%37,04)"],
  ], [2900, 5321], { birArada: true }),
];

const b4 = [
  anaBaslik("4.", "Değişkenler"),
  p("32 değişken türlerine göre üç grupta verilmiştir. “MATLAB Tipi” sütunu, değişkenin " +
    "MATLAB’a aktarıldıktan sonra kullanılacak tipini gösterir: double sayısal değerleri, " +
    "categorical sınırlı sayıda değer alan metinleri, datetime ise tarihleri ifade eder."),
  altBaslik("4.1.", "Sayısal Değişkenler"),
  tabloBasligi(4, "Sayısal Değişkenler"),
  degisken([
    ["is_canceled", "Rezervasyon iptal edildi mi? (0: hayır, 1: evet)", "double", "0 – 1"],
    ["lead_time", "Rezervasyon ile otele giriş arasındaki gün sayısı", "double", "0 – 737"],
    ["arrival_date_year", "Giriş yılı", "double", "2015 – 2017"],
    ["arrival_date_week_number", "Giriş tarihinin yılın kaçıncı haftası olduğu", "double", "1 – 53"],
    ["arrival_date_day_of_month", "Giriş tarihinin ayın kaçıncı günü olduğu", "double", "1 – 31"],
    ["stays_in_weekend_nights", "Hafta sonu (cumartesi, pazar) kalınan gece sayısı", "double", "0 – 19"],
    ["stays_in_week_nights", "Hafta içi kalınan gece sayısı", "double", "0 – 50"],
    ["adults", "Yetişkin sayısı", "double", "0 – 55"],
    ["children", "Çocuk sayısı", "double", "0 – 10 (4 hücre eksik)"],
    ["babies", "Bebek sayısı", "double", "0 – 10"],
    ["is_repeated_guest", "Müşteri bu otelde daha önce kaldı mı? (0: hayır, 1: evet)", "double", "0 – 1"],
    ["previous_cancellations", "Müşterinin önceki iptal sayısı", "double", "0 – 26"],
    ["previous_bookings_not_canceled", "Müşterinin iptal etmediği önceki rezervasyon sayısı", "double", "0 – 72"],
    ["booking_changes", "Rezervasyonda yapılan değişiklik sayısı", "double", "0 – 21"],
    ["agent", "Rezervasyonu yapan acentenin numarası", "double", "1 – 535 (16.340 hücre eksik)"],
    ["company", "Rezervasyonu yapan ya da ödeyen şirketin numarası", "double", "6 – 543 (112.593 hücre eksik)"],
    ["days_in_waiting_list", "Onay öncesi bekleme listesinde geçen gün sayısı", "double", "0 – 391"],
    ["adr", "Ortalama günlük oda fiyatı", "double", "-6,38 – 5.400,00"],
    ["required_car_parking_spaces", "İstenen otopark yeri sayısı", "double", "0 – 8"],
    ["total_of_special_requests", "Özel istek sayısı (ör. yüksek kat, çift kişilik yatak)", "double", "0 – 5"],
  ]),
  bos(),
  p("agent ve company sütunları sayı içerse de aslında bir acente ya da şirketin kimlik " +
    "numarasıdır; bu sütunlarla toplama veya ortalama gibi hesaplar yapılmayacaktır."),

  altBaslik("4.2.", "Kategorik Değişkenler"),
  tabloBasligi(5, "Kategorik Değişkenler"),
  degisken([
    ["hotel", "Otel türü", "categorical", "City Hotel, Resort Hotel"],
    ["arrival_date_month", "Giriş ayı (İngilizce)", "categorical", "January – December (12 ay)"],
    ["meal", "Yemek paketi (BB: oda-kahvaltı, HB: yarım pansiyon, FB: tam pansiyon, SC ve Undefined: yemeksiz)", "categorical", "BB, HB, FB, SC, Undefined"],
    ["country", "Müşterinin ülkesi (üç harfli kod)", "categorical", "177 ülke kodu, ör. PRT, GBR, FRA (488 hücre eksik)"],
    ["market_segment", "Pazar bölümü (TA: seyahat acentesi, TO: tur operatörü)", "categorical", "Online TA, Offline TA/TO, Groups, Direct, Corporate, Complementary, Aviation, Undefined"],
    ["distribution_channel", "Satış kanalı", "categorical", "TA/TO, Direct, Corporate, GDS, Undefined"],
    ["reserved_room_type", "Rezervasyonda seçilen oda tipi (harf kodu)", "categorical", "A, B, C, D, E, F, G, H, L, P"],
    ["assigned_room_type", "Müşteriye verilen oda tipi (harf kodu)", "categorical", "A, B, C, D, E, F, G, H, I, K, L, P"],
    ["deposit_type", "Ön ödeme türü (yok, iadesiz, iadeli)", "categorical", "No Deposit, Non Refund, Refundable"],
    ["customer_type", "Müşteri tipi (bireysel, bağlantılı bireysel, sözleşmeli, grup)", "categorical", "Transient, Transient-Party, Contract, Group"],
    ["reservation_status", "Rezervasyonun son durumu (ayrıldı, iptal, gelmedi)", "categorical", "Check-Out, Canceled, No-Show"],
  ]),

  altBaslik("4.3.", "Tarih Değişkenleri"),
  tabloBasligi(6, "Tarih Değişkenleri"),
  degisken([
    ["reservation_status_date", "Rezervasyonun son durumunun kaydedildiği tarih (YYYY-AA-GG)", "datetime", "17.10.2014 – 14.09.2017"],
    ["varis_tarihi (oluşturulacak)", "arrival_date_year, arrival_date_month ve arrival_date_day_of_month sütunlarından oluşturulacak giriş tarihi", "datetime", "01.07.2015 – 31.08.2017"],
  ], { birArada: true }),
  bos(),
  p("varis_tarihi dosyada bulunan bir sütun değildir; MATLAB’a aktarma sırasında oluşturulacağı " +
    "için 32 sütunun içinde sayılmamıştır."),
];

const b5 = [
  anaBaslik("5.", "Verinin MATLAB’a Aktarılması"),
  p("Veri, ilk satırında sütun adları bulunan bir CSV dosyasıdır ve MATLAB’a readtable komutuyla " +
    "aktarılacaktır. Dosyada sütunlar virgül (,) ile, ondalıklı sayılar ise nokta (.) ile " +
    "ayrılmıştır; örneğin bir oda fiyatı 75.5 şeklinde yazılmıştır. Dosya yalnızca İngilizce " +
    "karakterler içerdiği için UTF-8 kodlamasıyla sorunsuz okunur."),
  p("Dosyada eksik değerler boş bırakılmamış; country, agent ve company sütunlarında “NULL”, " +
    "children sütununda ise “NA” olarak yazılmıştır. Okuma sırasında bu değerler eksik değer " +
    "olarak tanımlanacaktır. Ayrıca metin sütunları categorical, reservation_status_date sütunu " +
    "ise datetime tipine çevrilecek; yıl, ay ve gün sütunlarından da varis_tarihi adlı bir giriş " +
    "tarihi sütunu oluşturulacaktır."),
  p("Aktarma sonrasında tablonun 119.390 satırdan oluştuğu ve sütunların doğru ayrıldığı size, " +
    "head ve summary komutlarıyla kontrol edilecektir."),
];

const b6 = [
  anaBaslik("6.", "Kalite Sorunları"),
  p("Veri incelendiğinde dört tür kalite sorunu görülmüştür. Veri gerçek hatalar içerdiği için, " +
    "temizleme adımını göstermek amacıyla veriye ayrıca hatalı kayıt eklenmesine gerek yoktur."),
  altBaslik("6.1.", "Eksik Hücreler"),
  p("Dört sütunda toplam 129.425 eksik hücre bulunmaktadır. Diğer 28 sütunda eksik hücre yoktur."),
  tabloBasligi(7, "Eksik Hücre İçeren Sütunlar"),
  tablo(["Sütun", "Eksik Hücre", "Oranı", "Planlanan İşlem"], [
    ["company", "112.593", "%94,31", "Sütun analizde kullanılmayacak"],
    ["agent", "16.340", "%13,69", "“Acente yok” anlamına geldiği için 0 ile doldurulacak"],
    ["country", "488", "%0,41", "“Bilinmiyor” kategorisi olarak işaretlenecek"],
    ["children", "4", "%0,003", "0 ile doldurulacak"],
  ], [1600, 1500, 1200, 3921], { birArada: true }),

  altBaslik("6.2.", "Aralık Dışı ve Şüpheli Kayıtlar"),
  p("Bazı kayıtlarda gerçekte olması beklenmeyen değerler bulunmaktadır. Bu kayıtlar Tablo-8’de verilmiştir."),
  tabloBasligi(8, "Aralık Dışı ve Şüpheli Kayıtlar"),
  tablo(["Durum", "Sütun", "Kayıt Sayısı"], [
    ["Negatif oda fiyatı (-6,38)", "adr", "1"],
    ["Diğerlerinden çok yüksek oda fiyatı (5.400; ikinci en yüksek değer 510)", "adr", "1"],
    ["Oda fiyatı 0", "adr", "1.959"],
    ["Yetişkin, çocuk ve bebek sayısının üçü de 0", "adults, children, babies", "180"],
    ["Toplam gece sayısı 0", "stays_in_weekend_nights, stays_in_week_nights", "715"],
    ["10 ve daha fazla yetişkin", "adults", "13"],
    ["9 ve daha fazla bebek", "babies", "2"],
  ], [4300, 2721, 1200], { birArada: true }),
  bos(),
  p("Negatif fiyat ve kişi sayısı 0 olan kayıtlar açıkça hatalıdır ve temizleme sırasında " +
    "çıkarılacaktır. Fiyatın 0 olması ücretsiz konaklamalarda görülebileceği için bu kayıtlar " +
    "silinmeyecek, ancak ortalama fiyat hesabında ayrıca belirtilecektir."),

  altBaslik("6.3.", "Yinelenen Satırlar"),
  p("Veride 32 sütunun tamamı başka bir satırla aynı olan 31.994 satır bulunmaktadır. Bu, verinin " +
    "%26,8’ine karşılık gelir; yinelenen satırlar çıkarıldığında 87.396 satır kalmaktadır. Veride " +
    "rezervasyon numarası olmadığı için bu satırların aynı kaydın tekrarı mı, yoksa aynı " +
    "özelliklere sahip farklı rezervasyonlar mı (örneğin bir grubun aynı anda yaptığı " +
    "rezervasyonlar) olduğu kesin bilinemez. Bu nedenle uygulamada yinelenen satırların silinip " +
    "silinmeyeceği kullanıcının seçimine bırakılacaktır."),

  altBaslik("6.4.", "Tanımsız ve Tutarsız Kategoriler"),
  madde("meal sütununda 1.169 kayıt “Undefined” olarak girilmiştir. Bu değer “SC” ile aynı anlama geldiği için ikisi tek kategoride birleştirilecektir."),
  madde("market_segment sütununda 2, distribution_channel sütununda 5 kayıt “Undefined” (tanımsız) değerini almaktadır."),
  madde("Ay adları İngilizce ve metin olarak yazılmıştır; bu nedenle tarih işlemleri için MATLAB’da ay numarasına çevrilecektir."),
];

const SAYFA = { margin: { top: 2.5*CM, right: 2.5*CM, bottom: 2.5*CM, left: 4*CM, footer: 1*CM } };
const sayfaNo = new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: SP1,
  children: [new TextRun({ children: [PageNumber.CURRENT] })] })] });
const stil = { font: "Times New Roman", size: 22, bold: true, color: "000000" };

const doc = new Document({
  creator: "Hasan İNCİLER",
  title: "Veri Seti Tanıtım Dokümanı",
  description: "BLP272 MATLAB Programlama – Dönem Projesi, Plan Aşaması",
  styles: { default: {
    document: { run: { font: "Times New Roman", size: 22 }, paragraph: { spacing: SP } },
    heading1: { run: stil, paragraph: { spacing: SP } },
    heading2: { run: stil, paragraph: { spacing: SP } },
    heading3: { run: stil, paragraph: { spacing: SP } },
  } },
  sections: [
    { properties: { page: SAYFA }, children: kapak },
    { properties: { page: { ...SAYFA, pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN } } },
      footers: { default: sayfaNo }, children: [...icindekiler, ...tablolarListesi] },
    { properties: { page: { ...SAYFA, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } } },
      footers: { default: sayfaNo }, children: [...giris, ...b1, ...b2, ...b3, ...b4, ...b5, ...b6] },
  ],
});

const cikti = process.argv[2] || path.join(__dirname, "tanitim.docx");
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(cikti, buf); console.log("yazildi:", cikti); });
