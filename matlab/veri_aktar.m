% Veri Seti Tanıtım Dokümanı 5.2'deki aktarma kodu.
% CSV dosyası bu dosyayla aynı klasörde olmalı.

dosya = "250184009_Hasan_Inciler_VeriSeti.csv";
opts = detectImportOptions(dosya, "Delimiter", ",", ...
                           "Encoding", "UTF-8");

% Sayı içeren ama "NULL"/"NA" yazan sütunlar
opts = setvartype(opts, ["children","agent","company"], "double");
opts = setvaropts(opts, ["children","agent","company"], ...
                  "TreatAsMissing", ["NULL","NA"]);

% Tarih sütunu
opts = setvartype(opts, "reservation_status_date", "datetime");
opts = setvaropts(opts, "reservation_status_date", ...
                  "InputFormat", "yyyy-MM-dd");

veri = readtable(dosya, opts);

% "NULL" yazan ülkeleri eksik yap, metin sütunlarını kategoriye çevir
veri.country = string(veri.country);
veri.country(veri.country == "NULL") = missing;
metinler = ["hotel","arrival_date_month","meal","country", ...
    "market_segment","distribution_channel","reserved_room_type", ...
    "assigned_room_type","deposit_type","customer_type", ...
    "reservation_status"];
veri = convertvars(veri, metinler, "categorical");

% Yıl, ay ve gün sütunlarından giriş tarihi oluştur
aylar = ["January","February","March","April","May","June", ...
    "July","August","September","October","November","December"];
[~, ay] = ismember(string(veri.arrival_date_month), aylar);
veri.varis_tarihi = datetime(veri.arrival_date_year, ay, ...
                             veri.arrival_date_day_of_month);

size(veri)   % beklenen: 119390 satır, 33 sütun (32 + varis_tarihi)
head(veri)
summary(veri)
