# SENSOR QUEST — Multimedia Pembelajaran Interaktif Wireless Sensor Network (WSN)

Platform multimedia pembelajaran interaktif berbasis web dengan 3 jalur materi berurutan, laboratorium simulasi interaktif, tantangan evaluasi gamifikasi, sistem nyawa & poin XP, glosarium lengkap 3 materi, serta sertifikat kelulusan.

## Menjalankan di VS Code
1. Buka folder proyek di VS Code.
2. Pasang ekstensi **Live Server** (jika belum ada).
3. Klik kanan `index.html` → **Open with Live Server** (atau buka langsung di peramban).

---

## 3 Jalur Pembelajaran (Peta Misi)

Pengguna harus menyelesaikan seluruh 5 level materi dan tantangan evaluasi di setiap jalur sebelum dapat membuka jalur materi selanjutnya:

### 1. 📡 Materi WSN (Fondasi Jaringan Sensor) — *Terbuka Awal*
- **Level 1:** Mengenal WSN & Topologi Jaringan (`materi-wsn.html`)
- **Level 2:** Sensor Node, Transduser & ADC (`materi-sensor-node.html`)
- **Level 3:** Sink / Base Station & Agregasi Data (`materi-sink.html`)
- **Level 4:** Gateway WSN & Jembatan Protokol IP/Cloud (`materi-gateway.html`)
- **Level 5:** Komunikasi Nirkabel: Zigbee, LoRa, Wi-Fi, BLE (`materi-komunikasi.html`)
- **Tantangan:** Evaluasi 5 Soal WSN (`tantangan.html`) — *Menyelesaikan ini membuka Materi ROUTING MASTER!*

### 2. ⚡ Materi ROUTING MASTER (Protokol Hemat Daya) — *Terbuka Setelah WSN Selesai*
- **Level 1:** Konsep Routing Berdaya Rendah & Metrik Energi (`materi-routing-1.html`)
- **Level 2:** Protokol RPL & Struktur DODAG IPv6 (`materi-routing-2.html`)
- **Level 3:** Protokol Reaktif AODV & DSR (`materi-routing-3.html`)
- **Level 4:** Hierarchical Routing & LEACH Cluster Head (`materi-routing-4.html`)
- **Level 5:** Optimasi Multi-Hop & Model Path Loss $d^2$ (`materi-routing-5.html`)
- **Tantangan:** Evaluasi 5 Soal Routing Master (`tantangan-routing.html`) — *Menyelesaikan ini membuka Materi MESH ARCHITECT!*

### 3. 🕸️ Materi MESH ARCHITECT (Arsitektur Jala & Self-Healing) — *Terbuka Setelah Routing Selesai*
- **Level 1:** Konsep & Topologi Full vs Partial Mesh (`materi-mesh-1.html`)
- **Level 2:** Mekanisme Self-Healing & Toleransi Kegagalan Link (`materi-mesh-2.html`)
- **Level 3:** Standar Zigbee Mesh IEEE 802.15.4 (ZC, ZR, & ZED) (`materi-mesh-3.html`)
- **Level 4:** Multi-Gateway Mesh & Skalabilitas Skala Besar (`materi-mesh-4.html`)
- **Level 5:** CSMA/CA & Mitigasi Tabrakan Sinyal Radio (`materi-mesh-5.html`)
- **Tantangan:** Evaluasi 5 Soal Mesh Architect (`tantangan-mesh.html`)

---

## Fitur & Aturan Sistem
- **Poin Awal 0 XP:** Saat pertama kali login, pengguna memulai dari 0 XP. Poin akan bertambah secara bertahap saat menjawab materi dan evaluasi dengan benar (+100 XP per jawaban benar).
- **Mekanisme Nyawa (3 ❤️) & Pemulihan:** Jika nyawa habis (0 ❤️), pengguna **tidak dapat melanjutkan** ke soal berikutnya. Pengguna wajib mengulang pertanyaan yang belum tepat untuk memulihkan nyawa (+1 ❤️ per perbaikan jawaban benar).
- **Glosarium Lengkap 3 Materi (35 Istilah):** Glosarium interaktif dengan filter kategori untuk Materi WSN, Routing Master, dan Mesh Architect disertai pencarian real-time.
- **3 Lencana Prestasi Utama:**
  1. 🏅 **WSN EXPLORER**
  2. ⚡ **ROUTING MASTER**
  3. 🕸️ **MESH ARCHITECT**
- **15 Laboratorium Simulasi Interaktif:** Eksperimen langsung pengubahan besaran ADC, agregasi data Sink, bridge protokol Gateway, perhitungan metrik cost rute, broadcast DIO/DAO RPL, penemuan jalur AODV, rotasi LEACH, kalkulator hemat energi multi-hop, simulator self-healing, uji mode tidur Zigbee, multi-gateway load balancing, dan contention CSMA/CA.
- **Sistem Penguncian Bertahap (Sequential Unlock):** Jalur materi berikutnya hanya terbuka jika materi sebelumnya telah tuntas 100% (5 level materi + kuis evaluasi).
- **Mode Pengujian Guru / Evaluator (`🔓 Buka Semua Level`):** Tombol toggle di Peta Misi untuk membuka semua level tanpa harus mengerjakan kuis berurutan.
- **Narasi Suara (Web Speech Synthesis):** Suara narator Bahasa Indonesia untuk membacakan konsep materi.
- **Sintesis Audio SFX:** Efek suara nada klik, transmisi paket, jawaban benar/salah, dan kemenangan menggunakan Web Audio API tanpa perlu file audio eksternal.
- **Sertifikat Kelulusan & Cetak PDF:** Sertifikat otomatis yang mencatat nama siswa, status kelulusan, predikat akurasi, dan 3 jalur yang telah diselesaikan.
