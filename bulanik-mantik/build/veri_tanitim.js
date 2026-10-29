// BLP274 Bulanık Mantık — Final Projesi 1. Aşama: Veri Seti Tanıtım Dokümanı
// Buradaki bütün sayılar teslim edilen CSV dosyasından ölçülmüştür.
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Footer, AlignmentType, PageNumber,
  NumberFormat, CM, SP, SP1, sayfalar, kir,
  p, pr, bos, ortali, tekBaslik, anaBaslik, altBaslik, madde,
  icSatir, tablo, tabloBasligi,
} = require("./yardimci.js");

const pg = sayfalar("sayfalar_tanitim.json");
const PROJE_ADI = "Bulanık Mantık Tabanlı Otel Rezervasyon İptal Riski Değerlendirme Sistemi";
const DANISMAN = "Öğr. Gör. İpek Ebru KARAÇAY";

// Uzun bağlantılar tablo hücresinde "/" işaretlerinden bölünebilsin
const link = (u) => u.replace(/\//g, "/​");

// ---------- Kapak (numarasız) ----------
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
  ortali("BLP274 BULANIK MANTIK DERSİ", { bold: true }),
  ortali("FİNAL PROJESİ – PLAN AŞAMASI", { bold: true }),
  bos(), bos(), bos(),
  ortali("Hazırlayan"),
  ortali("250184009 - Hasan İNCİLER"),
  bos(), bos(),
  ortali("Ödev Danışmanı"),
  ortali(DANISMAN),
  bos(), bos(), bos(), bos(),
  ortali("İSTANBUL – 2026", { bold: true }),
];

// ---------- İçindekiler ve Tablolar Listesi (Romen) ----------
const G = 280;
const icindekiler = [
  ...tekBaslik("İÇİNDEKİLER", { ilk: true }),
  icSatir("TABLOLAR LİSTESİ", pg("tablolar")),
  icSatir("GİRİŞ", pg("giris")),
  icSatir("1. VERİ SETİNİN ADI VE KAYNAĞI", pg("b1"), { bold: true }),
  icSatir("2. VERİ SETİNİN SEÇİLME NEDENİ VE PROJE AMACIYLA İLİŞKİSİ", pg("b2"), { bold: true }),
  icSatir("3. VERİ SETİNİN GENEL YAPISI", pg("b3"), { bold: true }),
  icSatir("3.1. Satır, Sütun ve Dosya Bilgileri", pg("b3_1"), { girinti: G }),
  icSatir("3.2. Boş Değerler", pg("b3_2"), { girinti: G }),
  icSatir("4. DEĞİŞKENLERİN TANITIMI", pg("b4"), { bold: true }),
  icSatir("4.1. Otel, Varış ve Konaklama Bilgileri", pg("b4_1"), { girinti: G }),
  icSatir("4.2. Misafir Bilgileri", pg("b4_2"), { girinti: G }),
  icSatir("4.3. Satış, Oda ve Ödeme Bilgileri", pg("b4_3"), { girinti: G }),
  icSatir("4.4. Rezervasyon Durumu Bilgileri", pg("b4_4"), { girinti: G }),
  icSatir("4.5. Dikkat Edilmesi Gereken Değerler", pg("b4_5"), { girinti: G }),
  icSatir("4.6. Projede Kullanılacak Değişkenler", pg("b4_6"), { girinti: G }),
];

const tablolarListesi = [
  ...tekBaslik("TABLOLAR LİSTESİ"),
  icSatir("Tablo-1. Veri Setinin Kimlik Bilgileri", pg("t1")),
  icSatir("Tablo-2. Veri Setinin Genel Yapısı", pg("t2")),
  icSatir("Tablo-3. Boş Değer İçeren Sütunlar", pg("t3")),
  icSatir("Tablo-4. Otel, Varış ve Konaklama Bilgileri", pg("t4")),
  icSatir("Tablo-5. Misafir Bilgileri", pg("t5")),
  icSatir("Tablo-6. Satış, Oda ve Ödeme Bilgileri", pg("t6")),
  icSatir("Tablo-7. Rezervasyon Durumu Bilgileri", pg("t7")),
  icSatir("Tablo-8. Projede Kullanılacak Değişkenler", pg("t8")),
];

// ---------- Metin ----------
const W2 = [2600, 5621];                       // iki sütunlu bilgi tabloları
const W4 = [2250, 2750, 1100, 2121];           // değişken tabloları
const BASLIK4 = ["Değişken", "Açıklama", "Veri Tipi", "Değer Aralığı"];
const degisken = (satirlar, sec = {}) => tablo(BASLIK4, satirlar.map(([ad, ...r]) => [kir(ad), ...r]), W4, sec);

