const fs = require("fs");
const path = require("path");
const H = require("./rapor.js");
const {
  Document, Packer, Paragraph, TextRun, Footer, AlignmentType, PageNumber,
  NumberFormat, PageBreak, CM, CONTENT_W, SP, SP1,
  p, pr, bos, ortali, bolumBasligi, tekBaslik, anaBaslik, altBaslik, madde,
  grafik, icSatir, formSatir, tablo, tabloBasligi,
} = H;

let PAGES = {};
try { PAGES = JSON.parse(fs.readFileSync(path.join(__dirname, "pages.json"), "utf8")); } catch (e) {}
const pg = (k) => (PAGES[k] !== undefined ? String(PAGES[k]) : "—");

const PROJE_ADI = "MAKİNE ÖĞRENMESİ TABANLI OTEL REZERVASYON İPTAL TAHMİN SİSTEMİ";
const OGRENCI = "250184009 - Hasan İNCİLER";
const DANISMAN = "Öğr. Gör. Çisem YAŞAR";

// ======================================================================
// 1. KISIM — Kapak, Tanıtım Formu, Beyan, Kabul ve Onay  (sayfa numarası YOK)
// ======================================================================
const kapak = [
  bos(),
  ortali("İSTANBUL GELİŞİM MESLEK YÜKSEKOKULU", { bold: true }),
  ortali("BİLGİSAYAR TEKNOLOJİLERİ BÖLÜMÜ", { bold: true }),
  ortali("ÖN YÜZ YAZILIM GELİŞTİRME PROGRAMI", { bold: true }),
  bos(), bos(), bos(),
  ortali(PROJE_ADI, { bold: true }),
  bos(), bos(), bos(),
  ortali("FİNAL PROJE ÖDEVİ", { bold: true }),
  bos(), bos(), bos(),
  ortali("Hazırlayan"),
  ortali(OGRENCI),
  bos(), bos(),
  ortali("Ödev Danışmanı"),
  ortali(DANISMAN),
  bos(), bos(), bos(), bos(),
  ortali("İSTANBUL – 2026", { bold: true }),
];

const tanitimFormu = [
  new Paragraph({ children: [new PageBreak()] }),
  ortali("ÖDEV TANITIM FORMU", { bold: true }),
  bos(), bos(),
  formSatir("YAZAR ADI SOYADI", "Hasan İNCİLER"),
  formSatir("ÖDEVİN DİLİ", "Türkçe"),
  formSatir("ÖDEVİN ADI", "Makine Öğrenmesi Tabanlı Otel Rezervasyon İptal Tahmin Sistemi"),
  formSatir("BÖLÜM", "Bilgisayar Teknolojileri"),
  formSatir("PROGRAM", "Ön Yüz Yazılım Geliştirme"),
  formSatir("ÖDEVİN TÜRÜ", "Final"),
  formSatir("ÖDEVİN TES. TARİHİ", "…… / …… / 2026"),
  formSatir("SAYFA SAYISI", pg("toplam")),
  formSatir("ÖDEV DANIŞMANI", DANISMAN),
];

const beyan = [
  new Paragraph({ children: [new PageBreak()] }),
  ortali("BEYAN", { bold: true }),
  bos(), bos(),
  p("Bu ödevin/projenin hazırlanmasında bilimsel ahlak kurallarına uyulduğu, başkalarının " +
    "eserlerinden yararlanılması durumunda bilimsel normlara uygun olarak atıfta bulunulduğu, " +
    "kullanılan verilerde herhangi tahrifat yapılmadığını, ödevin/projenin herhangi bir kısmının " +
    "bu üniversite veya başka bir üniversitedeki başka bir ödev/proje olarak sunulmadığını beyan " +
    "eder, aksi durumda karşılaşacağım cezai ve/ve ya hukuki durumu kabul eder; ayrıca " +
    "üniversitenin ilgili yasa, yönerge ve metinlerini okuduğumu beyan ederim."),
  bos(), bos(), bos(),
  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: SP, children: [new TextRun("Tarih")] }),
  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: SP, children: [new TextRun("Hasan İNCİLER")] }),
  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: SP, children: [new TextRun("İmza")] }),
];

const kabulOnay = [
  new Paragraph({ children: [new PageBreak()] }),
  ortali("KABUL VE ONAY SAYFASI", { bold: true }),
  bos(), bos(),
  p("250184009 numaralı Hasan İNCİLER’in “Makine Öğrenmesi Tabanlı Otel Rezervasyon İptal " +
    "Tahmin Sistemi” adlı çalışması, benim tarafımdan Final ödevi olarak kabul edilmiştir."),
  bos(), bos(), bos(),
  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: SP, children: [new TextRun("Öğretim Görevlisi")] }),
  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: SP, children: [new TextRun(DANISMAN)] }),
];

// ======================================================================
// 2. KISIM — Özet, İçindekiler, Grafikler Listesi, Ön Söz  (Romen: I, II, III)
// ======================================================================
const OZET_METNI = [
  "Bu çalışmada, otel işletmelerinin karşılaştığı rezervasyon iptali problemine makine " +
  "öğrenmesi tabanlı bir çözüm önerilmektedir. Konaklama sektöründe yapılan rezervasyonların " +
  "önemli bir bölümü gerçekleşmeden iptal edilmekte; bu durum otellerin doluluk planlamasını, " +
  "personel ve stok yönetimini ve gelir tahminlerini olumsuz etkilemektedir. Mevcut uygulamada " +
  "oteller bu riski ya deneyime dayalı sezgisel kararlarla ya da tüm müşterilere aynı biçimde " +
  "uygulanan katı kapora politikalarıyla yönetmektedir. Her iki yaklaşım da müşteri bazında " +
  "ayrım yapamadığı için gelir kaybına veya müşteri memnuniyetsizliğine yol açmaktadır.",

  "Projenin amacı, bir rezervasyonun iptal edilme olasılığını rezervasyon anında tahmin eden " +
  "ve bu tahmini bir web arayüzü üzerinden otel personelinin kullanımına sunan bir karar " +
  "destek sistemi geliştirmektir. Çalışmada Kaggle platformunda yayımlanan “Hotel Booking " +
  "Demand” veri seti kullanılmıştır. Veri seti 119.390 rezervasyon kaydı ve 32 öznitelikten " +
  "oluşan tabüler bir veri setidir; hedef değişken rezervasyonun iptal edilip edilmediğini " +
  "gösteren ikili bir sınıf etiketidir.",

  "Bu aşamada veri setinin ön işleme planı oluşturulmuş ve uygulanmıştır. Eksik veri içeren " +
  "dört sütun tespit edilmiş ve her biri için eksikliğin nedenine uygun ayrı bir strateji " +
  "belirlenmiştir. Ayrıca hedef değişkenin bilgisini doğrudan içeren ve veri sızıntısına yol " +
  "açan iki sütun saptanarak veri setinden çıkarılmıştır. Kategorik değişkenler, kategori " +
  "sayılarına göre frekans kodlama, sıralı kodlama ve one-hot encoding yöntemleriyle " +
  "sayısallaştırılmıştır.",

  "Veri setinin yapısı beş farklı görselleştirme ile incelenmiştir. İncelemeler sonucunda " +
  "rezervasyon öncesi bekleme süresinin, pazar segmentinin ve özel talep sayısının iptal " +
  "davranışıyla sistematik biçimde ilişkili olduğu; sınıf dağılımının ise ılımlı düzeyde " +
  "dengesiz olduğu belirlenmiştir. Bu bulgular iptal davranışının öngörülebilir olduğunu ve " +
  "doğrusal olmayan modellerin tercih edilmesi gerektiğini göstermektedir.",
];

const ozet = [
  ...tekBaslik("ÖZET", { ilk: true }),
  ...OZET_METNI.map(p),
  bos(), bos(),
  pr([
    new TextRun({ text: "Anahtar Kelimeler: ", bold: true }),
    new TextRun("Makine öğrenmesi, otel rezervasyonu, sınıflandırma, veri ön işleme, web arayüzü"),
  ]),
];

