// BLP272 MATLAB Programlama — Dönem Projesi 1. Aşama (Plan Aşaması) raporu
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Footer, AlignmentType, PageNumber,
  NumberFormat, ImageRun, CM, SP, SP1, sayfalar,
  p, pr, bos, ortali, bolumBasligi, tekBaslik, anaBaslik, madde,
  icSatir, formSatir, tablo, tabloBasligi,
} = require("./yardimci.js");

const pg = sayfalar("sayfalar_rapor.json");
const IMZA = path.join(__dirname, "..", "..", "docs", "imza", "imza.png");

const PROJE_ADI = "MATLAB ile Otel Rezervasyon Analiz Uygulaması";
const DANISMAN = "Öğr. Gör. Kübra ÇETİNBERK";
const TARIH = "29/10/2026";

const sag = (t) => new Paragraph({ alignment: AlignmentType.RIGHT, spacing: SP, children: [new TextRun(t)] });
const yeniSayfa = () => new Paragraph({ pageBreakBefore: true, spacing: SP, children: [] });
const kalin = (b, t) => pr([new TextRun({ text: b, bold: true }), new TextRun(t)]);

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

const tanitimFormu = [
  new Paragraph({ pageBreakBefore: true, alignment: AlignmentType.CENTER, spacing: SP,
    children: [new TextRun({ text: "ÖDEV TANITIM FORMU", bold: true })] }),
  bos(), bos(),
  formSatir("YAZAR ADI SOYADI", "Hasan İNCİLER"),
  formSatir("ÖDEVİN DİLİ", "Türkçe"),
  formSatir("ÖDEVİN ADI", PROJE_ADI),
  formSatir("BÖLÜM", "Bilgisayar Teknolojileri"),
  formSatir("PROGRAM", "Ön Yüz Yazılım Geliştirme"),
  formSatir("ÖDEVİN TÜRÜ", "Vize"),
  formSatir("ÖDEVİN TES. TARİHİ", TARIH.replace(/\//g, " / ")),
  formSatir("SAYFA SAYISI", pg("toplam")),
  formSatir("ÖDEV DANIŞMANI", DANISMAN),
];

const beyan = [
  new Paragraph({ pageBreakBefore: true, alignment: AlignmentType.CENTER, spacing: SP,
    children: [new TextRun({ text: "BEYAN", bold: true })] }),
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
  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: SP1,
    children: [new ImageRun({ type: "png", data: fs.readFileSync(IMZA), transformation: { width: 135, height: 60 } })] }),
];

const kabulOnay = [
  new Paragraph({ pageBreakBefore: true, alignment: AlignmentType.CENTER, spacing: SP,
    children: [new TextRun({ text: "KABUL VE ONAY SAYFASI", bold: true })] }),
  bos(), bos(),
  p(`250184009 numaralı Hasan İNCİLER’in “${PROJE_ADI}” adlı çalışması, benim tarafımdan ` +
    "Vize ödevi olarak kabul edilmiştir."),
  bos(), bos(), bos(),
  sag("Öğretim Görevlisi"),
  sag(DANISMAN),
];

// ======================================================================
// 2. KISIM — Romen rakamlı sayfalar
// ======================================================================
const OZET_METNI = [
  "Oteller her gün çok sayıda rezervasyon kaydı oluşturur. Bu kayıtlar incelendiğinde hangi " +
  "ayların yoğun geçtiği, hangi müşteri gruplarının daha çok iptal ettiği ve oda fiyatlarının " +
  "nasıl değiştiği gibi sorulara cevap bulunabilir. Ancak kayıt sayısı arttıkça bu incelemeyi " +
  "elle ya da tablo programlarıyla yapmak zorlaşır. Eksik ve tekrar eden kayıtlar da sonuçları " +
  "yanıltabilir.",
  "Bu projede otel rezervasyon kayıtlarını MATLAB ile okuyan, temizleyen, kullanıcının seçtiği " +
  "ölçütlere göre filtreleyip gruplayan ve sonuçları grafik ve özet rapor olarak sunan bir " +
  "uygulama geliştirilmesi planlanmaktadır.",
  "Projede Kaggle sitesinden alınan ve Portekiz’deki iki otele ait 119.390 rezervasyon kaydı ile " +
  "32 sütundan oluşan veri seti kullanılacaktır. Veri seti üzerinde yapılan ilk incelemede 4 " +
  "sütunda eksik hücreler, bazı sütunlarda aralık dışı değerler ve 31.994 tekrar eden satır " +
  "bulunmuştur. Bu durum, uygulamadaki veri temizleme adımının önemini göstermektedir.",
];