const giris = [
  ...tekBaslik("GİRİŞ", { ilk: true }),
  p(`Bu doküman, BLP274 Bulanık Mantık dersi final projesi kapsamında hazırlanan “${PROJE_ADI}” ` +
    "projesinde kullanılacak veri setini tanıtmaktadır. Dokümanda veri setinin adı ve kaynağı, " +
    "neden seçildiği, genel yapısı ve 32 değişkenin her birinin açıklaması, veri tipi ve değer " +
    "aralığı verilmiştir."),
  p("Dokümandaki bütün sayılar, proje ile birlikte teslim edilen “" + kir("250184009_Hasan_Inciler_VeriSeti.csv") + "” " +
    "dosyasından ölçülmüştür. Bu dosya, Kaggle sitesinden indirilen orijinal dosyanın içeriği " +
    "değiştirilmeden yeniden adlandırılmış hâlidir."),
];

const b1 = [
  anaBaslik("1.", "Veri Setinin Adı ve Kaynağı"),
  p("Veri seti, Kaggle sitesinde “Hotel Booking Demand” (Otel Rezervasyon Talebi) adıyla " +
    "yayımlanmaktadır. Veri seti, Portekiz’deki iki otelin gerçek rezervasyon kayıtlarından " +
    "oluşturulmuştur. Otel ve müşteri kimliğini ortaya çıkarabilecek bilgiler veri setinden " +
    "çıkarılmıştır. Veri setinin kimlik bilgileri Tablo-1’de verilmiştir."),
  tabloBasligi(1, "Veri Setinin Kimlik Bilgileri"),
  tablo(["Bilgi", "Açıklama"], [
    ["Veri setinin adı", "Hotel Booking Demand (Otel Rezervasyon Talebi)"],
    ["Yayımlandığı yer", "Kaggle"],
    ["Bağlantı", link("https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand")],
    ["Diğer erişim adresi", link("https://raw.githubusercontent.com/rfordatascience/tidytuesday/master/data/2020/2020-02-11/hotels.csv") +
      " (TidyTuesday açık veri projesi; aynı dosya, giriş yapmadan indirilebilir)"],
    ["Orijinal dosya adı", "hotel_bookings.csv"],
    ["Teslim edilen dosya adı", "250184009_Hasan_Inciler_VeriSeti.csv"],
    ["Verinin kaynağı", "Portekiz’deki bir şehir oteli (City Hotel) ve bir tatil otelinin (Resort Hotel) gerçek rezervasyon kayıtları"],
    ["Kapsadığı dönem", "Otele giriş tarihi 1 Temmuz 2015 ile 31 Ağustos 2017 arasında olan rezervasyonlar"],
    ["Erişim şekli", "Ücretsiz ve herkese açık"],
    ["İndirilme tarihi", "9 Ekim 2026"],
  ], W2, { birArada: true }),
];

const b2 = [
  anaBaslik("2.", "Veri Setinin Seçilme Nedeni ve Proje Amacıyla İlişkisi"),
  p("Projenin amacı, bir otel rezervasyonunun iptal riskini bulanık mantık ile 0 ile 100 arasında " +
    "bir puan olarak hesaplamaktır. Bu veri seti aşağıdaki nedenlerle seçilmiştir:"),
  madde("Gerçek otellerin gerçek rezervasyon kayıtlarından oluşur. Bu sayede sistemin kuralları uydurma değil, gerçek müşteri davranışına dayanır."),
  madde("Her rezervasyonun iptal edilip edilmediği bilgisi (is_canceled) vardır. Bu bilgi, sistemin verdiği puanların doğru olup olmadığını kontrol etmek için gereklidir."),
  madde("Projede girdi olarak kullanılacak üç bilgi, yani rezervasyonun kaç gün önce yapıldığı, özel istek sayısı ve önceki iptal sayısı veri setinde hazır olarak bulunur."),
  madde("119.390 kayıt içerir. Kayıt sayısı, her kuralın gerçek iptal oranını güvenilir şekilde hesaplamaya yetecek kadar fazladır."),
  madde("Boş değerler yalnızca 4 sütunda bulunur ve projede kullanılacak sütunlarda hiç boş değer yoktur."),
  madde("Ücretsiz ve herkese açıktır; tek bir CSV dosyası olduğu için kolayca açılıp incelenebilir."),
];

