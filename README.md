# Novatama Theme v16

App theme untuk Desktop, tombol primary, dan sidebar navigasi **Frappe / ERPNext 16**. Aktif otomatis untuk
semua pengguna Desk setelah app diinstal pada site.

- Sidebar biru tua **#205375**, diambil dari warna dominan logo Novatama.
- Label dan ikon navigasi putih **#FFFFFF**.
- Menu aktif oranye **#F66B0E**, sesuai logo; hover biru lebih terang.
- Berlaku pada light/dark mode, sidebar expanded/collapsed, serta drawer mobile.
- Mengikuti status menu aktif dan perilaku navigasi bawaan Frappe.
- Desktop berlatar biru dengan tile oranye, ikon dan label putih.
- Tombol `.btn-primary` di seluruh Desk berwarna biru, termasuk dialog, dengan hover biru lebih gelap.
- CSS dan JavaScript kecil untuk filter warna gambar ikon; tanpa perubahan core, fixture, atau migrasi data.

Target sidebar navigasi `.body-sidebar`, launcher `.desktop-wrapper`, dan tombol
`.btn-primary` v16. Navbar Desktop, sidebar filter List/Form, login, website,
konten halaman, logo navbar, dan permission tetap bawaan.
Tidak perlu membuat record Website Theme. Jangan aktifkan bersamaan dengan
app lain yang mengubah CSS sidebar karena urutan stylesheet dapat berkonflik.

## Kompatibilitas

Frappe `>=16.0.0,<17.0.0`, dengan atau tanpa ERPNext v16. Gunakan runtime Python
dan Node yang disyaratkan release Frappe v16 pada bench; metadata app menggunakan
Python >=3.14. Frappe disediakan oleh Bench, bukan dependency pip app ini.

## Push ke GitHub

Folder ini adalah root repository mandiri. Buat repository GitHub **public**
bernama `novatama_theme_v16` tanpa auto-generated README, lalu dari folder ini:

```bash
git add .
git commit -m "Add Novatama sidebar theme for Frappe v16"
git remote add origin https://github.com/YOUR_ORG/novatama_theme_v16.git
git push -u origin main
```

Ganti `YOUR_ORG` dengan username/organisasi Anda. Repository lokal sudah memakai
branch `main`; tidak ada remote dan belum dipush.

## Instalasi Frappe Cloud

Custom app memerlukan **private bench / bench group** yang mendukung custom apps.
Repository public saja tidak otomatis membuat app tersedia di shared/public bench
atau Marketplace.

1. Siapkan bench group dengan Frappe v16 dan hubungkan akun GitHub di Frappe Cloud.
2. Pada Apps di bench group, tambahkan custom app dari repository
   `novatama_theme_v16`, branch `main`. Berikan akses GitHub yang diperlukan.
3. Deploy/update bench group dan tunggu build berhasil.
4. Pada site tujuan, buka Apps lalu instal **Novatama Theme v16**.
5. Muat ulang Desk dengan hard refresh. Theme otomatis aktif.

Untuk update: push perubahan ke `main`, jalankan update/deploy dari Frappe Cloud,
lalu hard refresh browser.

