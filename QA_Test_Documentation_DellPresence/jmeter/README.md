# DelPresence – JMeter Load Test

`DelPresence_LoadTest.jmx` mereplikasi skenario BAB V Tabel 5.50: 1 request login + 13 halaman admin,
masing-masing 250 sampel (250 virtual user × 1 iterasi).

## Menjalankan (non-GUI)
```bash
jmeter -n -t DelPresence_LoadTest.jmx \
  -Jthreads=250 -Jrampup=60 -JwebHost=localhost -JapiHost=localhost \
  -Jusername=admin -Jpassword='****' \
  -l results.jtl -e -o report/
```
Hasil: `results.jtl` (raw) dan `report/index.html` (dashboard, termasuk persentil P90/P95/P99).

## Catatan
- Thread count 250 diambil dari jumlah sampel per label; **ramp-up 60 detik adalah asumsi** (tidak tercatat di dokumen sumber).
- Path login (`/api/auth/login`) mengikuti log Cypress; halaman memakai route frontend `:3000`, API `:8080`.
- Setiap sampler memiliki assertion HTTP 200 sehingga error dihitung di kolom *Error %*.
- File dibuat tanpa menjalankan JMeter; buka sekali di GUI untuk memastikan seluruh elemen termuat sebelum dipakai.