const icindekiler = [
  ...tekBaslik("İÇİNDEKİLER"),
  icSatir("ÖZET", pg("ozet")),
  icSatir("GRAFİKLER LİSTESİ", pg("grafikler")),
  icSatir("TABLOLAR LİSTESİ", pg("tablolar")),
  icSatir("ÖN SÖZ", pg("onsoz")),
  icSatir("GİRİŞ", pg("giris")),
  bos(),
  new Paragraph({ spacing: SP1, children: [new TextRun({ text: "BİRİNCİ BÖLÜM", bold: true })] }),
  icSatir("PROBLEM TANIMI VE PROJENİN AMACI", pg("b1"), { bold: true }),
  icSatir("1.1. Projenin Amacı ve Temel Hedefi", pg("b1_1"), { girinti: 280 }),
  icSatir("1.2. Çözüm Getirilen Problem Durumu", pg("b1_2"), { girinti: 280 }),
  icSatir("1.3. Mevcut Çözümler ve Yetersizlikleri", pg("b1_3"), { girinti: 280 }),
  icSatir("1.4. Projenin Benzer Uygulamalardan Farkı", pg("b1_4"), { girinti: 280 }),
  icSatir("1.5. Sağlanacak Avantaj ve Yenilikler", pg("b1_5"), { girinti: 280 }),
  icSatir("1.6. Makine Öğrenmesi ve Web Arayüzünün Kullanımı", pg("b1_6"), { girinti: 280 }),
  bos(),
  new Paragraph({ spacing: SP1, children: [new TextRun({ text: "İKİNCİ BÖLÜM", bold: true })] }),
  icSatir("VERİ SETİ VE ÖN İŞLEME PLANI", pg("b2"), { bold: true }),
  icSatir("2.1. Veri Setinin Kaynağı, Türü ve Boyutu", pg("b2_1"), { girinti: 280 }),
  icSatir("2.2. Eksik Verilerin Ele Alınması", pg("b2_2"), { girinti: 280 }),
  icSatir("2.3. Veri Sızıntısının Giderilmesi", pg("b2_3"), { girinti: 280 }),
  icSatir("2.4. Kategorik Değişkenlerin Sayısallaştırılması", pg("b2_4"), { girinti: 280 }),
  icSatir("2.5. Veri Setinin Görselleştirilmesi", pg("b2_5"), { girinti: 280 }),
  bos(),
  new Paragraph({ spacing: SP1, children: [new TextRun({ text: "ÜÇÜNCÜ BÖLÜM", bold: true })] }),
  icSatir("KULLANICI DENEYİMİ VE UYGULAMA SENARYOSU", pg("b3"), { bold: true }),
  icSatir("3.1. Web Arayüzünde Kullanıcı Adımları", pg("b3_1"), { girinti: 280 }),
  icSatir("3.2. Modelin Kullanıcıya Sunacağı Çıktılar", pg("b3_2"), { girinti: 280 }),
  bos(),
  icSatir("SONUÇ", pg("sonuc")),
  icSatir("KAYNAKÇA", pg("kaynakca")),
];

const grafiklerListesi = [
  ...tekBaslik("GRAFİKLER LİSTESİ"),
  icSatir("Grafik-1. Sütunlara Göre Eksik Veri Oranları", pg("g1")),
  icSatir("Grafik-2. Hedef Değişkenin Sınıf Dağılımı", pg("g2")),
  icSatir("Grafik-3. Bekleme Süresinin İptal Durumuna Göre Dağılımı", pg("g3")),
  icSatir("Grafik-4. Pazar Segmentine Göre İptal Oranları", pg("g4")),
  icSatir("Grafik-5. Sayısal Öznitelikler Arası Korelasyon Isı Haritası", pg("g5")),
  bos(), bos(),
  ...tekBaslik("TABLOLAR LİSTESİ").slice(1),
  icSatir("Tablo-1. Veri Setinin Genel Özellikleri", pg("t1")),
  icSatir("Tablo-2. Eksik Veri İçeren Sütunlar ve Uygulanan Stratejiler", pg("t2")),
  icSatir("Tablo-3. Kategorik Değişkenler İçin Dönüştürme Yöntemleri", pg("t3")),
];

const onsoz = [
  ...tekBaslik("ÖN SÖZ"),
  p("Yapay zekâ uygulamaları dersi kapsamında yürüttüğüm bu projede, teorik olarak öğrendiğim " +
    "makine öğrenmesi kavramlarını gerçek bir veri seti üzerinde uygulama imkânı buldum. " +
    "Çalışmanın ilk aşamasında asıl zorluğun model kurmak değil, veriyi anlamak olduğunu gördüm."),
  p("Bu aşamada karşılaştığım en öğretici güçlük, veri setinde ilk bakışta çok güçlü bir " +
    "öznitelik gibi görünen bir sütunun aslında tahmin edilmek istenen sonucun kendisini " +
    "içerdiğini fark etmek oldu. Bu sütun modele verildiğinde kusursuz bir başarı elde " +
    "edilmekte, ancak model gerçek hayatta hiçbir işe yaramamaktadır. Veri sızıntısı olarak " +
    "adlandırılan bu durumu tespit edip gidermek, çalışmanın bana en çok şey öğreten kısmı oldu."),
  p("Proje boyunca yönlendirmeleri ve değerli görüşleri için ödev danışmanım Öğr. Gör. Çisem " +
    "Yaşar’a teşekkür ederim."),
  bos(), bos(),
  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: SP, children: [new TextRun("Hasan İNCİLER")] }),
  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: SP, children: [new TextRun("İstanbul, 2026")] }),
];

// ======================================================================
// 3. KISIM — Metin  (normal rakam: 1, 2, 3)
// ======================================================================
const giris = [
  ...tekBaslik("GİRİŞ", { ilk: true }),
  p("Konaklama sektörü, gelirini büyük ölçüde önceden yapılan rezervasyonlar üzerinden " +
    "planlayan bir sektördür. Bir otel, önündeki haftalara ait doluluk oranını bilerek personel " +
    "sayısını, yiyecek-içecek stoğunu, temizlik ve bakım planını ve oda fiyatlarını belirler. " +
    "Bu planlamanın dayanağı olan rezervasyonların bir bölümünün gerçekleşmemesi, planlamanın " +
    "tamamını isabetsiz hale getirmektedir."),
  p("Antonio, de Almeida ve Nunes (2019b) tarafından yayımlanan ve bu çalışmada da kullanılan " +
    "veri seti, iki otele ait 119.390 rezervasyon kaydını içermektedir. Bu kayıtların " +
    "%37,04’ünün iptal edilmiş olması, problemin istisnai bir durum değil, sektörün yapısal bir " +
    "sorunu olduğunu göstermektedir. Üç rezervasyondan birinden fazlasının gerçekleşmediği bir " +
    "ortamda, hangi rezervasyonun gerçekleşeceğini önceden bilmek doğrudan ekonomik değer " +
    "taşımaktadır."),
  p("Rezervasyon iptalinin makine öğrenmesi ile tahmini, literatürde çalışılmış bir " +
    "problemdir. Antonio, de Almeida ve Nunes (2017a), dört tatil köyüne ait verilerle " +
    "kurdukları sınıflandırma modellerinde %90’ın üzerinde doğruluk elde etmiş ve bu sonucun, " +
    "iptal tahmininin yüksek doğrulukla yapılamayacağı yönündeki önceki varsayımla " +
    "çeliştiğini belirtmişlerdir. Aynı araştırmacılar (2017b) geliştirdikleri modeli bir " +
    "otelin yönetim sistemine bağlayarak her gün yeniden eğitilen bir prototipe dönüştürmüş; " +
    "2019 yılındaki çalışmalarında ise (2019a) bu prototipi iki otelde gerçek işletme " +
    "ortamında denemişlerdir. Söz konusu denemede, iptal olasılığı yüksek olarak işaretlenen " +
    "ve otel tarafından iletişime geçilen rezervasyonların, iletişime geçilmeyenlere kıyasla " +
    "daha az iptal edildiği gözlenmiştir. Bu bulgu, iptal tahmininin yalnızca bir ölçüm " +
    "aracı olmadığını, alınan aksiyonla birlikte iptal oranını fiilen düşürebildiğini " +
    "göstermesi bakımından önemlidir."),
  p("Bu çalışmanın konusu olarak otel rezervasyon iptal tahmini probleminin seçilmesinin üç " +
    "temel nedeni bulunmaktadır. Birincisi, problem somut ve ölçülebilir bir iş değerine " +
    "sahiptir: doğru bir tahmin, otelin boş kalan odadan doğan gelir kaybını azaltmaktadır. " +
    "İkincisi, problem makine öğrenmesi açısından iyi tanımlanmış bir ikili sınıflandırma " +
    "problemidir ve etiketli, yeterli büyüklükte gerçek veri bulunmaktadır. Üçüncüsü, " +
    "geliştirilecek sistemin çıktısı otel personelinin günlük iş akışına doğrudan " +
    "yerleştirilebilecek niteliktedir."),
  p("Çalışmanın amacı, bir rezervasyonun iptal edilme olasılığını rezervasyonun yapıldığı anda " +
    "tahmin eden bir makine öğrenmesi modeli geliştirmek ve bu modeli teknik bilgi gerektirmeyen " +
    "bir web arayüzü üzerinden otel personelinin kullanımına sunmaktır. Çalışmanın hedefi, " +
    "geliştirilecek modelin iptal edilecek rezervasyonları %80’in üzerinde bir F1-skoru ile " +
    "tespit etmesi ve arayüzün tahmin sonucunu bir güven yüzdesiyle birlikte sunmasıdır."),
  p("Raporun bu aşaması üç bölümden oluşmaktadır. Birinci bölümde problem tanımı, projenin " +
    "amacı, mevcut çözümlerin yetersizlikleri ve projenin bu çözümlerden farkı ele alınmaktadır. " +
    "İkinci bölümde kullanılacak veri seti tanıtılmakta ve veri ön işleme planı, uygulanan " +
    "işlemlerin sonuçlarıyla birlikte sunulmaktadır. Üçüncü bölümde geliştirilecek web " +
    "arayüzünün kullanıcı senaryosu ve modelin kullanıcıya sunacağı çıktılar açıklanmaktadır."),
];

