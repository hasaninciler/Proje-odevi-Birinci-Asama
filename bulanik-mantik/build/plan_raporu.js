// BLP274 Bulanık Mantık — Final Projesi 1. Aşama (Plan Aşaması) raporu
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Footer, AlignmentType, PageNumber,
  NumberFormat, PageBreak, ImageRun, CM, SP, SP1, sayfalar,
  p, pr, bos, ortali, bolumBasligi, tekBaslik, anaBaslik, altBaslik, madde,
  grafik, icSatir, formSatir, tablo, tabloBasligi,
} = require("./yardimci.js");

const pg = sayfalar("sayfalar_rapor.json");
const IMZA = path.join(__dirname, "..", "..", "docs", "imza", "imza.png");

const PROJE_ADI = "Bulanık Mantık Tabanlı Otel Rezervasyon İptal Riski Değerlendirme Sistemi";
const DANISMAN = "Öğr. Gör. İpek Ebru KARAÇAY";
const TARIH = "29/10/2026";

const sag = (text) => new Paragraph({ alignment: AlignmentType.RIGHT, spacing: SP, children: [new TextRun(text)] });
const yeniSayfa = () => new Paragraph({ children: [new PageBreak()] });
const kural = (text) => new Paragraph({
  alignment: AlignmentType.LEFT, spacing: SP, indent: { left: 567 },
  children: [new TextRun({ text, italics: true })],
});

