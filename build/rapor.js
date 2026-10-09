const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, ImageRun, Tab, PageBreak, Footer,
  AlignmentType, TabStopType, LeaderType, PageNumber, NumberFormat,
  HeadingLevel, LineRuleType, VerticalAlign,
  Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle,
} = require("docx");

const CM = 567;                       // DXA per cm
const CONTENT_W = 11906 - 4*CM - 2.5*CM;   // A4 genişliği - sol 4cm - sağ 2,5cm
const GRAFIK_DIR = path.join(__dirname, "..", "docs", "grafikler", "rapor");

let PAGES = {};
try { PAGES = JSON.parse(fs.readFileSync(path.join(__dirname, "pages.json"), "utf8")); } catch (e) {}
const pg = (k) => (PAGES[k] !== undefined ? String(PAGES[k]) : "—");

// ---------- paragraf yardımcıları ----------
const SP = { line: 360, lineRule: LineRuleType.AUTO, before: 0, after: 0 };   // 1,5 satır
const SP1 = { line: 240, lineRule: LineRuleType.AUTO, before: 0, after: 0 };  // 1 satır

// Gövde paragrafı: iki yana yaslı, 1,5 satır aralığı
const p = (text) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED, spacing: SP,
  children: [new TextRun(text)],
});

// Zengin içerikli gövde paragrafı (kalın/italik parçalar için)
const pr = (runs) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED, spacing: SP, children: runs,
});

const bos = () => new Paragraph({ spacing: SP, children: [new TextRun("")] });

const ortali = (text, { bold = false, caps = false, spacing = SP } = {}) =>
  new Paragraph({
    alignment: AlignmentType.CENTER, spacing,
    children: [new TextRun({ text: caps ? text.toLocaleUpperCase("tr-TR") : text, bold })],
  });

// Bölüm başlığı: yeni sayfa, üst orta, tamamı BÜYÜK ve KALIN,
// bölüm numarası yazıyla üst satıra, bölüm adı alt satıra
const bolumBasligi = (numaraYaziyla, ad, { ilk = false } = {}) => {
  const out = [];
  if (!ilk) out.push(new Paragraph({ children: [new PageBreak()] }));
  out.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: SP,
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: numaraYaziyla.toLocaleUpperCase("tr-TR"), bold: true })],
  }));
  out.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: SP,
    children: [new TextRun({ text: ad.toLocaleUpperCase("tr-TR"), bold: true })],
  }));
  out.push(bos());
  return out;
};

// Tek sayfalık ön bölüm başlığı (ÖZET, İÇİNDEKİLER, ÖN SÖZ, GİRİŞ, SONUÇ, KAYNAKÇA)
const tekBaslik = (ad, { ilk = false } = {}) => {
  const out = [];
  if (!ilk) out.push(new Paragraph({ children: [new PageBreak()] }));
  out.push(new Paragraph({
    alignment: AlignmentType.CENTER, spacing: SP,
    heading: HeadingLevel.HEADING_1,
    children: [new TextRun({ text: ad.toLocaleUpperCase("tr-TR"), bold: true })],
  }));
  out.push(bos());
  return out;
};

// Ana başlık: tamamı BÜYÜK ve KALIN, "1.1." biçiminde numaralı
const anaBaslik = (numara, ad) => new Paragraph({
  alignment: AlignmentType.LEFT, spacing: { ...SP, before: 240 },
  heading: HeadingLevel.HEADING_2,
  children: [new TextRun({ text: `${numara} ${ad.toLocaleUpperCase("tr-TR")}`, bold: true })],
});

// Alt başlık: yalnızca ilk harfler büyük, KALIN, "1.1.1." biçiminde
const altBaslik = (numara, ad) => new Paragraph({
  alignment: AlignmentType.LEFT, spacing: { ...SP, before: 180 },
  heading: HeadingLevel.HEADING_3,
  children: [new TextRun({ text: `${numara} ${ad}`, bold: true })],
});

// Madde imli satır (kılavuzda liste biçimi serbest; girintisiz, 1,5 aralık)
const madde = (text) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED, spacing: SP,
  bullet: { level: 0 },
  children: [new TextRun(text)],
});

// Grafik: metnin altında, sayfanın ortasında; numara ve isim ALTTA, numara KALIN
const grafik = (no, isim, dosya, genislik, yukseklik) => ([
  new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { ...SP1, before: 180 },
    keepNext: true, keepLines: true,
    children: [new ImageRun({
      type: "png",
      data: fs.readFileSync(path.join(GRAFIK_DIR, dosya)),
      transformation: { width: genislik, height: yukseklik },
    })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER, spacing: { ...SP1, after: 180 },
    children: [
      new TextRun({ text: `Grafik-${no}`, bold: true }),
      new TextRun({ text: `. ${isim}` }),
    ],
  }),
]);

// İçindekiler / liste satırı: nokta dolgulu sağa dayalı sayfa numarası
const icSatir = (etiket, sayfa, { girinti = 0, bold = false } = {}) => new Paragraph({
  spacing: SP1,
  indent: { left: girinti },
  tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_W, leader: LeaderType.DOT }],
  children: [
    new TextRun({ text: etiket, bold }),
    new TextRun({ children: [new Tab()], bold }),
    new TextRun({ text: sayfa, bold }),
  ],
});

// Ödev Tanıtım Formu / veri tablosu satırı
const formSatir = (etiket, deger) => new Paragraph({
  spacing: SP,
  tabStops: [{ type: TabStopType.LEFT, position: 4000 }],
  children: [
    new TextRun({ text: etiket }),
    new TextRun({ children: [new Tab()] }),
    new TextRun({ text: `: ${deger}` }),
  ],
});

// ---------- veri tablosu (Tablo-N) ----------
const BORDER = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
const BORDERS = { top: BORDER, bottom: BORDER, left: BORDER, right: BORDER,
                  insideHorizontal: BORDER, insideVertical: BORDER };

const hucre = (text, w, { bold = false, shade = null, align = AlignmentType.LEFT } = {}) =>
  new TableCell({
    width: { size: w, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    shading: shade ? { type: ShadingType.CLEAR, fill: shade, color: "auto" } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
    children: [new Paragraph({
      alignment: align, spacing: SP1,
      children: [new TextRun({ text, bold })],
    })],
  });

const tablo = (basliklar, satirlar, genislikler) => new Table({
  columnWidths: genislikler,
  width: { size: genislikler.reduce((a, b) => a + b, 0), type: WidthType.DXA },
  borders: BORDERS,
  rows: [
    new TableRow({
      tableHeader: true,
      children: basliklar.map((h, i) =>
        hucre(h, genislikler[i], { bold: true, shade: "D9D9D9", align: AlignmentType.CENTER })),
    }),
    ...satirlar.map((r) => new TableRow({
      cantSplit: true,
      children: r.map((c, i) => hucre(c, genislikler[i])),
    })),
  ],
});

// Tablo başlığı: numara ve isim ÜSTTE, numara KALIN
const tabloBasligi = (no, isim) => new Paragraph({
  alignment: AlignmentType.CENTER, spacing: { ...SP1, before: 180, after: 60 },
  children: [
    new TextRun({ text: `Tablo-${no}`, bold: true }),
    new TextRun({ text: `. ${isim}` }),
  ],
});

module.exports = {
  Document, Packer, Paragraph, TextRun, Footer, AlignmentType, PageNumber,
  NumberFormat, PageBreak, CM, CONTENT_W, SP, SP1,
  p, pr, bos, ortali, bolumBasligi, tekBaslik, anaBaslik, altBaslik, madde,
  grafik, icSatir, formSatir, tablo, tabloBasligi,
};
