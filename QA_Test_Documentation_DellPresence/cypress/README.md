# DelPresence – Cypress E2E

Automation UI untuk modul Web (Admin, Dosen). Pemetaan ke test case ada pada sheet **Automation TC**
di `DelPresence_Test_Cases.xlsx` (kolom *Spec File* dan *Auto ID*).

## Menjalankan
```bash
npm install
export CYPRESS_adminPassword='****' CYPRESS_lecturerUser='****' CYPRESS_lecturerPassword='****'
npm run cy:open     # mode interaktif
npm run cy:run      # headless (Chrome) + video & screenshot saat gagal
```
Prasyarat: frontend berjalan di `http://localhost:3000`, API di `http://localhost:8080`.

## Isi folder `cypress/e2e` (19 spec → 29 skenario AUT-001 … AUT-029)
| Spec | Auto ID |
|---|---|
| logintest | AUT-001, 002 |
| managetest | AUT-003 – 005 (Mata Kuliah) |
| penugasantest | AUT-006 |
| gedungtest | AUT-007 – 009 (+ regresi BUG-003) |
| programstudytest | AUT-010, 011 |
| ruangantest | AUT-012 (+ regresi BUG-004) |
| kelompoktest | AUT-013 |
| impormahasiswatest / impordosentest / imporpegawaitest | AUT-014 / 015 / 016 |
| fakultastest | AUT-017 – 019, 022 |
| jadwalmatkul | AUT-020 |
| tahunakademiktest | AUT-021 (+ regresi BUG-005) |
| dosenmatkultest / dosenjadwaltest | AUT-023 / 024 |
| presensitest | AUT-025, 026 (+ regresi BUG-007) |
| asistentest | AUT-027 |
| asdosjadwaltest / asdospresensitest | AUT-028 / 029 |

Helper bersama ada di `cypress/support/commands.js`: `loginAs`, `rowAction`, `fillForm`, `submitForm`, `confirmDelete`, `expectToast`, `openList`.
Env tambahan untuk role asisten: `CYPRESS_assistantUser`, `CYPRESS_assistantPassword`.

## Catatan
- Nama field form dan endpoint selain yang terlihat di log BAB V (mis. `credits`, `floors`, `/api/admin/buildings`) adalah tebakan berpola; sesuaikan dengan aplikasi.
- Selector (`input[name="code"]`, dll.) mengikuti pola yang terlihat pada log Cypress di BAB V; sesuaikan bila atribut pada UI berbeda.
- Tidak memakai `cy.wait(<ms>)` tetap; sinkronisasi memakai `cy.intercept` + alias agar stabil.
- Kredensial dibaca dari environment variable, bukan di-hardcode.