// ---------------------- BİRİNCİ BÖLÜM ----------------------
const bolum1 = [
  ...bolumBasligi("BİRİNCİ BÖLÜM", "PROBLEM TANIMI VE PROJENİN AMACI"),

  anaBaslik("1.1.", "Projenin Amacı ve Temel Hedefi"),
  p("Projenin amacı, otel rezervasyonlarının iptal edilme riskini rezervasyon anında tahmin " +
    "eden bir makine öğrenmesi modeli geliştirmek ve bu modeli bir web arayüzü aracılığıyla " +
    "otel personelinin kullanabileceği bir karar destek aracına dönüştürmektir."),
  p("Projenin temel hedefi, bu riski yalnızca hesaplamak değil, otel personelinin iş akışı " +
    "içinde doğrudan kullanılabilir bir biçimde sunmaktır. Bu hedef, ölçülebilir üç alt hedefe " +
    "ayrılmıştır:"),
  madde("İptal edilecek rezervasyonları %80’in üzerinde F1-skoru ile tespit eden bir " +
        "sınıflandırma modeli eğitmek."),
  madde("Tahmini bir sınıf etiketiyle birlikte yüzdelik bir güven skoru olarak sunmak; böylece " +
        "personelin kararını kesin bir hükme değil, bir risk düzeyine dayandırmasını sağlamak."),
  madde("Rezervasyon bilgilerinin girilmesinden sonuca ulaşılmasına kadar geçen süreyi bir " +
        "dakikanın altında tutan, teknik bilgi gerektirmeyen bir web arayüzü geliştirmek."),

  anaBaslik("1.2.", "Çözüm Getirilen Problem Durumu"),
  p("Otellerde gelir yönetiminin temel girdisi, gelecek dönemlere ait doluluk tahminidir. Bir " +
    "rezervasyon alındığında otel, o odayı satılmış kabul ederek diğer planlarını buna göre " +
    "yapar. Rezervasyonun sonradan iptal edilmesi durumunda ise iki sorun ortaya çıkar."),
  p("İlk sorun doğrudan gelir kaybıdır. Giriş tarihine yakın bir zamanda iptal edilen oda, " +
    "yeniden satılamadığında tamamen boş kalır. Otelin maliyetleri ise oda boş kalsa da büyük " +
    "ölçüde devam eder. İkinci sorun operasyonel planlamanın bozulmasıdır: personel vardiyaları, " +
    "yiyecek-içecek stoğu ve temizlik planı gerçekleşmeyecek bir doluluk oranına göre " +
    "hazırlanmış olur."),
  p("Bu çalışmada ele alınan problem, bu iki sorunun kaynağındaki belirsizliktir. Oteller hangi " +
    "rezervasyonların gerçekleşeceğini bilmediği için, planlamalarını ortalama iptal oranı gibi " +
    "toplu bir varsayıma dayandırmak zorunda kalmaktadır. Oysa iptal davranışı, veri setinin " +
    "incelenmesinde gösterildiği gibi rezervasyonun özelliklerine göre sistematik olarak " +
    "değişmektedir. Problem, bu sistematik farkın rezervasyon düzeyinde ölçülememesidir."),
  p("Ele alınan problem sektörsel bir problemdir ve konaklama sektörünün tamamını " +
    "ilgilendirmektedir. Aynı zamanda günlük yaşamla da doğrudan ilişkilidir: otellerin " +
    "belirsizliği yönetmek için başvurduğu iade edilemez rezervasyon ve yüksek kapora gibi " +
    "uygulamaların maliyetine, planını değiştirmek zorunda kalan tüketici katlanmaktadır."),

  anaBaslik("1.3.", "Mevcut Çözümler ve Yetersizlikleri"),
  p("Otellerin iptal riskini yönetmek için hâlihazırda başvurduğu yöntemler üç başlıkta " +
    "toplanabilir. Antonio, de Almeida ve Nunes (2017a) de otellerin belirsizliğe karşı " +
    "ağırlıklı olarak katı iptal politikaları ve aşırı rezervasyon uygulamalarına " +
    "başvurduğunu, bu önlemlerin ise otelin hem gelirini hem itibarını olumsuz " +
    "etkileyebildiğini belirtmektedir. Aşağıda ele alınan yöntemlerin her biri belirli bir " +
    "fayda sağlamakla birlikte ortak bir zaafa sahiptir: hiçbiri rezervasyonu müşteri " +
    "düzeyinde değerlendirmemektedir."),

  altBaslik("1.3.1.", "Deneyime Dayalı Sezgisel Değerlendirme"),
  p("Yaygın uygulamada iptal riski, otel yöneticisinin veya ön büro personelinin deneyimine " +
    "dayalı sezgisiyle değerlendirilir. Bu yaklaşımın dezavantajları şunlardır: değerlendirme " +
    "kişiye göre değiştiği için tutarsızdır; aynı rezervasyon farklı personel tarafından farklı " +
    "biçimde yorumlanabilir. Deneyim, personel değiştiğinde kurumda kalmaz. Ayrıca bir insanın " +
    "aynı anda değerlendirebileceği değişken sayısı sınırlıdır; otuzdan fazla özniteliğin " +
    "birbiriyle etkileşimini sezgisel olarak hesaplamak mümkün değildir."),

  altBaslik("1.3.2.", "Katı Kapora ve İptal Politikaları"),
  p("İkinci yöntem, iade edilemez tarife veya yüksek kapora uygulamasıyla iptali ekonomik " +
    "olarak caydırmaktır. Bu yöntem riski azaltır, ancak bunu tüm müşterilere aynı biçimde " +
    "uygulayarak yapar. Dezavantajı, iptal etme olasılığı düşük olan müşterileri de " +
    "cezalandırmasıdır. Katı koşullar nedeniyle rezervasyondan tamamen vazgeçen müşteri, " +
    "otel için önlenen bir iptal değil, hiç kazanılmamış bir gelirdir. Bu yaklaşım iptal " +
    "oranını düşürürken toplam talebi de düşürmektedir."),

  altBaslik("1.3.3.", "Aşırı Rezervasyon (Overbooking)"),
  p("Üçüncü yöntem, beklenen iptal oranı kadar fazla rezervasyon kabul etmektir. Bu yöntemin " +
    "dezavantajı, toplu bir ortalamaya dayanmasıdır. Tahmin edilen iptal oranı gerçekleşenden " +
    "yüksek olduğunda otel, rezervasyonu olan müşteriyi ağırlayamaz. Bu durum müşteri " +
    "memnuniyetsizliği, tazminat maliyeti ve çevrimiçi platformlarda olumsuz değerlendirme " +
    "olarak geri döner. Yöntem, ortalamanın etrafındaki dağılımı değil yalnızca ortalamayı " +
    "kullandığı için belirsizliği azaltmaz, yalnızca yerini değiştirir."),

  anaBaslik("1.4.", "Projenin Benzer Uygulamalardan Farkı"),
  p("Piyasada otel yönetim sistemleri ve gelir yönetimi yazılımları bulunmaktadır. Bu " +
    "çalışmanın bu çözümlerden farklı kılan yönleri dört noktada toplanmaktadır."),
  p("Birinci fark, tahminin düzeyidir. Mevcut gelir yönetimi araçları çoğunlukla toplu " +
    "tahminler üretir; belirli bir hafta için beklenen doluluk oranını verir. Bu çalışmada " +
    "geliştirilecek sistem ise tahmini tek tek rezervasyon düzeyinde üretmektedir. Bu, " +
    "personelin tek bir rezervasyon hakkında karar verebilmesini sağlar."),
  p("İkinci fark, çıktının biçimidir. Sistem yalnızca “iptal edilir” veya “iptal edilmez” " +
    "biçiminde bir hüküm vermek yerine, tahminin yanında bir güven yüzdesi sunmaktadır. " +
    "%52 ile %94 risk taşıyan iki rezervasyon arasındaki fark, personelin alacağı önlemin " +
    "şiddetini belirlemesi açısından anlamlıdır. İkili bir etiket bu bilgiyi gizlerken, " +
    "yüzdelik bir skor görünür kılmaktadır."),
  p("Üçüncü fark, erişilebilirliktir. Mevcut gelir yönetimi yazılımları lisans maliyeti ve " +
    "kurulum gereksinimleri nedeniyle çoğunlukla zincir otellerin kullanımındadır. Bu " +
    "çalışmada geliştirilecek sistem, tarayıcı üzerinden çalışan ve kurulum gerektirmeyen " +
    "bir web arayüzü olarak tasarlanmıştır."),
  p("Dördüncü fark, şeffaflıktır. Ticari çözümler tahminlerini genellikle gerekçe sunmadan " +
    "verir. Bu çalışmada, tahmine en çok katkı sağlayan özniteliklerin kullanıcıya " +
    "gösterilmesi planlanmaktadır. Personelin bir tahmine güvenip güvenmeyeceğine karar " +
    "verebilmesi, tahminin hangi bilgiye dayandığını görmesine bağlıdır."),

  anaBaslik("1.5.", "Sağlanacak Avantaj ve Yenilikler"),
  p("Geliştirilecek sistemin otel işletmesine sağlayacağı avantajlar şunlardır:"),
  madde("Riskli rezervasyonların önceden belirlenmesi, otelin bu rezervasyonlar için " +
        "doğrulama araması yapmak veya esnek bir kapora uygulamak gibi hedefli önlemler " +
        "almasını sağlar. Böylece önlem tüm müşterilere değil, yalnızca gerekli olanlara " +
        "uygulanır."),
  madde("Doluluk tahmininin isabetinin artması, personel planlaması ve stok yönetiminde " +
        "israfı azaltır."),
  madde("Aşırı rezervasyon kararının ortalama bir orana değil, eldeki rezervasyonların " +
        "gerçek risk dağılımına dayandırılması mümkün hale gelir."),
  madde("Deneyime dayalı sezgisel değerlendirmenin yerini tutarlı ve tekrarlanabilir bir " +
        "ölçüt alır; değerlendirme personelden personele değişmez."),
  p("Müşteri açısından sağlanacak avantaj ise dolaylı ancak önemlidir. Otelin riski müşteri " +
    "bazında ölçebilmesi, iptal olasılığı düşük müşterilere daha esnek koşullar " +
    "sunabilmesinin önünü açar. Böylece katı iptal politikalarının maliyeti, bu politikalara " +
    "neden olmayan müşterilere yüklenmemiş olur."),

  anaBaslik("1.6.", "Makine Öğrenmesi ve Web Arayüzünün Kullanımı"),
  p("Projede makine öğrenmesi ve web arayüzü, birbirini tamamlayan iki bileşen olarak " +
    "kullanılacaktır. Makine öğrenmesi bileşeni problemin hesaplama tarafını, web arayüzü " +
    "bileşeni ise kullanım tarafını çözmektedir."),
  p("Makine öğrenmesi bileşeni, geçmiş rezervasyon kayıtlarından iptal davranışının " +
    "örüntülerini öğrenmek için kullanılacaktır. Bu bir ikili sınıflandırma problemidir ve " +
    "etiketli veri mevcut olduğundan gözetimli öğrenme yaklaşımı uygulanacaktır. İkinci " +
    "aşamada temel model olarak Lojistik Regresyon, karşılaştırma modelleri olarak Rastgele " +
    "Orman (Random Forest) ve XGBoost algoritmaları eğitilecek ve performansları " +
    "karşılaştırılacaktır. Veri setinin incelenmesinde hiçbir tek özniteliğin hedef " +
    "değişkenle 0,30’un üzerinde korelasyona sahip olmadığı görülmüştür; bu bulgu, iptal " +
    "davranışının öznitelikler arasındaki etkileşimlerden kaynaklandığını ve doğrusal " +
    "olmayan modellerin tercih edilmesi gerektiğini göstermektedir."),
  p("Web arayüzü bileşeni ise modelin kullanılabilirliğini sağlamak için gereklidir. Eğitilmiş " +
    "bir model, dosya olarak saklandığında yalnızca programlama bilgisi olan kişiler " +
    "tarafından kullanılabilir. Otel ön büro personelinin bu bilgiye sahip olması " +
    "beklenemez. Web arayüzü, modelin beklediği sayısal girdileri personelin aşina olduğu " +
    "rezervasyon alanlarına dönüştüren bir katman olarak çalışacaktır. Kullanıcı tarafından " +
    "doldurulan form, arka planda modelin eğitildiği biçime çevrilecek, model çıktısı da " +
    "yüzdelik bir risk skoruna dönüştürülerek görüntülenecektir. Böylece modelin teknik " +
    "karmaşıklığı kullanıcıdan gizlenmiş olur."),
];