const ozet = [
  ...tekBaslik("ÖZET", { ilk: true }),
  ...OZET_METNI.map(p),
  bos(),
  pr([new TextRun({ text: "Anahtar Kelimeler: ", bold: true }),
      new TextRun("Grafik, MATLAB, otel rezervasyonu, veri analizi, veri temizleme")]),
];

const G = 280;
const bolumSatiri = (t) => new Paragraph({ spacing: SP1, children: [new TextRun({ text: t, bold: true })] });
const icindekiler = [
  ...tekBaslik("İÇİNDEKİLER"),
  icSatir("ÖZET", pg("ozet")),
  icSatir("TABLOLAR LİSTESİ", pg("tablolar")),
  icSatir("ÖN SÖZ", pg("onsoz")),
  icSatir("GİRİŞ", pg("giris")),
  bos(),
  bolumSatiri("BİRİNCİ BÖLÜM"),
  icSatir("PROJENİN TANIMI VE AMACI", pg("b1"), { bold: true }),
  icSatir("1.1. Projenin Adı", pg("b1_1"), { girinti: G }),
  icSatir("1.2. Öğrenci Adı Soyadı", pg("b1_2"), { girinti: G }),
  icSatir("1.3. Projenin Amacı", pg("b1_3"), { girinti: G }),
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
  icSatir("VERİNİN ELDE EDİLMESİ", pg("b4"), { bold: true }),
  icSatir("4.1. Veri Elde Etme Yolunun Seçilmesi", pg("b4_1"), { girinti: G }),
  icSatir("4.2. Veri Kaynağı ve İndirme", pg("b4_2"), { girinti: G }),
  icSatir("4.3. Verinin MATLAB’a Aktarılması", pg("b4_3"), { girinti: G }),
  bos(),
  bolumSatiri("BEŞİNCİ BÖLÜM"),
  icSatir("KULLANICI İŞLEMLERİ, ARAYÜZ VE ÇIKTILAR", pg("b5"), { bold: true }),
  icSatir("5.1. Kullanıcının Yapabileceği İşlemler", pg("b5_1"), { girinti: G }),
  icSatir("5.2. Arayüz Bileşenleri", pg("b5_2"), { girinti: G }),
  icSatir("5.3. Projenin Üreteceği Çıktılar", pg("b5_3"), { girinti: G }),
  bos(),
  icSatir("SONUÇ", pg("sonuc")),
];

const tablolarListesi = [
  ...tekBaslik("TABLOLAR LİSTESİ"),
  icSatir("Tablo-1. Plan Aşaması Sorularının Rapordaki Karşılıkları", pg("t1")),
  icSatir("Tablo-2. Mevcut Çözümler ve Dezavantajları", pg("t2")),
  icSatir("Tablo-3. Veri Elde Etme Yollarının Karşılaştırılması", pg("t3")),
  icSatir("Tablo-4. Arayüz Bileşenleri ve Görevleri", pg("t4")),
  icSatir("Tablo-5. Projenin Üreteceği Çıktılar", pg("t5")),
];