// ======================================================================
// 1. KISIM — numarasız sayfalar
// ======================================================================
const kapak = [
  bos(),
  ortali("İSTANBUL GELİŞİM MESLEK YÜKSEKOKULU", { bold: true }),
  ortali("BİLGİSAYAR TEKNOLOJİLERİ BÖLÜMÜ", { bold: true }),
  ortali("ÖN YÜZ YAZILIM GELİŞTİRME PROGRAMI", { bold: true }),
  bos(), bos(), bos(),
  ortali(PROJE_ADI, { bold: true, caps: true }),
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

const tanitimFormu = [
  yeniSayfa(),
  ortali("ÖDEV TANITIM FORMU", { bold: true }),
  bos(), bos(),
  formSatir("YAZAR ADI SOYADI", "Hasan İNCİLER"),
  formSatir("ÖDEVİN DİLİ", "Türkçe"),
  formSatir("ÖDEVİN ADI", PROJE_ADI),
  formSatir("BÖLÜM", "Bilgisayar Teknolojileri"),
  formSatir("PROGRAM", "Ön Yüz Yazılım Geliştirme"),
  formSatir("ÖDEVİN TÜRÜ", "Final"),
  formSatir("ÖDEVİN TES. TARİHİ", "29 / 10 / 2026"),
  formSatir("SAYFA SAYISI", pg("toplam")),
  formSatir("ÖDEV DANIŞMANI", DANISMAN),
];

const beyan = [
  yeniSayfa(),
  ortali("BEYAN", { bold: true }),
  bos(), bos(),
  p("Bu ödevin/projenin hazırlanmasında bilimsel ahlak kurallarına uyulduğu, başkalarının " +
    "eserlerinden yararlanılması durumunda bilimsel normlara uygun olarak atıfta bulunulduğu, " +
    "kullanılan verilerde herhangi tahrifat yapılmadığını, ödevin/projenin herhangi bir kısmının " +
    "bu üniversite veya başka bir üniversitedeki başka bir ödev/proje olarak sunulmadığını beyan " +
    "eder, aksi durumda karşılaşacağım cezai ve/ve ya hukuki durumu kabul eder; ayrıca " +
    "üniversitenin ilgili yasa, yönerge ve metinlerini okuduğumu beyan ederim."),
  bos(), bos(), bos(),
  sag(TARIH),
  sag("Hasan İNCİLER"),
  new Paragraph({
    alignment: AlignmentType.RIGHT, spacing: SP1,
    children: [new ImageRun({ type: "png", data: fs.readFileSync(IMZA),
      transformation: { width: 135, height: 60 } })],
  }),
];

const kabulOnay = [
  yeniSayfa(),
  ortali("KABUL VE ONAY SAYFASI", { bold: true }),
  bos(), bos(),
  p(`250184009 numaralı Hasan İNCİLER’in “${PROJE_ADI}” adlı çalışması, benim tarafımdan ` +
    "Final ödevi olarak kabul edilmiştir."),
  bos(), bos(), bos(),
  sag("Öğretim Görevlisi"),
  sag(DANISMAN),
];

// ======================================================================
// 2. KISIM — Romen rakamlı sayfalar
// ======================================================================
const OZET_METNI = [
  "Otellerde yapılan rezervasyonların bir kısmı, müşteri otele gelmeden iptal edilmektedir. " +
  "İptal edilen her rezervasyon; boş kalan bir oda, kaybedilen bir gelir ve boşa yapılan bir " +
  "hazırlık anlamına gelir. Bu projede, bir rezervasyonun iptal edilme riskini bulanık mantık " +
  "yöntemiyle hesaplayan bir sistem planlanmaktadır.",

  "Sistem; rezervasyonun giriş tarihinden kaç gün önce yapıldığını, müşterinin kaç özel istekte " +
  "bulunduğunu ve müşterinin daha önce kaç rezervasyonunu iptal ettiğini girdi olarak alacaktır. " +
  "Bu bilgiler “kısa, orta, uzun” ya da “yok, az, çok” gibi günlük dilde kullanılan ifadelerle " +
  "değerlendirilecek ve en fazla 27 kuraldan oluşan bir kural tabanı ile 0 ile 100 arasında bir " +
  "iptal riski puanı üretilecektir.",

  "Projede, Kaggle sitesinden alınan ve Portekiz’deki iki otele ait 119.390 rezervasyon kaydını " +
  "içeren veri seti kullanılacaktır. Veri setindeki gerçek iptal bilgileri hem kuralların " +
  "belirlenmesinde hem de sistemin doğru çalışıp çalışmadığının kontrol edilmesinde kullanılacaktır.",

  "Veri seti üzerinde yapılan ilk incelemede, rezervasyon ne kadar erken yapılmışsa iptal oranının " +
  "da o kadar arttığı ve bu artışın keskin bir sınırla değil, kademeli olarak gerçekleştiği " +
  "görülmüştür. Bu durum, problemin bulanık mantık ile ele alınmasının uygun olduğunu göstermektedir.",
];

const ozet = [
  ...tekBaslik("ÖZET", { ilk: true }),
  ...OZET_METNI.map(p),
  bos(),
  pr([
    new TextRun({ text: "Anahtar Kelimeler: ", bold: true }),
    new TextRun("Bulanık mantık, iptal riski, otel rezervasyonu, üyelik fonksiyonu"),
  ]),
];

const bolumSatiri = (t) => new Paragraph({ spacing: SP1, children: [new TextRun({ text: t, bold: true })] });
const G = 280;
const icindekiler = [
  ...tekBaslik("İÇİNDEKİLER"),
  icSatir("ÖZET", pg("ozet")),
  icSatir("TABLOLAR LİSTESİ", pg("tablolar")),
  icSatir("GRAFİKLER LİSTESİ", pg("grafikler")),
  icSatir("ÖN SÖZ", pg("onsoz")),
  icSatir("GİRİŞ", pg("giris")),
  bos(),
  bolumSatiri("BİRİNCİ BÖLÜM"),
  icSatir("PROJENİN TANIMI VE AMACI", pg("b1"), { bold: true }),
  icSatir("1.1. Projenin Adı", pg("b1_1"), { girinti: G }),
  icSatir("1.2. Öğrenci Adı Soyadı", pg("b1_2"), { girinti: G }),
  icSatir("1.3. Projenin Amacı", pg("b1_3"), { girinti: G }),
  icSatir("1.3.1. Sistemin Girdileri ve Çıktısı", pg("b1_3_1"), { girinti: 2 * G }),
  icSatir("1.3.2. Kural Tabanı", pg("b1_3_2"), { girinti: 2 * G }),
  icSatir("1.3.3. Ölçülebilir Hedefler", pg("b1_3_3"), { girinti: 2 * G }),
  bos(),
  bolumSatiri("İKİNCİ BÖLÜM"),
  icSatir("PROBLEM DURUMU VE MEVCUT ÇÖZÜMLER", pg("b2"), { bold: true }),
  icSatir("2.1. Çözüm Getirilen Problem Durumu", pg("b2_1"), { girinti: G }),
  icSatir("2.2. Mevcut Çözümler", pg("b2_2"), { girinti: G }),
  icSatir("2.3. Mevcut Çözümlerin Dezavantajları", pg("b2_3"), { girinti: G }),
  bos(),
  bolumSatiri("ÜÇÜNCÜ BÖLÜM"),
  icSatir("PROJENİN FARKI, AVANTAJLARI VE ÖZGÜN YANLARI", pg("b3"), { bold: true }),
  icSatir("3.1. Piyasadaki Benzer İşlerden Farkı", pg("b3_1"), { girinti: G }),
  icSatir("3.2. Projenin Avantajları", pg("b3_2"), { girinti: G }),
  icSatir("3.3. Projenin Özgün Yanları", pg("b3_3"), { girinti: G }),
  bos(),
  bolumSatiri("DÖRDÜNCÜ BÖLÜM"),
  icSatir("VERİ SETİNİN ELDE EDİLMESİ", pg("b4"), { bold: true }),
  icSatir("4.1. Veri Setinin Bulunduğu Yer", pg("b4_1"), { girinti: G }),
  icSatir("4.2. Veri Setinin Seçilmesi ve İndirilmesi", pg("b4_2"), { girinti: G }),
  icSatir("4.3. Veri Setinin Projede Kullanımı", pg("b4_3"), { girinti: G }),
  bos(),
  icSatir("SONUÇ", pg("sonuc")),
];

const listeler = [
  ...tekBaslik("TABLOLAR LİSTESİ"),
  icSatir("Tablo-1. Plan Aşaması Sorularının Rapordaki Karşılıkları", pg("t1")),
  icSatir("Tablo-2. Sistemin Girdileri, Çıktısı ve Bulanık Kümeleri", pg("t2")),
  icSatir("Tablo-3. Mevcut Çözümler ve Dezavantajları", pg("t3")),
  icSatir("Tablo-4. Rezervasyon Süresi ve Özel İstek Sayısına Göre İptal Oranları", pg("t4")),
  bos(), bos(),
  ...tekBaslik("GRAFİKLER LİSTESİ", { ilk: true }),   // tablolar listesiyle aynı sayfada
  icSatir("Grafik-1. Rezervasyon Süresi İçin Kısa, Orta ve Uzun Bulanık Kümeleri", pg("g1")),
  icSatir("Grafik-2. Rezervasyon Süresine Göre İptal Oranı", pg("g2")),
];

const onsoz = [
  ...tekBaslik("ÖN SÖZ"),
  p("Bulanık Mantık dersinde öğrendiğimiz üyelik fonksiyonu ve kural tabanı konularını gerçek bir " +
    "problem üzerinde uygulamak için otel rezervasyonlarının iptal edilmesi konusunu seçtim. Bu " +
    "konu, günlük hayatta sıkça karşılaşılan ve “erken”, “az”, “çok” gibi belirsiz ifadelerle " +
    "konuşulan bir problem olduğu için bulanık mantığa uygun bir örnek oluşturmaktadır."),
  p("Plan aşamasında projenin amacını, çözmek istediği problemi ve kullanılacak veri setini " +
    "belirledim. Sonraki aşamalarda bu plan üzerine sistemin kendisi kurulacaktır."),
  p(`Ders süresince verdiği bilgiler ve yönlendirmeler için ödev danışmanım ${DANISMAN}’a teşekkür ederim.`),
  bos(), bos(),
  sag("Hasan İNCİLER"),
  sag("İstanbul, 2026"),
];

// ======================================================================
// 3. KISIM — metin (normal rakamlı sayfalar)
// ======================================================================
const giris = [
  ...tekBaslik("GİRİŞ", { ilk: true }),
  p("Otel müşterileri rezervasyonlarını çoğu zaman haftalar, hatta aylar önceden yapar. Bu süre " +
    "içinde planlar değişebildiği için rezervasyonların bir kısmı iptal edilir. Bu projede " +
    "kullanılan veri setinde her 100 rezervasyondan yaklaşık 37’si iptal edilmiştir. Otel için " +
    "iptalin zararı yalnızca boş kalan oda değildir. Yemek, temizlik ve personel planlaması da " +
    "alınan rezervasyonlara göre yapıldığı için bu hazırlıklar da boşa gider."),
  p("Bir rezervasyonun iptal edilip edilmeyeceği önceden kesin olarak bilinemez. Otel çalışanları " +
    "bu konuda genellikle “çok erken yapılan rezervasyonlar daha riskli” ya da “özel istekte " +
    "bulunan müşteri genellikle gelir” gibi deneyime dayalı ifadeler kullanır. Bu ifadeler kesin " +
    "sayılar içermez; “erken”, “çok”, “az” gibi belirsiz kelimelerden oluşur."),
  p("Bulanık mantık, bu tür belirsiz ifadelerle çalışmak için kullanılan bir yöntemdir. Klasik " +
    "mantıkta bir değer bir kümeye ya aittir ya da ait değildir. Örneğin 120 günü sınır kabul eden " +
    "bir kurala göre 119 gün önce yapılan bir rezervasyon “erken” sayılmaz, 121 gün önce yapılan " +
    "ise sayılır. Bulanık mantıkta ise bir değer bir kümeye belirli bir dereceyle ait olabilir. " +
    "Bu sayede 119 ve 121 gün önce yapılan iki rezervasyon “erken” kümesine hemen hemen aynı " +
    "derecede ait olur ve sistem insanların düşünme biçimine daha yakın sonuçlar üretir."),
  p("Bu rapor, BLP274 Bulanık Mantık dersi final projesinin plan aşamasıdır. Raporda plan aşaması " +
    "dokümanındaki soruların tamamı yanıtlanmıştır. Soruların rapordaki karşılıkları Tablo-1’de " +
    "gösterilmiştir. Veri setinin ayrıntılı tanıtımı ise ayrı bir doküman olarak hazırlanmıştır."),
  tabloBasligi(1, "Plan Aşaması Sorularının Rapordaki Karşılıkları"),
  tablo(["No", "Soru", "Rapordaki Yeri"], [
    ["1", "Projenizin adı", "1.1"],
    ["2", "Öğrenci adı soyadı", "1.2"],
    ["3", "Projenizin amacı", "1.3"],
    ["4", "Problem durumu, mevcut çözümler ve dezavantajları", "İkinci Bölüm"],
    ["5", "Piyasadaki benzer işlerden farkı", "3.1"],
    ["6", "Avantajları ve özgün yanları", "3.2 ve 3.3"],
    ["7", "Veri setinin nasıl elde edildiği", "Dördüncü Bölüm"],
  ], [700, 5121, 2400], { birArada: true }),
];

// ---------------------- BİRİNCİ BÖLÜM ----------------------
const bolum1 = [
  ...bolumBasligi("BİRİNCİ BÖLÜM", "PROJENİN TANIMI VE AMACI"),
  anaBaslik("1.1.", "Projenin Adı"),
  p(`Projenin adı “${PROJE_ADI}”dir.`),
  p("Adın her parçası projenin bir yönünü anlatır. “Bulanık mantık tabanlı” ifadesi kullanılan " +
    "yöntemi, “otel rezervasyon iptal riski” ifadesi çözülmek istenen problemi gösterir. " +
    "“Değerlendirme sistemi” ifadesi ise sistemin “iptal edecek” ya da “iptal etmeyecek” " +
    "şeklinde kesin bir karar vermediğini, bunun yerine riskin ne kadar yüksek olduğunu bir " +
    "puanla gösterdiğini anlatır."),

  anaBaslik("1.2.", "Öğrenci Adı Soyadı"),
  p("Proje, Bilgisayar Teknolojileri Bölümü Ön Yüz Yazılım Geliştirme Programı 250184009 " +
    "numaralı öğrencisi Hasan İNCİLER tarafından hazırlanmıştır."),

  anaBaslik("1.3.", "Projenin Amacı"),
  p("Projenin amacı, otel çalışanının bir rezervasyon alındığı anda bilinen birkaç bilgiyi " +
    "kullanarak o rezervasyonun iptal riskini 0 ile 100 arasında bir puan olarak görebileceği " +
    "bir sistem geliştirmektir. Puan yükseldikçe rezervasyonun iptal edilme ihtimali de artar. " +
    "Otel bu puana bakarak riskli rezervasyonlar için hatırlatma mesajı göndermek, ön ödeme " +
    "istemek ya da oda planlamasını buna göre yapmak gibi önlemler alabilir."),
  pr([new TextRun({ text: "Ne yapılacak? ", bold: true }),
      new TextRun("Bir rezervasyonun iptal riskini puanlayan, en fazla 27 kurallı bir bulanık mantık sistemi kurulacaktır.")]),
  pr([new TextRun({ text: "Nasıl yapılacak? ", bold: true }),
      new TextRun("Girdiler “kısa, orta, uzun” gibi bulanık kümelerle ifade edilecek, kurallar " +
        "veri setindeki gerçek iptal oranlarına bakılarak yazılacak ve sistem yine aynı veri " +
        "setiyle kontrol edilecektir.")]),
  pr([new TextRun({ text: "Niçin yapılacak? ", bold: true }),
      new TextRun("Oteller hangi rezervasyonun riskli olduğunu bilmediği için bütün " +
        "rezervasyonlara aynı şekilde davranmakta, bu da gelir kaybına ya da gereksiz " +
        "katı kurallara yol açmaktadır.")]),

  altBaslik("1.3.1.", "Sistemin Girdileri ve Çıktısı"),
  p("Sistemde üç girdi ve bir çıktı bulunacaktır. Girdiler, rezervasyon yapıldığı anda zaten " +
    "bilinen bilgilerden seçilmiştir. Her girdi üç bulanık kümeye ayrılacaktır. Girdiler ve " +
    "kümeler Tablo-2’de gösterilmiştir."),
  tabloBasligi(2, "Sistemin Girdileri, Çıktısı ve Bulanık Kümeleri"),
  tablo(["Değişken", "Veri Setindeki Karşılığı", "Bulanık Kümeler"], [
    ["Girdi 1: Rezervasyonun giriş tarihinden kaç gün önce yapıldığı", "lead_time", "Kısa, Orta, Uzun"],
    ["Girdi 2: Müşterinin özel istek sayısı", "total_of_special_requests", "Yok, Az, Çok"],
    ["Girdi 3: Müşterinin önceki iptal sayısı", "previous_cancellations", "Yok, Az, Çok"],
    ["Çıktı: İptal riski (0–100)", "—", "Düşük, Orta, Yüksek"],
  ], [3700, 2721, 1800], { birArada: true }),
  bos(),
  p("Grafik-1’de birinci girdi olan rezervasyon süresi için planlanan kümeler görülmektedir. " +
    "Örneğin 10 gün önce yapılan bir rezervasyon tamamen “kısa” kümesindedir. 40 gün önce " +
    "yapılan bir rezervasyon ise hem “kısa” hem de “orta” kümesine 0,5 derecesiyle aittir. " +
    "Kümeler arasındaki bu yumuşak geçiş, bulanık mantığı keskin sınırlı kurallardan ayıran " +
    "temel özelliktir. Kümelerin kesin sınırları sonraki aşamada veri setine göre ayarlanacaktır."),
  ...grafik(1, "Rezervasyon Süresi İçin Kısa, Orta ve Uzun Bulanık Kümeleri",
    "grafik1_bulanik_kumeler.png", 440, 213),

  altBaslik("1.3.2.", "Kural Tabanı"),
  p("Üç girdinin her biri üç kümeye ayrıldığında 3 × 3 × 3 = 27 farklı durum oluşur. Bu nedenle " +
    "kural tabanı en fazla 27 kuraldan oluşacaktır. Bu sayı, ders kapsamında belirlenen 27 kural " +
    "sınırıyla aynıdır. Kurallar “EĞER … İSE …” biçiminde yazılacaktır. Veri setindeki iptal " +
    "oranlarına göre yazılan örnek kurallar şunlardır:"),
  kural("EĞER süre uzun VE özel istek yok VE önceki iptal yok İSE risk yüksektir. (Gerçek iptal oranı: %59,6)"),
  kural("EĞER süre orta VE özel istek yok VE önceki iptal yok İSE risk ortadır. (Gerçek iptal oranı: %48,5)"),
  kural("EĞER süre kısa VE özel istek çok VE önceki iptal yok İSE risk düşüktür. (Gerçek iptal oranı: %11,8)"),
  kural("EĞER süre uzun VE özel istek yok VE önceki iptal az İSE risk yüksektir. (Gerçek iptal oranı: %100)"),
  p("Kuralların çalışması sonucunda ortaya çıkan bulanık sonuç, durulaştırma işlemiyle 0 ile 100 " +
    "arasında tek bir risk puanına çevrilecektir. Bazı durumlarda veri setinde çok az kayıt " +
    "bulunmaktadır; örneğin önceki iptal sayısı “çok” olan müşteriler toplam kayıtların yalnızca " +
    "%0,4’üdür. Bu durumlara ait kurallar, benzer durumların sonuçlarına bakılarak yazılacaktır."),

  altBaslik("1.3.3.", "Ölçülebilir Hedefler"),
  p("Projenin sonunda aşağıdaki hedeflere ulaşılması amaçlanmaktadır:"),
  madde("Sistem 3 girdi, 1 çıktı ve en fazla 27 kuraldan oluşacaktır."),
  madde("Sistem her rezervasyon için 0 ile 100 arasında bir iptal riski puanı üretecektir."),
  madde("Veri setindeki 119.390 rezervasyonun tamamı sistemden geçirilerek sonuçlar gerçek iptal bilgileriyle karşılaştırılacaktır."),
  madde("Sistemin “yüksek risk” olarak puanladığı rezervasyonlarda gerçek iptal oranının en az %55, “düşük risk” olarak puanladıklarında ise en fazla %25 olması hedeflenmektedir. Veri setinin genel iptal oranı %37’dir."),
];

// ---------------------- İKİNCİ BÖLÜM ----------------------
const bolum2 = [
  ...bolumBasligi("İKİNCİ BÖLÜM", "PROBLEM DURUMU VE MEVCUT ÇÖZÜMLER"),
  anaBaslik("2.1.", "Çözüm Getirilen Problem Durumu"),
  p("Projede kullanılan veri setindeki 119.390 rezervasyonun 44.224’ü, yani %37,04’ü iptal " +
    "edilmiştir. İptal oranı şehir otelinde %41,73, tatil otelinde ise %27,76’dır. Bu oranlar, " +
    "iptallerin bir istisna değil, otellerin her gün karşılaştığı bir durum olduğunu göstermektedir."),
  p("İptallerin otele verdiği zararlar şunlardır:"),
  madde("Son anda iptal edilen oda çoğu zaman başka bir müşteriye satılamaz ve boş kalır."),
  madde("Yemek, temizlik ve personel planlaması beklenen müşteri sayısına göre yapıldığı için iptaller bu planları bozar."),
  madde("Otel iptalleri telafi etmek için fazladan rezervasyon alırsa, beklenenden fazla müşteri geldiğinde odası olmayan müşteriler ortaya çıkar."),
  p("Bu zararların asıl nedeni, otelin hangi rezervasyonun riskli olduğunu önceden bilmemesidir. " +
    "Otel bütün rezervasyonlara aynı şekilde davrandığında ya riskli rezervasyonlar için önlem " +
    "alamaz ya da risksiz müşterileri de gereksiz kurallarla rahatsız eder. Bu proje, her " +
    "rezervasyonun riskini ayrı ayrı puanlayarak bu soruna çözüm getirmeyi amaçlamaktadır."),

  anaBaslik("2.2.", "Mevcut Çözümler"),
  p("Oteller iptal problemini bugün genellikle aşağıdaki yöntemlerle yönetmektedir:"),
  pr([new TextRun({ text: "Ön ödeme ve iade edilmeyen ödeme: ", bold: true }),
      new TextRun("Müşteriden rezervasyon sırasında ödeme alınır. Müşteri iptal ederse ödeme iade edilmez ya da bir kısmı kesilir.")]),
  pr([new TextRun({ text: "Fazla rezervasyon alma: ", bold: true }),
      new TextRun("Otel, iptal olacağını tahmin ettiği oda sayısı kadar fazla rezervasyon kabul eder. Fazlalık oranı genellikle sabit bir sayıdır.")]),
  pr([new TextRun({ text: "Çalışan deneyimi: ", bold: true }),
      new TextRun("Rezervasyon bölümündeki çalışanlar, geçmişte gördüklerine dayanarak hangi rezervasyonun riskli olduğuna karar verir.")]),
  pr([new TextRun({ text: "Keskin sınırlı kurallar: ", bold: true }),
      new TextRun("Otel yazılımlarında “120 günden önce yapılan rezervasyonlar risklidir” gibi kesin sayılara dayanan kurallar kullanılır.")]),
  pr([new TextRun({ text: "Yapay zekâ tabanlı tahmin programları: ", bold: true }),
      new TextRun("Büyük otel zincirleri, geçmiş kayıtlarla eğitilen bilgisayar programlarıyla iptal tahmini yapar.")]),

  anaBaslik("2.3.", "Mevcut Çözümlerin Dezavantajları"),
  p("Mevcut çözümlerin her birinin önemli eksikleri bulunmaktadır. Bu eksikler Tablo-3’te özetlenmiştir."),
  tabloBasligi(3, "Mevcut Çözümler ve Dezavantajları"),
  tablo(["Mevcut Çözüm", "Dezavantajı"], [
    ["Ön ödeme ve iade edilmeyen ödeme", "Bütün müşterilere aynı şekilde uygulanır. İptal etmeyecek müşteriler de bu kuraldan rahatsız olur ve başka bir oteli seçebilir."],
    ["Fazla rezervasyon alma", "Oran sabit olduğu için bazı dönemlerde boş oda kalır, bazı dönemlerde ise gelen müşteriye oda bulunamaz."],
    ["Çalışan deneyimi", "Kişiden kişiye değişir, yazılı değildir. Deneyimli çalışan ayrıldığında bu bilgi de kaybolur."],
    ["Keskin sınırlı kurallar", "Birbirine çok yakın iki rezervasyonu tamamen farklı gruplara koyar. Sınırın hemen altında ve hemen üstünde kalan rezervasyonlar arasında gerçekte fark yoktur."],
    ["Yapay zekâ tabanlı tahmin programları", "Çok fazla geçmiş veri ve teknik bilgi gerektirir. Programın kararı nasıl verdiği otel çalışanı tarafından anlaşılamaz ve değiştirilemez."],
  ], [2900, 5321], { birArada: true }),
  bos(),
  p("Keskin sınırlı kuralların sorunu veri setinde de açıkça görülmektedir. Grafik-2’de " +
    "rezervasyonun giriş tarihinden kaç gün önce yapıldığına göre iptal oranları gösterilmiştir. " +
    "Son 30 gün içinde yapılan rezervasyonlarda iptal oranı %18 iken, 360 günden daha önce yapılan " +
    "rezervasyonlarda bu oran %67’ye çıkmaktadır. Ancak bu artış bir noktada aniden olmamakta, " +
    "adım adım gerçekleşmektedir."),
  ...grafik(2, "Rezervasyon Süresine Göre İptal Oranı", "grafik2_sureye_gore_iptal.png", 440, 247),
  p("Örneğin 110–119 gün önce yapılan rezervasyonların iptal oranı %40,8, 120–129 gün önce " +
    "yapılanların ise %41,5’tir. Bu iki grup arasında neredeyse hiç fark yoktur. Buna rağmen 120 " +
    "günü sınır kabul eden keskin bir kural, ilk gruptaki rezervasyonları “risksiz”, ikinci " +
    "gruptakileri “riskli” olarak ayırır. Bulanık mantıkta ise bu iki grup birbirine çok yakın " +
    "risk puanları alır."),
];

// ---------------------- ÜÇÜNCÜ BÖLÜM ----------------------
const bolum3 = [
  ...bolumBasligi("ÜÇÜNCÜ BÖLÜM", "PROJENİN FARKI, AVANTAJLARI VE ÖZGÜN YANLARI"),
  anaBaslik("3.1.", "Piyasadaki Benzer İşlerden Farkı"),
  p("Piyasadaki çözümler ya bütün müşterilere aynı kuralı uygular ya da kararını nasıl verdiği " +
    "anlaşılamayan programlar kullanır. Bu proje ise ikisinin arasında bir yol önermektedir. " +
    "Projenin piyasadaki benzer işlerden farkları şunlardır:"),
  madde("Sistem “iptal edecek” ya da “etmeyecek” gibi kesin bir karar vermez; riskin derecesini 0 ile 100 arasında bir puanla gösterir."),
  madde("Kurallar günlük dille yazılır. Otel çalışanı “süre uzun ve özel istek yoksa risk yüksektir” gibi bir kuralı okuyup anlayabilir ve gerektiğinde değiştirebilir."),
  madde("Sistem yalnızca üç bilgiyle çalışır ve bu bilgilerin hepsi rezervasyon yapıldığı anda zaten bilinmektedir. Ek bir bilgi toplamaya gerek yoktur."),
  madde("Kurallar tahmine göre değil, 119.390 gerçek rezervasyondaki iptal oranlarına bakılarak yazılır."),

  anaBaslik("3.2.", "Projenin Avantajları"),
  madde("Anlaşılırlık: Sistemin verdiği her puanın hangi kurallardan geldiği görülebilir."),
  madde("Esneklik: Otel kendi politikasına göre kuralları ya da kümelerin sınırlarını kolayca değiştirebilir."),
  madde("Adil değerlendirme: Birbirine yakın rezervasyonlar birbirine yakın puanlar alır; sınırın bir gün altında ya da üstünde kalmak sonucu bir anda değiştirmez."),
  madde("Sadelik: En fazla 27 kuraldan oluşan sistem hızlı çalışır ve basit bir bilgisayarda bile kullanılabilir."),
  madde("Düşük maliyet: Sistemi kurmak için uzun bir eğitim süreci ya da çok büyük bir veri altyapısı gerekmez."),
  madde("Uygulanabilirlik: Risk puanına göre yalnızca riskli müşterilere hatırlatma ya da ön ödeme uygulanabilir; risksiz müşteriler gereksiz kurallarla karşılaşmaz."),

  anaBaslik("3.3.", "Projenin Özgün Yanları"),
  p("Projenin en özgün yanı, kuralların veri setindeki gerçek sonuçlara dayanmasıdır. Tablo-4’te " +
    "rezervasyon süresi ve özel istek sayısına göre gerçek iptal oranları gösterilmiştir. Bu tablo, " +
    "kural tabanının nasıl oluşturulacağını açıkça göstermektedir. Tabloda “az” bir özel isteği, " +
    "“çok” ise iki ve daha fazla özel isteği ifade etmektedir."),
  tabloBasligi(4, "Rezervasyon Süresi ve Özel İstek Sayısına Göre İptal Oranları"),
  tablo(["Rezervasyon Süresi", "Özel İstek Yok", "Özel İstek Az", "Özel İstek Çok"], [
    [{ text: "Kısa (0–30 gün)", bold: true }, "%22,6", "%14,1", "%12,5"],
    [{ text: "Orta (31–120 gün)", bold: true }, "%50,6", "%25,7", "%23,2"],
    [{ text: "Uzun (121 gün ve üzeri)", bold: true }, "%65,8", "%27,4", "%28,3"],
  ], [2621, 1867, 1867, 1866], { birArada: true }),
  bos(),
  p("Tablodan iki sonuç çıkmaktadır. Birincisi, rezervasyon süresi uzadıkça iptal oranı artmaktadır. " +
    "İkincisi, müşteri en az bir özel istekte bulunduğunda iptal oranı yaklaşık yarıya düşmektedir. " +
    "En riskli durum, uzun süre önce yapılan ve hiç özel istek içermeyen rezervasyonlardır (%65,8). " +
    "En güvenli durum ise kısa süre önce yapılan ve çok sayıda özel istek içeren rezervasyonlardır (%12,5)."),
  p("Üçüncü girdi olan önceki iptal sayısı da güçlü bir işarettir. Daha önce hiç iptali olmayan " +
    "müşterilerde iptal oranı %33,9 iken, daha önce bir kez iptal etmiş müşterilerde bu oran %94,4’e " +
    "çıkmaktadır. İki ve daha fazla iptali olan müşterilerde ise oran %52,7’dir."),
  p("Projenin bir diğer özgün yanı, sistemin doğruluğunun ölçülebilir olmasıdır. Kurallar yazıldıktan " +
    "sonra veri setindeki her rezervasyon sisteme verilecek ve sistemin verdiği puan, o rezervasyonun " +
    "gerçekte iptal edilip edilmediğiyle karşılaştırılacaktır."),
];

// ---------------------- DÖRDÜNCÜ BÖLÜM ----------------------
const bolum4 = [
  ...bolumBasligi("DÖRDÜNCÜ BÖLÜM", "VERİ SETİNİN ELDE EDİLMESİ"),
  anaBaslik("4.1.", "Veri Setinin Bulunduğu Yer"),
  p("Projede kullanılan veri seti, veri setlerinin ücretsiz olarak paylaşıldığı Kaggle sitesinde " +
    "“Hotel Booking Demand” (Otel Rezervasyon Talebi) adıyla yayımlanmaktadır. Veri setine " +
    "aşağıdaki bağlantıdan ulaşılabilir:"),
  p("https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand"),
  p("Veri seti, Portekiz’deki iki otelin gerçek rezervasyon kayıtlarından oluşmaktadır. Bu " +
    "otellerden biri şehir oteli (City Hotel), diğeri tatil otelidir (Resort Hotel). Kayıtlar, " +
    "giriş tarihi 1 Temmuz 2015 ile 31 Ağustos 2017 arasında olan rezervasyonları kapsamaktadır. " +
    "Otel ve müşteri kimliklerini ortaya çıkarabilecek bilgiler veri setinden çıkarılmıştır."),

  anaBaslik("4.2.", "Veri Setinin Seçilmesi ve İndirilmesi"),
  p("Veri seti aşağıdaki adımlarla elde edilmiştir:"),
  madde("Kaggle sitesinde otel rezervasyonu ve iptal konularında arama yapılmıştır."),
  madde("Bulunan veri setleri arasından gerçek kayıtlardan oluşan, iptal bilgisini ve gerekli üç girdiyi içeren, yeterli sayıda kaydı bulunan ve ücretsiz erişilebilen “Hotel Booking Demand” veri seti seçilmiştir."),
  madde("Veri seti “hotel_bookings.csv” adlı tek bir dosya olarak indirilmiştir. Aynı dosya, giriş yapmaya gerek olmadan TidyTuesday adlı açık veri projesinin GitHub sayfasından da indirilebilmektedir."),
  madde("Dosya açılarak kontrol edilmiş; 119.390 satır ve 32 sütundan oluştuğu görülmüştür."),
  new Paragraph({ alignment: AlignmentType.LEFT, spacing: SP, bullet: { level: 0 },
    children: [new TextRun("Dosyanın adı teslim kurallarına uygun olarak “250184009_Hasan_Inciler_VeriSeti.csv” şeklinde değiştirilmiştir. Dosyanın içeriğinde hiçbir değişiklik yapılmamıştır.")] }),

  anaBaslik("4.3.", "Veri Setinin Projede Kullanımı"),
  p("Veri setindeki 32 sütunun hepsi bu projede kullanılmayacaktır. Sistemin girdileri olarak " +
    "lead_time, total_of_special_requests ve previous_cancellations sütunları kullanılacaktır. " +
    "Rezervasyonun iptal edilip edilmediğini gösteren is_canceled sütunu ise sistemin girdisi " +
    "olmayacak, yalnızca kuralların belirlenmesinde ve sistemin sonuçlarının kontrol edilmesinde " +
    "kullanılacaktır."),
  p("reservation_status sütunu ise rezervasyonun sonunda ne olduğunu gösterdiği ve bu bilgi " +
    "rezervasyon anında bilinemeyeceği için girdi olarak kullanılmayacaktır. Tüm sütunların " +
    "açıklamaları, veri tipleri ve değer aralıkları ayrı hazırlanan Veri Seti Tanıtım Dokümanı’nda verilmiştir."),
];

const sonuc = [
  ...tekBaslik("SONUÇ"),
  p("Bu plan aşamasında, otel rezervasyonlarının iptal riskini bulanık mantık ile puanlayan bir " +
    "sistemin amacı, çözmek istediği problem ve kullanacağı veri seti belirlenmiştir. Sistem üç " +
    "girdiyle çalışacak, en fazla 27 kuraldan oluşacak ve her rezervasyon için 0 ile 100 arasında " +
    "bir risk puanı üretecektir."),
  p("Veri seti üzerinde yapılan ilk incelemeler, iptal riskinin rezervasyon süresi, özel istek sayısı " +
    "ve önceki iptal sayısı ile açık bir ilişkisi olduğunu göstermiştir. Bu ilişkinin keskin " +
    "sınırlarla değil kademeli olarak değişmesi, problemin bulanık mantık için uygun olduğunu " +
    "desteklemektedir."),
  p("Projenin sonraki aşamalarında sırasıyla üyelik fonksiyonları kesinleştirilecek, 27 kural " +
    "yazılacak, sistem kodlanacak ve veri setindeki 119.390 rezervasyon ile sınanacaktır. Elde " +
    "edilen sonuçlara göre kümelerin sınırları ve kurallar gerekirse yeniden düzenlenecektir."),
];

// ======================================================================
const SAYFA = { margin: { top: 2.5*CM, right: 2.5*CM, bottom: 2.5*CM, left: 4*CM, footer: 1*CM } };
const sayfaNo = new Footer({ children: [new Paragraph({
  alignment: AlignmentType.CENTER, spacing: SP1,
  children: [new TextRun({ children: [PageNumber.CURRENT] })] })] });

const stil = { font: "Times New Roman", size: 22, bold: true, color: "000000" };
const doc = new Document({
  creator: "Hasan İNCİLER",
  title: PROJE_ADI,
  description: "BLP274 Bulanık Mantık – Final Projesi, Plan Aşaması",
  styles: { default: {
    document: { run: { font: "Times New Roman", size: 22 }, paragraph: { spacing: SP } },
    heading1: { run: stil, paragraph: { spacing: SP } },
    heading2: { run: stil, paragraph: { spacing: SP } },
    heading3: { run: stil, paragraph: { spacing: SP } },
  } },
  sections: [
    { properties: { page: SAYFA }, children: [...kapak, ...tanitimFormu, ...beyan, ...kabulOnay] },
    { properties: { page: { ...SAYFA, pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN } } },
      footers: { default: sayfaNo }, children: [...ozet, ...icindekiler, ...listeler, ...onsoz] },
    { properties: { page: { ...SAYFA, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } } },
      footers: { default: sayfaNo }, children: [...giris, ...bolum1, ...bolum2, ...bolum3, ...bolum4, ...sonuc] },
  ],
});

const cikti = process.argv[2] || path.join(__dirname, "rapor.docx");
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(cikti, buf); console.log("yazildi:", cikti); });
const kelime = OZET_METNI.join(" ").split(/\s+/).filter(Boolean).length;
console.log("OZET kelime:", kelime);