// ---------------------- İKİNCİ BÖLÜM ----------------------
const bolum2 = [
  ...bolumBasligi("İKİNCİ BÖLÜM", "VERİ SETİ VE ÖN İŞLEME PLANI"),

  anaBaslik("2.1.", "Veri Setinin Kaynağı, Türü ve Boyutu"),
  p("Çalışmada kullanılan veri seti, Kaggle veri bilimi platformunda “Hotel Booking Demand” " +
    "adıyla yayımlanan açık erişimli veri setidir (Mostipak, 2020). Veri setinin özgün " +
    "kaynağı, Antonio, de Almeida ve Nunes (2019b) tarafından Data in Brief dergisinde " +
    "yayımlanan çalışmadır. Veriler Portekiz’de bulunan bir şehir oteli ile bir tatil " +
    "köyüne ait gerçek rezervasyon kayıtlarından oluşmaktadır ve 2015-2017 yıllarını " +
    "kapsamaktadır."),
  p("Veri seti tabüler türdedir ve virgülle ayrılmış değer (CSV) biçiminde saklanmaktadır. " +
    "Veri seti üzerindeki tüm inceleme ve ön işleme adımları, Google Colab ortamında pandas " +
    "kütüphanesi (McKinney, 2010) kullanılarak gerçekleştirilmiştir. Veri setinin genel " +
    "özellikleri Tablo-1’de verilmiştir."),
  tabloBasligi(1, "Veri Setinin Genel Özellikleri"),
  tablo(
    ["Özellik", "Değer"],
    [
      ["Veri setinin türü", "Tabüler (CSV)"],
      ["Satır sayısı (örnek sayısı)", "119.390 rezervasyon kaydı"],
      ["Sütun sayısı (öznitelik sayısı)", "32"],
      ["Sayısal öznitelik sayısı", "20"],
      ["Kategorik öznitelik sayısı", "12"],
      ["Hedef değişken", "is_canceled (0 = iptal edilmedi, 1 = iptal edildi)"],
      ["Problem türü", "İkili sınıflandırma"],
      ["Sınıf dağılımı", "%62,96 iptal edilmedi – %37,04 iptal edildi"],
      ["Eksik veri içeren sütun sayısı", "4"],
    ],
    [2600, 5020],
  ),
  p("Veri setindeki öznitelikler içerik olarak dört grupta toplanmaktadır. Birinci grup " +
    "rezervasyonun zamanına ilişkin bilgileri içerir: rezervasyon ile giriş tarihi " +
    "arasındaki gün sayısı, giriş yılı, ayı ve haftası. İkinci grup konaklamanın niteliğini " +
    "tanımlar: kalınacak gece sayısı, yetişkin, çocuk ve bebek sayısı, oda tipi ve yemek " +
    "planı. Üçüncü grup müşterinin geçmişine ilişkindir: daha önce iptal ettiği rezervasyon " +
    "sayısı, tekrar gelen müşteri olup olmadığı. Dördüncü grup rezervasyonun ticari " +
    "koşullarını kapsar: pazar segmenti, dağıtım kanalı, kapora tipi, günlük ortalama oda " +
    "fiyatı ve özel talep sayısı."),

  anaBaslik("2.2.", "Eksik Verilerin Ele Alınması"),
  p("Veri setinde eksik değer (null/nan) içeren dört sütun bulunmaktadır. Bu sütunların " +
    "eksiklik oranları Grafik-1’de görselleştirilmiştir."),
  ...grafik(1, "Sütunlara Göre Eksik Veri Oranları", "grafik1.png", 411, 178),
  p("Grafik-1 incelendiğinde, eksikliğin dört sütunda yoğunlaştığı ve bu sütunların birbirinden " +
    "çok farklı eksiklik düzeylerine sahip olduğu görülmektedir. company sütununun %94,31’i, " +
    "agent sütununun %13,69’u eksiktir. country (%0,41) ve children (%0,003) sütunlarındaki " +
    "eksiklik ise ihmal edilebilir düzeydedir."),
  p("Bu dağılım önemli bir ayrımı ortaya koymaktadır. company sütunu rezervasyonu yapan " +
    "şirketin kimlik numarasını, agent sütunu ise aracı seyahat acentesinin numarasını " +
    "tutmaktadır. Bu iki sütundaki eksiklik rastgele bir veri kaybı değildir; rezervasyonun " +
    "bir şirket veya acente aracılığıyla yapılmadığı anlamına gelmektedir. Dolayısıyla " +
    "eksiklik kendi başına anlamlı bir bilgi taşımaktadır ve bu sütunlar ortalama veya " +
    "medyan gibi istatistiksel değerlerle doldurulmamalıdır. Buna karşılık country ve " +
    "children sütunlarındaki eksiklik gerçek bir veri girişi hatasına işaret etmektedir."),
  p("Bu değerlendirme doğrultusunda her sütun için ayrı bir strateji belirlenmiştir. " +
    "Uygulanan stratejiler ve gerekçeleri Tablo-2’de sunulmuştur."),
  tabloBasligi(2, "Eksik Veri İçeren Sütunlar ve Uygulanan Stratejiler"),
  tablo(
    ["Sütun", "Eksik Oranı", "Uygulanan Strateji", "Gerekçe"],
    [
      ["company", "%94,31", "Sütun tamamen çıkarıldı",
       "Verinin %94’ü eksik olduğundan sütun modele anlamlı katkı sağlayamaz; doldurulması yapay bilgi üretir."],
      ["agent", "%13,69", "0 değeri ile dolduruldu",
       "Eksiklik, rezervasyonda acente kullanılmadığını ifade eden anlamlı bir bilgidir. 0 değeri “acente yok” kategorisini temsil eder."],
      ["country", "%0,41", "Mod (en sık görülen ülke) ile dolduruldu",
       "Eksik oran çok düşüktür. Sütun kategorik olduğundan ortalama veya medyan kullanılamaz."],
      ["children", "%0,003", "0 değeri ile dolduruldu",
       "Yalnızca 4 satır eksiktir. Çocuk sayısının bildirilmemesi, çocuk bulunmadığı anlamına gelir."],
    ],
    [1250, 1050, 2100, 3220],
  ),
  p("Bu işlemler sonucunda veri setinde eksik değer kalmamıştır. Sütun sayısı company " +
    "sütununun çıkarılmasıyla 32’den 31’e inmiş, satır sayısında ise değişiklik olmamıştır. " +
    "Eksik veri içeren satırların silinmesi yerine doldurma yönteminin tercih edilmesinin " +
    "nedeni, satır silme yaklaşımının yalnızca agent sütunu nedeniyle 16.340 kaydın, yani " +
    "veri setinin yaklaşık yedi de birinin kaybedilmesine yol açacak olmasıdır."),

  anaBaslik("2.3.", "Veri Sızıntısının Giderilmesi"),
  p("Veri setinin incelenmesi sırasında, ön işleme planının zorunlu bir parçası olan önemli " +
    "bir sorun tespit edilmiştir. Veri setinde yer alan reservation_status sütunu, " +
    "rezervasyonun son durumunu “Check-Out”, “Canceled” ve “No-Show” değerleriyle " +
    "göstermektedir. Bu sütun ile hedef değişken arasındaki çapraz tablo incelendiğinde, " +
    "sütunun “Canceled” veya “No-Show” değerini aldığı her kayıtta hedef değişkenin 1, " +
    "“Check-Out” değerini aldığı her kayıtta ise 0 olduğu görülmüştür."),
  p("Bu durum, söz konusu sütunun hedef değişkenin bir kopyası olduğu anlamına gelmektedir. " +
    "Literatürde veri sızıntısı (data leakage) olarak adlandırılan bu sorun, modelin eğitim " +
    "verisinde kusursuza yakın bir başarı göstermesine, ancak gerçek kullanımda tamamen " +
    "işlevsiz kalmasına yol açar. Nedeni şudur: reservation_status bilgisi ancak rezervasyon " +
    "sonuçlandıktan sonra oluşmaktadır. Oysa modelin tahmin yapması gereken an, " +
    "rezervasyonun alındığı andır ve o anda bu bilgi henüz mevcut değildir. Aynı gerekçe, " +
    "rezervasyonun sonuçlandığı tarihi tutan reservation_status_date sütunu için de " +
    "geçerlidir."),
  p("Bu nedenle her iki sütun da veri setinden çıkarılmıştır. Bu işlem sonunda öznitelik " +
    "sayısı 31’den 29’a inmiştir. Bu adımın atlanması durumunda elde edilecek yüksek " +
    "doğruluk değeri, modelin başarısını değil yalnızca hedef değişkenin kendisini " +
    "okuduğunu gösterecekti."),

  anaBaslik("2.4.", "Kategorik Değişkenlerin Sayısallaştırılması"),
  p("Makine öğrenmesi algoritmaları metinsel verilerle çalışamadığından, kategorik " +
    "özniteliklerin sayısal değerlere dönüştürülmesi gerekmektedir. Ancak tek bir dönüştürme " +
    "yöntemi tüm sütunlar için uygun değildir. Yöntem seçimi, sütunun kaç farklı kategori " +
    "içerdiğine (kardinalite) ve kategoriler arasında doğal bir sıra bulunup bulunmadığına " +
    "bağlıdır. Belirlenen yöntemler Tablo-3’te verilmiştir."),
  tabloBasligi(3, "Kategorik Değişkenler İçin Dönüştürme Yöntemleri"),
  tablo(
    ["Sütun(lar)", "Kategori Sayısı", "Yöntem", "Gerekçe"],
    [
      ["country", "177", "Frekans kodlama",
       "One-hot encoding 177 yeni sütun oluşturarak boyut felaketine yol açar. Her ülke, veri setinde görülme sıklığı ile temsil edilmiştir."],
      ["arrival_date_month", "12", "Sıralı kodlama",
       "Aylar doğal bir sıraya sahiptir (Ocak = 1 … Aralık = 12). Bu sıra bilgisinin korunması gerekir."],
      ["hotel, meal, market_segment, distribution_channel, reserved_room_type, assigned_room_type, deposit_type, customer_type",
       "2 – 12", "One-hot encoding",
       "Bu kategoriler arasında doğal bir büyüklük sırası yoktur. Sıralı kodlama kullanılsaydı model, var olmayan bir büyüklük ilişkisi varsayardı."],
    ],
    [2500, 1100, 1550, 3470],
  ),
  p("One-hot encoding uygulanırken drop_first parametresi etkinleştirilmiş, böylece her " +
    "sütundan bir kategori referans olarak çıkarılmış ve kukla değişken tuzağı (dummy " +
    "variable trap) olarak bilinen gereksiz tekrar önlenmiştir."),
  p("Bu dönüşümler sonucunda öznitelik sayısı 29’dan 57’ye yükselmiş, veri setindeki tüm " +
    "sütunlar sayısal hale gelmiştir. Satır sayısında değişiklik olmamıştır. Öznitelik " +
    "sayısındaki artış one-hot encoding’in doğal sonucudur; country sütunu için frekans " +
    "kodlama tercih edilmemiş olsaydı bu sayı 230’un üzerine çıkacaktı."),

  anaBaslik("2.5.", "Veri Setinin Görselleştirilmesi"),
  p("Veri setinin yapısı ve sınıf dağılımları, Google Colab ortamında Matplotlib (Hunter, " +
    "2007) ve Seaborn (Waskom, 2021) kütüphaneleri kullanılarak beş farklı grafikle incelenmiştir. Eksik veri dağılımını " +
    "gösteren Grafik-1 bölüm 2.2’de sunulmuştur. Bu bölümde kalan dört grafik ele " +
    "alınmaktadır."),

  altBaslik("2.5.1.", "Hedef Değişkenin Sınıf Dağılımı"),
  p("Modelin tahmin etmeye çalışacağı hedef değişkenin sınıfları arasındaki dengenin " +
    "incelenmesi, model seçimi ve değerlendirme ölçütünün belirlenmesi açısından " +
    "belirleyicidir. Sınıf dağılımı Grafik-2’de hem adet hem oran olarak verilmiştir."),
  ...grafik(2, "Hedef Değişkenin Sınıf Dağılımı", "grafik2.png", 411, 153),
  p("Grafik-2’ye göre rezervasyonların 75.166’sı (%62,96) iptal edilmemiş, 44.224’ü (%37,04) " +
    "iptal edilmiştir. Sınıflar arasındaki oran yaklaşık 1,70’e 1’dir. Bu, ılımlı düzeyde " +
    "dengesiz (imbalanced) bir veri setidir."),
  p("Bu bulgunun iki önemli sonucu bulunmaktadır. Birincisi, doğruluk (accuracy) ölçütü tek " +
    "başına yeterli değildir. Hiçbir şey öğrenmeyen ve her rezervasyon için “iptal " +
    "edilmeyecek” tahmini yapan bir model dahi %62,96 doğruluk elde edecektir. Bu nedenle " +
    "ikinci aşamada modelin değerlendirilmesinde kesinlik (precision), duyarlılık (recall) " +
    "ve F1-skoru da raporlanacaktır. İkincisi, dengesizlik şiddetli olmadığından yeniden " +
    "örnekleme teknikleri zorunlu değildir; model eğitiminde sınıf ağırlıklarının " +
    "dengelenmesi yeterli olacaktır. Azınlık sınıfındaki 44.224 örnek, modelin bu sınıfı " +
    "öğrenmesi için yeterli büyüklüktedir."),

  altBaslik("2.5.2.", "Bekleme Süresinin İptal Durumuna Göre Dağılımı"),
  p("Rezervasyonun yapıldığı tarih ile otele giriş tarihi arasındaki gün sayısını ifade eden " +
    "lead_time özniteliğinin dağılımı, iptal durumuna göre ayrılarak Grafik-3’te " +
    "incelenmiştir."),
  ...grafik(3, "Bekleme Süresinin İptal Durumuna Göre Dağılımı", "grafik3.png", 411, 202),
  p("Grafik-3’te her iki sınıfın dağılımının da sağa çarpık (right-skewed) olduğu, " +
    "rezervasyonların büyük bölümünün girişten kısa süre önce yapıldığı görülmektedir. " +
    "Bununla birlikte iki sınıf arasında belirgin bir fark bulunmaktadır: iptal edilmeyen " +
    "rezervasyonlar 0-50 gün aralığında yoğunlaşırken, bekleme süresi arttıkça iptal edilen " +
    "rezervasyonların payı yükselmektedir. Ortalama bekleme süresi iptal edilmeyen " +
    "rezervasyonlarda yaklaşık 80 gün, iptal edilenlerde ise yaklaşık 145 gündür."),
  p("Bu bulgu sezgisel olarak da tutarlıdır: bir müşteri rezervasyonunu ne kadar erken " +
    "yaparsa, giriş tarihine kadar planlarının değişmesi için o kadar uzun bir süre " +
    "geçmektedir. Modelleme açısından sonuç, lead_time özniteliğinin iptal tahmininde en " +
    "güçlü ayırt edici özniteliklerden biri olacağıdır. Ayrıca dağılımın çarpık olması " +
    "nedeniyle, mesafe tabanlı algoritmaların kullanılması durumunda bu sütuna " +
    "ölçeklendirme veya logaritmik dönüşüm uygulanması gerekecektir."),

  altBaslik("2.5.3.", "Pazar Segmentine Göre İptal Oranları"),
  p("Kategorik bir özniteliğin hedef değişkenle ilişkisini incelemek, hangi kategorik " +
    "özniteliklerin modele katkı sağlayacağını belirlemek açısından önemlidir. Pazar " +
    "segmentine göre iptal oranları Grafik-4’te verilmiştir."),
  ...grafik(4, "Pazar Segmentine Göre İptal Oranları", "grafik4.png", 411, 191),
  p("Grafik-4, iptal oranının pazar segmentine göre güçlü biçimde değiştiğini " +
    "göstermektedir. Grup rezervasyonlarında (Groups) iptal oranı %61,1’e kadar " +
    "çıkmaktadır; grup rezervasyonlarının genellikle tur operatörleri tarafından ön tedbir " +
    "amaçlı yapıldığı ve sonradan kolayca iptal edilebildiği düşünüldüğünde bu beklenen bir " +
    "sonuçtur. Çevrimiçi seyahat acentesi segmenti (Online TA) %36,7 ile genel ortalamaya " +
    "yakın olmakla birlikte, 56.477 rezervasyonla veri setindeki en büyük segment olduğu " +
    "için modelin genel başarısında belirleyici olacaktır. Doğrudan rezervasyon (Direct) ve " +
    "ücretsiz konaklama (Complementary) segmentlerinde ise iptal oranı %15’in altında " +
    "kalmaktadır."),
  p("Bu dağılım, iptal davranışının rastgele olmadığını; rezervasyonun yapılış kanalıyla " +
    "sistematik biçimde ilişkili olduğunu göstermektedir. Bu bulgu, çalışmanın temel " +
    "varsayımı olan iptal davranışının öngörülebilirliğini desteklemektedir."),

  altBaslik("2.5.4.", "Sayısal Öznitelikler Arası Korelasyon"),
  p("Öznitelikler arasındaki doğrusal ilişkiler ve her birinin hedef değişkenle korelasyonu " +
    "Grafik-5’teki ısı haritasıyla incelenmiştir."),
  ...grafik(5, "Sayısal Öznitelikler Arası Korelasyon Isı Haritası", "grafik5.png", 411, 350),
  p("Grafik-5’ten üç sonuç çıkarılmaktadır. Birincisi, hedef değişkenle en güçlü ilişkiye " +
    "sahip öznitelik lead_time’dır (+0,29); bu, Grafik-3’teki bulgunun sayısal doğrulamasıdır. " +
    "Özel talep sayısı (-0,23) ve ayrılan otopark yeri sayısı (-0,20) ise negatif yönde " +
    "ilişkilidir. Bu sonuç anlamlıdır: özel talepte bulunan veya otopark yeri ayırtan bir " +
    "müşteri, konaklamasını somutlaştırmış, dolayısıyla kararlılığı yüksek bir müşteridir."),
  p("İkincisi, öznitelikler arası çoklu doğrusal bağlantı (multicollinearity) düşüktür. " +
    "Tekrar gelen müşteri bilgisi ile daha önce iptal edilmemiş rezervasyon sayısı " +
    "arasındaki +0,42 değeri dışında öznitelikler arasında güçlü bir korelasyon " +
    "görülmemektedir. Bu, özniteliklerin büyük ölçüde bağımsız bilgi taşıdığı ve olduğu " +
    "gibi kullanılabileceği anlamına gelir."),
  p("Üçüncüsü ve model seçimi açısından en önemlisi, hiçbir tek özniteliğin hedef değişkenle " +
    "0,30’un üzerinde korelasyona sahip olmamasıdır. Bu durum, iptal davranışının tek bir " +
    "değişkenle açıklanamayacağını, öznitelikler arasındaki etkileşimlerden kaynaklandığını " +
    "göstermektedir. Dolayısıyla ikinci aşamada yalnızca Lojistik Regresyon gibi doğrusal " +
    "bir modelle yetinilmemeli; ağaç tabanlı ve doğrusal olmayan modeller de denenmelidir. " +
    "Korelasyon matrisi, bu model seçimi kararının gerekçesini oluşturmaktadır."),
];