const onsoz = [
  ...tekBaslik("ÖN SÖZ"),
  p("MATLAB Programlama dersinde öğrendiğimiz veri okuma, tablolarla çalışma ve grafik çizme " +
    "konularını gerçek bir veri üzerinde uygulamak için bu projeyi seçtim. Otel rezervasyonları " +
    "herkesin bildiği bir konu olduğu için hem verinin hem de sonuçların anlaşılması kolaydır."),
  p("Plan aşamasında projenin amacını, çözmek istediği problemi, kullanılacak veriyi ve " +
    "uygulamanın kullanıcıya sunacağı işlemleri belirledim. Uygulamanın kendisi sonraki " +
    "aşamalarda geliştirilecektir."),
  p(`Ders boyunca verdiği bilgiler için ödev danışmanım ${DANISMAN}’a teşekkür ederim.`),
  bos(), bos(),
  sag("Hasan İNCİLER"),
  sag("İstanbul, 2026"),
];

// ======================================================================
// 3. KISIM — metin
// ======================================================================
const giris = [
  ...tekBaslik("GİRİŞ", { ilk: true }),
  p("Günümüzde işletmeler yaptıkları her işlemi kayıt altına almaktadır. Oteller de her " +
    "rezervasyon için müşterinin kaç kişi olduğu, kaç gece kalacağı, ne kadar ödeyeceği ve " +
    "rezervasyonun iptal edilip edilmediği gibi bilgileri saklar. Bu kayıtlar doğru incelenirse " +
    "otel yönetimi daha iyi kararlar verebilir."),
  p("Kayıt sayısı birkaç yüz olduğunda bu inceleme bir tablo programında elle yapılabilir. Ancak " +
    "kayıt sayısı yüz bini geçtiğinde aynı işlemleri her seferinde elle yapmak hem uzun sürer hem de " +
    "hataya açıktır. MATLAB, tablo biçimindeki verileri okumak, düzenlemek, gruplamak ve " +
    "grafiğe dökmek için hazır komutlar sunduğu için bu tür işler için uygun bir araçtır."),
  p("Bu rapor, BLP272 MATLAB Programlama dersi dönem projesinin plan aşamasıdır. Raporda plan " +
    "aşaması dokümanındaki sekiz sorunun tamamı yanıtlanmıştır. Soruların rapordaki karşılıkları " +
    "Tablo-1’de gösterilmiştir. Verinin ayrıntılı tanıtımı ise ayrı bir doküman olarak hazırlanmıştır."),
  tabloBasligi(1, "Plan Aşaması Sorularının Rapordaki Karşılıkları"),
  tablo(["No", "Soru", "Rapordaki Yeri"], [
    ["1", "Projenizin adı", "1.1"],
    ["2", "Öğrenci adı soyadı", "1.2"],
    ["3", "Projenizin amacı", "1.3"],
    ["4", "Problem durumu, mevcut çözümler ve dezavantajları", "İkinci Bölüm"],
    ["5", "Piyasadaki benzer işlerden farkı", "3.1"],
    ["6", "Avantajları ve özgün yanları", "3.2 ve 3.3"],
    ["7", "Verinin nasıl elde edileceği", "Dördüncü Bölüm"],
    ["8", "Kullanıcı işlemleri, arayüz bileşenleri ve çıktılar", "Beşinci Bölüm"],
  ], [700, 5121, 2400], { birArada: true }),
];