const b3 = [
  anaBaslik("3.", "Veri Setinin Genel Yapısı"),
  altBaslik("3.1.", "Satır, Sütun ve Dosya Bilgileri"),
  p("Veri seti tek bir CSV dosyasından oluşmaktadır. Dosyanın ilk satırında sütun adları, diğer " +
    "satırlarında ise her biri bir rezervasyona ait kayıtlar bulunmaktadır. Dosyanın genel yapısı " +
    "Tablo-2’de verilmiştir."),
  tabloBasligi(2, "Veri Setinin Genel Yapısı"),
  tablo(["Özellik", "Değer"], [
    ["Kayıt (satır) sayısı", "119.390 (başlık satırı hariç)"],
    ["Değişken (sütun) sayısı", "32"],
    ["Dosya formatı", "CSV (virgülle ayrılmış değerler), düz metin"],
    ["Dosya boyutu", "16.855.599 bayt (yaklaşık 16,1 MB)"],
    ["İlk satır", "Sütun adları (başlık satırı)"],
    ["Ayırıcılar", "Sütunlar virgül (,) ile, ondalıklı sayılar nokta (.) ile ayrılmıştır"],
    ["Sayısal değişken sayısı", "20"],
    ["Metin değişken sayısı", "12 (bunlardan biri tarih bilgisidir)"],
    ["Otellere göre kayıt sayısı", "City Hotel: 79.330, Resort Hotel: 40.060"],
    ["Yıllara göre kayıt sayısı", "2015: 21.996, 2016: 56.707, 2017: 40.687"],
    ["İptal durumu", "İptal edilmeyen: 75.166 (%62,96), İptal edilen: 44.224 (%37,04)"],
  ], W2, { birArada: true }),
  altBaslik("3.2.", "Boş Değerler"),
  p("Dosyada boş değerler iki şekilde gösterilmiştir: country, agent ve company sütunlarında " +
    "“NULL”, children sütununda ise “NA” yazmaktadır. Toplam 129.425 boş değer bulunmaktadır ve " +
    "bunlar yalnızca Tablo-3’teki dört sütunda yer almaktadır. Diğer 28 sütunda hiç boş değer yoktur."),
  tabloBasligi(3, "Boş Değer İçeren Sütunlar"),
  tablo(["Sütun", "Boş Değer Sayısı", "Oranı", "Anlamı"], [
    ["company", "112.593", "%94,31", "Rezervasyon bir şirket üzerinden yapılmamış"],
    ["agent", "16.340", "%13,69", "Rezervasyon bir acente üzerinden yapılmamış"],
    ["country", "488", "%0,41", "Ülke bilgisi girilmemiş"],
    ["children", "4", "%0,003", "Çocuk sayısı girilmemiş"],
  ], [1600, 1800, 1300, 3521], { birArada: true }),
];