// ---------------------- ÜÇÜNCÜ BÖLÜM ----------------------
const bolum3 = [
  ...bolumBasligi("ÜÇÜNCÜ BÖLÜM", "KULLANICI DENEYİMİ VE UYGULAMA SENARYOSU"),

  anaBaslik("3.1.", "Web Arayüzünde Kullanıcı Adımları"),
  p("Geliştirilecek web arayüzünün hedef kullanıcısı, otelin ön büro personeli veya gelir " +
    "yönetimi sorumlusudur. Arayüz, kullanıcıdan makine öğrenmesi veya programlama bilgisi " +
    "beklemeyecek biçimde tasarlanacaktır. Kullanıcının gerçekleştireceği adımlar aşağıda " +
    "sıralanmıştır."),
  p("Birinci adım, arayüze erişimdir. Uygulama tarayıcı üzerinden çalışacak; kullanıcıdan " +
    "herhangi bir kurulum veya yapılandırma istenmeyecektir."),
  p("İkinci adım, rezervasyon bilgilerinin girilmesidir. Kullanıcı, değerlendirmek istediği " +
    "rezervasyonun bilgilerini bir form üzerinden girecektir. Form alanları, modelin " +
    "kullandığı teknik öznitelik adları yerine personelin aşina olduğu rezervasyon " +
    "terimleriyle etiketlenecektir. Formda yer alacak alanlar şunlardır:"),
  madde("Otel tipi (şehir oteli / tatil köyü)"),
  madde("Rezervasyon ile giriş tarihi arasındaki gün sayısı"),
  madde("Giriş tarihi"),
  madde("Konaklama süresi (hafta içi ve hafta sonu gece sayısı)"),
  madde("Misafir sayısı (yetişkin, çocuk, bebek)"),
  madde("Pazar segmenti ve dağıtım kanalı"),
  madde("Kapora tipi"),
  madde("Oda tipi ve yemek planı"),
  madde("Günlük ortalama oda fiyatı"),
  madde("Özel talep sayısı ve otopark ihtiyacı"),
  madde("Müşterinin daha önce iptal ettiği rezervasyon sayısı"),
  p("Form, veri setinin incelenmesinde en ayırt edici oldukları belirlenen alanları " +
    "öncelikli olarak ve varsayılan değerlerle birlikte sunacaktır. Böylece kullanıcı, " +
    "tüm alanları doldurmak zorunda kalmadan hızlı bir değerlendirme yapabilecektir."),
  p("Üçüncü adım, tahminin istenmesidir. Kullanıcı formu gönderdiğinde, girilen bilgiler arka " +
    "planda modelin eğitildiği sayısal biçime dönüştürülecek ve model çalıştırılacaktır. " +
    "Bu dönüşüm kullanıcıya görünmeyecektir."),
  p("Dördüncü adım, sonucun görüntülenmesi ve yorumlanmasıdır. Tahmin sonucu aynı sayfada, " +
    "bölüm 3.2’de açıklanan biçimde sunulacaktır."),
  p("Beşinci adım, isteğe bağlı olarak toplu değerlendirmedir. Kullanıcının tek tek " +
    "rezervasyon girmek yerine birden çok rezervasyonu değerlendirebilmesi için, CSV " +
    "biçiminde dosya yükleme seçeneği de sunulacaktır. Bu durumda her satır için bir risk " +
    "skoru hesaplanacak ve sonuçlar risk düzeyine göre sıralı bir liste olarak " +
    "görüntülenecektir. Bu özellik, ön büro personelinin yaklaşan tarihler için risk " +
    "taraması yapmasını mümkün kılacaktır."),

  anaBaslik("3.2.", "Modelin Kullanıcıya Sunacağı Çıktılar"),
  p("Modelin ürettiği çıktı, kullanıcıya üç katmanlı bir biçimde sunulacaktır. Bu katmanlı " +
    "yapının amacı, hem hızlı bir karar için özet bilgi hem de gerektiğinde ayrıntılı " +
    "inceleme imkânı sağlamaktır."),

  altBaslik("3.2.1.", "Tahmin Sınıfı"),
  p("Birinci katman, modelin tahmin ettiği sınıftır. Sonuç “Düşük riskli rezervasyon” veya " +
    "“Yüksek riskli rezervasyon” biçiminde, renk kodlu bir bildirim olarak " +
    "görüntülenecektir. Düşük risk yeşil, orta düzey risk turuncu, yüksek risk kırmızı " +
    "renkle gösterilecektir."),

  altBaslik("3.2.2.", "Güven Skoru"),
  p("İkinci katman, tahminin güven skorudur. Model yalnızca bir sınıf etiketi değil, o " +
    "sınıfa ait olma olasılığı da üretmektedir. Bu olasılık kullanıcıya yüzdelik bir değer " +
    "olarak sunulacaktır; örneğin “Bu rezervasyonun iptal edilme olasılığı %73’tür” " +
    "biçiminde. Skor ayrıca görsel bir gösterge çubuğuyla desteklenecektir."),
  p("Güven skorunun sunulması, arayüzün en önemli tasarım kararıdır. Bunun nedeni, otel " +
    "personelinin alacağı önlemin şiddetinin risk düzeyine bağlı olmasıdır. %52 risk " +
    "taşıyan bir rezervasyon için doğrulama araması yapmak yeterli olabilirken, %94 risk " +
    "taşıyan bir rezervasyon için kapora talep etmek gerekebilir. İkili bir sınıf etiketi " +
    "bu iki durumu aynı göstereceği için kullanıcıyı yanlış yönlendirir."),

  altBaslik("3.2.3.", "Tahmine Etki Eden Öznitelikler"),
  p("Üçüncü katman, tahmine en çok katkı sağlayan özniteliklerin listesidir. Kullanıcı bu " +
    "listede, örneğin “uzun bekleme süresi (142 gün) riski artırıyor” veya “iki özel talep " +
    "riski azaltıyor” biçiminde açıklamalar görecektir. Bu katman isteğe bağlı olarak " +
    "açılacak bir ayrıntı bölümünde yer alacaktır."),
  p("Bu bilginin sunulmasının gerekçesi, kullanıcının tahmine duyacağı güvenin tahminin " +
    "dayanağını görmesine bağlı olmasıdır. Gerekçe sunmayan bir sistem, kullanıcı tahminle " +
    "kendi deneyimi arasında bir çelişki gördüğünde terk edilir. Gerekçenin görünür olması, " +
    "kullanıcının modelin hangi durumlarda güvenilir olduğunu zaman içinde öğrenmesini de " +
    "sağlayacaktır."),
];