const bolum1 = [
  ...bolumBasligi("BİRİNCİ BÖLÜM", "PROJENİN TANIMI VE AMACI"),
  anaBaslik("1.1.", "Projenin Adı"),
  p(`Projenin adı “${PROJE_ADI}”dır.`),
  p("Proje, otel rezervasyon kayıtlarını MATLAB ile inceleyip kullanıcıya grafikler ve özet " +
    "bilgiler sunan bir uygulamadır. Adında yer alan “analiz” kelimesi, uygulamanın veriyi " +
    "yalnızca göstermekle kalmayıp temizleyip gruplayarak anlamlı sonuçlar çıkardığını anlatır."),

  anaBaslik("1.2.", "Öğrenci Adı Soyadı"),
  p("Proje, Bilgisayar Teknolojileri Bölümü Ön Yüz Yazılım Geliştirme Programı 250184009 " +
    "numaralı öğrencisi Hasan İNCİLER tarafından hazırlanmıştır."),

  anaBaslik("1.3.", "Projenin Amacı"),
  p("Projenin amacı, otel rezervasyon kayıtlarını içeren bir dosyayı MATLAB’a aktarıp temizleyen, " +
    "kullanıcının seçtiği ölçütlere göre filtreleyip gruplayan ve sonuçları grafik ve özet rapor " +
    "olarak sunan bir uygulama geliştirmektir. Uygulama ile şu adımlar gerçekleştirilecektir:"),
  madde("Rezervasyon kayıtlarını içeren CSV dosyası MATLAB’a aktarılacaktır."),
  madde("Eksik hücreler, aralık dışı değerler ve tekrar eden satırlar bulunacak, temizlenecek ve yapılan temizlik kullanıcıya raporlanacaktır."),
  madde("Kullanıcı otel türü, tarih aralığı ve pazar bölümü gibi ölçütlerle veriyi filtreleyebilecektir."),
  madde("Veri ay, otel türü ve müşteri tipine göre gruplanarak rezervasyon sayısı, iptal oranı ve ortalama oda fiyatı hesaplanacaktır."),
  madde("Sonuçlar grafiklerle gösterilecek ve dosya olarak kaydedilebilecektir."),
  kalin("Ne yapılacak? ", "Otel rezervasyon verisini inceleyen, arayüzlü bir MATLAB uygulaması geliştirilecektir."),
  kalin("Nasıl yapılacak? ", "Veri readtable komutuyla okunacak, MATLAB’ın tablo işlemleriyle temizlenip gruplanacak ve grafik komutlarıyla görselleştirilecektir."),
  kalin("Niçin yapılacak? ", "Büyük ve hatalı kayıtlar içeren bir veriden elle sonuç çıkarmak zor ve hataya açık olduğu için bu işin hızlı, doğru ve tekrarlanabilir şekilde yapılması amaçlanmaktadır."),
  p("Projenin sonunda ulaşılması hedeflenen ölçülebilir sonuçlar şunlardır: 119.390 satır ve 32 " +
    "sütunun MATLAB’a hatasız aktarılması, temizlik sonrasında kaç satırın kaldığının raporlanması, " +
    "en az üç farklı grafiğin çizilmesi ve sonuçların en az iki farklı dosya biçiminde kaydedilmesi."),
];