Panduan resmi: [Custom app Frappe Cloud](https://docs.frappe.io/cloud/benches/custom-app).

## Update 0.2.1: asset lama masih tampil

Rilis ini menambahkan `?v=0.2.1` pada URL CSS dan JavaScript melalui hooks untuk
memisahkan cache tiap rilis. Referensi filter SVG kini ditempatkan di dokumen,
bukan stylesheet eksternal, agar merujuk ke filter ikon yang benar.

Setelah push commit terbaru, deploy/update app pada bench group Frappe Cloud,
pastikan site memakai deployment tersebut, lalu clear cache site dan reload Desk.
Push GitHub saja tidak mengganti asset pada site yang masih memakai deployment lama.

Untuk bench mandiri setelah mengambil commit terbaru:

```bash
bench build --app novatama_theme_v16
bench --site SITE_NAME clear-cache
bench restart
```

Verifikasi di browser DevTools → Network setelah reload:

- `novatama_theme.css?v=0.2.1` dan `novatama_theme.js?v=0.2.1` harus berstatus 200.
- Response CSS harus mengandung `.desktop-wrapper` dan `.btn.btn-primary`.
- Jika URL masih tanpa versi, site masih memakai hooks/deployment/cache lama.
- Jika asset terbaru sudah dimuat tetapi warna salah, periksa computed style dan
  aturan dari app theme lain yang menimpa warna. Versi dan URL asset saja belum
  membuktikan hasil visual pada setiap site.

## Instalasi melalui Bench

Jalankan dari root bench v16:

```bash
bench get-app --branch main https://github.com/YOUR_ORG/novatama_theme_v16.git
bench --site SITE_NAME install-app novatama_theme_v16
bench build --app novatama_theme_v16
bench --site SITE_NAME clear-cache
```

Ganti `SITE_NAME`, lalu hard refresh Desk. Restart proses bench jika diperlukan
oleh deployment Anda. App memakai file CSS statis melalui `app_include_css`;
tidak membutuhkan npm package atau bundler tersendiri.

## Mengubah warna

Edit `novatama_theme_v16/public/css/novatama_theme.css`:

```css
--novatama-blue: #205375;
--novatama-orange: #f66b0e;
--novatama-white: #ffffff;
```

`--sidebar-hover-color` mengatur warna hover. Token merek berada di `:root`; selector permukaan dibatasi pada area yang ditheme.
Teks putih di atas oranye logo memiliki kontras sekitar 2.9:1, sehingga tidak
memenuhi WCAG AA untuk teks kecil. Jika perlu AA, gunakan oranye lebih gelap
seperti `#B54708` untuk `--novatama-orange`.

## Preview dan verifikasi

Buka `docs/desktop-preview.html` untuk Desktop dan tombol primary, atau
`docs/preview.html` untuk sidebar di browser untuk melihat contoh warna dengan CSS app
sebenarnya. Preview adalah mockup navigasi, bukan site ERPNext yang berjalan.

Paket Python dan asset dapat diperiksa dengan:

```bash
python -m pip install build
python -m build
```

Checklist pada staging v16 sebelum produksi:

- Coba Workspace, List, Form, dan Report; menu aktif tetap oranye setelah route berubah.
- Coba light/dark mode, sidebar collapse/expand, nested section, dan drawer mobile.
- Periksa keyboard focus, ikon, profile, dropdown menu, dan notification panel.
- Periksa Desktop dengan ikon Solid/Outline, folder beserta thumbnail, dan pagination.
- Coba tombol Save/New/Submit serta tombol dialog: normal, hover, active, focus, disabled.
- Periksa dengan role pengguna berbeda; menu dan akses mengikuti permission asli.
- Pastikan request `/assets/novatama_theme_v16/css/novatama_theme.css` berstatus 200.

Belum diuji instalasi pada site Frappe/ERPNext live. Selector dicocokkan dengan
[source sidebar v16](https://github.com/frappe/frappe/blob/version-16/frappe/public/scss/desk/sidebar.scss)
dan [template item v16](https://github.com/frappe/frappe/blob/version-16/frappe/public/js/frappe/ui/sidebar/sidebar_item.html).
Integrasi stylesheet menggunakan [hook resmi](https://docs.frappe.io/framework/user/en/python-api/hooks).

## Ikon Desktop

Filter SVG mempertahankan bentuk gambar asli dan alpha/transparansi. Ikon Solid
berlatar warna dengan simbol putih dipetakan ke oranye/putih; asset Outline bawaan
memakai filter terbalik. Filter otomatis berlaku juga pada ikon yang dirender ulang
dan thumbnail folder. Label di dalam dialog folder tetap mengikuti warna dialog.
Logo custom berupa foto, gradien sangat terang, atau gambar dengan latar putih
yang bukan asset Outline dapat memerlukan asset monokrom yang sesuai; filter
tidak melakukan segmentasi gambar.

## Melepas theme

Uninstall app melalui Apps pada site Frappe Cloud, atau:

```bash
bench --site SITE_NAME uninstall-app novatama_theme_v16
bench --site SITE_NAME clear-cache
```

Kemudian hard refresh. App tidak membuat DocType atau menyimpan data bisnis.

## Lisensi

Kode berlisensi MIT. Nama dan logo Novatama tetap milik pemilik mereknya.
Gambar logo tidak disertakan dalam paket; hanya palet warnanya yang digunakan.
# frappe-novatama-theme-16