const sonuc = [
  ...tekBaslik("SONUÇ"),
  p("Bu çalışmanın birinci aşamasında, otel rezervasyon iptali probleminin makine öğrenmesi " +
    "ile çözümüne yönelik problem tanımı yapılmış, kullanılacak veri seti belirlenmiş ve " +
    "veri ön işleme planı oluşturularak uygulanmıştır."),
  p("Problem tanımı aşamasında, otellerin iptal riskini yönetmek için başvurduğu mevcut " +
    "yöntemlerin ortak bir zaafa sahip olduğu belirlenmiştir: hiçbiri rezervasyonu müşteri " +
    "düzeyinde değerlendirmemektedir. Deneyime dayalı sezgisel değerlendirme tutarsız ve " +
    "aktarılamaz; katı kapora politikaları iptal riski taşımayan müşterileri de " +
    "cezalandırmakta; aşırı rezervasyon ise toplu bir ortalamaya dayandığı için belirsizliği " +
    "azaltmak yerine yerini değiştirmektedir. Bu çalışmada önerilen çözümün ayırt edici " +
    "yönü, tahmini rezervasyon düzeyinde ve bir güven yüzdesiyle birlikte üretmesidir."),
  p("Veri seti incelemesinde elde edilen bulgular şunlardır. Birinci olarak, 119.390 kayıt " +
    "içeren veri setinin büyüklüğü modelin güvenilir biçimde eğitilmesi için yeterlidir. " +
    "İkinci olarak, eksik veri dört sütunda yoğunlaşmış olup her biri için eksikliğin " +
    "nedenine uygun ayrı bir strateji uygulanmıştır; özellikle company ve agent " +
    "sütunlarındaki eksikliğin rastgele olmadığı, “şirket/acente yok” anlamına geldiği " +
    "tespit edilmiştir."),
  p("Üçüncü ve çalışmanın bu aşamasındaki en kritik bulgu, veri sızıntısının tespit " +
    "edilmesidir. reservation_status sütununun hedef değişkenin birebir kopyası olduğu " +
    "ortaya konmuş ve bu sütun, rezervasyonun sonuçlanma tarihini tutan sütunla birlikte " +
    "veri setinden çıkarılmıştır. Bu adım atlanmış olsaydı, ikinci aşamada eğitilecek model " +
    "gerçekçi olmayan biçimde yüksek bir doğruluk gösterecek, ancak gerçek kullanımda " +
    "tamamen başarısız olacaktı."),
  p("Dördüncü olarak, sınıf dağılımının ılımlı düzeyde dengesiz olduğu (%62,96 – %37,04) " +
    "belirlenmiş; bu nedenle model değerlendirmesinde doğruluk ölçütünün yanında kesinlik, " +
    "duyarlılık ve F1-skorunun da kullanılmasına karar verilmiştir. Beşinci olarak, " +
    "bekleme süresi, pazar segmenti ve özel talep sayısı özniteliklerinin iptal davranışıyla " +
    "sistematik ilişkisi gösterilerek çalışmanın temel varsayımı doğrulanmıştır. Altıncı " +
    "olarak, hiçbir tek özniteliğin hedef değişkenle 0,30’un üzerinde korelasyona sahip " +
    "olmaması, iptal davranışının öznitelik etkileşimlerinden kaynaklandığını ve doğrusal " +
    "olmayan modellerin gerekli olduğunu ortaya koymuştur."),
  p("Bu bulgular doğrultusunda veri seti, ikinci aşamada yapılacak model eğitimi için hazır " +
    "duruma getirilmiştir. İkinci aşamada veri seti sınıf oranları korunarak eğitim ve test " +
    "kümelerine ayrılacak; Lojistik Regresyon, Rastgele Orman ve XGBoost algoritmaları " +
    "eğitilerek performansları kesinlik, duyarlılık, F1-skoru ve ROC-AUC ölçütleriyle " +
    "karşılaştırılacaktır. Seçilen model, üçüncü bölümde tasarımı açıklanan web arayüzünde " +
    "kullanılmak üzere kaydedilecektir."),
];