const bolum2 = [
  ...bolumBasligi("İKİNCİ BÖLÜM", "PROBLEM DURUMU VE MEVCUT ÇÖZÜMLER"),
  anaBaslik("2.1.", "Çözüm Getirilen Problem Durumu"),
  p("Bir otel yöneticisi işini planlarken veriden şu tür sorulara cevap arar: Hangi aylar daha " +
    "yoğundur? İptaller hangi otelde daha fazladır? Oda fiyatları aylara göre nasıl değişmektedir? " +
    "Projede kullanılacak veri bu soruların cevaplarını içermektedir. Örneğin Ağustos ayında 13.877 " +
    "rezervasyon yapılmışken Ocak ayında bu sayı 5.929’dur. Şehir otelinde iptal oranı %41,73, tatil " +
    "otelinde %27,76’dır. Ortalama günlük oda fiyatı şehir otelinde 105,30, tatil otelinde 94,95’tir."),
  p("Ancak bu cevaplara ulaşmak kolay değildir. Bunun üç nedeni vardır:"),
  madde("Veri büyüktür: 119.390 satır ve 32 sütundan oluşur. Bu kadar veriyi elle incelemek mümkün değildir."),
  madde("Veri hatalıdır: 4 sütunda toplam 129.425 eksik hücre, 31.994 tekrar eden satır ve negatif oda fiyatı gibi aralık dışı değerler bulunmaktadır. Bu kayıtlar temizlenmeden yapılan hesaplar yanlış sonuç verebilir."),
  madde("İşlemler tekrar eder: Her yeni soru için veriyi yeniden filtrelemek, gruplamak ve grafiği yeniden çizmek gerekir."),
  p("Bu proje, bu adımları tek bir uygulamada toplayarak kullanıcının birkaç seçimle sonuca " +
    "ulaşmasını sağlamayı amaçlamaktadır."),

  anaBaslik("2.2.", "Mevcut Çözümler"),
  p("Rezervasyon verilerini incelemek için bugün genellikle şu yollar kullanılmaktadır:"),
  kalin("Tablo programları: ", "Veri Excel gibi bir tablo programında açılır, filtre ve özet tablolarla incelenir, grafikler elle çizilir."),
  kalin("Otel yönetim yazılımlarının hazır raporları: ", "Otellerin kullandığı rezervasyon yazılımları belirli raporları hazır olarak sunar."),
  kalin("Ücretli raporlama programları: ", "Büyük işletmeler veriyi görselleştirmek için lisans ücreti ödenen raporlama programları kullanır."),
  kalin("Elle hazırlanan raporlar: ", "Bir çalışan veriyi düzenli aralıklarla inceleyip yöneticiye rapor hazırlar."),

  anaBaslik("2.3.", "Mevcut Çözümlerin Dezavantajları"),
  p("Mevcut çözümlerin eksikleri Tablo-2’de özetlenmiştir."),
  tabloBasligi(2, "Mevcut Çözümler ve Dezavantajları"),
  tablo(["Mevcut Çözüm", "Dezavantajı"], [
    ["Tablo programları", "Yüz bin satırı aşan veride yavaşlar. Filtreleme ve grafik çizme her seferinde elle yapılır; tekrar eden satırlar ve eksik hücreler kolayca gözden kaçar."],
    ["Hazır raporlar", "Raporların içeriği sabittir. Kullanıcı kendi sorusuna göre farklı bir gruplama ya da grafik oluşturamaz."],
    ["Ücretli raporlama programları", "Lisans ücreti gerektirir ve kullanmayı öğrenmek zaman alır. Küçük işletmeler için pahalıdır."],
    ["Elle hazırlanan raporlar", "Zaman alır ve hazırlayan kişiye bağlıdır. Aynı işlemler her seferinde baştan yapılır ve hata yapma ihtimali yüksektir."],
  ], [2700, 5521], { birArada: true }),
];

const bolum3 = [
  ...bolumBasligi("ÜÇÜNCÜ BÖLÜM", "PROJENİN FARKI, AVANTAJLARI VE ÖZGÜN YANLARI"),
  anaBaslik("3.1.", "Piyasadaki Benzer İşlerden Farkı"),
  p("Projenin piyasadaki benzer çözümlerden farkları şunlardır:"),
  madde("Veri temizleme uygulamanın bir parçasıdır. Uygulama eksik, aralık dışı ve tekrar eden kayıtları bulur ve kullanıcıya kaç kaydın temizlendiğini gösterir. Tablo programlarında bu işlem kullanıcıya bırakılır."),
  madde("Filtreleme, gruplama ve grafik çizme tek bir ekranda yapılır. Kullanıcı seçimini değiştirdiğinde sonuçlar yeniden hesaplanır."),
  madde("Aynı dosya üzerinde aynı adımlar her zaman aynı sonucu verir. Elle hazırlanan raporlarda bu garanti edilemez."),
  madde("Sonuçlar yalnızca ekranda gösterilmekle kalmaz, başka programlarda da kullanılabilecek dosyalar olarak kaydedilir."),

  anaBaslik("3.2.", "Projenin Avantajları"),
  madde("Zaman kazancı: Elle saatler süren inceleme birkaç seçimle yapılır."),
  madde("Daha az hata: Hesaplamalar MATLAB tarafından yapıldığı için elle yapılan kopyalama ve hesaplama hataları ortadan kalkar."),
  madde("Kolay kullanım: Kullanıcının MATLAB komutlarını bilmesi gerekmez; işlemler arayüzdeki düğme ve listelerle yapılır."),
  madde("Düşük maliyet: Veri ücretsizdir ve uygulama ek bir ücretli program gerektirmez."),
  madde("Genişletilebilirlik: Aynı yapıdaki yeni bir veri dosyası yüklenerek uygulama farklı dönemler için de kullanılabilir."),

  anaBaslik("3.3.", "Projenin Özgün Yanları"),
  p("Projenin özgün yanlarından ilki, kalite kontrolünün kullanıcıya açıkça gösterilmesidir. " +
    "Uygulama, veriyi yükledikten hemen sonra kaç eksik hücre, kaç tekrar eden satır ve kaç aralık " +
    "dışı değer bulunduğunu bir özet olarak sunacaktır."),
  p("İkinci özgün yan, tarih bilgisinin kullanılabilir hâle getirilmesidir. Veri setinde otele " +
    "giriş tarihi yıl, ay ve gün olarak üç ayrı sütunda tutulmaktadır ve ay adları İngilizce " +
    "yazılmıştır. Uygulama bu üç sütunu tek bir tarih sütununda birleştirerek zamana göre " +
    "filtreleme ve aylık grafik çizmeyi mümkün kılacaktır."),
  p("Son olarak, veri setinde rezervasyon numarası olmadığı için tamamen aynı iki satırın aynı " +
    "kaydın tekrarı mı yoksa iki ayrı rezervasyon mu olduğu kesin bilinemez. Bu yüzden tekrar " +
    "eden satırların silinip silinmeyeceğine kullanıcı karar verecektir."),
];

