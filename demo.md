# Bootcamp Management System

akun demo,
- murid: testPintar1@gmail.com
- guru: testGuru1@gmail.com
- admin:  testAdmin1@gmail.com

password akundemo: password

Berikut adalah fungsionalitas yang dapat dilakukan oleh masing-masing role:
1. Guru 
- Membuat, mengedit, dan menghapus Batch Bootcamp, serta menerima murid masuk kedalam batch.
- Membuat, mengedit, dan menghapus Pertemuan tiap batch
- Membuat, mengedit, dan menghapus Ujian tiap Batch
- Mengisi presensi kehadiran murid di setiap pertemuan
2. Murid
- Mengumpulkan ujian
- Mendowload materi di pertemuan yang dihadiri

3. Admin
- Memonitor akun murid dan guru
- Membuat tagihan dan menginputkan pembayaran




Alur dasar aplikasi:
1. Guru membuat batch baru, jika tidak ada bootcamp yang berlangsung.
2. Murid register akun + pilih batch tersedia, memerlukan OTP yang akan disimpan. Murid yang berhasil melakukan registrasi memiliki status "belum mendaftar".
3. Admin membuat tagihan beserta pembayaran DP nya untuk murid yang barusan mendaftar. Maka murid tadi berubah statusnya menjadi "mendaftar".
4. Guru mengaccept penerimaan murid tersebut ke dalam daftar batch, sehingga statunnya menjadi "terdaftar".
5. Murid yang sudah memiliki status "terdaftar", bisa melakukan akses ke dashboard.
6. Guru bisa memanej pertemuan, ujian, dan presensi sesuai kebutuhan.
7. Murid bisa submit ujian dan mendowload materi sesuai jadwal dan kehadiran.