const kaynakca = [
  ...tekBaslik("KAYNAKÇA"),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED, spacing: { ...SP1, after: 180 },
    indent: { hanging: 567 },
    children: [new TextRun("Antonio, N., de Almeida, A. ve Nunes, L. (2017a). Predicting hotel booking cancellations to decrease uncertainty and increase revenue. Tourism & Management Studies, 13(2), 25-39. doi:10.18089/tms.2017.13203")],
  }),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED, spacing: { ...SP1, after: 180 },
    indent: { hanging: 567 },
    children: [new TextRun("Antonio, N., de Almeida, A. ve Nunes, L. (2017b). Predicting hotel bookings cancellation with a machine learning classification model. 16th IEEE International Conference on Machine Learning and Applications (ICMLA) bildiriler kitabı içinde (ss. 1049-1054). Cancun: IEEE. doi:10.1109/ICMLA.2017.00-11")],
  }),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED, spacing: { ...SP1, after: 180 },
    indent: { hanging: 567 },
    children: [new TextRun("Antonio, N., de Almeida, A. ve Nunes, L. (2019a). An automated machine learning based decision support system to predict hotel booking cancellations. Data Science Journal, 18(1), 32. doi:10.5334/dsj-2019-032")],
  }),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED, spacing: { ...SP1, after: 180 },
    indent: { hanging: 567 },
    children: [new TextRun("Antonio, N., de Almeida, A. ve Nunes, L. (2019b). Hotel booking demand datasets. Data in Brief, 22, 41-49. doi:10.1016/j.dib.2018.11.126")],
  }),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED, spacing: { ...SP1, after: 180 },
    indent: { hanging: 567 },
    children: [new TextRun("Hunter, J.D. (2007). Matplotlib: A 2D graphics environment. Computing in Science & Engineering, 9(3), 90-95. doi:10.1109/MCSE.2007.55")],
  }),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED, spacing: { ...SP1, after: 180 },
    indent: { hanging: 567 },
    children: [new TextRun("McKinney, W. (2010). Data structures for statistical computing in Python. S. van der Walt ve J. Millman (Ed.), 9th Python in Science Conference bildiriler kitabı içinde (ss. 56-61). doi:10.25080/Majora-92bf1922-00a")],
  }),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED, spacing: { ...SP1, after: 180 },
    indent: { hanging: 567 },
    children: [new TextRun("Mostipak, J. (2020). Hotel booking demand [Veri seti]. Erişim tarihi: 9 Ekim 2026, https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand")],
  }),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED, spacing: { ...SP1, after: 180 },
    indent: { hanging: 567 },
    children: [new TextRun("Waskom, M.L. (2021). Seaborn: Statistical data visualization. Journal of Open Source Software, 6(60), 3021. doi:10.21105/joss.03021")],
  }),
];