const bolum4 = [
  ...bolumBasligi("DÖRDÜNCÜ BÖLÜM", "VERİNİN ELDE EDİLMESİ"),
  anaBaslik("4.1.", "Veri Elde Etme Yolunun Seçilmesi"),
  p("Ders kapsamında veri dört farklı yolla elde edilebilmektedir. Bu projede hazır dosya yolu " +
    "seçilmiştir. Dört yolun proje açısından değerlendirmesi Tablo-3’te verilmiştir."),
  tabloBasligi(3, "Veri Elde Etme Yollarının Karşılaştırılması"),
  tablo(["Yol", "Değerlendirme", "Seçildi mi?"], [
    ["Hazır dosya (CSV/Excel/JSON)", "Gerçek otel kayıtlarından oluşan, büyük ve ücretsiz bir veri seti mevcuttur. Sayısal, kategorik ve tarih sütunlarının hepsini içerir.", "Evet"],
    ["Web/API kaynağı", "Rezervasyon kayıtları kişisel ve ticari bilgi içerdiği için bu tür kayıtları sunan ücretsiz ve açık bir API bulunamamıştır.", "Hayır"],
    ["Arayüzden girilen kayıtlar", "Elle girilen birkaç yüz kayıt, aylık ve otel bazında anlamlı sonuçlar çıkarmak için yeterli olmaz.", "Hayır"],
    ["MATLAB benzetim verisi", "Üretilen veri gerçek müşteri davranışını yansıtmaz; sonuçlar gerçek bir otel için anlam taşımaz.", "Hayır"],
  ], [2400, 4621, 1200], { birArada: true }),
  bos(),
  p("Gerçek veri gerçek sorunlar da içerdiği için, temizleme adımını göstermek amacıyla veriye " +
    "ayrıca hatalı kayıt eklemeye gerek kalmamaktadır."),

  anaBaslik("4.2.", "Veri Kaynağı ve İndirme"),
  p("Veri seti, veri setlerinin ücretsiz paylaşıldığı Kaggle sitesinde “Hotel Booking Demand” " +
    "(Otel Rezervasyon Talebi) adıyla yayımlanmaktadır. Erişim bağlantısı şudur:"),
  p("https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand"),
  p("Veri, Portekiz’deki bir şehir oteli ile bir tatil otelinin gerçek rezervasyon kayıtlarından " +
    "oluşmaktadır ve giriş tarihi 1 Temmuz 2015 ile 31 Ağustos 2017 arasında olan rezervasyonları " +
    "kapsamaktadır. Kimlik bilgileri veri setinden çıkarılmıştır. Veri “hotel_bookings.csv” adlı " +
    "tek bir dosya olarak indirilmiş, içeriği değiştirilmeden teslim kurallarına uygun şekilde " +
    "yeniden adlandırılmıştır. Dosyanın boyutu yaklaşık 16,1 MB olup 50 MB sınırının altındadır."),

  anaBaslik("4.3.", "Verinin MATLAB’a Aktarılması"),
  p("Dosya virgülle ayrılmış bir CSV dosyasıdır ve ilk satırında sütun adları bulunmaktadır. Bu " +
    "nedenle MATLAB’a readtable komutuyla aktarılacaktır. “NULL” ve “NA” yazan hücreler eksik " +
    "değer sayılacak, metin sütunları kategorik tipe çevrilecektir. Ayrıntılar Veri Seti Tanıtım " +
    "Dokümanı’nda verilmiştir."),
];

