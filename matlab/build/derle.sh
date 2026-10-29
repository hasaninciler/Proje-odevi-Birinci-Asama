#!/bin/bash
# Kullanım: ./derle.sh <builder.js> <aramalar.json> <sayfalar.json> <cikti_klasoru> <ad>
set -e
cd "$(dirname "$0")"
B=$1; A=$2; P=$3; O=$4; AD=$5
for gecis in 1 2; do
  node "$B" "$O/$AD.docx" >/dev/null
  soffice --headless --convert-to pdf --outdir "$O" "$O/$AD.docx" >/dev/null 2>&1
  python3 -I olc.py "$O/$AD.pdf" "$A" "$P" >/dev/null
done
node "$B" "$O/$AD.docx" >/dev/null
soffice --headless --convert-to pdf --outdir "$O" "$O/$AD.docx" >/dev/null 2>&1
cp "$P" /tmp/_onceki.json; python3 -I olc.py "$O/$AD.pdf" "$A" "$P"
cmp -s "$P" /tmp/_onceki.json && echo "SAYFA NUMARALARI TUTARLI" || echo "UYARI: sayfa numaralari degisti, tekrar calistir"