// ======================================================================
// Sayfa düzeni ve belge
// ======================================================================
const SAYFA = {
  margin: { top: 2.5*CM, right: 2.5*CM, bottom: 2.5*CM, left: 4*CM, footer: 1*CM },
};

const sayfaNoFooter = new Footer({
  children: [new Paragraph({
    alignment: AlignmentType.CENTER, spacing: SP1,
    children: [new TextRun({ children: [PageNumber.CURRENT] })],
  })],
});

const doc = new Document({
  creator: "Hasan İNCİLER",
  title: "Makine Öğrenmesi Tabanlı Otel Rezervasyon İptal Tahmin Sistemi",
  description: "OYG201 Yapay Zeka Uygulamaları – Final Proje Ödevi, Birinci Aşama",
  styles: {
    default: {
      document: {
        run: { font: "Times New Roman", size: 22 },   // 11 punto
        paragraph: { spacing: SP },
      },
      heading1: { run: { font: "Times New Roman", size: 22, bold: true, color: "000000" },
                  paragraph: { spacing: SP } },
      heading2: { run: { font: "Times New Roman", size: 22, bold: true, color: "000000" },
                  paragraph: { spacing: SP } },
      heading3: { run: { font: "Times New Roman", size: 22, bold: true, color: "000000" },
                  paragraph: { spacing: SP } },
    },
  },
  sections: [
    // 1) Kapak, tanıtım formu, beyan, kabul ve onay — numara YOK
    { properties: { page: SAYFA },
      children: [...kapak, ...tanitimFormu, ...beyan, ...kabulOnay] },

    // 2) Özet'ten metne kadar — büyük Romen rakamı
    { properties: { page: { ...SAYFA, pageNumbers: { start: 1, formatType: NumberFormat.UPPER_ROMAN } } },
      footers: { default: sayfaNoFooter },
      children: [...ozet, ...icindekiler, ...grafiklerListesi, ...onsoz] },

    // 3) Metin kısmı — normal rakam
    { properties: { page: { ...SAYFA, pageNumbers: { start: 1, formatType: NumberFormat.DECIMAL } } },
      footers: { default: sayfaNoFooter },
      children: [...giris, ...bolum1, ...bolum2, ...bolum3, ...sonuc, ...kaynakca] },
  ],
});

const cikti = process.argv[2] || path.join(__dirname, "rapor.docx");
Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(cikti, buf);
  console.log("yazildi:", cikti, buf.length, "bayt");
});

// Özet kelime sayısı denetimi
const kelime = OZET_METNI.join(" ").split(/\s+/).filter(Boolean).length;
console.log("OZET kelime sayisi:", kelime, kelime <= 300 ? "(sinir icinde)" : "(SINIR ASILDI!)");