const bolum5 = [
  ...bolumBasligi("BEŞİNCİ BÖLÜM", "KULLANICI İŞLEMLERİ, ARAYÜZ VE ÇIKTILAR"),
  anaBaslik("5.1.", "Kullanıcının Yapabileceği İşlemler"),
  p("Kullanıcı uygulama ile sırasıyla şu işlemleri yapabilecektir:"),
  madde("Veri dosyasını seçip uygulamaya yüklemek."),
  madde("Verinin satır ve sütun sayısını, eksik hücre, tekrar eden satır ve aralık dışı değer sayılarını görmek."),
  madde("Temizleme işlemini başlatmak ve tekrar eden satırların silinip silinmeyeceğini seçmek."),
  madde("Veriyi otel türüne, tarih aralığına ve pazar bölümüne göre filtrelemek."),
  madde("Gruplama ölçütünü (ay, otel türü ya da müşteri tipi) seçmek."),
  madde("Gösterilecek grafiği seçip çizdirmek."),
  madde("Grafikleri ve özet sonuçları dosya olarak kaydetmek."),

  anaBaslik("5.2.", "Arayüz Bileşenleri"),
  p("Arayüzde yer alacak bileşenler ve görevleri Tablo-4’te verilmiştir. Arayüzün MATLAB " +
    "uygulaması olarak mı, yoksa MATLAB’ın ürettiği sonuçları gösteren bir web sayfası olarak mı " +
    "hazırlanacağı Yapı aşamasında kesinleştirilecektir. Bileşenler iki durumda da aynıdır."),
  tabloBasligi(4, "Arayüz Bileşenleri ve Görevleri"),
  tablo(["Bileşen", "Türü", "Görevi"], [
    ["Dosya Seç", "Düğme", "Veri dosyasını seçip yükler"],
    ["Veri Bilgisi", "Metin alanı", "Satır ve sütun sayısını gösterir"],
    ["Kalite Raporu", "Metin alanı", "Eksik hücre, tekrar eden satır ve aralık dışı değer sayılarını gösterir"],
    ["Tekrarları Sil", "Onay kutusu", "Tekrar eden satırların silinip silinmeyeceğini belirler"],
    ["Temizle", "Düğme", "Temizleme işlemini başlatır"],
    ["Otel Türü", "Açılır liste", "Tüm oteller, şehir oteli ya da tatil oteli seçimi"],
    ["Başlangıç ve Bitiş Tarihi", "Tarih seçici", "İncelenecek tarih aralığını belirler"],
    ["Pazar Bölümü", "Açılır liste", "Online acente, grup, doğrudan rezervasyon gibi seçimler"],
    ["Gruplama Ölçütü", "Açılır liste", "Ay, otel türü ya da müşteri tipi seçimi"],
    ["Grafik Türü", "Açılır liste", "Çizilecek grafiğin seçimi"],
    ["Grafik Alanı", "Grafik", "Seçilen grafiği gösterir"],
    ["Özet Bilgiler", "Metin alanı", "Toplam rezervasyon, iptal oranı ve ortalama oda fiyatını gösterir"],
    ["Kaydet", "Düğme", "Grafikleri ve sonuçları dosya olarak kaydeder"],
  ], [2500, 1700, 4021], { birArada: true }),

  anaBaslik("5.3.", "Projenin Üreteceği Çıktılar"),
  p("Uygulamanın üreteceği çıktılar Tablo-5’te verilmiştir."),
  tabloBasligi(5, "Projenin Üreteceği Çıktılar"),
  tablo(["Çıktı", "Dosya Biçimi", "İçeriği"], [
    ["Aylara göre rezervasyon sayısı", "Grafik (PNG)", "Çizgi grafik; otel türüne göre ayrı çizgiler"],
    ["Otel türüne göre iptal oranı", "Grafik (PNG)", "Sütun grafik"],
    ["Aylara göre ortalama oda fiyatı", "Grafik (PNG)", "Çizgi grafik"],
    ["Pazar bölümlerinin payı", "Grafik (PNG)", "Sütun grafik"],
    ["Özet sonuçlar", "JSON", "Filtre seçimleri, toplam rezervasyon, iptal oranı, ortalama fiyat ve gruplanmış sonuçlar"],
    ["Temizlenmiş veri", "CSV", "Temizleme sonrası kalan kayıtlar"],
    ["Özet rapor", "Metin (TXT)", "Kalite kontrol sonuçları ve hesaplanan özet bilgiler"],
  ], [2800, 1700, 3721], { birArada: true }),
];