const b4 = [
  anaBaslik("4.", "Değişkenlerin Tanıtımı"),
  p("Veri setindeki 32 değişken, kolay incelenebilmesi için dört grupta toplanmıştır. Her tabloda " +
    "değişkenin adı, açıklaması, veri tipi ve dosyadaki değer aralığı verilmiştir. Metin " +
    "değişkenlerde değer aralığı yerine değişkenin alabildiği değerler yazılmıştır."),

  altBaslik("4.1.", "Otel, Varış ve Konaklama Bilgileri"),
  tabloBasligi(4, "Otel, Varış ve Konaklama Bilgileri"),
  degisken([
    ["hotel", "Rezervasyonun yapıldığı otel. City Hotel şehir otelini, Resort Hotel tatil otelini gösterir.", "Metin", "City Hotel (79.330), Resort Hotel (40.060)"],
    ["is_canceled", "Rezervasyonun iptal edilip edilmediği.", "Tam sayı (0/1)", "0 = iptal edilmedi (75.166), 1 = iptal edildi (44.224)"],
    ["lead_time", "Rezervasyonun yapıldığı gün ile otele giriş günü arasındaki gün sayısı.", "Tam sayı", "0 – 737 gün"],
    ["arrival_date_year", "Otele giriş yılı.", "Tam sayı", "2015 – 2017"],
    ["arrival_date_month", "Otele giriş ayı (İngilizce ay adı).", "Metin", "January – December (12 ay)"],
    ["arrival_date_week_number", "Giriş tarihinin yılın kaçıncı haftası olduğu.", "Tam sayı", "1 – 53"],
    ["arrival_date_day_of_month", "Giriş tarihinin ayın kaçıncı günü olduğu.", "Tam sayı", "1 – 31"],
    ["stays_in_weekend_nights", "Konaklamadaki hafta sonu (cumartesi ve pazar) gecesi sayısı.", "Tam sayı", "0 – 19 gece"],
    ["stays_in_week_nights", "Konaklamadaki hafta içi (pazartesi–cuma) gecesi sayısı.", "Tam sayı", "0 – 50 gece"],
  ]),

  altBaslik("4.2.", "Misafir Bilgileri"),
  tabloBasligi(5, "Misafir Bilgileri"),
  degisken([
    ["adults", "Yetişkin sayısı.", "Tam sayı", "0 – 55 kişi"],
    ["children", "Çocuk sayısı.", "Tam sayı", "0 – 10 kişi; 4 kayıtta boş (NA)"],
    ["babies", "Bebek sayısı.", "Tam sayı", "0 – 10 kişi"],
    ["meal", "Seçilen yemek paketi. BB: oda ve kahvaltı, HB: yarım pansiyon, FB: tam pansiyon, SC ve Undefined: yemeksiz.", "Metin", "BB, HB, FB, SC, Undefined (5 değer)"],
    ["country", "Müşterinin geldiği ülke (üç harfli ülke kodu).", "Metin", "177 farklı ülke kodu (ör. PRT, GBR, FRA); 488 kayıtta boş (NULL)"],
    ["is_repeated_guest", "Müşterinin bu otelde daha önce kalıp kalmadığı.", "Tam sayı (0/1)", "0 = ilk kez gelen (115.580), 1 = tekrar gelen (3.810)"],
    ["previous_cancellations", "Müşterinin bu rezervasyondan önce iptal ettiği rezervasyon sayısı.", "Tam sayı", "0 – 26"],
    ["previous_bookings_not_canceled", "Müşterinin bu rezervasyondan önce iptal etmediği rezervasyon sayısı.", "Tam sayı", "0 – 72"],
    ["customer_type", "Rezervasyon türü. Transient: bireysel, Transient-Party: başka bir bireysel rezervasyonla bağlantılı, Contract: sözleşmeli, Group: grup.", "Metin", "Transient, Transient-Party, Contract, Group (4 değer)"],
  ]),

  altBaslik("4.3.", "Satış, Oda ve Ödeme Bilgileri"),
  tabloBasligi(6, "Satış, Oda ve Ödeme Bilgileri"),
  degisken([
    ["market_segment", "Rezervasyonun geldiği pazar bölümü. TA: seyahat acentesi, TO: tur operatörü.", "Metin", "Online TA, Offline TA/TO, Groups, Direct, Corporate, Complementary, Aviation, Undefined (8 değer)"],
    ["distribution_channel", "Rezervasyonun geldiği satış kanalı. GDS: küresel dağıtım sistemi.", "Metin", "TA/TO, Direct, Corporate, GDS, Undefined (5 değer)"],
    ["reserved_room_type", "Rezervasyonda seçilen oda tipi. Gizlilik için oda adları yerine harf kodları kullanılmıştır.", "Metin", "A, B, C, D, E, F, G, H, L, P (10 değer)"],
    ["assigned_room_type", "Müşteriye verilen oda tipi. Seçilen oda tipinden farklı olabilir.", "Metin", "A, B, C, D, E, F, G, H, I, K, L, P (12 değer)"],
    ["booking_changes", "Rezervasyonda yapılan değişiklik sayısı.", "Tam sayı", "0 – 21"],
    ["deposit_type", "Ön ödeme türü. No Deposit: ön ödeme yok, Non Refund: ücretin tamamı peşin ve iade edilmez, Refundable: ücretin bir kısmı peşin ve iade edilebilir.", "Metin", "No Deposit, Non Refund, Refundable (3 değer)"],
    ["agent", "Rezervasyonu yapan seyahat acentesinin numarası.", "Tam sayı", "1 – 535 (333 farklı acente); 16.340 kayıtta boş (NULL)"],
    ["company", "Rezervasyonu yapan ya da ödemeyi yapacak şirketin numarası.", "Tam sayı", "6 – 543 (352 farklı şirket); 112.593 kayıtta boş (NULL)"],
    ["days_in_waiting_list", "Rezervasyonun onaylanmadan önce bekleme listesinde kaldığı gün sayısı.", "Tam sayı", "0 – 391 gün"],
    ["adr", "Ortalama günlük oda fiyatı (toplam konaklama ücretinin gece sayısına bölümü).", "Ondalıklı sayı", "-6,38 – 5.400,00"],
    ["required_car_parking_spaces", "Müşterinin istediği otopark yeri sayısı.", "Tam sayı", "0 – 8"],
    ["total_of_special_requests", "Müşterinin özel istek sayısı (ör. çift kişilik yatak, yüksek kat).", "Tam sayı", "0 – 5"],
  ]),

  altBaslik("4.4.", "Rezervasyon Durumu Bilgileri"),
  tabloBasligi(7, "Rezervasyon Durumu Bilgileri"),
  degisken([
    ["reservation_status", "Rezervasyonun son durumu. Check-Out: müşteri konaklayıp ayrıldı, Canceled: iptal edildi, No-Show: müşteri gelmedi.", "Metin", "Check-Out (75.166), Canceled (43.017), No-Show (1.207)"],
    ["reservation_status_date", "Son durumun kaydedildiği tarih.", "Tarih (YYYY-AA-GG)", "2014-10-17 – 2017-09-14"],
  ], { birArada: true }),

  altBaslik("4.5.", "Dikkat Edilmesi Gereken Değerler"),
  p("Veri seti incelenirken aşağıdaki durumlar tespit edilmiştir:"),
  madde("meal sütunundaki SC ve Undefined değerleri aynı anlama gelir; ikisi de yemek paketi olmadığını gösterir."),
  madde("market_segment sütununda 2 kayıt, distribution_channel sütununda 5 kayıt “Undefined” (tanımsız) olarak girilmiştir."),
  madde("adr sütununda 1 kayıt negatif (-6,38), 1 kayıt ise diğerlerinden çok yüksektir (5.400,00). Bu kayıttan sonraki en yüksek değer 510,00’dur. Ayrıca 1.959 kayıtta fiyat 0 olarak girilmiştir."),
  madde("180 kayıtta yetişkin, çocuk ve bebek sayılarının üçü de 0’dır."),
  madde("reservation_status sütunu, is_canceled ile aynı bilgiyi taşır: Canceled (43.017) ve No-Show (1.207) kayıtlarının toplamı, iptal edilen 44.224 rezervasyona eşittir. Bu bilgi rezervasyon yapıldığı anda bilinemeyeceği için projede girdi olarak kullanılmayacaktır."),

  altBaslik("4.6.", "Projede Kullanılacak Değişkenler"),
  p("Veri setindeki 32 değişkenden dördü projede doğrudan kullanılacaktır. Bu değişkenler ve " +
    "projedeki görevleri Tablo-8’de verilmiştir. Bu dört sütunda hiç boş değer bulunmamaktadır."),
  tabloBasligi(8, "Projede Kullanılacak Değişkenler"),
  tablo(["Değişken", "Projedeki Görevi", "Bulanık Kümeler"], [
    [kir("lead_time"), "Girdi 1: Rezervasyonun kaç gün önce yapıldığı", "Kısa, Orta, Uzun"],
    [kir("total_of_special_requests"), "Girdi 2: Özel istek sayısı", "Yok, Az, Çok"],
    [kir("previous_cancellations"), "Girdi 3: Önceki iptal sayısı", "Yok, Az, Çok"],
    [kir("is_canceled"), "Kuralların belirlenmesi ve sistemin sonuçlarının kontrolü", "—"],
  ], [2700, 3721, 1800], { birArada: true }),
];

// ---------- Belge ----------
const SAYFA = { margin: { top: 2.5*CM, right: 2.5*CM, bottom: 2.5*CM, left: 4*CM, footer: 1*CM } };
const sayfaNo = new Footer({ children: [new Paragraph({
  alignment: AlignmentType.CENTER, spacing: SP1,
  children: [new TextRun({ children: [PageNumber.CURRENT] })] })] });
const stil = { font: "Times New Roman", size: 22, bold: true, color: "000000" };

const doc = new Document({
  creator: "Hasan İNCİLER",
  title: "Veri Seti Tanıtım Dokümanı",
  description: "BLP274 Bulanık Mantık – Final Projesi, Plan Aşaması",
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
      footers: { default: sayfaNo }, children: [...giris, ...b1, ...b2, ...b3, ...b4] },
  ],
});

const cikti = process.argv[2] || path.join(__dirname, "tanitim.docx");
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(cikti, buf); console.log("yazildi:", cikti); });
