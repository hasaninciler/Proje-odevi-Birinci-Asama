# Proje Hafızası — Hasan İNCİLER

Bu depoda **iki ayrı dersin ödevi** yürüyor. İkisi aynı veri setini kullanıyor
ama **ayrı ödevlerdir, birbirine karıştırılmamalıdır.**

## Öğrenci

| | |
|---|---|
| Ad Soyad | Hasan İNCİLER |
| Öğrenci No | 250184009 |
| Bölüm / Program | Bilgisayar Teknolojileri / Ön Yüz Yazılım Geliştirme |
| Okul | İstanbul Gelişim Üniversitesi, İstanbul Gelişim Meslek Yüksekokulu |
| Ödev Danışmanı | Öğr. Gör. Çisem Yaşar |

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

**Ödev türü:** Tek ödev (aşamalı değil)
**Hocanın sınırı:** **En fazla 27 kural.** Fazlası öğrenci için zor olacağından sınırlandı.
**Durum:** Tasarım kararlaştırıldı, **henüz kodlanmadı/yazılmadı.**

### Kararlaştırılan tasarım — 3 girdi × 3 bulanık küme = tam 27 kural

| Girdi | Kümeler | Veri setindeki iptal oranı |
|---|---|---|
| `lead_time` | kısa 0-30 / orta 30-120 / uzun 120+ gün | %23 → %40 → %53 |
| `total_of_special_requests` | yok 0 / az 1 / çok 2+ | %48 → %22 → %18 |
| `previous_cancellations` | yok 0 / az 1 / çok 2+ | %34 → **%94** → %53 |

**Çıktı:** iptal riski 0-100 (düşük / orta / yüksek)

Kural tabanının dayanağı — `lead_time` × özel istek çaprazı (gerçek iptal oranları):

| | istek yok | az | çok |
|---|---|---|---|
| kısa | %23 | %14 | %13 |
| orta | %51 | %26 | %23 |
| uzun | %66 | %27 | %28 |

En riskli köşe: uzun vadeli + hiç özel istek yok. En güvenli: kısa vadeli + çok istek.
Kurallar bu tablodan türetilecek, uydurulmayacak.

**Önemli ayrım:** Bulanık mantıkta kurallar elle yazılır, model veriden öğrenmez.
Veri seti burada iki işe yarar: (1) üyelik fonksiyonu sınırlarını belirlemek,
(2) sistemin çıktısını gerçek iptallerle karşılaştırıp doğruluk ölçmek.

### Klasör

- `bulanik-mantik/` — henüz oluşturulmadı. Ders 1 dosyalarıyla karıştırılmayacak.

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

1. **İki dersi karıştırma.** Bir istek geldiğinde hangi derse ait olduğu belli
   değilse sor. "Ödev" kelimesi tek başına hangisi olduğunu belirtmez.
2. Raporlar İGÜ Bilgisayar Teknolojileri Ödev Yazım Kılavuzu'na uyar:
   Times New Roman 11, 1,5 satır aralığı, kenar boşlukları üst/sağ/alt 2,5 cm
   sol 4 cm, ön sayfalar büyük Romen rakamı, gövde Arap rakamı.
3. Kaynakça formatı hocaya sorulacak — kılavuz Giriş bölümünde numaralı (IEEE),
   Kaynakça örneklerinde APA gösteriyor; kendisiyle çelişiyor. **Henüz sorulmadı.**
4. `docs/imza/` ve `teslim/` git'e dahil edilmez (kişisel veri + büyük dosya).
5. Geliştirme dalı: `claude/busy-heisenberg-amm41e`