const sonuc = [
  ...tekBaslik("SONUÇ"),
  p("Bu plan aşamasında, otel rezervasyon kayıtlarını MATLAB ile okuyup temizleyen, filtreleyip " +
    "gruplayan ve sonuçları grafik ve dosya olarak sunan bir uygulamanın amacı, çözdüğü problem, " +
    "kullanılacak veri ve kullanıcıya sunacağı işlemler belirlenmiştir."),
  p("Veri olarak Kaggle sitesindeki 119.390 satır ve 32 sütundan oluşan otel rezervasyon veri seti " +
    "seçilmiştir. Bu veri; sayısal, kategorik ve tarih sütunlarını birlikte içerdiği ve gerçek " +
    "kalite sorunları barındırdığı için projenin amacına uygundur."),
  p("Yapı aşamasında verinin MATLAB’a aktarılması, temizlenmesi ve arayüzün temel yapısı " +
    "hazırlanacaktır. Geliştirme aşamasında filtreleme, gruplama, grafik ve kaydetme işlemleri " +
    "tamamlanacak, Sunum aşamasında ise uygulama çalışır hâlde gösterilecektir."),
];

// ======================================================================
const SAYFA = { margin: { top: 2.5*CM, right: 2.5*CM, bottom: 2.5*CM, left: 4*CM, footer: 1*CM } };
const sayfaNo = new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, spacing: SP1,
  children: [new TextRun({ children: [PageNumber.CURRENT] })] })] });
const stil = { font: "Times New Roman", size: 22, bold: true, color: "000000" };

const doc = new Document({
  creator: "Hasan İNCİLER",
  title: PROJE_ADI,
  description: "BLP272 MATLAB Programlama – Dönem Projesi, Plan Aşaması",
  styles: { default: {
    document: { run: { font: "Times New Roman", size: 22 }, paragraph: { spacing: SP } },
    heading1: { run: stil, paragraph: { spacing: SP } },
    heading2: { run: stil, paragraph: { spacing: SP } },
    heading3: { run: stil, paragraph: { spacing: SP } },
  } },
  sections: [
    { properties: { page: SAYFA }, children: [...kapak, ...tanitimFormu, ...beyan, ...kabulOnay] },
    { properties: { page: { ...SAYFA, pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN } } },
      footers: { default: sayfaNo }, children: [...ozet, ...icindekiler, ...tablolarListesi, ...onsoz] },
    { properties: { page: { ...SAYFA, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } } },
      footers: { default: sayfaNo }, children: [...giris, ...bolum1, ...bolum2, ...bolum3, ...bolum4, ...bolum5, ...sonuc] },
  ],
});

const cikti = process.argv[2] || path.join(__dirname, "rapor.docx");
Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(cikti, buf); console.log("yazildi:", cikti); });
console.log("OZET kelime:", OZET_METNI.join(" ").split(/\s+/).length);
