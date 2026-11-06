/**
 * SENSOR QUEST — Wireless Sensor Network Learning Platform
 * Multimedia Pembelajaran Interaktif WSN, Routing Master & Mesh Architect
 */
(() => {
    // Utility selectors
    const $ = s => document.querySelector(s);
    const $$ = s => [...document.querySelectorAll(s)];
    const page = document.body.dataset.page || 'index';

    // Route Mapping
    const R = {
        index: 'index.html',
        login: 'login.html',
        dashboard: 'dashboard.html',
        map: 'peta-misi.html',
        // Track 1: Materi WSN
        intro: 'materi-wsn.html',
        sensor: 'materi-sensor-node.html',
        sink: 'materi-sink.html',
        gateway: 'materi-gateway.html',
        wireless: 'materi-komunikasi.html',
        quiz: 'tantangan.html',
        // Track 2: Materi ROUTING MASTER
        'routing-1': 'materi-routing-1.html',
        'routing-2': 'materi-routing-2.html',
        'routing-3': 'materi-routing-3.html',
        'routing-4': 'materi-routing-4.html',
        'routing-5': 'materi-routing-5.html',
        'quiz-routing': 'tantangan-routing.html',
        // Track 3: Materi MESH ARCHITECT
        'mesh-1': 'materi-mesh-1.html',
        'mesh-2': 'materi-mesh-2.html',
        'mesh-3': 'materi-mesh-3.html',
        'mesh-4': 'materi-mesh-4.html',
        'mesh-5': 'materi-mesh-5.html',
        'quiz-mesh': 'tantangan-mesh.html',
        // Common Feedback & Stats
        correct: 'hasil-benar.html',
        wrong: 'hasil-salah.html',
        result: 'hasil-akhir.html',
        profile: 'profil.html',
        achievements: 'prestasi.html'
    };

    // Tracks Metadata & Missions
    const TRACKS_DATA = {
        wsn: {
            id: 'wsn',
            name: 'Materi WSN',
            icon: '📡',
            badgeTitle: 'WSN Explorer',
            tag: 'FONDASI WSN',
            title: 'Materi WSN — Fondasi Jaringan Sensor',
            desc: 'Pengantar arsitektur Wireless Sensor Network, sensor node, base station sink, gateway, & komunikasi frekuensi.',
            badgeId: 'explorer',
            quizRoute: 'quiz',
            missions: [
                ['1', 'Mengenal WSN', 'intro', 'Pengantar konsep jaringan sensor nirkabel & topologi.', 1],
                ['2', 'Sensor Node', 'sensor', 'Unit sensing, ADC, dan transceiver radio lingkungan.', 2],
                ['3', 'Sink / Base Station', 'sink', 'Pusat pengumpul dan agregasi data sensor.', 3],
                ['4', 'Gateway', 'gateway', 'Jembatan protokol WSN lokal ke cloud internet.', 4],
                ['5', 'Komunikasi Nirkabel', 'wireless', 'Gelombang radio: Zigbee, LoRa, Wi-Fi, BLE.', 5],
                ['★', 'Tantangan Evaluasi WSN', 'quiz', 'Evaluasi 5 soal (+100 XP per benar & +500 XP bonus saat tuntas! Total: 1.000 XP).', 6]
            ]
        },
        routing: {
            id: 'routing',
            name: 'Materi ROUTING MASTER',
            icon: '⚡',
            badgeTitle: 'Routing Master',
            tag: 'PROTOKOL & ALGORITMA',
            title: 'Materi ROUTING MASTER — Protokol Hemat Daya',
            desc: 'Protokol routing hemat energi WSN: metrik link, RPL (DODAG IPv6), protokol reaktif AODV, hierarki LEACH, dan multi-hop.',
            badgeId: 'routing',
            quizRoute: 'quiz-routing',
            missions: [
                ['1', 'Metrik Energi Routing', 'routing-1', 'Konsep routing berdaya rendah, metrik link, & LQI.', 1],
                ['2', 'Protokol RPL & DODAG', 'routing-2', 'Struktur pohon IPv6 RPL, pesan DIO, DAO, & rank.', 2],
                ['3', 'Protokol Reaktif AODV', 'routing-3', 'Mekanisme Route Request (RREQ) & Route Reply (RREP).', 3],
                ['4', 'Hierarki & LEACH', 'routing-4', 'Klasterisasi, pemilihan Cluster Head, & agregasi TDMA.', 4],
                ['5', 'Optimasi Multi-Hop', 'routing-5', 'Model path loss d² dan penghematan daya transmisi relay.', 5],
                ['★', 'Tantangan Routing Master', 'quiz-routing', 'Evaluasi 5 soal (+100 XP per benar & +500 XP bonus saat tuntas! Total: 1.000 XP).', 6]
            ]
        },
        mesh: {
            id: 'mesh',
            name: 'Materi MESH ARCHITECT',
            icon: '🕸️',
            badgeTitle: 'Mesh Architect',
            tag: 'ARSITEKTUR JALA & SELF-HEALING',
            title: 'Materi MESH ARCHITECT — Jaringan Tangguh & Self-Healing',
            desc: 'Topologi mesh berdaya tahan tinggi, pemulihan mandiri (self-healing), standar Zigbee mesh, dan multi-gateway skalabel.',
            badgeId: 'mesh',
            quizRoute: 'quiz-mesh',
            missions: [
                ['1', 'Arsitektur Topologi Mesh', 'mesh-1', 'Full mesh vs partial mesh, matriks interkoneksi node.', 1],
                ['2', 'Mekanisme Self-Healing', 'mesh-2', 'Deteksi link putus dan pengalihan rute otomatis sekunder.', 2],
                ['3', 'Standar Zigbee Mesh', 'mesh-3', 'Peran Zigbee Coordinator, Router, & End Device sleep mode.', 3],
                ['4', 'Multi-Gateway Skala Besar', 'mesh-4', 'Load balancing trafik sensor IoT & eliminasi bottleneck.', 4],
                ['5', 'CSMA/CA & Analisis Trafik', 'mesh-5', 'Clear Channel Assessment (CCA), backoff, & mitigasi tabrakan.', 5],
                ['★', 'Tantangan Mesh Architect', 'quiz-mesh', 'Evaluasi 5 soal (+100 XP per benar & +500 XP bonus saat tuntas! Total: 1.000 XP).', 6]
            ]
        }
    };

    // Quizzes Data (5 Questions per track)
    const QUIZZES = {
        wsn: [
            [
                'Perangkat manakah yang bertugas mengumpulkan data langsung dari lingkungan fisik pada Wireless Sensor Network?',
                ['Sensor Node', 'Gateway', 'Server / Cloud', 'User / End Application'],
                0,
                'Sensor Node memiliki sensor/transduser untuk mendeteksi besaran fisik (suhu, getaran, kelembapan), memprosesnya secara lokal, lalu mengirimkannya secara nirkabel.',
                'sensor'
            ],
            [
                'Apa fungsi utama Sink atau Base Station dalam jaringan WSN?',
                ['Menampilkan halaman web ke pengguna', 'Mengumpulkan dan mengagregasi data dari beberapa sensor node', 'Mengukur suhu fisik lingkungan secara langsung', 'Mengganti baterai semua node secara otomatis'],
                1,
                'Sink/Base Station berperan mengumpulkan data dari satu atau banyak sensor node dan melakukan agregasi data sebelum meneruskannya menuju gateway atau pusat pengolahan.',
                'sink'
            ],
            [
                'Komponen yang menjembatani jaringan sensor lokal dengan internet atau server luar adalah...',
                ['Sensor Node', 'Baterai Seluler', 'Gateway WSN', 'Transduser Analog'],
                2,
                'Gateway menjembatani protokol jaringan WSN lokal (seperti IEEE 802.15.4 / Zigbee) dengan jaringan eksternal berbasis TCP/IP atau cloud (MQTT, HTTP).',
                'gateway'
            ],
            [
                'Teknologi nirkabel yang hemat energi dengan jangkauan jarak jauh hingga belasan kilometer untuk sensor IoT luar ruangan adalah...',
                ['Wi-Fi standar (802.11ac)', 'LoRa / LoRaWAN', 'Kabel LAN Ethernet', 'Koneksi HDMI nirkabel'],
                1,
                'LoRa (Long Range) beroperasi pada frekuensi sub-GHz dengan konsumsi daya sangat rendah dan jangkauan mencapai 10-15 km, sangat cocok untuk pemantauan WSN pertanian atau hutan.',
                'wireless'
            ],
            [
                'Mengapa jaringan WSN umumnya memakai banyak sensor node yang tersebar?',
                ['Agar setiap node wajib disambungkan ke kabel', 'Untuk mengamati area spasial dari banyak titik dan mendukung multi-hop', 'Supaya sink dan gateway tidak diperlukan lagi', 'Agar data tidak dapat ditransmisikan'],
                1,
                'Banyak node sensor yang tersebar memungkinkan pemantauan area yang luas secara simultan, memberikan ketahanan redundansi data, dan mendukung transmisi multi-hop hemat daya.',
                'intro'
            ]
        ],
        routing: [
            [
                'Mengapa protokol routing pada Wireless Sensor Network (WSN) sangat berbeda dari routing jaringan komputer internet konvensional?',
                [
                    'Karena WSN memiliki bandwidth tak terbatas',
                    'Karena node WSN memiliki keterbatasan energi baterai sehingga rute harus meminimalkan konsumsi daya',
                    'Karena WSN wajib menggunakan kabel serat optik',
                    'Karena routing WSN tidak memerlukan alamat node sama sekali'
                ],
                1,
                'Node WSN ditenagai baterai kecil yang sulit diganti di medan lapangan. Oleh karena itu, protokol routing WSN wajib berorientasi pada efisiensi daya energi (Energy-Aware Routing) untuk memaksimalkan umur pakai jaringan.',
                'routing-1'
            ],
            [
                'Struktur graf topologi berakar pada Sink yang dibangun oleh protokol IPv6 RPL (RFC 6550) disebut...',
                [
                    'DODAG (Destination-Oriented Directed Acyclic Graph)',
                    'FIFO (First In First Out Buffer)',
                    'Token Ring Star Topology',
                    'CSMA/CA Backoff Array'
                ],
                0,
                'RPL menyusun topologi sensor dalam struktur DODAG yang berakar pada Sink/Root. Setiap node memilih tetangga induk (parent) berdasarkan rank dan Objective Function (OF0 / MRHOF).',
                'routing-2'
            ],
            [
                'Pada protokol routing reaktif AODV, paket apa yang disebarkan secara broadcast oleh sumber saat mencari jalur ke tujuan?',
                [
                    'RREP (Route Reply)',
                    'RREQ (Route Request)',
                    'RERR (Route Error)',
                    'HELLO Beacon Frame'
                ],
                1,
                'AODV bekerja secara on-demand. Jika rute belum ada di tabel, pengirim menyebarkan paket RREQ (Route Request) secara broadcast ke tetangga hingga mencapai tujuan atau node yang memiliki rute aktif.',
                'routing-3'
            ],
            [
                'Apa peran krusial dari Cluster Head (CH) dalam protokol routing hierarkis LEACH?',
                [
                    'Mengubah frekuensi nirkabel menjadi kabel LAN fisik',
                    'Mengumpulkan dan mengagregasi data dari anggota klaster sebelum diteruskan ke Sink',
                    'Mematikan daya Sink pusat secara berkala',
                    'Menghapus paket data yang masuk secara otomatis'
                ],
                1,
                'Cluster Head (CH) bertindak sebagai koordinator lokal yang mengumpulkan data dari semua node anggota klaster, melakukan agregasi/kompresi data untuk mengurangi redundansi, lalu mengirimkannya ke Sink.',
                'routing-4'
            ],
            [
                'Berdasarkan model propagasi radio Path Loss (d²), mengapa transmisi Multi-Hop lebih hemat energi dibanding Single-Hop langsung jarak jauh?',
                [
                    'Karena konsumsi daya transmisi radio berbanding lurus dengan kuadrat jarak (d²), sehingga dua hop pendek memakan daya jauh lebih kecil dari satu transmisi jauh',
                    'Karena node perantara menghasilkan daya baterai mandiri',
                    'Karena sinyal radio berubah menjadi kabel serat optik',
                    'Karena single-hop tidak menggunakan gelombang radio'
                ],
                0,
                'Daya pancar radio bertambah kuadratik terhadap jarak (P ∝ d²). Transmisi langsung 100m butuh 10.000 unit daya, sedangkan dua lompatan 50m hanya butuh 2 × 2.500 = 5.000 unit daya (menghemat 50% daya!).',
                'routing-5'
            ]
        ],
        mesh: [
            [
                'Kemampuan jaringan topologi mesh untuk secara otomatis mendeteksi node yang mati dan mengalihkan paket ke rute alternatif disebut...',
                [
                    'Manual Fallback Override',
                    'Self-Healing (Pemulihan Mandiri)',
                    'Full Broadcast Storm',
                    'Single Point Disruption'
                ],
                1,
                'Self-Healing adalah keunggulan utama topologi mesh. Ketika salah satu node perantara mati atau terhalang, algoritma mesh secara otomatis mendeteksi kegagalan link dan mengalihkan aliran paket ke rute cadangan.',
                'mesh-2'
            ],
            [
                'Pada jaringan Zigbee Mesh (IEEE 802.15.4), perangkat manakah yang bertugas menginisialisasi jaringan, memilih saluran frekuensi, dan menentukan PAN ID?',
                [
                    'Zigbee End Device (ZED)',
                    'Zigbee Coordinator (ZC)',
                    'Zigbee Passive Transducer',
                    'Analog Converter'
                ],
                1,
                'Zigbee Coordinator (ZC) adalah pusat pengendali awal yang memilih kanal radio, membentuk PAN ID jaringan, dan mengatur otorisasi bergabungnya node router dan end-device.',
                'mesh-3'
            ],
            [
                'Mengapa perangkat Zigbee End Device (ZED) tidak diizinkan meneruskan (routing) paket data node lain?',
                [
                    'Karena ZED tidak memiliki antena pemancar',
                    'Agar ZED dapat masuk ke mode tidur (Sleep Mode berdaya mikroampere) demi menghemat baterai hingga bertahun-tahun',
                    'Karena ZED selalu terhubung ke colokan listrik',
                    'Karena ZED dilarang berkomunikasi dengan Zigbee Router'
                ],
                1,
                'ZED dirancang untuk node sensor paling hemat daya. Dengan tidak dibebani fungsi routing, ZED dapat tidur (duty cycle < 1%) dan hanya bangun saat mengambil sampel data fisis atau mengirim pesan sendiri.',
                'mesh-3'
            ],
            [
                'Mengapa arsitektur Multi-Gateway Mesh sangat disarankan untuk pemantauan WSN skala besar (Smart City / Perkebunan Ribuan Hektar)?',
                [
                    'Untuk membagi beban trafik (Load Balancing) dan menghilangkan titik kegagalan tunggal (Single Point of Failure)',
                    'Agar node sensor tidak perlu memakai antena radio',
                    'Supaya semua sensor node wajib dipasang menempel di satu titik',
                    'Untuk membatasi jumlah data agar berkurang menjadi nol'
                ],
                0,
                'Multi-Gateway mendistribusikan aliran paket dari ribuan sensor (Load Balancing) sehingga tidak terjadi kemacetan bottleneck di sekitar satu gateway dan jaringan tetap beroperasi jika salah satu gateway offline.',
                'mesh-4'
            ],
            [
                'Mekanisme apa yang digunakan pada standar IEEE 802.15.4 untuk mendengarkan media udara (CCA) sebelum memancarkan paket guna mencegah tabrakan data?',
                [
                    'CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)',
                    'FTP Direct Protocol',
                    'DNS Round Robin Sync',
                    'Token Bus Handshake'
                ],
                0,
                'CSMA/CA mewajibkan node mendengarkan kanal radio (Clear Channel Assessment) sebelum transmisi. Jika kanal terdeteksi sibuk, node menunda transmisi dengan waktu acak (random backoff) untuk mencegah collision.',
                'mesh-5'
            ]
        ]
    };

    // State Initialization: Poin awal = 0 XP, Nyawa = 3, Badges = []
    const defaultState = {
        name: 'Explorer',
        username: 'explorer',
        email: 'explorer@student.ac.id',
        avatar: '⚡',
        points: 0,
        lives: 3,
        q: 0,
        answers: [],
        completed: false,
        badge: false,
        unlockedLevel: 1,
        completedLevels: [],
        badges: [],
        simulationsUsed: [],
        notifications: true,
        audio: true,
        dark: false,
        devUnlockAll: false,
        activeTrack: 'wsn',
        currentQuizTrack: 'wsn',
        tracks: {
            wsn: {
                unlockedLevel: 1,
                completedLevels: [],
                completed: false,
                quizCompleted: false,
                quizScore: 0,
                quizAnswers: [],
                wrongIndices: [],
                rewardedQuestions: [],
                bonusAwarded: false,
                q: 0
            },
            routing: {
                unlockedLevel: 1,
                completedLevels: [],
                completed: false,
                quizCompleted: false,
                quizScore: 0,
                quizAnswers: [],
                wrongIndices: [],
                rewardedQuestions: [],
                bonusAwarded: false,
                q: 0
            },
            mesh: {
                unlockedLevel: 1,
                completedLevels: [],
                completed: false,
                quizCompleted: false,
                quizScore: 0,
                quizAnswers: [],
                wrongIndices: [],
                rewardedQuestions: [],
                bonusAwarded: false,
                q: 0
            }
        }
    };

    function recalcPoints(state) {
        if (!state || !state.tracks) return 0;
        let total = 0;
        ['wsn', 'routing', 'mesh'].forEach(k => {
            const tr = state.tracks[k];
            if (!tr) return;
            if (Array.isArray(tr.rewardedQuestions)) {
                total += tr.rewardedQuestions.length * 100;
            }
            if (tr.bonusAwarded) {
                total += 500;
            }
        });
        return Math.min(3000, total);
    }

    let S;
    try {
        const stored = JSON.parse(localStorage.getItem('sq-state') || '{}');
        S = { ...defaultState, ...stored };

        if (!S.tracks) {
            S.tracks = {
                wsn: {
                    unlockedLevel: 1,
                    completedLevels: Array.isArray(S.completedLevels) ? [...S.completedLevels] : [],
                    completed: !!S.completed,
                    quizCompleted: !!S.completed,
                    quizScore: (S.answers || []).filter((v, i) => v === QUIZZES.wsn[i]?.[2]).length,
                    quizAnswers: Array.isArray(S.answers) ? [...S.answers] : [],
                    wrongIndices: [],
                    rewardedQuestions: [],
                    bonusAwarded: false,
                    q: S.q || 0
                },
                routing: {
                    unlockedLevel: 1,
                    completedLevels: [],
                    completed: false,
                    quizCompleted: false,
                    quizScore: 0,
                    quizAnswers: [],
                    wrongIndices: [],
                    rewardedQuestions: [],
                    bonusAwarded: false,
                    q: 0
                },
                mesh: {
                    unlockedLevel: 1,
                    completedLevels: [],
                    completed: false,
                    quizCompleted: false,
                    quizScore: 0,
                    quizAnswers: [],
                    wrongIndices: [],
                    rewardedQuestions: [],
                    bonusAwarded: false,
                    q: 0
                }
            };
        }

        ['wsn', 'routing', 'mesh'].forEach(k => {
            if (!S.tracks[k]) S.tracks[k] = { unlockedLevel: 1, completedLevels: [], completed: false, quizCompleted: false, quizScore: 0, quizAnswers: [], wrongIndices: [], rewardedQuestions: [], bonusAwarded: false, q: 0 };
            if (!Array.isArray(S.tracks[k].completedLevels)) S.tracks[k].completedLevels = [];
            if (!Array.isArray(S.tracks[k].quizAnswers)) S.tracks[k].quizAnswers = [];
            if (!Array.isArray(S.tracks[k].wrongIndices)) S.tracks[k].wrongIndices = [];
            if (!Array.isArray(S.tracks[k].rewardedQuestions)) {
                S.tracks[k].rewardedQuestions = [];
                S.tracks[k].quizAnswers.forEach((ans, idx) => {
                    if (ans === QUIZZES[k]?.[idx]?.[2] && !S.tracks[k].rewardedQuestions.includes(idx)) {
                        S.tracks[k].rewardedQuestions.push(idx);
                    }
                });
            }
            if (typeof S.tracks[k].bonusAwarded !== 'boolean') {
                S.tracks[k].bonusAwarded = !!S.tracks[k].quizCompleted && S.tracks[k].rewardedQuestions.length === 5;
            }
        });

        // Always re-sync S.points with the strict rule: 100 XP per correct challenge question + 500 XP bonus per track (max 3000 XP)
        S.points = recalcPoints(S);

        // Only keep the 3 requested badges: 'explorer', 'routing', 'mesh'
        if (Array.isArray(S.badges)) {
            S.badges = S.badges.filter(b => ['explorer', 'routing', 'mesh'].includes(b));
        } else {
            S.badges = [];
        }

        if (!S.activeTrack) S.activeTrack = 'wsn';
        if (!S.currentQuizTrack) S.currentQuizTrack = 'wsn';
        if (!Array.isArray(S.simulationsUsed)) S.simulationsUsed = [];
    } catch (e) {
        S = { ...defaultState };
    }

    const save = () => {
        try {
            localStorage.setItem('sq-state', JSON.stringify(S));
        } catch (e) {
            console.error('Failed to save state', e);
        }
    };

    const go = k => {
        const target = R[k] || k;
        location.href = target;
    };

    const esc = s => String(s || '').replace(/[&<>"']/g, c => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));

    // Sound FX (Web Audio API Synthesizer - works 100% offline without assets)
    class SoundFX {
        constructor() {
            this.ctx = null;
        }
        init() {
            if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (this.ctx && this.ctx.state === 'suspended') {
                this.ctx.resume();
            }
        }
        playTone(freq, duration, type = 'sine', gainVal = 0.08) {
            if (!S.audio) return;
            try {
                this.init();
                if (!this.ctx) return;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
                gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            } catch (err) { }
        }
        click() {
            this.playTone(700, 0.04, 'triangle', 0.05);
        }
        packet() {
            this.playTone(950, 0.06, 'sine', 0.06);
        }
        correct() {
            if (!S.audio) return;
            this.init();
            [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
                setTimeout(() => this.playTone(f, 0.16, 'sine', 0.1), i * 85);
            });
        }
        wrong() {
            if (!S.audio) return;
            this.init();
            [370, 311.13].forEach((f, i) => {
                setTimeout(() => this.playTone(f, 0.22, 'sawtooth', 0.08), i * 130);
            });
        }
        victory() {
            if (!S.audio) return;
            this.init();
            [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((f, i) => {
                setTimeout(() => this.playTone(f, 0.25, 'triangle', 0.12), i * 100);
            });
        }
    }
    const sfx = new SoundFX();

    // Toast Notification
    function toast(s) {
        if (!S.notifications && !s.includes('Audio') && !s.includes('Tema')) return;
        let t = $('#toast');
        if (!t) {
            t = document.createElement('div');
            t.id = 'toast';
            t.className = 'toast';
            document.body.append(t);
        }
        t.style.display = 'block';
        t.textContent = s;
        clearTimeout(t._timer);
        t._timer = setTimeout(() => {
            t.style.display = 'none';
        }, 2800);
    }

    // Award XP Helper (Points strictly from challenge questions & bonuses, max 3000 XP)
    function addXP(amount, reason = '') {
        S.points = Math.max(0, Math.min(3000, S.points + amount));
        save();
        sfx.packet();
        toast(`+${amount} XP ${reason}! Total: ${S.points.toLocaleString()} / 3.000 XP`);
        const pPill = $('#xp-pill');
        if (pPill) pPill.textContent = `⭐ ${S.points.toLocaleString()} Points`;
    }

    // Deduct XP Helper (-100 XP per wrong answer, min 0 XP)
    function deductXP(amount, reason = '') {
        S.points = Math.max(0, S.points - amount);
        save();
        sfx.wrong();
        toast(`-${amount} XP ${reason}! Sisa: ${S.points.toLocaleString()} / 3.000 XP`);
        const pPill = $('#xp-pill');
        if (pPill) pPill.textContent = `⭐ ${S.points.toLocaleString()} Points`;
    }

    // Badge Unlock Helper (Strictly only 3 badges)
    function unlockBadge(badgeId, title = '') {
        if (!['explorer', 'routing', 'mesh'].includes(badgeId)) return;
        if (!S.badges) S.badges = [];
        if (!S.badges.includes(badgeId)) {
            S.badges.push(badgeId);
            if (badgeId === 'explorer') S.badge = true;
            save();
            sfx.victory();
            toast(`🏆 Pencapaian Terbuka: ${title || badgeId.toUpperCase()}!`);
        }
    }

    // Progression Rule Helpers — strictly requires all 5 questions answered correctly!
    function isTrackCompleted(trackKey) {
        const t = S.tracks?.[trackKey];
        if (!t) return false;
        const allLevelsDone = (t.completedLevels?.length || 0) >= 5;
        const currentQ = QUIZZES[trackKey];
        if (!currentQ || !Array.isArray(t.quizAnswers)) return false;
        const correctCount = currentQ.filter((q, idx) => t.quizAnswers[idx] === q[2]).length;
        return allLevelsDone && (correctCount === 5) && !!t.completed;
    }

    function isTrackUnlocked(trackKey) {
        if (S.devUnlockAll) return true;
        if (trackKey === 'wsn') return true;
        if (trackKey === 'routing') return isTrackCompleted('wsn');
        if (trackKey === 'mesh') return isTrackCompleted('routing');
        return false;
    }

    // Speech Synthesis Manager
    let isSpeaking = false;
    function handleSpeech(text, btn) {
        if (!('speechSynthesis' in window)) {
            toast('Browser belum mendukung narasi suara.');
            return;
        }
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            isSpeaking = false;
            if (btn) btn.innerHTML = '🔊 Dengarkan';
            toast('Narasi dihentikan.');
            return;
        }

        window.speechSynthesis.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang = 'id-ID';
        utt.rate = 0.95;

        const voices = window.speechSynthesis.getVoices();
        const idVoice = voices.find(v => v.lang.startsWith('id') || v.lang.includes('ID'));
        if (idVoice) utt.voice = idVoice;

        utt.onstart = () => {
            isSpeaking = true;
            if (btn) btn.innerHTML = '⏹️ Berhenti';
            toast('Memutar narasi materi...');
        };

        utt.onend = () => {
            isSpeaking = false;
            if (btn) btn.innerHTML = '🔊 Dengarkan';
        };

        utt.onerror = () => {
            isSpeaking = false;
            if (btn) btn.innerHTML = '🔊 Dengarkan';
        };

        window.speechSynthesis.speak(utt);
    }

    // Modal Helper
    function showModal(title, contentHtml) {
        closeModal();
        const overlay = document.createElement('div');
        overlay.id = 'modal-overlay';
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${title}</h2>
                    <button class="modal-close" id="modal-close-btn">&times;</button>
                </div>
                <div class="modal-body">${contentHtml}</div>
            </div>
        `;
        document.body.appendChild(overlay);

        $('#modal-close-btn').onclick = closeModal;
        overlay.onclick = e => {
            if (e.target === overlay) closeModal();
        };
    }

    function closeModal() {
        const m = $('#modal-overlay');
        if (m) m.remove();
    }

    // Comprehensive Glossary Data covering ALL 3 Materials: WSN, ROUTING MASTER, & MESH ARCHITECT
    const glossaryItems = [
        // --- MATERI 1: WSN FUNDAMENTALS ---
        {
            category: 'WSN',
            badge: '📡 Materi WSN',
            term: 'Sensor Node (Mote)',
            desc: 'Unit mandiri yang mengukur besaran fisis lingkungan (suhu, kelembapan, getaran, gas), memprosesnya secara lokal dengan mikrokontroler, lalu mentransmisikannya secara nirkabel.'
        },
        {
            category: 'WSN',
            badge: '📡 Materi WSN',
            term: 'Sink / Base Station',
            desc: 'Node pusat dalam WSN yang bertugas mengumpulkan, memvalidasi, dan mengagregasi aliran paket data dari seluruh sensor node sebelum diteruskan ke gateway eksternal.'
        },
        {
            category: 'WSN',
            badge: '📡 Materi WSN',
            term: 'Gateway WSN',
            desc: 'Perangkat jembatan protokol (Protocol Translator) yang menerjemahkan protokol sensor lokal (IEEE 802.15.4 / Zigbee) menjadi protokol internet standar (TCP/IP, MQTT, HTTP) menuju cloud.'
        },
        {
            category: 'WSN',
            badge: '📡 Materi WSN',
            term: 'Data Aggregation',
            desc: 'Teknik pemadatan dan peringkasan data (rata-rata, nilai min/max) di node Sink untuk menghemat bandwidth transmisi eksternal dan menghemat baterai radio.'
        },
        {
            category: 'WSN',
            badge: '📡 Materi WSN',
            term: 'ADC (Analog-to-Digital Converter)',
            desc: 'Rangkaian elektronik pada subsistem sensing yang mengubah tegangan sinyal listrik analog kontinu dari transduser sensor menjadi angka biner/digital untuk mikrokontroler.'
        },
        {
            category: 'WSN',
            badge: '📡 Materi WSN',
            term: 'Transceiver RF',
            desc: 'Modul perangkat keras terintegrasi yang menggabungkan fungsi pemancar (Transmitter) dan penerima (Receiver) gelombang radio pada pita frekuensi 2.4 GHz atau Sub-GHz.'
        },
        {
            category: 'WSN',
            badge: '📡 Materi WSN',
            term: 'Duty Cycle',
            desc: 'Persentase waktu aktif (sensing & transmisi) dibandingkan waktu tidur (Sleep Mode). Sebagian besar sensor node memiliki duty cycle < 5% agar baterai mampu bertahan bertahun-tahun.'
        },
        {
            category: 'WSN',
            badge: '📡 Materi WSN',
            term: 'RSSI (Received Signal Strength Indicator)',
            desc: 'Ukuran kekuatan daya sinyal frekuensi radio yang diterima oleh antena, diukur dalam satuan decibel-milliwatts (dBm). Semakin mendekati 0 dBm, sinyal semakin kuat.'
        },
        {
            category: 'WSN',
            badge: '📡 Materi WSN',
            term: 'LoRa & LoRaWAN',
            desc: 'Teknologi komunikasi nirkabel jarak jauh (hingga 15 km) berdaya sangat rendah pada frekuensi Sub-GHz (915/433 MHz), sangat cocok untuk pemantauan perkebunan dan kehutanan.'
        },
        {
            category: 'WSN',
            badge: '📡 Materi WSN',
            term: 'BLE (Bluetooth Low Energy)',
            desc: 'Varian protokol Bluetooth berdaya rendah untuk transmisi berkala jarak dekat (10-30 meter), jamak diterapkan pada sensor kesehatan dan perangkat wearable.'
        },
        {
            category: 'WSN',
            badge: '📡 Materi WSN',
            term: 'Topologi Star (Bintang)',
            desc: 'Bentuk arsitektur jaringan di mana semua sensor node mengirimkan paket data secara langsung (single hop) menuju Sink pusat tanpa perantara.'
        },
        {
            category: 'WSN',
            badge: '📡 Materi WSN',
            term: 'Topologi Tree (Pohon / Hierarkis)',
            desc: 'Arsitektur jaringan berstruktur cabang di mana leaf nodes mengirim data ke parent node / cluster head sebelum bermuara ke base station Sink.'
        },

        // --- MATERI 2: ROUTING MASTER ---
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'Energy-Aware Routing',
            desc: 'Strategi penentuan rute transmisi WSN yang memprioritaskan efisiensi energi baterai dan pemerataan beban konsumsi daya guna memaksimalkan masa pakai seluruh jaringan (network lifetime).'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'Link Cost (Biaya Rute)',
            desc: 'Nilai metrik gabungan yang menghitung beban suatu jalur transmisi berdasarkan jarak kuadrat (d²), Packet Reception Rate (PRR), dan persentase sisa baterai node.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'Multi-Hop Routing',
            desc: 'Mekanisme pengiriman data di mana paket melompati beberapa node perantara (relay) untuk memecah jarak transmisi jauh menjadi beberapa lompatan pendek yang hemat energi.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'Path Loss Model (d²)',
            desc: 'Model propagasi radio di mana daya transmisi meningkat sebanding dengan kuadrat jarak (P ∝ d²). Membagi jarak 2d menjadi dua hop d menghemat konsumsi energi hingga 50%.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'Energy Hole (Hotspot Problem)',
            desc: 'Fenomena di mana node sensor di sekitar Sink mengalami kehabisan baterai lebih cepat karena harus meneruskan trafik dari seluruh penjuru jaringan WSN.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'RPL (RFC 6550)',
            desc: 'Routing Protocol for Low-Power and Lossy Networks — standar routing IPv6 resmi IETF untuk sensor terbatas daya yang membentuk topologi pohon berakar DODAG.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'DODAG',
            desc: 'Destination-Oriented Directed Acyclic Graph — struktur graf berarah bebas siklus yang berakar pada Sink, digunakan RPL untuk mengalirkan data sensor menuju internet.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'DIO (DODAG Information Object)',
            desc: 'Pesan kontrol broadcast RPL yang disebarkan oleh root Sink ke node sekitar berisi parameter jaringan, rank, dan Objective Function untuk pembentukan pohon rute.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'DAO (Destination Advertisement Object)',
            desc: 'Pesan kontrol unicast RPL yang dikirimkan oleh leaf node menuju parent/root untuk mencatat rute aliran balik (downward routing) dari internet ke sensor.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'Objective Function (OF0 & MRHOF)',
            desc: 'Algoritma RPL yang mendefinisikan cara node menghitung Rank dan memilih tetangga induk (preferred parent), misalnya berdasarkan jumlah hop (OF0) atau kualitas link ETX (MRHOF).'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'AODV (Ad hoc On-Demand Distance Vector)',
            desc: 'Protokol routing reaktif yang hanya mencari jalur saat hendak mengirim paket melalui broadcast RREQ dan balasan unicast RREP, sangat hemat memori tabel routing.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'RREQ (Route Request)',
            desc: 'Paket broadcast pada AODV yang disebarkan sumber ke seluruh tetangga untuk menemukan jalur aktif menuju node tujuan yang belum tercatat.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'RREP (Route Reply)',
            desc: 'Paket unicast balasan pada AODV yang dikirimkan dari node tujuan atau perantara balik ke sumber untuk mengonfirmasi rute aktif.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'Destination Sequence Number',
            desc: 'Nomor urut penanda waktu rute pada protokol AODV yang mencegah terjadinya routing loops dan memastikan node selalu memilih rute paling mutakhir.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'LEACH',
            desc: 'Low-Energy Adaptive Clustering Hierarchy — protokol routing berbasis klaster di mana peran Cluster Head digilirkan secara periodik agar baterai node tidak cepat habis.'
        },
        {
            category: 'ROUTING',
            badge: '⚡ Routing Master',
            term: 'Cluster Head (CH)',
            desc: 'Node terpilih dalam suatu klaster LEACH yang bertugas mengumpulkan data dari anggota klaster, memadatkannya (agregasi), lalu mengirimkannya ke Sink jarak jauh.'
        },

        // --- MATERI 3: MESH ARCHITECT ---
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'Topologi Mesh (Jala)',
            desc: 'Arsitektur jaringan interkonektif di mana node sensor saling terhubung dengan banyak tetangga dan dapat meneruskan paket data node lain secara multi-hop.'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'Full Mesh vs Partial Mesh',
            desc: 'Full Mesh menghubungkan setiap node ke semua node lainnya (L = N(N-1)/2), sedangkan Partial Mesh menghubungkan node ke tetangga terdekat yang sejalan untuk menghemat overhead radio.'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'Self-Healing (Pemulihan Mandiri)',
            desc: 'Kemampuan otomatis jaringan mesh mendeteksi link yang putus atau node yang mati, lalu secara dinamis mengalihkan paket ke jalur cadangan tanpa intervensi manual.'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'Fault Tolerance & Redundansi',
            desc: 'Ketahanan arsitektur jaringan terhadap kerusakan komponen fisis; tersedianya banyak jalur alternatif menjamin layanan pemantauan bebas downtime (Zero Downtime).'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'Zigbee Coordinator (ZC)',
            desc: 'Perangkat utama (Root) jaringan Zigbee yang bertugas memulai jaringan, memilih saluran frekuensi radio, menentukan 16-bit PAN ID, dan menyimpan kunci keamanan.'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'Zigbee Router (ZR)',
            desc: 'Node perantara dalam jaringan Zigbee yang bertindak sebagai pemancar multi-hop untuk memperluas jangkauan transmisi mesh antarnode.'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'Zigbee End Device (ZED)',
            desc: 'Node sensor tepi berdaya ultra-rendah yang tidak memiliki fungsi routing; dapat tidur (sleep mode < 1% duty cycle) sehingga baterai bertahan bertahun-tahun.'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'PAN ID (Personal Area Network ID)',
            desc: 'Pengidentifikasi jaringan unik 16-bit yang membedakan satu jaringan sensor nirkabel Zigbee dengan jaringan nirkabel lain yang beroperasi pada frekuensi sama.'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'Multi-Gateway Mesh',
            desc: 'Penerapan beberapa gateway pada area pemantauan luas untuk membagi beban trafik (Load Balancing) dan menghilangkan Single Point of Failure (SPOF).'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'Load Balancing Sensor',
            desc: 'Mekanisme pemerataan distribusi aliran paket data dari ribuan node sensor ke beberapa gateway terdekat guna mencegah kemacetan bottleneck di satu gerbang.'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'CSMA/CA',
            desc: 'Carrier Sense Multiple Access with Collision Avoidance — protokol akses media nirkabel IEEE 802.15.4 di mana node wajib mendengarkan kanal sebelum transmisi untuk mencegah tabrakan data.'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'Clear Channel Assessment (CCA)',
            desc: 'Proses mendengarkan energi radio pada saluran frekuensi yang dilakukan transceiver sebelum mulai memancarkan paket; memastikan media udara sedang sepi.'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'Random Backoff',
            desc: 'Periode penundaan acak yang dijalankan oleh node sensor jika kanal radio terdeteksi sedang sibuk, mencegah node memancar bersamaan di saat berikutnya.'
        },
        {
            category: 'MESH',
            badge: '🕸️ Mesh Architect',
            term: 'Packet Collision',
            desc: 'Tabrakan dua atau lebih gelombang sinyal radio elektromagnetik yang dipancarkan bersamaan pada frekuensi yang sama, menyebabkan paket rusak dan harus dikirim ulang.'
        }
    ];

    function openGlossary() {
        sfx.click();
        const categories = [
            { id: 'ALL', label: 'Semua Istilah (35)' },
            { id: 'WSN', label: '📡 Materi WSN' },
            { id: 'ROUTING', label: '⚡ Routing Master' },
            { id: 'MESH', label: '🕸️ Mesh Architect' }
        ];

        const html = `
            <div class="field" style="margin-top:0">
                <input id="glossary-search" placeholder="🔍 Cari istilah WSN, Routing, Mesh (misal: Gateway, RPL, Zigbee, CSMA, ADC)..." autocomplete="off">
            </div>
            <div class="sim-tabs" id="glossary-cats" style="margin:8px 0 14px">
                ${categories.map((c, i) => `
                    <button class="sim-tab-btn ${i === 0 ? 'active' : ''}" data-cat="${c.id}">${c.label}</button>
                `).join('')}
            </div>
            <div id="glossary-list" style="max-height: 420px; overflow-y: auto; display: grid; gap: 10px;">
                ${glossaryItems.map(g => `
                    <div class="stat glossary-item" data-category="${g.category}" data-term="${esc(g.term.toLowerCase())}">
                        <div class="row" style="margin-bottom:4px">
                            <b style="color:#0891b2;font-size:13px">${esc(g.term)}</b>
                            <span class="pill ${g.category === 'WSN' ? 'green' : g.category === 'ROUTING' ? 'gold' : 'soft'}" style="font-size:9px;padding:2px 8px">${g.badge}</span>
                        </div>
                        <p class="small" style="margin:5px 0 0;line-height:1.6">${esc(g.desc)}</p>
                    </div>
                `).join('')}
            </div>
        `;
        showModal('📖 Glosarium Lengkap WSN, Routing & Mesh', html);

        let activeCat = 'ALL';
        const searchInput = $('#glossary-search');

        function filterList() {
            const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
            $$('.glossary-item').forEach(el => {
                const matchCat = activeCat === 'ALL' || el.dataset.category === activeCat;
                const matchText = !q || el.dataset.term.includes(q) || el.textContent.toLowerCase().includes(q);
                el.style.display = (matchCat && matchText) ? 'block' : 'none';
            });
        }

        if (searchInput) searchInput.oninput = filterList;

        $$('#glossary-cats .sim-tab-btn').forEach(btn => {
            btn.onclick = () => {
                sfx.click();
                $$('#glossary-cats .sim-tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCat = btn.dataset.cat;
                filterList();
            };
        });
    }


    // UI Templates
    function head(e, t, d, extra = '') {
        return `<div class="head"><div><div class="eyebrow">${e}</div><h1>${t}</h1><p>${d}</p></div>${extra}</div>`;
    }

    function stat(i, l, v, d) {
        return `<div class="stat"><div class="row"><span>${i}</span><small>${l}</small></div><div class="value">${v}</div><div class="hint">${d}</div></div>`;
    }

    function flow(ns, id = 'wsn-flow') {
        return `<div class="flow" id="${id}">${ns.map((n, i) => `
            ${i ? `<span class="arrow" id="flow-arr-${i - 1}">→</span>` : ''}
            <div class="node" id="flow-node-${i}">
                <span style="font-size:24px">${n[0]}</span>
                <strong>${n[1]}</strong>
                <small>${n[2]}</small>
            </div>
        `).join('')}</div>`;
    }

    function header() {
        return `
            <header class="top">
                <a class="brand" href="dashboard.html">
                    <div class="mark">${S.avatar || '⚡'}</div>
                    <div>
                        <b>SENSOR <span>QUEST</span></b>
                        <div class="sub">Wireless Sensor Networks</div>
                    </div>
                </a>
                <div class="metrics">
                    <span class="pill green" title="Status Jaringan Real-Time">
                        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#10b981;box-shadow:0 0 6px #10b981"></span>
                        RF NETWORK: ONLINE [2.4 GHz]
                    </span>
                    <button class="pill clickable" id="btn-glossary-top">📖 Glosarium</button>
                    <span class="pill gold" id="xp-pill">⭐ ${S.points.toLocaleString()} Points</span>
                    <span class="pill rose" id="lives-pill">❤️ ${S.lives}/3 Lives</span>
                    <a href="profil.html" class="pill">👤 ${esc(S.name)}</a>
                </div>
            </header>
        `;
    }

    function nav(a) {
        const curTrack = S.activeTrack || 'wsn';
        const totalCompleted = ['wsn', 'routing', 'mesh'].reduce((acc, k) => acc + (S.tracks?.[k]?.completedLevels?.length || 0), 0);
        const overallPct = Math.round((totalCompleted / 15) * 100);

        const isLessonActive = ['intro', 'sensor', 'sink', 'gateway', 'wireless',
            'routing-1', 'routing-2', 'routing-3', 'routing-4', 'routing-5',
            'mesh-1', 'mesh-2', 'mesh-3', 'mesh-4', 'mesh-5'].includes(a);

        const isQuizActive = ['quiz', 'quiz-routing', 'quiz-mesh', 'correct', 'wrong', 'result'].includes(a);

        let lessonTarget = 'sensor';
        if (curTrack === 'routing') lessonTarget = 'routing-1';
        else if (curTrack === 'mesh') lessonTarget = 'mesh-1';

        let quizTarget = TRACKS_DATA[curTrack]?.quizRoute || 'quiz';

        return `
            <aside class="side">
                <nav class="nav">
                    <a class="${a === 'dashboard' ? 'active' : ''}" href="dashboard.html">
                        <span>🏠</span> <span>Beranda</span>
                    </a>
                    <a class="${a === 'map' ? 'active' : ''}" href="peta-misi.html">
                        <span>🗺️</span> <span>Peta Misi (3 Jalur)</span>
                    </a>
                    <a class="${isLessonActive ? 'active' : ''}" href="${R[lessonTarget]}">
                        <span>📚</span> <span>Materi Belajar</span>
                    </a>
                    <a class="${isQuizActive ? 'active' : ''}" href="${R[quizTarget]}">
                        <span>🎯</span> <span>Tantangan Evaluasi</span>
                    </a>
                    <a class="${a === 'achievements' ? 'active' : ''}" href="prestasi.html">
                        <span>🏆</span> <span>Prestasi</span>
                    </a>
                    <a class="${a === 'profile' ? 'active' : ''}" href="profil.html">
                        <span>👤</span> <span>Profil</span>
                    </a>
                    <a href="#" id="side-glossary-btn" style="border: 1px dashed var(--l); margin-top: 6px;">
                        <span>📖</span> <span>Glosarium Lengkap</span>
                    </a>
                </nav>
                <div class="sidebox">
                    <div class="row">
                        <b>⚡ STATUS EXPLORER</b>
                        <span class="tiny muted">${totalCompleted}/15 Level</span>
                    </div>
                    <p style="margin:8px 0">3 Jalur: WSN → Routing → Mesh. Progres tersimpan lokal.</p>
                    <div class="progress"><span style="width:${overallPct}%"></span></div>
                    <div class="row tiny" style="margin-top:6px">
                        <span>Total Kurikulum</span>
                        <b>${overallPct}%</b>
                    </div>
                </div>
            </aside>
        `;
    }

    function shell(c, a = 'dashboard') {
        document.body.innerHTML = `
            ${header()}
            <div class="layout">
                ${nav(a)}
                <main class="main">${c}</main>
            </div>
            <footer class="footer">
                <span>⚡ <b>SENSOR QUEST</b> · Multimedia Pembelajaran Wireless Sensor Network, Routing Master & Mesh Architect</span>
                <span>Proyek Multimedia Pembelajaran Interaktif · Data Tersimpan Lokal</span>
            </footer>
            <div id="toast" class="toast" style="display:none"></div>
        `;
        bind();
    }

    // Packet Flow Animation Runner — supports any flow container id
    function runPacketAnimation(flowId = 'wsn-flow') {
        sfx.click();
        const nodes = $$(`#${flowId} .node`);
        const arrows = $$(`#${flowId} .arrow`);
        const animNote = $('#animnote');

        if (!nodes.length) return;

        const stagesByFlow = {
            'wsn-flow': [
                '1. 🌱 Sensing lingkungan fisik...',
                '2. 📶 Transmisi RF ke Sink...',
                '3. 📥 Agregasi data di Sink...',
                '4. 🌐 Gateway forward ke IP...',
                '5. ☁️ Paket tiba di Cloud!'
            ],
            'routing-flow': [
                '1. 🧭 Node hitung biaya rute...',
                '2. 📶 Pilih jalur optimal...',
                '3. 🔄 Multi-hop relay...',
                '4. 📥 Paket tiba di Sink...',
                '5. ✅ Routing hemat energi sukses!'
            ],
            'mesh-flow': [
                '1. 📡 Node kirim paket...',
                '2. 🕸️ Mesh routing aktif...',
                '3. 🔄 Redundansi jalur...',
                '4. 📥 Sink terima data...',
                '5. ✅ Mesh self-healing sukses!'
            ]
        };
        const stages = stagesByFlow[flowId] || stagesByFlow['wsn-flow'];

        nodes.forEach(n => n.classList.remove('pulsing'));
        arrows.forEach(a => a.classList.remove('active'));

        let step = 0;
        function nextStep() {
            if (step < nodes.length) {
                nodes[step].classList.add('pulsing');
                sfx.packet();
                if (animNote) animNote.textContent = stages[step] || 'Paket berpindah...';

                if (step > 0 && arrows[step - 1]) {
                    arrows[step - 1].classList.add('active');
                }

                setTimeout(() => {
                    nodes[step].classList.remove('pulsing');
                    if (arrows[step - 1]) arrows[step - 1].classList.remove('active');
                    step++;
                    if (step < nodes.length) {
                        setTimeout(nextStep, 250);
                    } else {
                        if (animNote) {
                            const doneMsg = {
                                'wsn-flow': '✓ Transmisi paket data WSN berhasil (Latency: 38ms | RSSI: -64 dBm)',
                                'routing-flow': '✓ Routing hemat energi selesai! Node memilih jalur biaya minimum.',
                                'mesh-flow': '✓ Mesh self-healing sukses! Paket tiba meski ada node putus.'
                            };
                            animNote.textContent = doneMsg[flowId] || '✓ Transmisi berhasil';
                            setTimeout(() => {
                                animNote.textContent = 'Diagram interaktif aliran data';
                            }, 3500);
                        }
                    }
                }, 700);
            }
        }
        nextStep();
    }

    // Complete Level Helper (Materi dibaca tuntas, XP khusus dari tantangan evaluasi)
    function completeLevel(trackKey, levelNum, nextRoute) {
        if (!S.tracks) S.tracks = {};
        if (!S.tracks[trackKey]) S.tracks[trackKey] = { unlockedLevel: 1, completedLevels: [] };
        const t = S.tracks[trackKey];
        if (!t.completedLevels) t.completedLevels = [];
        if (!t.completedLevels.includes(levelNum)) {
            t.completedLevels.push(levelNum);
            toast(`✓ Level ${levelNum} ${TRACKS_DATA[trackKey]?.name || ''} selesai dipelajari!`);
        }
        t.unlockedLevel = Math.max(t.unlockedLevel || 1, levelNum + 1);

        if (trackKey === 'wsn') {
            if (!S.completedLevels.includes(levelNum)) S.completedLevels.push(levelNum);
            S.unlockedLevel = Math.max(S.unlockedLevel || 1, levelNum + 1);
        }

        save();
        go(nextRoute);
    }

    // Interactive Mini-Lab Generators for All 15 Lessons (disabled)
    function renderLessonLab(levelNum, trackKey) {
        return '';
    }

    // Bind Mini-Labs Handlers (disabled)
    function bindLessonLab(levelNum, trackKey) {
        // labs removed
    }

    // Curated YouTube Video Reference for all 15 Lessons
    const LESSON_YOUTUBE = {
        'wsn-1': 'https://youtu.be/BBvG7uzmOV0?si=a-FBvjaowrqm_3EK',
        'wsn-2': 'https://youtu.be/BBvG7uzmOV0?si=a-FBvjaowrqm_3EK',
        'wsn-3': 'https://youtu.be/BBvG7uzmOV0?si=a-FBvjaowrqm_3EK',
        'wsn-4': 'https://youtu.be/BBvG7uzmOV0?si=a-FBvjaowrqm_3EK',
        'wsn-5': 'https://youtu.be/BBvG7uzmOV0?si=a-FBvjaowrqm_3EK',
        'routing-1': 'https://youtu.be/emcyqeOx_JY?si=MzjGWMpsdFqc8v3-',
        'routing-2': 'https://youtu.be/emcyqeOx_JY?si=MzjGWMpsdFqc8v3-',
        'routing-3': 'https://youtu.be/emcyqeOx_JY?si=MzjGWMpsdFqc8v3-',
        'routing-4': 'https://youtu.be/emcyqeOx_JY?si=MzjGWMpsdFqc8v3-',
        'routing-5': 'https://youtu.be/emcyqeOx_JY?si=MzjGWMpsdFqc8v3-',
        'mesh-1': 'https://youtu.be/8UZlwhiWKmA?si=X0u9poU0b0IpXYPD',
        'mesh-2': 'https://youtu.be/8UZlwhiWKmA?si=X0u9poU0b0IpXYPD',
        'mesh-3': 'https://youtu.be/8UZlwhiWKmA?si=X0u9poU0b0IpXYPD',
        'mesh-4': 'https://youtu.be/8UZlwhiWKmA?si=X0u9poU0b0IpXYPD',
        'mesh-5': 'https://youtu.be/8UZlwhiWKmA?si=X0u9poU0b0IpXYPD'
    };

    // Generic Lesson Page Template
    function lesson(l, t, sub, icon, def, ns, points, summary, prev, next, trackKey = 'wsn', tip = '', flowId = '', ytUrl = '') {
        const trData = TRACKS_DATA[trackKey] || TRACKS_DATA.wsn;

        // Strict Lock Protection: Cannot open next track if previous track challenge is not 5/5 correct!
        if (!isTrackUnlocked(trackKey)) {
            const prevTrackName = trackKey === 'routing' ? 'Materi WSN' : 'Materi ROUTING MASTER';
            shell(`
                ${head('AKSES TERKUNCI', 'Materi Belum Terbuka 🔒', 'Selesaikan dan jawab dengan benar seluruh 5 soal evaluasi modul sebelumnya.')}
                <div class="card" style="text-align:center;padding:40px 20px">
                    <div style="font-size:55px;margin-bottom:12px">🔒</div>
                    <h2>${trData.name} Masih Terkunci</h2>
                    <p class="small muted" style="max-width:500px;margin:12px auto 20px;line-height:1.8">
                        Untuk membuka materi ini, Anda harus menyelesaikan seluruh materi dan <b>menjawab semua 5 soal tantangan evaluasi dengan benar (Skor 5/5)</b> pada <b>${prevTrackName}</b>.
                    </p>
                    <button class="btn primary" data-go="map">← Kembali ke Peta Misi</button>
                </div>
            `, 'dashboard');
            return;
        }
        const finalYt = (ytUrl && ytUrl.startsWith('http'))
            ? ytUrl
            : (flowId && flowId.startsWith('http'))
                ? flowId
                : (LESSON_YOUTUBE[`${trackKey}-${l}`] || LESSON_YOUTUBE[`wsn-${l}`] || '');
        const validFlowId = (flowId && !flowId.startsWith('http'))
            ? flowId
            : (trackKey === 'routing' ? 'routing-flow' : trackKey === 'mesh' ? 'mesh-flow' : 'wsn-flow');
        const eyebrowText = `${trData.name.toUpperCase()} · LEVEL ${l}`;
        const resolvedFlowId = validFlowId;
        const defaultTip = {
            wsn: '💡 <b>Tips WSN:</b> Ingat urutan: Sensor Node → Sink (agregasi) → Gateway (translasi protokol) → Cloud. Setiap komponen memiliki peran yang tidak bisa saling menggantikan.',
            routing: '💡 <b>Tips Routing:</b> Routing WSN selalu prioritaskan efisiensi energi baterai. Rumus C = (d²/PRR) × (100/Battery%) adalah kunci memahami metrik rute.',
            mesh: '💡 <b>Tips Mesh:</b> Kekuatan mesh ada pada redundansi jalur. Jika satu node mati, self-healing memastikan paket tetap sampai via rute cadangan.'
        }[trackKey] || '💡 <b>Tips Belajar:</b> Pahami konsep ini sebelum melanjutkan ke materi berikutnya.';

        shell(`
            ${head(eyebrowText, t, sub, `<span class="pill gold">${trData.icon} ${trData.name}</span>`)}
            <div class="grid two">
                <section class="card">
                    <div class="diagram">
                        <div class="row stack">
                            <div>
                                <div class="eyebrow">${trData.tag}</div>
                                <h2>${icon} ${t}</h2>
                            </div>
                            <button class="btn secondary" id="btn-speak-lesson" data-speak="${esc(def)}">🔊 Dengarkan</button>
                        </div>
                        <p class="small" style="line-height:1.9">${def}</p>
                        ${flow(ns, resolvedFlowId)}
                        <div class="row" style="margin-top:10px">
                            <button class="btn soft" id="animate">▶ Lihat Animasi Paket</button>
                            <span id="animnote" class="tiny muted">Diagram interaktif aliran data</span>
                        </div>
                    </div>

                    ${renderLessonLab(l, trackKey)}

                    <div class="card" style="margin-top:14px;background:var(--subtle-bg)">
                        <h3>Poin Penting untuk Diingat</h3>
                        <ul>
                            ${points.map(p => `<li class="small" style="line-height:1.9;margin:6px 0">${p}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="row" style="margin-top:16px">
                        <button class="btn secondary" data-go="${prev}">← Materi Sebelumnya</button>
                        <button class="btn primary" id="btn-next-level">
                            ${next.startsWith('quiz') ? 'Lanjut ke Tantangan Evaluasi 🎯 →' : 'Materi Berikutnya →'}
                        </button>
                    </div>
                </section>

                                <aside class="card">
                    <h3>Ringkasan Pembelajaran</h3>
                    <div class="callout">${summary}</div>

                    ${finalYt ? `
                        <div class="yt-box" style="margin-top:16px;background:rgba(239,68,68,0.06);border:1.5px solid #dc2626;border-radius:12px;padding:14px;box-shadow:0 4px 12px rgba(220,38,38,0.12)">
                            <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
                                <span style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:#ff0000;color:#ffffff;border-radius:7px;font-size:15px;font-weight:900">&#9654;</span>
                                <div>
                                    <b style="color:#dc2626;font-size:12px;letter-spacing:0.5px">VIDEO MATERI YOUTUBE</b>
                                    <div class="tiny muted" style="font-size:10px">${trData.name} &middot; Level ${l}</div>
                                </div>
                            </div>
                            <p class="small" style="margin:6px 0 12px;line-height:1.5">
                                Pelajari penjelasan audio-visual materi <b>${esc(t)}</b> melalui video pilihan di YouTube.
                            </p>
                            <a href="${finalYt}" target="_blank" rel="noopener noreferrer" class="btn-youtube" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:12px 14px;background:#ff0000;color:#ffffff;border-radius:10px;text-decoration:none;font-weight:750;font-size:13px;box-shadow:0 3px 10px rgba(255,0,0,0.35);border:none;box-sizing:border-box">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                                <span>Tonton di YouTube &rarr;</span>
                            </a>
                        </div>
                    ` : ''}

                    <h3 style="margin-top:20px">Fungsi & Konsep Kunci</h3>
                    ${points.map((p, i) => `
                        <p class="small" style="line-height:1.8;border-bottom:1px solid var(--l);padding-bottom:8px">
                            ${i + 1}. ${p}
                        </p>
                    `).join('')}
                    <div class="callout" style="margin-top:15px">
                        ${tip || defaultTip}
                    </div>
                    <button class="btn soft" style="width:100%;margin-top:15px" onclick="openGlossary()">📖 Buka Glosarium</button>
                </aside>
            </div>
        `, 'sensor');

        const nextBtn = $('#btn-next-level');
        if (nextBtn) {
            nextBtn.onclick = () => {
                sfx.click();
                completeLevel(trackKey, l, next);
            };
        }

        const animBtn = $('#animate');
        if (animBtn) {
            animBtn.onclick = () => runPacketAnimation(resolvedFlowId);
        }

        bindLessonLab(l, trackKey);
    }

    // Main Renderer
    function render() {
        // Page 1: Landing / Index
        if (page === 'index') {
            document.body.innerHTML = `
                <section class="splash">
                    <div>
                        <a class="brand" href="index.html">
                            <div class="mark">⚡</div>
                            <div>
                                <b>SENSOR <span>QUEST</span></b>
                                <div class="sub">Wireless Sensor Networks</div>
                            </div>
                        </a>
                        <div class="eyebrow" style="margin-top:42px">INTERACTIVE LEARNING · GAMIFIED EXPERIENCE</div>
                        <h1>Jelajahi dunia<br><span>Sensor Network.</span></h1>
                        <p>Kuasai arsitektur Wireless Sensor Network (WSN), Protokol Routing Master, dan Arsitektur Mesh melalui 3 jalur pembelajaran interaktif, simulator laboratorium, dan evaluasi gamifikasi.</p>
                        <div style="display:flex;gap:12px;margin:24px 0 16px;flex-wrap:wrap">
                            <a class="btn primary" href="login.html">MULAI PETUALANGAN →</a>
                        </div>
                        <div class="row tiny muted" style="justify-content:flex-start;gap:20px">
                            <span>📡 Materi WSN</span>
                            <span>⚡ Routing Master</span>
                            <span>🕸️ Topologi Mesh</span>
                        </div>
                    </div>
                    <div class="visual" id="landing-visual">
                        <div class="visual-tabs">
                            <button class="vtab-btn active" data-vtrack="wsn" type="button">📡 1. WSN</button>
                            <button class="vtab-btn" data-vtrack="routing" type="button">⚡ 2. Routing</button>
                            <button class="vtab-btn" data-vtrack="mesh" type="button">🕸️ 3. Topologi</button>
                        </div>

                        <div id="vtab-content-wsn" class="vtab-pane active">
                            <div class="eyebrow" style="color:#67e8f9;margin-bottom:8px">WSN TOPOLOGY · FONDASI JARINGAN SENSOR</div>
                            ${flow([
                ['📡', 'Sensor Nodes', 'Sensing Fisik & ADC'],
                ['📥', 'Sink / Base', 'Agregasi Data'],
                ['🌐', 'Gateway', 'Cloud & Internet']
            ], 'flow-landing-wsn')}
                            <div class="row tiny" style="width:100%;max-width:340px;margin-top:16px">
                                <span style="color:#34d399">● STATUS: ACTIVE RF</span>
                                <span style="color:#7dd3fc">2.4 GHz · IEEE 802.15.4</span>
                            </div>
                        </div>

                        <div id="vtab-content-routing" class="vtab-pane">
                            <div class="eyebrow" style="color:#fde047;margin-bottom:8px">ROUTING MASTER · PROTOKOL & METRIK ENERGI</div>
                            ${flow([
                ['🌱', 'Sensor Node', 'Hitung Link Cost'],
                ['⚡', 'Router / CH', 'LEACH, AODV & RPL'],
                ['📥', 'Sink Root', 'Rute Optimal DODAG']
            ], 'flow-landing-routing')}
                            <div class="row tiny" style="width:100%;max-width:340px;margin-top:16px">
                                <span style="color:#fbbf24">● ENERGY-AWARE ROUTING</span>
                                <span style="color:#fde047">Path Loss d² · RFC 6550</span>
                            </div>
                        </div>

                        <div id="vtab-content-mesh" class="vtab-pane">
                            <div class="eyebrow" style="color:#c084fc;margin-bottom:8px">TOPOLOGI MESH · ARSITEKTUR & SELF-HEALING</div>
                            ${flow([
                ['💤', 'End Device (ZED)', 'Mode Hemat Daya'],
                ['🕸️', 'Router Mesh (ZR)', 'Self-Healing & Reroute'],
                ['👑', 'Coordinator (ZC)', 'PAN ID & Multi-Gateway']
            ], 'flow-landing-mesh')}
                            <div class="row tiny" style="width:100%;max-width:340px;margin-top:16px">
                                <span style="color:#34d399">● TOPOLOGI MESH REDUNDAN</span>
                                <span style="color:#c084fc">Self-Healing Tanpa Putus</span>
                            </div>
                        </div>
                    </div>
                </section>
            `;
            bind();
            return;
        }

        // Page 2: Login Demo
        if (page === 'login') {
            document.body.innerHTML = `
                <div class="login">
                    <form class="loginbox" id="loginform">
                        <a class="brand" href="index.html">
                            <div class="mark">⚡</div>
                            <div>
                                <b>SENSOR <span>QUEST</span></b>
                                <div class="sub">Wireless Sensor Networks</div>
                            </div>
                        </a>
                        <div class="eyebrow" style="margin-top:28px">WELCOME BACK, EXPLORER</div>
                        <h1 style="margin:6px 0 10px;font-size:24px">Masuk ke Petualangan</h1>
                        <p class="small muted">Mulai dengan 0 XP dan raih poin dengan menjawab materi secara benar!</p>
                        
                        <div class="field">
                            <label>USERNAME PENGGUNA</label>
                            <input id="username" required value="${esc(localStorage.getItem('sq-username') || S.username || 'explorer')}" placeholder="Masukkan username">
                        </div>
                        <label class="small muted" style="display:flex;align-items:center;gap:8px;cursor:pointer">
                            <input id="remember" type="checkbox" checked> Ingat username pada perangkat ini
                        </label>
                        <button class="btn primary" style="width:100%;margin-top:20px" type="submit">MASUK KE DASHBOARD →</button>
                        <p class="tiny muted" style="margin-top:14px;line-height:1.6">
                            ℹ️ Platform multimedia pembelajaran WSN, Routing, & Mesh. Masuk langsung menggunakan username tanpa password.
                        </p>
                        <a class="small muted" href="index.html">← Kembali ke halaman utama</a>
                    </form>
                </div>
            `;
            bind();
            return;
        }

        // Dashboard & Inner Pages
        let c = '', a = page;
        switch (page) {
            case 'dashboard': {
                const totalCompleted = ['wsn', 'routing', 'mesh'].reduce((acc, k) => acc + (S.tracks?.[k]?.completedLevels?.length || 0), 0);
                const progressPct = Math.round((totalCompleted / 15) * 100);

                c = head(
                    'DASHBOARD · WSN EXPLORER',
                    `Selamat datang, ${esc(S.name)}! 👋`,
                    'Lanjutkan petualangan belajarmu memahami WSN, Routing Master, dan Arsitektur Mesh.',
                    `<button class="btn primary" data-go="map">Buka Peta Misi (3 Jalur) →</button>`
                ) + `
                    <div class="grid four">
                        ${stat('⭐', 'TOTAL XP', `${S.points.toLocaleString()} / 3.000 XP`, 'Hanya dari tantangan benar')}
                        ${stat('🎯', 'PROGRES TOTAL', progressPct + '%', `${totalCompleted}/15 level tuntas`)}
                        ${stat('❤️', 'NYAWA', S.lives + '/3', 'Kesempatan evaluasi')}
                        ${stat('🏅', 'BADGE', `${(S.badges || []).length}/3 Lencana`, 'Pencapaian utama')}
                    </div>

                    <div class="row" style="margin-top:12px">
                        <h2>Tiga Jalur Pembelajaran</h2>
                        <span class="pill gold">Kurikulum Bertahap</span>
                    </div>

                    <div class="track-selector">
                        ${['wsn', 'routing', 'mesh'].map(tk => {
                    const tr = TRACKS_DATA[tk];
                    const isCompleted = isTrackCompleted(tk);
                    const isUnlocked = isTrackUnlocked(tk);
                    const doneCount = S.tracks?.[tk]?.completedLevels?.length || 0;
                    const quizDone = S.tracks?.[tk]?.quizCompleted;
                    const pct = Math.round(((doneCount + (quizDone ? 1 : 0)) / 6) * 100);

                    return `
                                <div class="track-card ${isCompleted ? 'completed' : !isUnlocked ? 'locked' : 'active'}" data-track-select="${tk}">
                                    <div>
                                        <div class="row">
                                            <span class="track-icon">${tr.icon}</span>
                                            <span class="pill ${isCompleted ? 'green' : !isUnlocked ? 'rose' : 'gold'}" style="font-size:9px">
                                                ${isCompleted ? '✓ SELESAI' : !isUnlocked ? '🔒 TERKUNCI' : '● AKTIF'}
                                            </span>
                                        </div>
                                        <div class="eyebrow" style="font-size:9px">${tr.tag}</div>
                                        <h3>${tr.name}</h3>
                                        <p>${tr.desc}</p>
                                    </div>
                                    <div>
                                        <div class="progress" style="margin:6px 0"><span style="width:${pct}%"></span></div>
                                        <div class="row tiny muted">
                                            <span>${doneCount}/5 Level + Kuis</span>
                                            <b>${pct}%</b>
                                        </div>
                                    </div>
                                </div>
                            `;
                }).join('')}
                    </div>

                    <section class="card" style="margin-top:10px">
                        <h3>Fitur Pembelajaran</h3>
                        <div class="grid three">
                            <div class="callout" style="cursor:pointer" data-go="map">
                                🗺️ <b>Peta Misi 3 Jalur</b><br>
                                WSN Fundamentals → Routing Master → Mesh Architect.
                            </div>
                            <div class="callout" style="cursor:pointer" data-go="${TRACKS_DATA[S.activeTrack || 'wsn']?.quizRoute || 'quiz'}">
                                🎯 <b>Tantangan Evaluasi</b><br>
                                Evaluasi 5 soal pilihan ganda di setiap materi disertai perbaikan jika nyawa habis.
                            </div>
                            <div class="callout" style="cursor:pointer" data-go="achievements">
                                🏆 <b>Koleksi 3 Lencana Utama</b><br>
                                WSN Explorer, Routing Master, dan Mesh Architect.
                            </div>
                        </div>
                    </section>
                `;
                break;
            }

            case 'map': {
                a = 'map';
                const activeTrackKey = S.activeTrack || 'wsn';
                const activeTrackData = TRACKS_DATA[activeTrackKey] || TRACKS_DATA.wsn;
                const missions = activeTrackData.missions;
                const tState = S.tracks?.[activeTrackKey] || { unlockedLevel: 1, completedLevels: [] };

                c = head(
                    'PETA MISI · TIGA PILIHAN MATERI',
                    'Peta Misi Explorer',
                    'Selesaikan seluruh materi & tantangan secara berurutan: Materi WSN → Materi ROUTING MASTER → Materi MESH ARCHITECT.'
                ) + `
                    <div class="row">
                        <h2>Pilih Materi Pembelajaran</h2>
                        <div style="display:flex;gap:8px;align-items:center">
                            <button class="btn secondary" id="btn-toggle-unlock" style="font-size:10px;padding:6px 10px">
                                ${S.devUnlockAll ? '🔒 Mode Berurutan' : '🔓 Buka Semua Level (Pengujian)'}
                            </button>
                        </div>
                    </div>

                    <div class="track-selector" id="track-selector-list">
                        ${['wsn', 'routing', 'mesh'].map(tk => {
                    const tr = TRACKS_DATA[tk];
                    const trState = S.tracks?.[tk] || { unlockedLevel: 1, completedLevels: [] };
                    const isCompleted = isTrackCompleted(tk);
                    const isUnlocked = isTrackUnlocked(tk);
                    const isActive = activeTrackKey === tk;
                    const completedCount = trState.completedLevels?.length || 0;
                    const quizDone = trState.quizCompleted;
                    const doneSteps = completedCount + (quizDone ? 1 : 0);
                    const pct = Math.round((doneSteps / 6) * 100);

                    let badgeClass = 'gold', badgeText = '⏳ DALAM PROSES';
                    if (isCompleted) {
                        badgeClass = 'green';
                        badgeText = '✓ SELESAI';
                    } else if (!isUnlocked) {
                        badgeClass = 'rose';
                        badgeText = '🔒 TERKUNCI';
                    } else if (isActive) {
                        badgeClass = 'gold';
                        badgeText = '● SEDANG DIPILIH';
                    }

                    return `
                                <div class="track-card ${isActive ? 'active' : ''} ${!isUnlocked ? 'locked' : ''} ${isCompleted ? 'completed' : ''}" 
                                     data-track-select="${tk}">
                                    <div>
                                        <div class="row" style="margin-bottom:8px">
                                            <span class="track-icon">${tr.icon}</span>
                                            <span class="pill ${badgeClass}" style="font-size:9px;padding:4px 8px">${badgeText}</span>
                                        </div>
                                        <div class="eyebrow" style="font-size:9px">${tr.tag}</div>
                                        <h3>${tr.name}</h3>
                                        <p>${tr.desc}</p>
                                    </div>
                                    <div>
                                        <div class="progress" style="margin:8px 0 6px"><span style="width:${pct}%"></span></div>
                                        <div class="row tiny muted">
                                            <span>Progres: ${doneSteps}/6 Selesai</span>
                                            <b>${pct}%</b>
                                        </div>
                                        ${!isUnlocked ? `
                                            <div class="tiny" style="color:#e11d48;margin-top:8px;font-weight:700">
                                                🔒 Selesaikan ${tk === 'routing' ? 'semua materi & tantangan WSN' : 'semua materi & tantangan ROUTING MASTER'}
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `;
                }).join('')}
                    </div>

                    <!-- Active Track Mission Grid -->
                    <section class="card" style="margin-top:10px">
                        <div class="track-banner">
                            <div>
                                <div class="eyebrow">${activeTrackData.tag}</div>
                                <h2 style="margin:4px 0">${activeTrackData.icon} ${activeTrackData.title}</h2>
                                <p class="small muted" style="margin:0">${activeTrackData.desc}</p>
                            </div>
                            <div style="display:flex;gap:8px;align-items:center">
                                <span class="pill ${isTrackCompleted(activeTrackKey) ? 'green' : 'gold'}">
                                    ${isTrackCompleted(activeTrackKey) ? '✓ MATERI TUNTAS' : `${tState.completedLevels?.length || 0}/5 LEVEL SELESAI`}
                                </span>
                            </div>
                        </div>

                        <div class="missiongrid" style="margin-top:16px">
                            ${missions.map(m => {
                    const levelNum = m[4];
                    const isFinalQuiz = levelNum === 6;
                    const isDone = isFinalQuiz ? tState.quizCompleted : tState.completedLevels?.includes(levelNum);
                    const canAccessQuiz = (tState.completedLevels?.length || 0) >= 5 || (tState.unlockedLevel || 1) >= 5;
                    const isUnlocked = S.devUnlockAll || isDone || (!isFinalQuiz && levelNum <= (tState.unlockedLevel || 1)) || (isFinalQuiz && canAccessQuiz);
                    const isCurrent = !isDone && isUnlocked;

                    return `
                                    <article class="mission ${isDone ? 'done' : isCurrent ? 'current' : 'locked'}">
                                        <div class="row">
                                            <span class="number">${isDone ? '✓' : m[0]}</span>
                                            <span class="tiny muted">${isDone ? 'SELESAI' : isUnlocked ? 'TERBUKA' : 'TERKUNCI'}</span>
                                        </div>
                                        <h3>${m[1]}</h3>
                                        <p>${m[3]}</p>
                                        <button class="btn ${isDone ? 'secondary' : isCurrent ? 'primary' : 'secondary'}" 
                                                data-go="${m[2]}" 
                                                ${!isUnlocked ? 'disabled' : ''}>
                                            ${isDone ? 'Pelajari Ulang' : isCurrent ? (isFinalQuiz ? 'Mulai Tantangan 🎯 →' : 'Mulai Level →') : '🔒 Terkunci'}
                                        </button>
                                    </article>
                                `;
                }).join('')}
                        </div>
                    </section>
                `;
                break;
            }

            // Track 1: WSN Lessons
            case 'intro':
                lesson(
                    1,
                    'Mengenal Wireless Sensor Network (WSN)',
                    'Gambaran umum arsitektur, topologi, dan cara kerja jaringan sensor nirkabel.',
                    '🌐',
                    'Wireless Sensor Network (WSN) adalah jaringan yang terdiri dari ratusan hingga ribuan sensor node otonom yang tersebar secara strategis untuk memantau kondisi fisik atau lingkungan secara real-time. Setiap node mengumpulkan data (suhu, kelembapan, getaran, dll.) secara mandiri, mengirimkannya secara nirkabel melalui gelombang radio ke Sink/Base Station, kemudian diteruskan oleh Gateway menuju server atau aplikasi monitoring di cloud. WSN tidak memerlukan infrastruktur kabel sehingga sangat cocok untuk lingkungan terpencil dan sulit dijangkau.',
                    [
                        ['🌿', 'Lingkungan Fisik', 'Suhu/Kelembapan/Gas'],
                        ['📡', 'Sensor Nodes', 'Sensing & Transmit'],
                        ['📥', 'Sink / Base', 'Kumpul & Agregasi'],
                        ['🌐', 'Gateway → Cloud', 'Protokol Internet']
                    ],
                    [
                        '🔗 WSN terdiri dari tiga lapisan utama: Sensor Nodes (pengumpul data), Sink/Base Station (agregator), dan Gateway (jembatan ke internet).',
                        '📡 Komunikasi antar node berlangsung tanpa kabel menggunakan gelombang radio (2.4 GHz atau Sub-GHz).',
                        '🌾 Aplikasi WSN: smart agriculture (pemantauan ladang), deteksi kebakaran hutan, pemantauan jembatan & gedung, dan monitoring lingkungan industri.',
                        '⚡ Efisiensi energi adalah prioritas utama WSN karena sensor node beroperasi dengan baterai kecil selama bertahun-tahun.'
                    ],
                    '📋 Alur data WSN: Lingkungan fisik → Sensor Node (sensing + ADC + radio) → Sink/Base Station (agregasi data) → Gateway (translasi protokol) → Aplikasi Cloud/Monitoring.',
                    'dashboard',
                    'sensor',
                    'wsn',
                    '💡 <b>Tips WSN 1:</b> Ingat tiga komponen utama WSN: <b>Sensor Node</b> (kumpul data), <b>Sink</b> (agregasi), dan <b>Gateway</b> (ke internet). Animasi di atas menunjukkan aliran data dari lingkungan ke cloud.'
                );
                return;

            case 'sensor':
                lesson(
                    2,
                    'Sensor Node — Unit Sensing Utama WSN',
                    'Subsistem hardware sensor node: Sensing Unit, Processing Unit, Transceiver, dan Power Unit.',
                    '📡',
                    'Sensor Node (atau Mote) adalah perangkat kecil bertenaga baterai yang menjadi ujung tombak WSN karena bersentuhan langsung dengan lingkungan yang diamati. Sensor Node memiliki 4 subsistem utama: (1) Sensing Unit — transduser + ADC untuk mengkonversi sinyal fisik ke digital; (2) Processing Unit — mikrokontroler untuk memproses data lokal; (3) Transceiver Unit — radio RF untuk komunikasi nirkabel; (4) Power Unit — baterai atau energy harvesting (panel surya). Sensor node dirancang dengan mode sleep berdaya ultrarendah (duty cycle < 5%) agar baterai bertahan bertahun-tahun.',
                    [
                        ['🌡️', 'Sensing Unit', 'Transduser + ADC'],
                        ['🖥️', 'Processing Unit', 'MCU Lokal'],
                        ['📶', 'Transceiver RF', 'Kirim 2.4GHz'],
                        ['📥', 'Sink / Base', 'Terima Paket']
                    ],
                    [
                        '📟 Sensing Unit: Transduser mengubah besaran fisik (suhu, kelembapan, getaran) menjadi tegangan listrik analog, lalu ADC mengkonversi ke angka digital (biasanya 10-12 bit).',
                        '🖥️ Processing Unit: Mikrokontroler (MCU) berdaya rendah (ATmega, ARM Cortex-M) memproses data lokal, menjalankan enkripsi ringan, dan mengatur jadwal transmisi.',
                        '📶 Transceiver RF: Modul radio terintegrasi (TX+RX) beroperasi pada pita 2.4 GHz (Zigbee/BLE) atau Sub-GHz (LoRa) dengan daya pancar 0-10 dBm.',
                        '🔋 Power Unit: Baterai AA/lithium atau energy harvesting (solar panel). Mode sleep memangkas konsumsi ke < 10 µA sehingga baterai tahan 5-10 tahun.'
                    ],
                    '📡 Sensor Node adalah "mata dan telinga" WSN. Tanpa sensor node yang benar-benar berfungsi, tidak ada data yang bisa dikumpulkan. Subsistem ADC adalah kunci konversi dunia fisik ke dunia digital.',
                    'intro',
                    'sink',
                    'wsn',
                    '💡 <b>Tips WSN 2:</b> Perhatikan urutan di ADC: Besaran Fisik → Transduser (volt analog) → ADC (angka biner) → MCU (proses) → Transceiver (kirim). Coba geser slider di Lab ADC untuk melihat perubahan nilai ADC secara real-time!'
                );
                return;

            case 'sink':
                lesson(
                    3,
                    'Sink / Base Station — Pusat Agregasi Data',
                    'Node pengumpul sentral yang menerima dan mengagregasi aliran data dari seluruh sensor node.',
                    '📥',
                    'Sink atau Base Station adalah komponen penerima utama dalam WSN yang memiliki kapabilitas komputasi dan memori lebih besar dibanding sensor node biasa. Sink menerima transmisi paket dari puluhan hingga ratusan sensor node (baik secara single-hop langsung maupun multi-hop melalui relay), kemudian melakukan agregasi data (rata-rata, nilai min/max, deteksi duplikasi), dan meneruskan data yang telah dimampatkan ke Gateway. Dengan agregasi, bandwidth transmisi ke server luar dapat dikurangi hingga 60-80%.',
                    [
                        ['📡', 'Node A (Zona 1)', 'Kirim 28.2°C'],
                        ['📡', 'Node B (Zona 2)', 'Kirim 28.8°C'],
                        ['📥', 'Sink / Base', 'Agregasi → 28.5°C'],
                        ['🌐', 'Gateway', 'Satu Paket Ringkas']
                    ],
                    [
                        '📦 Aggregation: Sink menggabungkan data dari banyak node menjadi satu paket ringkas, menghemat bandwidth dan energi radio transmisi eksternal hingga 66%.',
                        '🔍 Data Filtering: Sink menyaring data duplikat dan paket rusak (CRC error) sebelum data diteruskan ke gateway.',
                        '⚡ Energy Asymmetry: Sink biasanya terhubung ke sumber daya tetap (kabel/baterai besar) karena beban trafik yang jauh lebih tinggi dari sensor node biasa.',
                        '📡 Multi-hop Reception: Sink dapat menerima data dari node yang berada di luar jangkauan langsung via node perantara (relay) menggunakan protokol multi-hop.'
                    ],
                    '📋 Tanpa Sink yang melakukan agregasi, ribuan node akan mengirim data mentah secara bersamaan ke gateway — menyebabkan tabrakan frekuensi, pemborosan energi, dan kemacetan trafik.',
                    'sensor',
                    'gateway',
                    'wsn',
                    '💡 <b>Tips WSN 3:</b> Bayangkan Sink sebagai "pos pengumpul suara warga" sebelum laporan dikirim ke pusat kota (cloud). Data agregasi jauh lebih efisien dari mengirim laporan mentah satu per satu. Coba klik tombol Agregasi di Lab!'
                );
                return;

            case 'gateway':
                lesson(
                    4,
                    'Gateway WSN — Jembatan ke Internet',
                    'Penghubung antara protokol sensor lokal (IEEE 802.15.4) dengan protokol internet (TCP/IP, MQTT).',
                    '🌐',
                    'Gateway bertindak sebagai Protocol Translator (jembatan protokol) yang sangat krusial. Gateway menerima paket data dari Sink menggunakan protokol sensor lokal — seperti IEEE 802.15.4, 6LoWPAN, atau Zigbee — lalu menerjemahkannya ke dalam protokol internet standar seperti TCP/IP, MQTT (Message Queuing Telemetry Transport), atau HTTP/REST untuk diteruskan ke server cloud, dashboard monitoring, atau aplikasi mobile. Gateway juga mendukung komunikasi dua arah: meneruskan perintah dari pengguna (downlink) ke sensor node tertentu.',
                    [
                        ['📡', 'Sensor WSN', 'IEEE 802.15.4'],
                        ['📥', 'Sink / Base', 'Penerima Lokal'],
                        ['🌐', 'Gateway', 'Translasi Protokol'],
                        ['☁️', 'Cloud / MQTT', 'Dashboard & Kontrol']
                    ],
                    [
                        '🔄 Protocol Translation: Mengubah frame biner sensor (IEEE 802.15.4) menjadi paket JSON/Protobuf yang dapat dibaca oleh server internet standar.',
                        '📡 Dual Interface: Gateway memiliki dua antarmuka — radio sensor (Zigbee/LoRa) di sisi lokal dan Ethernet/Wi-Fi/4G di sisi internet.',
                        '⬇️ Downlink Control: Gateway juga bisa meneruskan perintah dari operator (misalnya aktifkan aktuator) ke node sensor tertentu di jaringan lokal.',
                        '🔒 Security Boundary: Gateway berfungsi sebagai firewall antara jaringan sensor lokal yang terbatas dengan internet publik yang terbuka.'
                    ],
                    '🌐 Gateway bukan sensor pengukur — peran utamanya adalah PENGHUBUNG. Tanpa gateway, data sensor yang sudah diagregasi Sink tidak akan pernah sampai ke aplikasi pengguna di internet.',
                    'sink',
                    'wireless',
                    'wsn',
                    '💡 <b>Tips WSN 4:</b> Anggap Gateway seperti "penerjemah bahasa" antara dunia sensor (bahasa Zigbee lokal) dan dunia internet (bahasa TCP/IP global). Protokol MQTT populer karena sangat ringan untuk IoT. Klik "Teruskan ke Cloud" di Lab untuk melihat translasi paket!'
                );
                return;

            case 'wireless':
                lesson(
                    5,
                    'Komunikasi Nirkabel WSN — Radio Frekuensi',
                    'Teknologi transmisi data tanpa kabel: Zigbee, LoRa, Wi-Fi, BLE, dan parameter RSSI.',
                    '📶',
                    'Komunikasi nirkabel dalam WSN memanfaatkan gelombang radio elektromagnetik pada pita frekuensi tertentu. Pemilihan teknologi bergantung pada tiga faktor utama: jangkauan (range), konsumsi daya (power), dan volume data (throughput). Zigbee (IEEE 802.15.4) ideal untuk mesh indoor dengan ratusan node berdaya rendah; LoRa/LoRaWAN unggul untuk outdoor jarak jauh (10-15 km) dengan daya sangat rendah; Wi-Fi menawarkan throughput tinggi namun boros baterai; BLE cocok untuk sensor wearable dan kesehatan jarak dekat. Parameter RSSI (Received Signal Strength Indicator) dalam satuan dBm digunakan untuk mengukur kekuatan sinyal yang diterima.',
                    [
                        ['📡', 'Transmitter', 'Modulasi Sinyal RF'],
                        ['📶', 'Gelombang Radio', '2.4 GHz / Sub-GHz'],
                        ['📥', 'Receiver', 'Demodulasi + RSSI'],
                        ['🌐', 'Gateway', 'Internet/Cloud']
                    ],
                    [
                        '📡 Zigbee (IEEE 802.15.4): 2.4 GHz, jangkauan 10-100m, data rate 250 kbps — ideal untuk mesh indoor/smart home dengan banyak node.',
                        '🌾 LoRa/LoRaWAN: Sub-GHz (433/868/915 MHz), jangkauan 10-15 km, data rate rendah (< 50 kbps) — sempurna untuk sensor pertanian dan kehutanan luas.',
                        '📱 BLE (Bluetooth Low Energy): 2.4 GHz, jangkauan 10-30m, konsumsi sangat rendah — dominan untuk sensor kesehatan dan wearable device.',
                        '📊 RSSI (Received Signal Strength Indicator): Nilai negatif dBm — semakin mendekati 0 dBm, sinyal makin kuat. RSSI < -90 dBm dianggap sangat lemah dan rawan putus.'
                    ],
                    '📶 Kunci sukses komunikasi WSN: sesuaikan teknologi radio dengan kebutuhan. Tidak ada satu teknologi yang sempurna untuk semua skenario — pilih berdasarkan jangkauan, daya, dan volume data yang dibutuhkan.',
                    'gateway',
                    'quiz',
                    'wsn',
                    '💡 <b>Tips WSN 5:</b> Bandingkan teknologi radio menggunakan rumus sederhana: <b>LoRa</b> = jarak jauh tapi lambat, <b>Zigbee</b> = mesh bagus tapi jarak dekat, <b>Wi-Fi</b> = cepat tapi boros daya. Geser slider jarak di Lab untuk melihat RSSI berubah!'
                );
                return;

            // Track 2: Routing Master Lessons
            case 'routing-1':
                lesson(
                    1,
                    'Energy-Aware Routing & Metrik Link',
                    'Mengapa routing WSN berbeda dari internet biasa, dan bagaimana metrik biaya rute dihitung.',
                    '🧭',
                    'Routing pada WSN bertugas menentukan jalur terbaik untuk transmisi data dari sensor node menuju Sink dengan mengutamakan efisiensi energi baterai — bukan kecepatan atau bandwidth seperti di internet. Setiap node WSN memiliki baterai terbatas yang sulit diganti di lapangan, sehingga algoritma routing harus memilih jalur yang meminimalkan konsumsi daya total. Metrik rute (Link Cost) dihitung berdasarkan tiga faktor: jarak kuadrat (d² — karena daya radio ∝ d²), kualitas link (Packet Reception Rate/PRR), dan sisa baterai node. Formula: C = (d² / PRR) × (100 / Battery%).',
                    [
                        ['🌱', 'Sensor Node', 'Hitung Link Cost'],
                        ['📊', 'Metrik PRR/LQI', 'Evaluasi Kualitas'],
                        ['🔄', 'Best Hop', 'Cost Minimum'],
                        ['📥', 'Sink / Base', 'Tujuan Akhir']
                    ],
                    [
                        '⚡ Energy-Aware Routing memprioritaskan efisiensi energi baterai di atas semua metrik lain — ini yang membedakannya dari routing internet konvensional.',
                        '📏 Path Loss d²: Daya transmisi radio meningkat kuadratik terhadap jarak. Jarak 2× berarti daya 4× lebih besar — sehingga hop pendek selalu lebih hemat.',
                        '📶 PRR (Packet Reception Rate): Persentase paket yang berhasil diterima dari total yang dikirim. PRR rendah berarti banyak transmisi ulang yang memboroskan energi.',
                        '🔋 Energy Hole Problem: Node di sekitar Sink mengalami kehabisan baterai lebih cepat karena harus meneruskan trafik dari seluruh jaringan — perlu diantisipasi dengan rotasi rute.'
                    ],
                    '🧭 Routing WSN adalah seni menyeimbangkan antara jarak lompatan, keandalan link, dan sisa baterai. Node dengan baterai tipis harus dihindari sebagai relay agar tidak menjadi titik lemah jaringan.',
                    'peta-misi.html',
                    'routing-2',
                    'routing',
                    '💡 <b>Tips Routing 1:</b> Rumus biaya rute C = (d²/PRR) × (100/Battery%) — node dengan jarak jauh, PRR rendah, atau baterai lemah punya biaya tinggi dan sebaiknya dihindari. Geser semua slider di Lab dan lihat bagaimana Cost berubah!'
                );
                return;

            case 'routing-2':
                lesson(
                    2,
                    'Protokol RPL & Topologi DODAG IPv6',
                    'Standar routing IPv6 IETF RFC 6550 — membangun pohon rute berakar di Sink menggunakan DIO & DAO.',
                    '🌳',
                    'RPL (Routing Protocol for Low-Power and Lossy Networks) adalah standar routing IPv6 resmi IETF (RFC 6550) yang dirancang khusus untuk WSN dan IoT berdaya rendah. RPL membangun topologi pohon terarah bebas loop yang disebut DODAG (Destination-Oriented Directed Acyclic Graph) dengan Sink sebagai root. Proses pembentukan DODAG: (1) Sink mem-broadcast pesan DIO (DODAG Information Object) berisi Rank dan Objective Function; (2) Setiap node menerima DIO, menghitung Rank-nya berdasarkan Objective Function (OF0 = hop count, MRHOF = kualitas link ETX), lalu memilih tetangga dengan Rank terkecil sebagai preferred parent; (3) Leaf node mengirim DAO (Destination Advertisement Object) ke parent untuk mendaftarkan rute downward.',
                    [
                        ['📥', 'Sink Root', 'Broadcast DIO'],
                        ['🔄', 'Router Node', 'Pilih Parent & Rank'],
                        ['🌿', 'Leaf Node', 'Kirim DAO Balik'],
                        ['☁️', 'IPv6 6LoWPAN', 'End-to-End Internet']
                    ],
                    [
                        '🌳 DODAG (Destination-Oriented Directed Acyclic Graph): Pohon berarah bebas siklus yang berakar pada Sink, membentuk jalur upward (sensor → Sink) dan downward (Sink → sensor).',
                        '📢 DIO (DODAG Information Object): Pesan kontrol broadcast dari Sink ke semua node berisi parameter jaringan, Rank, Instance ID, dan Objective Function untuk membentuk pohon rute.',
                        '↩️ DAO (Destination Advertisement Object): Pesan unicast dari leaf node ke parent/root untuk mendaftarkan rute downward agar Sink bisa mengirim data/perintah ke node tertentu.',
                        '🎯 Objective Function (OF): Algoritma pemilihan parent — OF0 berdasarkan hop count minimum, MRHOF berdasarkan kualitas link (ETX = Expected Transmissions). MRHOF lebih adaptif untuk jaringan padat.'
                    ],
                    '🌳 RPL adalah tulang punggung integrasi WSN dengan internet IPv6. Struktur DODAG memastikan setiap node memiliki jalur upward (ke Sink) dan downward (dari Sink) yang efisien dan bebas loop.',
                    'routing-1',
                    'routing-3',
                    'routing',
                    '💡 <b>Tips Routing 2:</b> RPL bekerja dalam 2 tahap: (1) DIO disebarkan dari Sink ke bawah untuk membangun pohon, (2) DAO dikirim dari bawah ke atas untuk mendaftarkan rute balik. Klik tombol DIO lalu DAO di Lab untuk melihat simulasi pembentukan DODAG!'
                );
                return;

            case 'routing-3':
                lesson(
                    3,
                    'Protokol Reaktif AODV — Route Discovery On-Demand',
                    'Pencarian jalur saat dibutuhkan menggunakan RREQ broadcast dan RREP unicast, tanpa tabel routing permanen.',
                    '⚡',
                    'AODV (Ad hoc On-Demand Distance Vector) adalah protokol routing reaktif yang tidak membangun tabel routing secara proaktif — jalur hanya dicari saat ada data yang hendak dikirimkan (on-demand). Ini sangat menghemat memori dan transmisi kontrol pada sensor node berdaya rendah. Mekanisme: (1) Node sumber mem-broadcast paket RREQ (Route Request) yang berisi alamat tujuan, Broadcast ID, dan Destination Sequence Number; (2) Node perantara yang menerima RREQ membuat Reverse Route ke sumber dan meneruskan RREQ jika belum ada rute ke tujuan; (3) Node tujuan (atau node dengan rute aktif) membalas dengan RREP (Route Reply) secara unicast kembali ke sumber; (4) Jika link putus, node mengirim RERR (Route Error) untuk membatalkan rute yang tidak valid.',
                    [
                        ['📡', 'Sumber (Node A)', 'Broadcast RREQ'],
                        ['🔄', 'Relay (Node B)', 'Forward RREQ'],
                        ['📥', 'Sink/Tujuan', 'Kirim RREP Balik'],
                        ['✅', 'Jalur Aktif', 'Data Mengalir']
                    ],
                    [
                        '📢 RREQ (Route Request): Broadcast dari sumber ke seluruh tetangga — setiap node yang menerimanya membuat Reverse Route ke sumber dan meneruskan RREQ jika rute belum ada.',
                        '↩️ RREP (Route Reply): Unicast dari tujuan (atau node yang memiliki rute aktif) kembali ke sumber — setiap node sepanjang jalur memperbarui Forward Route ke tujuan.',
                        '🔢 Destination Sequence Number: Nomor urut pada setiap rute yang terus bertambah — mencegah loop routing dan memastikan node selalu memilih informasi rute paling mutakhir.',
                        '⚠️ RERR (Route Error): Dikirim saat link putus untuk memberitahu node-node terkait agar menghapus rute yang tidak valid dari tabel routing mereka.'
                    ],
                    '⚡ AODV sangat efisien untuk jaringan WSN dengan komunikasi berkala — tidak ada overhead tabel routing yang terus-menerus. Jalur hanya ada saat benar-benar dibutuhkan, menghemat memori dan transmisi kontrol.',
                    'routing-2',
                    'routing-4',
                    'routing',
                    '💡 <b>Tips Routing 3:</b> Ingat urutan AODV: Broadcast <b>RREQ</b> (mencari jalan) → Unicast <b>RREP</b> (konfirmasi jalan ditemukan) → Kirim Data → Jika putus: <b>RERR</b>. Klik tombol RREQ lalu RREP di Lab untuk mensimulasikan penemuan rute!'
                );
                return;

            case 'routing-4':
                lesson(
                    4,
                    'Hierarchical Routing & Protokol LEACH',
                    'Klasterisasi jaringan dan rotasi Cluster Head periodik untuk pemerataan konsumsi daya seluruh jaringan.',
                    '👑',
                    'LEACH (Low-Energy Adaptive Clustering Hierarchy) adalah protokol routing hierarkis berbasis klaster yang dirancang untuk mendistribusikan beban energi secara merata di seluruh jaringan WSN. Cara kerja: (1) Jaringan dibagi menjadi beberapa klaster lokal; (2) Satu node dalam setiap klaster dipilih menjadi Cluster Head (CH) berdasarkan probabilitas yang proporsional terhadap energi sisa; (3) CH mengumpulkan data dari anggota klaster dengan jadwal TDMA (Time Division Multiple Access), melakukan agregasi/kompresi, lalu mengirimkannya ke Sink; (4) Peran CH digilirkan setiap ronde (interval waktu tertentu) sehingga tidak ada satu node yang cepat kehabisan baterai. LEACH menghemat energi hingga 8× dibanding transmisi langsung dari setiap node ke Sink.',
                    [
                        ['🌱', 'Anggota Klaster', 'Kirim via TDMA'],
                        ['👑', 'Cluster Head (CH)', 'Agregasi & Kompresi'],
                        ['📶', 'Long-Range Hop', 'CH → Sink'],
                        ['🔄', 'Rotasi CH', 'Tiap Ronde / Periodik']
                    ],
                    [
                        '👑 Cluster Head (CH): Node koordinator lokal yang mengumpulkan data dari anggota klaster, mengompresi/mengagregasi, lalu mengirimkan satu paket ringkas ke Sink — mengurangi jumlah transmisi jarak jauh secara drastis.',
                        '🎲 Probabilistic CH Selection: CH dipilih berdasarkan probabilitas P(i) yang bergantung pada sisa energi node — node dengan baterai lebih penuh punya peluang lebih besar menjadi CH.',
                        '⏱️ TDMA Scheduling: CH mengalokasikan slot waktu unik kepada setiap anggota klaster untuk transmisi, mencegah tabrakan sinyal di dalam klaster.',
                        '🔄 Rotasi Periodik: Peran CH diganti setiap ronde (misalnya setiap 20 detik) untuk mencegah satu node "terbakar habis" akibat beban agregasi dan transmisi jarak jauh yang berkelanjutan.'
                    ],
                    '👑 LEACH menghemat energi dengan membagi beban ke seluruh node melalui rotasi CH. Klasterisasi mengurangi jumlah node yang harus berkomunikasi jarak jauh ke Sink — hanya CH yang melakukan transmisi panjang.',
                    'routing-3',
                    'routing-5',
                    'routing',
                    '💡 <b>Tips Routing 4:</b> LEACH: N node → beberapa klaster → masing-masing punya CH → CH rotasi setiap ronde. Klik "Jalankan Ronde Baru LEACH" di Lab beberapa kali dan amati bagaimana CH berpindah untuk meratakan konsumsi baterai!'
                );
                return;

            case 'routing-5':
                lesson(
                    5,
                    'Optimasi Multi-Hop & Model Path Loss d²',
                    'Mengapa membagi satu hop panjang menjadi beberapa hop pendek menghemat energi hingga 50%.',
                    '📐',
                    'Dalam propagasi gelombang radio nirkabel, konsumsi daya transmisi berbanding lurus dengan kuadrat jarak (Model Friis Free-Space Path Loss: P ∝ d²) atau bahkan pangkat 4 (P ∝ d⁴) di lingkungan dengan banyak pantulan. Prinsip Multi-Hop Routing memanfaatkan fakta ini: membagi satu transmisi langsung jarak jauh menjadi beberapa lompatan (hop) pendek secara drastis mengurangi total energi yang dikonsumsi. Contoh: Transmisi 1 hop langsung 100m membutuhkan daya 100² = 10.000 unit; sedangkan 2 hop masing-masing 50m hanya butuh 2 × 50² = 5.000 unit — hemat 50%! Namun multi-hop juga menimbulkan overhead delay dan risiko Energy Hole di sekitar Sink karena relay terus-menerus.',
                    [
                        ['📡', 'Sumber (50m)', 'Daya: 2.500 Unit'],
                        ['🔄', 'Relay (50m)', 'Daya: 2.500 Unit'],
                        ['📥', 'Sink', 'Total: 5.000 Unit'],
                        ['🔋', '1 Hop = 10.000', 'Multi-Hop Hemat 50%']
                    ],
                    [
                        '📏 Path Loss Model: Daya transmisi P ∝ d² (free-space) atau d⁴ (dengan pantulan tanah). Ini berarti dua kali jarak butuh 4 kali daya — sehingga hop pendek selalu lebih hemat.',
                        '🔄 Multi-Hop Savings: 2 hop masing-masing ½d mengkonsumsi 2 × (d/2)² = d²/2, atau hanya 50% dari 1 hop langsung d². Semakin banyak hop pendek, semakin hemat (dengan batas optimal).',
                        '⚠️ Energy Hole (Hotspot): Node relay di dekat Sink harus terus meneruskan trafik dari node-node jauh — beban ekstra yang membuat baterai mereka cepat habis. Perlu strategi distribusi relay.',
                        '🎯 Optimal Hop Count: Ada titik keseimbangan — terlalu banyak hop meningkatkan delay dan overhead header. Penelitian menunjukkan 2-5 hop biasanya optimal untuk area monitoring WSN.'
                    ],
                    '📐 Multi-hop adalah pilar efisiensi WSN: banyak lompatan pendek jauh lebih hemat energi dari satu lompatan raksasa. Model P ∝ d² adalah kunci matematika di balik seluruh desain protokol routing WSN.',
                    'routing-4',
                    'quiz-routing',
                    'routing',
                    '💡 <b>Tips Routing 5:</b> Rumus kunci: <b>P = d²</b>. Jarak 2× = daya 4×. Dua hop 50m = 2×50² = 5.000 unit vs satu hop 100m = 100² = 10.000 unit. Geser slider jarak di Lab untuk membuktikan penghematan energi secara visual!'
                );
                return;

            // Track 3: Mesh Architect Lessons
            case 'mesh-1':
                lesson(
                    1,
                    'Topologi Mesh — Arsitektur Interkoneksi Jamak',
                    'Full mesh vs partial mesh, matriks konektivitas, dan keunggulan redundansi jalur sensor.',
                    '🕸️',
                    'Topologi Mesh adalah arsitektur jaringan sensor di mana setiap node terhubung dengan beberapa node tetangga secara interkonektif, membentuk jaringan "jala" yang memiliki banyak jalur alternatif. Terdapat dua varian utama: (1) Full Mesh — setiap node terhubung langsung ke semua node lain, memberikan redundansi maksimum dengan jumlah tautan L = N(N-1)/2; (2) Partial Mesh — setiap node hanya terhubung ke tetangga terdekat yang relevan, menyeimbangkan keandalan dan efisiensi biaya instalasi. Arsitektur mesh menjamin data tetap sampai ke Sink meski beberapa node atau link mengalami gangguan fisik, karena selalu tersedia jalur alternatif.',
                    [
                        ['📡', 'Node A', 'Multi-Path Link'],
                        ['🕸️', 'Node B/C', 'Router Mesh'],
                        ['🔄', 'Jalur Alternatif', 'Redundansi'],
                        ['📥', 'Sink / Base', 'Terima via Mana Saja']
                    ],
                    [
                        '🕸️ Full Mesh: L = N(N-1)/2 tautan — 6 node → 15 tautan, 10 node → 45 tautan. Redundansi maksimum tapi overhead radio dan biaya instalasi tinggi.',
                        '✂️ Partial Mesh: Setiap node terhubung ke ~2-3 tetangga terdekat — jumlah tautan ≈ N×1.5 — keseimbangan ideal antara keandalan dan efisiensi biaya.',
                        '🔀 Path Diversity: Topologi mesh mendukung transmisi multi-path — paket dapat dipecah dan dikirim melalui beberapa jalur berbeda secara bersamaan untuk meningkatkan throughput.',
                        '🏗️ Skalabilitas: Menambah node baru ke mesh sangat mudah — node hanya perlu bergabung dengan tetangga terdekat tanpa perlu rekonfigurasi seluruh jaringan.'
                    ],
                    '🕸️ Topologi mesh menjamin data tetap mengalir meski beberapa node mati atau link terputus. Ini yang membuat mesh ideal untuk pemantauan lingkungan kritis seperti pabrik kimia, tambang, dan kawasan bencana.',
                    'peta-misi.html',
                    'mesh-2',
                    'mesh',
                    '💡 <b>Tips Mesh 1:</b> Ingat rumus Full Mesh: <b>L = N(N-1)/2</b>. Untuk N=6 node → 15 tautan. Geser slider jumlah node di Lab dan lihat bagaimana jumlah tautan meningkat secara kuadratik — ini mengapa Partial Mesh sering lebih praktis!'
                );
                return;

            case 'mesh-2':
                lesson(
                    2,
                    'Self-Healing — Pemulihan Rute Mandiri',
                    'Deteksi kegagalan link otomatis dan pengalihan paket ke jalur cadangan tanpa intervensi manusia.',
                    '🛡️',
                    'Self-Healing adalah keunggulan terpenting topologi mesh yang membedakannya dari topologi star atau tree. Ketika sebuah node perantara mengalami kegagalan (kehabisan baterai, kerusakan hardware, interferensi sinyal, atau penghalang fisik), mekanisme self-healing bekerja secara otomatis: (1) Node sumber mendeteksi tidak ada ACK (Acknowledgement) dari node yang gagal setelah beberapa retry; (2) Protokol mesh mencari jalur alternatif di tabel routing — misalnya melalui Node C yang sebelumnya idle; (3) Paket dialihkan ke jalur cadangan dalam hitungan milidetik tanpa perlu intervensi operator. Hasilnya: Zero-Downtime Monitoring bahkan dalam kondisi jaringan yang tidak ideal.',
                    [
                        ['📡', 'Node Sumber', 'Kirim Paket'],
                        ['❌', 'Node 2 GAGAL', 'Deteksi ACK Loss'],
                        ['🔄', 'Alihkan ke Node 3', 'Rute Cadangan'],
                        ['📥', 'Sink / Base', 'Paket Diterima ✓']
                    ],
                    [
                        '⏱️ Failure Detection: Berbasis timeout ACK — jika tidak ada konfirmasi penerimaan (ACK) dalam batas waktu tertentu, node sumber menganggap link gagal dan memulai proses rerouting.',
                        '🔀 Alternative Route Selection: Protokol mesh memilih rute cadangan dengan biaya terendah dari tabel routing lokal — tidak perlu menunggu konfigurasi ulang dari administrator.',
                        '📡 Beacon / Hello Messages: Node mesh secara berkala mengirim pesan "Hello" ke tetangga untuk memperbarui status konektivitas dan memastikan tabel rute selalu aktual.',
                        '🛡️ Zero-Downtime: Pengalihan rute terjadi dalam < 100ms pada implementasi modern — pengguna dan aplikasi monitoring tidak merasakan gangguan sama sekali.'
                    ],
                    '🛡️ Self-healing membuat topologi mesh sangat ideal untuk pemantauan area berbahaya seperti tambang bawah tanah, hutan, atau kawasan industri di mana node sering mengalami gangguan fisik atau interferensi.',
                    'mesh-1',
                    'mesh-3',
                    'mesh',
                    '💡 <b>Tips Mesh 2:</b> Self-healing bekerja karena mesh punya BANYAK jalur. Bayangkan jaringan jalan raya — jika satu jalan tutup, ada jalan alternatif. Klik "Putuskan Node 2" di Lab dan lihat bagaimana jaringan otomatis beralih ke Node 3!'
                );
                return;

            case 'mesh-3':
                lesson(
                    3,
                    'Standar Zigbee Mesh — Coordinator, Router & End Device',
                    'Pembagian peran ZC, ZR, ZED dan manajemen PAN ID pada jaringan Zigbee IEEE 802.15.4.',
                    '🐝',
                    'Zigbee (IEEE 802.15.4 / Zigbee Alliance) adalah implementasi standar mesh WSN paling populer untuk bangunan cerdas, rumah otomatis, dan industri. Arsitektur Zigbee mendefinisikan tiga peran perangkat yang saling melengkapi: (1) Zigbee Coordinator (ZC) — satu per jaringan, menginisialisasi jaringan dengan memilih saluran frekuensi (channel 11-26 pada 2.4 GHz) dan menetapkan PAN ID unik 16-bit; (2) Zigbee Router (ZR) — node perantara yang selalu aktif untuk meneruskan paket multi-hop di seluruh mesh; (3) Zigbee End Device (ZED) — node sensor berdaya ultrarendah yang TIDAK memiliki fungsi routing, sehingga dapat tidur (sleep < 1% duty cycle) dan bertahan bertahun-tahun dengan satu baterai kecil.',
                    [
                        ['👑', 'Coordinator (ZC)', 'PAN ID & Channel'],
                        ['🔄', 'Router (ZR)', 'Relay Multi-hop'],
                        ['💤', 'End Device (ZED)', 'Sleep < 1% DC'],
                        ['📶', 'IEEE 802.15.4', 'Mesh 2.4 GHz ISM']
                    ],
                    [
                        '👑 ZC (Zigbee Coordinator): Hanya 1 per jaringan. Memilih kanal 2.4 GHz bebas interferensi, menetapkan PAN ID 16-bit, dan menyimpan kunci keamanan AES-128 untuk enkripsi.',
                        '🔄 ZR (Zigbee Router): Selalu aktif — meneruskan paket dari node lain dan memperluas jangkauan mesh. Biasanya ditenagai AC (kabel listrik) karena konsumsi daya lebih tinggi.',
                        '💤 ZED (Zigbee End Device): Tidak merouting paket orang lain — ini memungkinkan ZED tidur (sleep mode) hingga 99.9% waktu. Konsumsi < 2 µA saat tidur, baterai AA dapat bertahan 5-10 tahun.',
                        '📡 PAN ID: 16-bit Personal Area Network Identifier yang unik membedakan satu jaringan Zigbee dari jaringan lain di frekuensi yang sama — seperti SSID pada Wi-Fi.'
                    ],
                    '🐝 Diferensiasi peran ZC-ZR-ZED adalah kunci keberhasilan Zigbee dalam mendukung ribuan node mesh yang hemat baterai. ZED yang tidur hampir sepanjang waktu adalah inovasi cerdas untuk memperpanjang umur baterai sensor.',
                    'mesh-2',
                    'mesh-4',
                    'mesh',
                    '💡 <b>Tips Mesh 3:</b> Ingat perbedaan kritis: <b>ZR</b> = selalu aktif (bisa routing), <b>ZED</b> = hampir selalu tidur (tidak routing). ZED hemat baterai KARENA tidak routing. Klik "Alihkan ZED ke Mode Tidur" di Lab untuk melihat penurunan konsumsi arus secara dramatis!'
                );
                return;

            case 'mesh-4':
                lesson(
                    4,
                    'Multi-Gateway Mesh & Skalabilitas IoT Besar',
                    'Load balancing trafik sensor ribuan node dan eliminasi single point of failure melalui gateway terdistribusi.',
                    '🏙️',
                    'Pada skala besar seperti Smart City, kawasan industri luas, atau perkebunan ribuan hektar, arsitektur Single-Gateway Mesh menghadapi dua masalah kritis: (1) Bottleneck — satu gateway tidak mampu menangani trafik dari ribuan node sensor, menyebabkan packet drop dan latency tinggi; (2) Single Point of Failure (SPOF) — jika gateway tunggal rusak, seluruh jaringan terputus dari internet. Solusi: Multi-Gateway Mesh mendistribusikan gateway secara strategis di berbagai titik area pemantauan. Algoritma Load Balancing memastikan setiap node sensor diarahkan ke gateway terdekat dengan beban terendah, sehingga tidak ada satu gateway pun yang kewalahan. Jika satu gateway offline, node-nodenya secara otomatis beralih ke gateway terdekat berikutnya.',
                    [
                        ['🕸️', 'Sub-Mesh Zona A', 'Ribuan Node'],
                        ['🌐', 'Gateway Alpha', 'Beban 48%'],
                        ['🌐', 'Gateway Beta', 'Beban 52%'],
                        ['☁️', 'Cloud Terpusat', 'MQTT Aggregated']
                    ],
                    [
                        '⚖️ Load Balancing: Algoritma mendistribusikan trafik secara merata ke beberapa gateway berdasarkan beban saat ini dan jarak node — mencegah kemacetan pada satu gateway.',
                        '🛡️ SPOF Elimination: Multi-gateway menghilangkan titik kegagalan tunggal. Jika Gateway Alpha offline, node-nodenya otomatis beralih ke Gateway Beta tanpa downtime.',
                        '📈 Scalability: Menambah kapasitas jaringan cukup dengan menambah gateway baru — tidak perlu mengganti seluruh infrastruktur sensor yang sudah terpasang.',
                        '🌍 Use Cases: Smart City (1000+ tiang lampu sensor), pertanian presisi (1000+ sensor tanah), monitoring jembatan (100+ sensor getaran), gudang logistik (500+ sensor RFID).'
                    ],
                    '🏙️ Multi-gateway adalah kunci keberhasilan deployment WSN skala besar. Load Balancing memastikan tidak ada bottleneck, dan redundansi gateway menjamin ketersediaan layanan 24/7 meskipun satu gateway mengalami kerusakan.',
                    'mesh-3',
                    'mesh-5',
                    'mesh',
                    '💡 <b>Tips Mesh 4:</b> Multi-Gateway = Load Balancing + Redundansi. Klik "1 Gateway Tunggal" untuk melihat bottleneck parah (Packet Drop 28%), lalu klik "2 Gateway Load Balancing" untuk melihat perbaikan dramatisnya. Ini alasan mengapa Smart City SELALU pakai multi-gateway!'
                );
                return;

            case 'mesh-5':
                lesson(
                    5,
                    'CSMA/CA & Manajemen Trafik Mesh',
                    'Mekanisme Clear Channel Assessment, random backoff, dan pencegahan tabrakan sinyal radio pada jaringan mesh padat.',
                    '📊',
                    'Dalam jaringan mesh dengan kepadatan node tinggi, banyak node dapat mencoba mentransmisikan data secara bersamaan — menyebabkan interferensi ko-kanal dan tabrakan paket (packet collision) yang merusak data dan memaksa transmisi ulang. Standar IEEE 802.15.4 menggunakan mekanisme CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance) untuk mengatur akses media radio. Cara kerja: (1) Sebelum memancarkan, node wajib melakukan Clear Channel Assessment (CCA) — mendengarkan kanal radio untuk mendeteksi apakah ada transmisi lain; (2) Jika kanal bebas (clear), node langsung memancarkan paket; (3) Jika kanal terdeteksi sibuk, node menunda transmisi dengan menunggu waktu acak (Random Backoff), lalu mencoba CCA kembali; (4) Setelah transmisi, penerima mengirim ACK (Acknowledgement) sebagai konfirmasi penerimaan.',
                    [
                        ['👂', 'CCA — Listen', 'Dengar Kanal Radio'],
                        ['⏱️', 'Random Backoff', 'Tunda Jika Sibuk'],
                        ['📡', 'Transmit', 'Kanal Bebas!'],
                        ['✅', 'ACK Diterima', 'Sukses Tanpa Tabrakan']
                    ],
                    [
                        '👂 CCA (Clear Channel Assessment): Proses mendengarkan energi radio pada kanal frekuensi selama 128 µs — jika terdeteksi sinyal dengan kekuatan > threshold, kanal dianggap sibuk.',
                        '⏱️ Random Backoff: Node menunggu waktu acak antara 0 hingga 2^BE - 1 (BE = Backoff Exponent, awalnya 3) slot waktu (satuan: 320 µs) sebelum mencoba CCA kembali. Randomness mencegah semua node memulai ulang bersamaan.',
                        '📡 Transmit Frame: Jika CCA berhasil (kanal bebas), node memancarkan paket lengkap dengan MAC header, payload data sensor, dan CRC checksum untuk deteksi error.',
                        '✅ ACK Frame: Penerima mengirim frame ACK pendek (5 byte) dalam 192 µs setelah menerima paket valid. Jika pengirim tidak menerima ACK, paket dianggap gagal dan akan di-retransmit.'
                    ],
                    '📊 CSMA/CA memastikan hanya satu node yang memancar pada satu waktu di setiap kanal frekuensi. Ini adalah fondasi keandalan komunikasi mesh berdaya rendah — tanpa CSMA/CA, jaringan padat akan mengalami kekacauan tabrakan sinyal.',
                    'mesh-4',
                    'quiz-mesh',
                    'mesh',
                    '💡 <b>Tips Mesh 5:</b> CSMA/CA = "Lihat dulu sebelum bicara". Randomness backoff mencegah semua node berebut kanal di saat yang persis sama. Klik "Jalankan Uji CSMA/CA" di Lab untuk melihat timeline CCA → Backoff → Transmit → ACK secara langkah demi langkah!'
                );
                return;

            // Quiz Pages (WSN, Routing, Mesh)
            case 'quiz':
            case 'quiz-routing':
            case 'quiz-mesh': {
                const currentTrack = (page === 'quiz-routing') ? 'routing' : (page === 'quiz-mesh') ? 'mesh' : 'wsn';
                S.currentQuizTrack = currentTrack;
                a = 'quiz';

                const trData = TRACKS_DATA[currentTrack];
                const trState = S.tracks[currentTrack];
                const currentQ = QUIZZES[currentTrack];

                // If quiz is already completed with ALL 5 correct for this track
                if (trState.completed && (trState.q || 0) >= 5) {
                    const correctCount = trState.quizAnswers.filter((v, i) => v === currentQ[i][2]).length;
                    const accuracy = Math.round((correctCount / 5) * 100);
                    const isAllCorrect = (correctCount === 5);

                    if (isAllCorrect && !trState.bonusAwarded) {
                        trState.bonusAwarded = true;
                        addXP(500, `(BONUS KELULUSAN SEMUA SOAL ${trData.name.toUpperCase()}! 🎉)`);
                    }

                    let nextTrackAction = '';
                    if (isAllCorrect) {
                        if (currentTrack === 'wsn') {
                            nextTrackAction = `<button class="btn primary" id="btn-goto-routing">Lanjut ke Materi ROUTING MASTER ⚡ →</button>`;
                        } else if (currentTrack === 'routing') {
                            nextTrackAction = `<button class="btn primary" id="btn-goto-mesh">Lanjut ke Materi MESH ARCHITECT 🕸️ →</button>`;
                        }
                    }

                    c = head(
                        `${trData.name.toUpperCase()} · EVALUASI SELESAI`,
                        `Evaluasi ${trData.name} Telah Tuntas 🎉`,
                        `Kamu telah menyelesaikan tantangan evaluasi modul ${trData.name}. Kamu dapat mengulang kuis atau melanjutkan ke materi berikutnya.`,
                        `<span class="pill green">Akurasi: ${accuracy}%</span>`
                    ) + `
                        <div class="grid two">
                            <section class="card">
                                <div class="feedback">
                                    <div class="feedbackicon">🏅</div>
                                    <div>
                                        <div class="eyebrow">${trData.tag}</div>
                                        <h2>Skor: ${correctCount} / 5 Jawaban Benar</h2>
                                        <p class="small muted">
                                            ${isAllCorrect ? '🎉 Sempurna! Kamu meraih 1.000 XP (500 XP soal + 500 XP bonus tuntas seluruh tantangan)!' : `Kamu meraih ${correctCount * 100} XP. Selesaikan perbaikan ${5 - correctCount} soal yang belum tepat untuk membuka BONUS +500 XP & membuka materi selanjutnya!`}
                                        </p>
                                    </div>
                                </div>
                                <div class="row" style="margin-top:20px;flex-wrap:wrap;gap:10px">
                                    ${!isAllCorrect ? `<button class="btn primary" id="btn-fix-wrong-q" style="background:#059669">🔄 Perbaiki ${5 - correctCount} Soal Salah (+100 XP Tiap Soal & Bonus +500 XP)</button>` : ''}
                                    <button class="btn secondary" id="btn-retake-quiz">🔄 Ulangi Evaluasi Materi Ini</button>
                                    ${nextTrackAction}
                                </div>
                            </section>
                            <aside class="card">
                                <h3>Status Peserta</h3>
                                <div class="grid two-equal">
                                    ${stat('⭐', 'TOTAL XP', `${S.points.toLocaleString()} / 3.000`, 'Poin Tantangan')}
                                    ${stat('❤️', 'NYAWA', `${S.lives}/3`, 'Kesempatan')}
                                </div>
                                <h3 style="margin-top:20px">Navigasi Pembelajaran</h3>
                                <button class="btn soft" style="width:100%;margin-bottom:10px" data-go="map">🗺️ Kembali ke Peta Misi</button>
                            </aside>
                        </div>
                    `;
                    break;
                }

                // If lives reached 0 AND NOT in active retry mode -> Must retry wrong questions to regain lives!
                if (S.lives <= 0 && !trState.retrying) {
                    const wrongIndices = trState.wrongIndices || [];
                    const hasWrong = wrongIndices.length > 0;
                    const targetWrongIdx = hasWrong ? wrongIndices[0] : Math.max(0, (trState.q || 1) - 1);

                    c = head(
                        `${trData.name.toUpperCase()} · EVALUASI`,
                        'Nyawa Evaluasi Habis! 💔',
                        'Nyawa Anda habis (0/3). Anda tidak dapat lanjut ke soal berikutnya sebelum mengulang pertanyaan yang belum tepat untuk memulihkan nyawa (+1 ❤️ per jawaban benar).'
                    ) + `
                        <div class="card" style="text-align:center;padding:35px 20px">
                            <div style="font-size:55px;margin-bottom:10px">❤️‍🩹</div>
                            <h2>Nyawa Habis (0 ❤️)</h2>
                            <p class="small muted" style="max-width:480px;margin:10px auto 20px;line-height:1.8">
                                Sesuai peraturan evaluasi, Anda <b>tidak bisa melanjutkan</b> ke soal berikutnya saat nyawa habis. Silakan jawab ulang soal nomor <b>#${targetWrongIdx + 1}</b> yang belum tepat. Saat mengulang, nyawa dimulai dari <b>0 ❤️</b> dan baru bertambah (+1 ❤️) jika menjawab dengan benar!
                            </p>
                            <div class="row" style="justify-content:center;gap:12px;flex-wrap:wrap">
                                <button class="btn secondary" data-go="${currentQ[targetWrongIdx][4] || 'intro'}">📖 Pelajari Pembahasan Materi</button>
                                <button class="btn primary" id="btn-retry-wrong-q" data-target-q="${targetWrongIdx}">
                                    🔄 Ulangi Soal #${targetWrongIdx + 1} (Mulai dari 0 ❤️)
                                </button>
                            </div>
                        </div>
                    `;
                    break;
                }

                const i = Math.min(trState.q || 0, 4);
                const q = currentQ[i];
                const progressPercent = Math.round((i / 5) * 100);

                c = head(
                    `${trData.name.toUpperCase()} · TANTANGAN EVALUASI`,
                    `Tantangan ${String(i + 1).padStart(2, '0')} / 05`,
                    'Pilih satu jawaban yang paling tepat. Jawaban benar menambah poin dan nyawa. Jawaban salah mengurangi 100 XP dan 1 Nyawa.',
                    `<span class="pill gold">⭐ ${S.points.toLocaleString()} / 3.000 Points</span>`
                ) + `
                    <div class="grid two">
                        <section class="card">
                            ${trState.retrying && S.lives <= 0 ? `
                                <div class="callout" style="border-color:#f59e0b;background:#fffbeb;color:#b45309;margin-bottom:14px">
                                    ⚠️ <b>Mode Mengulang Soal (Nyawa: 0 ❤️):</b> Jawab pertanyaan ini dengan <b>BENAR</b> untuk memulihkan nyawa <b>(+1 ❤️)</b> dan memperoleh <b>+100 XP</b>. Jika jawaban salah, poin berkurang <b>-100 XP</b>!
                                </div>
                            ` : ''}
                            <div class="row">
                                <span class="eyebrow">PERTANYAAN ${i + 1} DARI 5 · ${trData.name}</span>
                                <span class="pill">${progressPercent}% SELESAI</span>
                            </div>
                            <div class="progress" style="margin:12px 0 20px">
                                <span style="width:${progressPercent}%"></span>
                            </div>
                            <h2 style="line-height:1.5;font-size:18px">${q[0]}</h2>
                            <div id="opts">
                                ${q[1].map((o, j) => `
                                    <button class="option ${trState.quizAnswers[i] === j ? 'selected' : ''}" data-answer="${j}">
                                        <span class="letter">${String.fromCharCode(65 + j)}</span>
                                        <span>${o}</span>
                                    </button>
                                `).join('')}
                            </div>
                            <div class="row" style="margin-top:20px">
                                <button class="btn secondary" data-go="${q[4] || 'intro'}">← Lihat Materi Terkait</button>
                                <button class="btn primary" id="submit">KIRIM JAWABAN →</button>
                            </div>
                            <p class="tiny muted" style="margin-top:14px">
                                💡 Jawaban benar memberi <b>+100 XP</b> & memulihkan nyawa (+1 ❤️). Jawaban salah mengurangi <b>-100 XP</b> dan -1 Nyawa. Semua 5 soal harus dijawab dengan benar untuk membuka materi berikutnya!
                            </p>
                        </section>

                        <aside class="card">
                            <h3>Status Peserta</h3>
                            <div class="grid two-equal">
                                ${stat('⭐', 'TOTAL XP', `${S.points.toLocaleString()} / 3.000`, 'Poin Tantangan')}
                                ${stat('❤️', 'NYAWA', `${S.lives}/3`, S.lives <= 0 ? 'Habis (0 ❤️)' : 'Kesempatan')}
                            </div>
                            <h3 style="margin-top:20px">Navigasi Soal</h3>
                            <div class="grid five" style="display:grid;grid-template-columns:repeat(5, 1fr);gap:6px">
                                ${currentQ.map((_, j) => {
                    const isDone = trState.quizAnswers[j] !== undefined;
                    const isCurrent = j === i;
                    const isWrong = trState.wrongIndices?.includes(j);
                    return `
                                        <div class="stat" style="text-align:center;padding:8px 4px;border-color:${isCurrent ? '#0891b2' : isWrong ? '#e11d48' : ''}">
                                            <b style="font-size:13px">${j + 1}</b>
                                            <div class="tiny" style="font-size:8px;color:${isWrong ? '#e11d48' : isDone ? '#059669' : isCurrent ? '#0891b2' : 'var(--m)'}">
                                                ${isWrong ? '× Salah' : isDone ? '✓' : isCurrent ? 'Aktif' : 'Tersedia'}
                                            </div>
                                        </div>
                                    `;
                }).join('')}
                            </div>
                            <div class="callout" style="margin-top:16px">
                                💡 <b>Aturan Kelulusan:</b> Anda harus menjawab seluruh 5 soal dengan benar (Skor 5/5) untuk mendapatkan <b>Bonus +500 XP</b> dan membuka materi selanjutnya.
                            </div>
                        </aside>
                    </div>
                `;
                break;
            }

            case 'correct':
            case 'wrong': {
                a = 'quiz';
                const currentTrack = S.currentQuizTrack || 'wsn';
                const trData = TRACKS_DATA[currentTrack] || TRACKS_DATA.wsn;
                const trState = S.tracks[currentTrack] || { q: 1, quizAnswers: [] };
                const currentQ = QUIZZES[currentTrack];

                const i = Math.max(0, Math.min((trState.q || 1) - 1, 4));
                const q = currentQ[i];
                const good = page === 'correct';
                const choice = trState.quizAnswers[i];
                const relatedLesson = q[4] || 'intro';

                // Life warning message if lives are 0
                const livesZero = S.lives <= 0;

                c = head(
                    `${trData.name.toUpperCase()} · HASIL JAWABAN`,
                    `Hasil Evaluasi Soal #${String(i + 1).padStart(2, '0')}`,
                    good ? 'Hebat, Explorer! Jawabanmu tepat.' : 'Jawaban belum tepat.',
                    `<span class="pill ${good ? 'green' : 'rose'}">${good ? '+100 XP · +1 ❤️' : '-100 XP · -1 ❤️'}</span>`
                ) + `
                    <div class="grid two">
                        <section class="card">
                            <div class="feedback ${good ? '' : 'bad'}">
                                <div class="feedbackicon">${good ? '✓' : '×'}</div>
                                <div>
                                    <div class="eyebrow">${good ? 'JAWABAN BENAR (+100 XP & +1 NYAWA)' : 'JAWABAN SALAH (-100 XP & -1 NYAWA)'}</div>
                                    <h2>${good ? 'Bagus Sekali, Explorer!' : livesZero ? 'Nyawa Habis (0 ❤️)!' : 'Tetap Semangat Belajar!'}</h2>
                                    <p class="small muted">
                                        ${good ? `Kamu mendapatkan <b>+100 XP</b> dan memulihkan nyawa (+1 ❤️). Nyawa kamu sekarang: <b>${S.lives}/3 ❤️</b>.` : `Poin berkurang <b>-100 XP</b> dan nyawa berkurang <b>-1 ❤️</b>. ${livesZero ? 'Nyawamu habis (0 ❤️). Ulangi soal ini dari 0 ❤️ untuk menambah nyawa (+1 ❤️) agar bisa lanjut!' : 'Pelajari pembahasan materi di bawah ini lalu coba jawab ulang atau lanjutkan.'}`}
                                    </p>
                                </div>
                            </div>

                            ${livesZero ? `
                                <div class="callout" style="border-color:#f43f5e;background:#fff1f2;color:#be123c;margin:14px 0">
                                    ⚠️ <b>Tidak Bisa Lanjut:</b> Nyawamu saat ini <b>0 / 3</b>. Kamu tidak bisa melanjutkan sebelum mengulang soal ini dengan benar (nyawa dimulai dari 0 ❤️ dan bertambah menjadi 1 ❤️ saat benar).
                                </div>
                            ` : ''}

                            <div class="callout" style="margin-top:16px">
                                <b>Pertanyaan:</b><br>${q[0]}
                            </div>

                            <div style="margin:14px 0">
                                ${q[1].map((o, j) => `
                                    <div class="option ${j === q[2] ? 'correct' : (j === choice && !good) ? 'wrong' : ''}">
                                        <span class="letter">${String.fromCharCode(65 + j)}</span>
                                        <span>${o}</span>
                                        <b style="margin-left:auto">${j === q[2] ? '✓ Jawaban Tepat' : (j === choice && !good) ? '× Pilihanmu' : ''}</b>
                                    </div>
                                `).join('')}
                            </div>

                            <div class="card" style="margin-top:14px;background:var(--subtle-bg)">
                                <h3>💡 Pembahasan Materi</h3>
                                <p class="small" style="line-height:1.8">${q[3]}</p>
                            </div>

                            <div class="row" style="margin-top:18px">
                                <button class="btn secondary" data-go="${relatedLesson}">📖 Pelajari Kembali Materi</button>
                                ${livesZero ? `
                                    <button class="btn primary" id="btn-retry-on-wrong" data-retry-idx="${i}">
                                        🔄 Ulangi Soal Ini (Mulai dari 0 ❤️) →
                                    </button>
                                ` : `
                                    <button class="btn primary" id="next">
                                        ${trState.q >= 5 ? 'LIHAT HASIL AKHIR & LENCANA 🎉 →' : 'PERTANYAAN BERIKUTNYA →'}
                                    </button>
                                `}
                            </div>
                        </section>

                        <aside class="card">
                            <h3>Status Hadiah</h3>
                            <div class="grid two-equal">
                                ${stat('⭐', 'TOTAL XP', `${S.points.toLocaleString()} / 3.000`, good ? '+100 XP diraih' : '-100 XP berkurang')}
                                ${stat('❤️', 'SISA NYAWA', `${S.lives}/3`, livesZero ? 'Habis (0 ❤️)!' : 'Tersisa')}
                            </div>
                            <div class="callout" style="margin-top:16px">
                                📡 <b>Jalur Modul:</b><br>${trData.name} · ${trData.tag}
                            </div>
                        </aside>
                    </div>
                `;
                break;
            }

            case 'result': {
                a = 'achievements';
                const currentTrack = S.currentQuizTrack || 'wsn';
                const trData = TRACKS_DATA[currentTrack] || TRACKS_DATA.wsn;
                const trState = S.tracks[currentTrack] || { quizAnswers: [] };
                const currentQ = QUIZZES[currentTrack];

                const correctCount = trState.quizAnswers.filter((v, i) => v === currentQ[i][2]).length;
                const accuracy = Math.round((correctCount / 5) * 100);
                const isAllCorrect = (correctCount === 5);

                if (isAllCorrect) {
                    trState.completed = true;
                    trState.quizCompleted = true;
                    if (!trState.bonusAwarded) {
                        trState.bonusAwarded = true;
                        addXP(500, `(BONUS KELULUSAN SEMUA SOAL ${trData.name.toUpperCase()}! 🎉)`);
                    }
                    if (currentTrack === 'wsn') unlockBadge('explorer', 'WSN Explorer');
                    else if (currentTrack === 'routing') unlockBadge('routing', 'Routing Master');
                    else if (currentTrack === 'mesh') unlockBadge('mesh', 'Mesh Architect');
                }

                let nextStepBtn = '';
                if (isAllCorrect) {
                    if (currentTrack === 'wsn') {
                        nextStepBtn = `
                            <button class="btn primary" style="width:100%;margin-top:14px" id="btn-result-to-routing">
                                ⚡ Buka & Mulai Materi ROUTING MASTER →
                            </button>
                        `;
                    } else if (currentTrack === 'routing') {
                        nextStepBtn = `
                            <button class="btn primary" style="width:100%;margin-top:14px" id="btn-result-to-mesh">
                                🕸️ Buka & Mulai Materi MESH ARCHITECT →
                            </button>
                        `;
                    }
                } else {
                    nextStepBtn = `
                        <div class="callout" style="border-color:#f43f5e;background:#fff1f2;color:#be123c;margin-top:14px">
                            🔒 <b>Materi Berikutnya Terkunci:</b><br>
                            Anda harus menjawab <b>semua 5 soal tantangan dengan benar (Skor 5/5)</b> sebelum materi berikutnya dapat dibuka.
                        </div>
                    `;
                }

                c = head(
                    `${trData.name.toUpperCase()} · HASIL AKHIR`,
                    isAllCorrect ? 'Mission Complete! 🎉' : 'Evaluasi Selesai · Belum Sempurna ⚠️',
                    isAllCorrect ? `Selamat! Kamu telah menyelesaikan seluruh evaluasi tantangan ${trData.name} dengan sempurna (+1.000 XP).` : `Kamu telah menjawab 5 soal dengan ${correctCount} benar (${correctCount * 100} XP). Perbaiki soal yang salah untuk membuka Bonus +500 XP (Total: 1.000 XP)!`,
                    `<span class="pill ${isAllCorrect ? 'green' : 'gold'}">${isAllCorrect ? 'MODUL SELESAI SEMPURNA' : `${correctCount}/5 BENAR`}</span>`
                ) + `
                    <div class="grid two">
                        <section class="card">
                            <div class="diagram">
                                <div class="row stack">
                                    <div class="medal"><div>${trData.icon}</div></div>
                                    <div>
                                        <span class="pill gold">${isAllCorrect ? 'ACHIEVEMENT UNLOCKED' : 'PROSES PENYELESAIAN'}</span>
                                        <h2>${trData.badgeTitle.toUpperCase()}</h2>
                                        <p class="small muted" style="line-height:1.8">
                                            ${isAllCorrect ? `Lencana kehormatan karena telah menyelesaikan seluruh rangkaian materi dan Final Challenge ${trData.name} (Total 1.000 XP).` : `Raih skor sempurna 5/5 untuk membuka Lencana Kehormatan dan Bonus +500 XP ${trData.name}!`}
                                        </p>
                                        <span class="pill ${isAllCorrect ? 'green' : 'rose'}">${isAllCorrect ? '✓ RESMI TERVERIFIKASI' : '⏳ Menunggu 5/5 Benar'}</span>
                                    </div>
                                </div>
                            </div>

                            <h3 style="margin-top:20px">Statistik Evaluasi</h3>
                            <div class="grid four">
                                ${stat('⭐', 'TOTAL XP', `${S.points.toLocaleString()} / 3.000`, 'Skor terkumpul')}
                                ${stat('🎯', 'AKURASI', `${accuracy}%`, `${correctCount} dari 5 benar`)}
                                ${stat('❤️', 'SISA NYAWA', `${S.lives}/3`, 'Bertahan')}
                                ${stat('🏆', 'BADGE', `${(S.badges || []).length}/3`, 'Terbuka')}
                            </div>

                            <h3 style="margin-top:20px">Rincian Jawaban Soal</h3>
                            <div style="display:grid;gap:8px">
                                ${currentQ.map((qItem, idx) => {
                    const userAns = trState.quizAnswers[idx];
                    const isCorrect = userAns === qItem[2];
                    return `
                                        <div class="row stat" style="padding:10px 14px">
                                            <div>
                                                <b>Soal ${idx + 1}:</b> <span class="small">${esc(qItem[0].slice(0, 50))}...</span>
                                            </div>
                                            <span class="pill ${isCorrect ? 'green' : 'rose'}">
                                                ${isCorrect ? '✓ Benar (+100 XP)' : '× Salah (Belum Ada XP)'}
                                            </span>
                                        </div>
                                    `;
                }).join('')}
                            </div>
                        </section>

                        <aside class="card">
                            <h3>Langkah Selanjutnya</h3>
                            ${stat('🏆', 'BONUS MODUL', isAllCorrect ? '+500 XP (Diraih!)' : '+500 XP (Terkunci)', isAllCorrect ? 'Tuntas semua 5 soal' : 'Jawab benar 5/5 soal')}
                            ${!isAllCorrect ? `
                                <button class="btn primary" style="width:100%;margin-top:14px;background:#059669" id="btn-fix-wrong-q">
                                    🔄 Perbaiki ${5 - correctCount} Soal Salah (+100 XP Tiap Soal & Bonus +500 XP) →
                                </button>
                            ` : nextStepBtn}
                            <button class="btn secondary" style="width:100%;margin-top:8px" id="btn-retake-quiz">
                                🔄 Ulangi Evaluasi (Tingkatkan Skor)
                            </button>
                            <button class="btn soft" style="width:100%;margin-top:8px" data-go="map">
                                🗺️ Kembali ke Peta Misi
                            </button>
                        </aside>
                    </div>
                `;
                break;
            }

            case 'profile': {
                a = 'profile';
                const totalCompleted = ['wsn', 'routing', 'mesh'].reduce((acc, k) => acc + (S.tracks?.[k]?.completedLevels?.length || 0), 0);

                c = head(
                    'MY PROFILE · MANAJEMEN AKUN',
                    'Profil Explorer',
                    'Kelola identitas, pantau statistik belajar 3 materi, dan sesuaikan pengaturan platform.',
                    '<span class="pill green">● Akun Aktif</span>'
                ) + `
                    <div class="grid two">
                        <section>
                            <div class="card">
                                <div class="row stack">
                                    <div class="row">
                                        <div class="avatar">${S.avatar || '⚡'}</div>
                                        <div>
                                            <span class="pill gold">${S.badges.includes('mesh') ? '🕸️ MESH ARCHITECT' : S.badges.includes('routing') ? '⚡ ROUTING MASTER' : S.badge ? '🏅 WSN EXPLORER' : 'WSN LEARNER'}</span>
                                            <h2 style="margin:4px 0">${esc(S.name)}</h2>
                                            <p class="small muted">@${esc(S.username)} · Explorer Aktif</p>
                                            <div class="progress" style="width:200px;margin:8px 0">
                                                <span style="width:${Math.min(100, Math.round((S.points / 3000) * 100))}%"></span>
                                            </div>
                                            <small class="muted">${S.points.toLocaleString()} / 3.000 XP menuju Grand Architect</small>
                                        </div>
                                    </div>
                                    <button class="btn secondary" id="btn-edit-profile">✏️ Edit Profil</button>
                                </div>
                            </div>

                            <div class="card" style="margin-top:14px">
                                <div class="row">
                                    <h3>Progres 3 Jalur Pembelajaran</h3>
                                    <span class="pill cyan">${S.points.toLocaleString()} / 3.000 XP Total</span>
                                </div>
                                <div style="display:grid;gap:10px;margin-top:12px">
                                    ${[
                        { id: 'wsn', title: '1. Pengenalan WSN & Node Sensor', icon: '📡' },
                        { id: 'routing', title: '2. Protokol Routing (LEACH & Directed Diff)', icon: '⚡' },
                        { id: 'mesh', title: '3. Topologi Mesh, Sink & Gateway', icon: '🕸️' }
                    ].map(t => {
                        const modDone = S.tracks?.[t.id]?.completedLevels?.length || 0;
                        const rewCount = S.tracks?.[t.id]?.rewardedQuestions?.length || 0;
                        const bonus = S.tracks?.[t.id]?.bonusAwarded ? 500 : 0;
                        const trackXp = (rewCount * 100) + bonus;
                        const isDone = isTrackCompleted(t.id);
                        return `
                                            <div class="stat" style="border-left:4px solid ${isDone ? '#10b981' : 'var(--p)'}">
                                                <div class="row">
                                                    <b>${t.icon} ${t.title}</b>
                                                    <span class="pill ${isDone ? 'green' : 'soft'}">${isDone ? '✓ SELESAI' : 'BERJALAN'}</span>
                                                </div>
                                                <div class="row" style="margin-top:6px;font-size:13px">
                                                    <span class="muted">Modul: <b>${modDone}/5</b></span>
                                                    <span class="muted">XP Tantangan: <b class="gold">${trackXp}/1.000 XP</b></span>
                                                </div>
                                            </div>
                                        `;
                    }).join('')}
                                </div>
                            </div>

                            <div class="card" style="margin-top:14px">
                                <h3>Statistik Belajar 3 Materi WSN</h3>
                                <div class="grid four">
                                    ${stat('⭐', 'TOTAL XP', `${S.points.toLocaleString()} / 3.000`, 'Target capaian')}
                                    ${stat('📚', 'TOTAL LEVEL', `${totalCompleted}/15`, 'Level terselesaikan')}
                                    ${stat('🗺️', 'JALUR SELESAI', `${['wsn', 'routing', 'mesh'].filter(isTrackCompleted).length}/3`, 'Track lengkap')}
                                    ${stat('🏆', 'LENCANA', `${(S.badges || []).length}/3`, 'Koleksi terbuka')}
                                </div>
                            </div>
                        </section>

                        <section>
                            <div class="card">
                                <div class="row">
                                    <h3>Koleksi 3 Lencana Utama</h3>
                                    <span class="pill gold">${(S.badges || []).length} / 3 Terbuka</span>
                                </div>
                                
                                <div class="stat" style="margin-top:10px;border-color:${(S.badges || []).includes('explorer') ? '#10b981' : ''}">
                                    <div class="row">
                                        <b>🏅 WSN EXPLORER</b>
                                        <span class="tiny ${(S.badges || []).includes('explorer') ? 'green' : 'muted'}">
                                            ${(S.badges || []).includes('explorer') ? '✓ UNLOCKED' : 'TERKUNCI'}
                                        </span>
                                    </div>
                                    <p class="small muted" style="margin:4px 0 0">Selesaikan seluruh materi & Final Challenge WSN.</p>
                                </div>

                                <div class="stat" style="margin-top:10px;border-color:${(S.badges || []).includes('routing') ? '#10b981' : ''}">
                                    <div class="row">
                                        <b>⚡ ROUTING MASTER</b>
                                        <span class="tiny ${(S.badges || []).includes('routing') ? 'green' : 'muted'}">
                                            ${(S.badges || []).includes('routing') ? '✓ UNLOCKED' : 'TERKUNCI'}
                                        </span>
                                    </div>
                                    <p class="small muted" style="margin:4px 0 0">Selesaikan 5 modul materi & tantangan ROUTING MASTER.</p>
                                </div>

                                <div class="stat" style="margin-top:10px;border-color:${(S.badges || []).includes('mesh') ? '#10b981' : ''}">
                                    <div class="row">
                                        <b>🕸️ MESH ARCHITECT</b>
                                        <span class="tiny ${(S.badges || []).includes('mesh') ? 'green' : 'muted'}">
                                            ${(S.badges || []).includes('mesh') ? '✓ UNLOCKED' : 'TERKUNCI'}
                                        </span>
                                    </div>
                                    <p class="small muted" style="margin:4px 0 0">Selesaikan 5 modul materi & tantangan MESH ARCHITECT.</p>
                                </div>

                                <button class="btn soft" style="width:100%;margin-top:12px" data-go="achievements">
                                    Lihat Semua 3 Lencana Prestasi →
                                </button>
                            </div>

                            <div class="card" style="margin-top:14px">
                                <h3>Pengaturan Platform</h3>
                                ${[
                        ['🔔', 'Notifikasi Toast', 'notifications'],
                        ['🔊', 'Efek Suara Audio', 'audio'],
                        ['🌙', 'Mode Gelap (Dark Mode)', 'dark']
                    ].map(x => `
                                    <div class="row" style="padding:12px 0;border-bottom:1px solid var(--l)">
                                        <span class="small">${x[0]} ${x[1]}</span>
                                        <button class="toggle ${S[x[2]] ? 'on' : ''}" data-setting="${x[2]}"></button>
                                    </div>
                                `).join('')}

                                <div style="display:grid;gap:8px;margin-top:16px">
                                    <button class="btn secondary" style="width:100%" id="btn-reset-progress">
                                        🔄 Reset Seluruh Progres Belajar (Kembali ke 0 XP)
                                    </button>
                                    <button class="btn danger" style="width:100%" id="logout">
                                        🚪 Keluar dari Akun Demo
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                `;
                break;
            }

            case 'achievements': {
                a = 'achievements';
                // Strictly ONLY 3 badges as requested
                const allBadges = [
                    { id: 'explorer', icon: '🏅', name: 'WSN EXPLORER', desc: 'Menyelesaikan 5 modul pengantar dan tantangan evaluasi Materi WSN.', trackKey: 'wsn' },
                    { id: 'routing', icon: '⚡', name: 'ROUTING MASTER', desc: 'Menyelesaikan 5 level materi dan tantangan evaluasi Materi ROUTING MASTER.', trackKey: 'routing' },
                    { id: 'mesh', icon: '🕸️', name: 'MESH ARCHITECT', desc: 'Menyelesaikan 5 level materi dan tantangan evaluasi Materi MESH ARCHITECT.', trackKey: 'mesh' }
                ];

                c = head(
                    'ACHIEVEMENTS · KOLEKSI BADGE',
                    'Prestasi Explorer 🏆',
                    'Koleksi 3 lencana pencapaian utama: WSN Explorer, Routing Master, dan Mesh Architect.'
                ) + `
                    <div class="grid three">
                        ${allBadges.map(b => {
                    const isUnlocked = (S.badges || []).includes(b.id);
                    return `
                                <section class="card" style="text-align:center;display:flex;flex-direction:column;justify-content:space-between">
                                    <div>
                                        <div style="font-size:48px;margin-bottom:12px">${b.icon}</div>
                                        <h2 style="font-size:16px;margin:6px 0">${b.name}</h2>
                                        <p class="small muted" style="line-height:1.6;margin-bottom:14px">${b.desc}</p>
                                    </div>
                                    <div>
                                        ${isUnlocked ? `
                                            <span class="pill green" style="width:100%;justify-content:center">✓ UNLOCKED</span>
                                        ` : `
                                            <span class="pill" style="width:100%;justify-content:center;opacity:0.65">🔒 TERKUNCI</span>
                                        `}
                                    </div>
                                </section>
                            `;
                }).join('')}
                    </div>

                    <section class="card" style="margin-top:16px">
                        <div class="row">
                            <h3>Ringkasan Perkembangan Prestasi</h3>
                        </div>
                        <div class="grid four" style="margin-top:12px">
                            ${stat('⭐', 'TOTAL XP', S.points.toLocaleString(), 'Poin terkumpul')}
                            ${stat('📘', 'WSN', isTrackCompleted('wsn') ? '✓ Tuntas' : `${S.tracks.wsn.completedLevels.length}/5`, 'Materi 1')}
                            ${stat('⚡', 'ROUTING', isTrackCompleted('routing') ? '✓ Tuntas' : isTrackUnlocked('routing') ? `${S.tracks.routing.completedLevels.length}/5` : '🔒 Terkunci', 'Materi 2')}
                            ${stat('🕸️', 'MESH', isTrackCompleted('mesh') ? '✓ Tuntas' : isTrackUnlocked('mesh') ? `${S.tracks.mesh.completedLevels.length}/5` : '🔒 Terkunci', 'Materi 3')}
                        </div>
                        <button class="btn secondary" style="margin-top:16px" data-go="map">← Kembali ke Peta Misi</button>
                    </section>
                `;
                break;
            }

            default:
                c = head(
                    'SENSOR QUEST',
                    'Halaman Tidak Ditemukan',
                    'Halaman yang Anda tuju tidak tersedia.'
                ) + '<a class="btn primary" href="dashboard.html">Kembali ke Dashboard</a>';
        }

        shell(c, a);
    }

    // Event Bindings
    function bind() {
        // Navigation links
        $$('[data-go]').forEach(b => {
            b.onclick = e => {
                e.preventDefault();
                sfx.click();
                if (b.disabled) {
                    toast('Selesaikan materi sebelumnya terlebih dahulu.');
                    return;
                }
                go(b.dataset.go);
            };
        });

        // Audio Speech button
        $$('[data-speak]').forEach(b => {
            b.onclick = () => {
                sfx.click();
                handleSpeech(b.dataset.speak, b);
            };
        });

        // Flow packet animation button
        const animBtn = $('#animate');
        if (animBtn) animBtn.onclick = runPacketAnimation;

        // Landing visual tabs switcher (WSN, Routing, Topologi)
        const vtabBtns = $$('.vtab-btn');
        if (vtabBtns.length) {
            const tracks = ['wsn', 'routing', 'mesh'];
            let currentIdx = 0;
            let autoTimer = null;

            const switchVTab = (targetTrack) => {
                vtabBtns.forEach(b => {
                    b.classList.toggle('active', b.dataset.vtrack === targetTrack);
                });
                $$('.vtab-pane').forEach(p => {
                    p.classList.remove('active');
                });
                const activePane = $(`#vtab-content-${targetTrack}`);
                if (activePane) {
                    activePane.classList.add('active');
                }
            };

            vtabBtns.forEach(btn => {
                btn.onclick = () => {
                    sfx.click();
                    if (autoTimer) clearInterval(autoTimer);
                    const target = btn.dataset.vtrack;
                    currentIdx = tracks.indexOf(target);
                    switchVTab(target);
                };
            });

            // Auto-cycle every 4.5 seconds to showcase all 3 architectures
            autoTimer = setInterval(() => {
                currentIdx = (currentIdx + 1) % tracks.length;
                switchVTab(tracks[currentIdx]);
            }, 4500);
        }

        // Glossary triggers
        const topGlossary = $('#btn-glossary-top');
        if (topGlossary) topGlossary.onclick = openGlossary;
        const sideGlossary = $('#side-glossary-btn');
        if (sideGlossary) sideGlossary.onclick = e => {
            e.preventDefault();
            openGlossary();
        };

        // Dev toggle unlock all
        const toggleUnlockBtn = $('#btn-toggle-unlock');
        if (toggleUnlockBtn) {
            toggleUnlockBtn.onclick = () => {
                sfx.click();
                S.devUnlockAll = !S.devUnlockAll;
                save();
                toast(S.devUnlockAll ? '🔓 Semua jalur & level dibuka untuk pengujian!' : '🔒 Mode berurutan diaktifkan.');
                render();
            };
        }

        // Track Selector Clicks (Peta Misi & Dashboard)
        $$('[data-track-select]').forEach(card => {
            card.onclick = () => {
                const targetTrack = card.dataset.trackSelect;
                if (!isTrackUnlocked(targetTrack)) {
                    sfx.wrong();
                    const prevTrackName = targetTrack === 'routing' ? 'Materi WSN' : 'Materi ROUTING MASTER';
                    const prevTrackKey = targetTrack === 'routing' ? 'wsn' : 'routing';
                    showModal(
                        '🔒 Materi Masih Terkunci',
                        `<p class="small" style="line-height:1.8">
                            Materi <b>${TRACKS_DATA[targetTrack].name}</b> masih terkunci.<br><br>
                            Untuk membuka materi ini, Anda harus menyelesaikan seluruh <b>5 level materi</b> dan <b>tantangan evaluasi</b> pada <b>${prevTrackName}</b> terlebih dahulu.
                        </p>
                        <div class="row" style="margin-top:16px">
                            <button class="btn secondary" onclick="closeModal()">Tutup</button>
                            <button class="btn primary" id="btn-modal-goto-prev">Lanjutkan ${prevTrackName} →</button>
                        </div>`
                    );
                    const gotoPrevBtn = $('#btn-modal-goto-prev');
                    if (gotoPrevBtn) {
                        gotoPrevBtn.onclick = () => {
                            closeModal();
                            S.activeTrack = prevTrackKey;
                            save();
                            if (page !== 'map') go('map');
                            else render();
                        };
                    }
                    return;
                }

                sfx.click();
                S.activeTrack = targetTrack;
                save();
                toast(`Beralih ke: ${TRACKS_DATA[targetTrack].name}`);
                if (page !== 'map') go('map');
                else render();
            };
        });

        // Result next buttons (Strictly guarded by 5/5 challenge score)
        const resRoutingBtn = $('#btn-result-to-routing');
        if (resRoutingBtn) {
            resRoutingBtn.onclick = () => {
                sfx.click();
                if (!isTrackCompleted('wsn')) {
                    sfx.wrong();
                    toast('🔒 Anda harus menjawab dengan benar SEMUA 5 soal tantangan WSN (Skor 5/5)!');
                    return;
                }
                S.activeTrack = 'routing';
                save();
                go('routing-1');
            };
        }
        const resMeshBtn = $('#btn-result-to-mesh');
        if (resMeshBtn) {
            resMeshBtn.onclick = () => {
                sfx.click();
                if (!isTrackCompleted('routing')) {
                    sfx.wrong();
                    toast('🔒 Anda harus menjawab dengan benar SEMUA 5 soal tantangan ROUTING MASTER (Skor 5/5)!');
                    return;
                }
                S.activeTrack = 'mesh';
                save();
                go('mesh-1');
            };
        }

        const gotoRoutingBtn = $('#btn-goto-routing');
        if (gotoRoutingBtn) {
            gotoRoutingBtn.onclick = () => {
                sfx.click();
                if (!isTrackCompleted('wsn')) {
                    sfx.wrong();
                    toast('🔒 Anda harus menjawab dengan benar SEMUA 5 soal tantangan WSN (Skor 5/5)!');
                    return;
                }
                S.activeTrack = 'routing';
                save();
                go('routing-1');
            };
        }
        const gotoMeshBtn = $('#btn-goto-mesh');
        if (gotoMeshBtn) {
            gotoMeshBtn.onclick = () => {
                sfx.click();
                if (!isTrackCompleted('routing')) {
                    sfx.wrong();
                    toast('🔒 Anda harus menjawab dengan benar SEMUA 5 soal tantangan ROUTING MASTER (Skor 5/5)!');
                    return;
                }
                S.activeTrack = 'mesh';
                save();
                go('mesh-1');
            };
        }

        // Login Form
        const loginForm = $('#loginform');
        if (loginForm) {
            loginForm.onsubmit = e => {
                e.preventDefault();
                sfx.click();
                const u = $('#username').value.trim();
                if (!u) {
                    toast('Silakan masukkan username terlebih dahulu.');
                    return;
                }
                S.username = u.toLowerCase().replace(/\s+/g, '_');
                S.name = u.charAt(0).toUpperCase() + u.slice(1);
                if ($('#remember').checked) {
                    localStorage.setItem('sq-username', u);
                }
                save();
                toast(`Selamat datang kembali, ${S.name}! Total XP: ${S.points}`);
                setTimeout(() => go('dashboard'), 400);
            };
        }

        // Quiz Question Options & Submit
        const optsContainer = $('#opts');
        if (optsContainer) {
            const currentTrack = S.currentQuizTrack || 'wsn';
            const tState = S.tracks[currentTrack];
            const currentQ = QUIZZES[currentTrack];

            $$('#opts [data-answer]').forEach(b => {
                b.onclick = () => {
                    sfx.click();
                    $$('#opts [data-answer]').forEach(x => x.classList.remove('selected'));
                    b.classList.add('selected');
                };
            });

            const submitBtn = $('#submit');
            if (submitBtn) {
                submitBtn.onclick = () => {
                    const sel = $('[data-answer].selected');
                    if (!sel) {
                        toast('Silakan pilih salah satu jawaban terlebih dahulu.');
                        return;
                    }

                    const i = Math.min(tState.q || 0, 4);
                    const chosen = parseInt(sel.dataset.answer, 10);
                    tState.quizAnswers[i] = chosen;

                    const isCorrect = chosen === currentQ[i][2];
                    const wasWrongBefore = Array.isArray(tState.wrongIndices) && tState.wrongIndices.includes(i);

                    if (!Array.isArray(tState.rewardedQuestions)) tState.rewardedQuestions = [];

                    if (isCorrect) {
                        sfx.correct();

                        // Nyawa bertambah 1 jika sebelumnya 0 atau kurang dari 3
                        S.lives = Math.min(3, S.lives + 1);
                        tState.retrying = false;

                        if (Array.isArray(tState.wrongIndices)) {
                            tState.wrongIndices = tState.wrongIndices.filter(idx => idx !== i);
                        }

                        // Beri +100 XP jika belum di-reward untuk soal ini
                        if (!tState.rewardedQuestions.includes(i)) {
                            tState.rewardedQuestions.push(i);
                            addXP(100, `(Jawaban Benar Soal #${i + 1})`);
                        } else {
                            toast(`✓ Jawaban Benar Soal #${i + 1}! Nyawa bertambah (+1 ❤️). Total: ${S.lives}/3`);
                        }

                        // Evaluasi seluruh 5 soal
                        const correctCount = currentQ.filter((qItem, idx) => tState.quizAnswers[idx] === qItem[2]).length;
                        const allCorrect = (correctCount === 5);

                        if (allCorrect) {
                            tState.quizCompleted = true;
                            tState.completed = true;

                            // Bonus 500 XP diberikan ketika semua 5 soal berhasil dijawab dengan benar
                            if (!tState.bonusAwarded) {
                                tState.bonusAwarded = true;
                                addXP(500, `(BONUS KELULUSAN SEMUA SOAL ${TRACKS_DATA[currentTrack]?.name.toUpperCase()}! 🎉)`);
                            }

                            if (currentTrack === 'wsn') {
                                S.completed = true;
                                S.badge = true;
                                unlockBadge('explorer', 'WSN Explorer');
                                toast('🎉 Selamat! Materi WSN tuntas sempurna 5/5 (1.000 XP)! Materi ROUTING MASTER kini TERBUKA!');
                            } else if (currentTrack === 'routing') {
                                unlockBadge('routing', 'Routing Master');
                                toast('🎉 Hebat! Materi ROUTING MASTER tuntas sempurna 5/5 (1.000 XP)! Materi MESH ARCHITECT kini TERBUKA!');
                            } else if (currentTrack === 'mesh') {
                                unlockBadge('mesh', 'Mesh Architect');
                                toast('🏆 LUAR BIASA! Seluruh 3 Materi WSN telah tuntas sempurna (3.000 XP)!');
                            }

                            save();
                            go('result');
                        } else {
                            // Belum semua benar (misalnya baru memperbaiki 1 soal)
                            tState.quizCompleted = false;
                            tState.completed = false;

                            // Jika dalam alur awal (sebelum soal 5):
                            if (i < 4 && !wasWrongBefore) {
                                tState.q = i + 1;
                            } else {
                                // Arahkan ke soal salah berikutnya jika ada
                                const wrongList = tState.wrongIndices || [];
                                if (wrongList.length > 0) {
                                    tState.q = wrongList[0];
                                } else {
                                    tState.q = 5;
                                }
                            }
                            save();
                            go('correct');
                        }
                    } else {
                        // Jawaban SALAH:
                        sfx.wrong();
                        // Nyawa berkurang 1
                        S.lives = Math.max(0, S.lives - 1);
                        tState.retrying = false;

                        // Poin BERKURANG 100 XP tiap menjawab salah!
                        deductXP(100, `(Jawaban Salah Soal #${i + 1})`);

                        // Hapus dari rewardedQuestions
                        if (Array.isArray(tState.rewardedQuestions)) {
                            tState.rewardedQuestions = tState.rewardedQuestions.filter(idx => idx !== i);
                        }

                        if (!Array.isArray(tState.wrongIndices)) tState.wrongIndices = [];
                        if (!tState.wrongIndices.includes(i)) tState.wrongIndices.push(i);

                        // Tandai modul belum selesai karena ada soal yang salah
                        tState.quizCompleted = false;
                        tState.completed = false;

                        // Tetap di soal ini untuk diulang
                        tState.q = i;
                        save();
                        go('wrong');
                    }
                };
            }
        }

        // Retry on wrong feedback page when lives reach 0
        const retryOnWrongBtn = $('#btn-retry-on-wrong');
        if (retryOnWrongBtn) {
            retryOnWrongBtn.onclick = () => {
                sfx.click();
                const currentTrack = S.currentQuizTrack || 'wsn';
                const tState = S.tracks[currentTrack];
                const retryIdx = parseInt(retryOnWrongBtn.dataset.retryIdx, 10);

                tState.q = retryIdx;
                if (tState.quizAnswers) delete tState.quizAnswers[retryIdx];
                // Nyawa benar-benar mulai dari 0 lagi!
                S.lives = 0;
                tState.retrying = true;
                save();

                const quizTarget = TRACKS_DATA[currentTrack]?.quizRoute || 'quiz';
                go(quizTarget);
            };
        }

        // Retry wrong question button when quiz shows 0 lives screen
        const retryWrongQBtn = $('#btn-retry-wrong-q');
        if (retryWrongQBtn) {
            retryWrongQBtn.onclick = () => {
                sfx.click();
                const currentTrack = S.currentQuizTrack || 'wsn';
                const tState = S.tracks[currentTrack];
                const targetIdx = parseInt(retryWrongQBtn.dataset.targetQ, 10);

                tState.q = targetIdx;
                if (tState.quizAnswers) delete tState.quizAnswers[targetIdx];
                // Nyawa benar-benar mulai dari 0 lagi!
                S.lives = 0;
                tState.retrying = true;
                save();

                const quizTarget = TRACKS_DATA[currentTrack]?.quizRoute || 'quiz';
                go(quizTarget);
            };
        }

        // Fix wrong questions from result / evaluation screen
        const fixWrongBtn = $('#btn-fix-wrong-q');
        if (fixWrongBtn) {
            fixWrongBtn.onclick = () => {
                sfx.click();
                const currentTrack = S.currentQuizTrack || 'wsn';
                const tState = S.tracks[currentTrack];
                const currentQ = QUIZZES[currentTrack];

                // Find first incorrect question index
                let targetIdx = 0;
                for (let idx = 0; idx < 5; idx++) {
                    if (tState.quizAnswers[idx] !== currentQ[idx][2]) {
                        targetIdx = idx;
                        break;
                    }
                }

                tState.q = targetIdx;
                if (tState.quizAnswers) delete tState.quizAnswers[targetIdx];
                if (S.lives <= 0) {
                    S.lives = 0; // Mulai dari 0 jika sebelumnya habis
                    tState.retrying = true;
                }
                save();
                const quizTarget = TRACKS_DATA[currentTrack]?.quizRoute || 'quiz';
                go(quizTarget);
            };
        }

        // Next Question Button on feedback pages
        const nextBtn = $('#next');
        if (nextBtn) {
            nextBtn.onclick = () => {
                sfx.click();
                const currentTrack = S.currentQuizTrack || 'wsn';
                const tState = S.tracks[currentTrack];
                const currentQ = QUIZZES[currentTrack];
                const correctCount = currentQ.filter((qItem, idx) => tState.quizAnswers[idx] === qItem[2]).length;

                if (correctCount === 5) {
                    go('result');
                } else if ((tState.q || 0) >= 5 && (tState.wrongIndices || []).length > 0) {
                    // Jika sudah sampai akhir tapi ada yang salah, arahkan ke hasil evaluasi untuk perbaikan
                    go('result');
                } else {
                    const quizTarget = TRACKS_DATA[currentTrack]?.quizRoute || 'quiz';
                    go(quizTarget);
                }
            };
        }

        // Retake Quiz
        const retakeBtn = $('#btn-retake-quiz');
        if (retakeBtn) {
            retakeBtn.onclick = () => {
                sfx.click();
                S.lives = 3;
                const currentTrack = S.currentQuizTrack || 'wsn';
                const tState = S.tracks[currentTrack];
                tState.q = 0;
                tState.quizAnswers = [];
                tState.wrongIndices = [];
                tState.rewardedQuestions = [];
                tState.quizCompleted = false;
                tState.completed = false;
                tState.retrying = false;
                save();
                toast(`Evaluasi ${TRACKS_DATA[currentTrack]?.name} diulang. Nyawa dipulihkan (3/3)!`);
                const quizTarget = TRACKS_DATA[currentTrack]?.quizRoute || 'quiz';
                go(quizTarget);
            };
        }

        // Edit Profile Modal
        const editProfileBtn = $('#btn-edit-profile');
        if (editProfileBtn) {
            editProfileBtn.onclick = () => {
                sfx.click();
                const avatars = ['⚡', '🤖', '📡', '🔬', '🚀', '💻'];
                const modalHtml = `
                    <div class="field">
                        <label>NAMA TAMPILAN</label>
                        <input id="edit-name" value="${esc(S.name)}" placeholder="Nama lengkap">
                    </div>
                    <div class="field">
                        <label>PILIH AVATAR</label>
                        <div class="avatar-picker" id="avatar-opts">
                            ${avatars.map(a => `
                                <div class="avatar-opt ${(S.avatar || '⚡') === a ? 'selected' : ''}" data-avatar="${a}">${a}</div>
                            `).join('')}
                        </div>
                    </div>
                    <button class="btn primary" id="btn-save-profile" style="width:100%;margin-top:14px">Simpan Perubahan</button>
                `;
                showModal('✏️ Edit Profil Explorer', modalHtml);

                $$('#avatar-opts .avatar-opt').forEach(opt => {
                    opt.onclick = () => {
                        sfx.click();
                        $$('#avatar-opts .avatar-opt').forEach(o => o.classList.remove('selected'));
                        opt.classList.add('selected');
                    };
                });

                $('#btn-save-profile').onclick = () => {
                    const newName = $('#edit-name').value.trim();
                    const selAvatar = $('#avatar-opts .avatar-opt.selected');

                    if (!newName) {
                        toast('Nama tidak boleh kosong.');
                        return;
                    }

                    S.name = newName;
                    if (selAvatar) S.avatar = selAvatar.dataset.avatar;

                    save();
                    sfx.correct();
                    closeModal();
                    toast('Profil berhasil diperbarui!');
                    render();
                };
            };
        }

        // Reset Progress Modal (Resets XP strictly back to 0)
        const resetProgressBtn = $('#btn-reset-progress');
        if (resetProgressBtn) {
            resetProgressBtn.onclick = () => {
                sfx.click();
                const modalHtml = `
                    <p class="small" style="line-height:1.8">
                        Apakah Anda yakin ingin mereset seluruh progres pembelajaran?<br>
                        Tindakan ini akan mengembalikan poin XP ke <b>0 XP</b>, mengunci kembali Materi ROUTING MASTER dan MESH ARCHITECT, mereset evaluasi kuis, dan mengembalikan 3 nyawa.
                    </p>
                    <div class="row" style="margin-top:16px">
                        <button class="btn secondary" onclick="closeModal()">Batal</button>
                        <button class="btn danger" id="btn-confirm-reset">Ya, Reset Sekarang (0 XP)</button>
                    </div>
                `;
                showModal('⚠️ Konfirmasi Reset Progres', modalHtml);
                $('#btn-confirm-reset').onclick = () => {
                    sfx.wrong();
                    S.points = 0;
                    S.lives = 3;
                    S.q = 0;
                    S.answers = [];
                    S.completed = false;
                    S.badge = false;
                    S.unlockedLevel = 1;
                    S.completedLevels = [];
                    S.badges = [];
                    S.simulationsUsed = [];
                    S.activeTrack = 'wsn';
                    S.currentQuizTrack = 'wsn';
                    S.tracks = {
                        wsn: { unlockedLevel: 1, completedLevels: [], completed: false, quizCompleted: false, quizScore: 0, quizAnswers: [], wrongIndices: [], q: 0 },
                        routing: { unlockedLevel: 1, completedLevels: [], completed: false, quizCompleted: false, quizScore: 0, quizAnswers: [], wrongIndices: [], q: 0 },
                        mesh: { unlockedLevel: 1, completedLevels: [], completed: false, quizCompleted: false, quizScore: 0, quizAnswers: [], wrongIndices: [], q: 0 }
                    };
                    save();
                    closeModal();
                    toast('Seluruh progres belajar berhasil direset ke 0 XP!');
                    render();
                };
            };
        }

        // Settings toggles
        $$('[data-setting]').forEach(b => {
            b.onclick = () => {
                sfx.click();
                const k = b.dataset.setting;
                S[k] = !S[k];
                save();
                b.classList.toggle('on', S[k]);
                if (k === 'dark') {
                    document.body.classList.toggle('darkmode', S.dark);
                }
                toast(`Pengaturan ${k === 'notifications' ? 'Notifikasi' : k === 'audio' ? 'Efek Suara' : 'Mode Gelap'} diperbarui.`);
            };
        });

        // Logout
        const logoutBtn = $('#logout');
        if (logoutBtn) {
            logoutBtn.onclick = () => {
                sfx.click();
                if (confirm('Keluar dari sesi demo? Progres lokal Anda tetap tersimpan.')) {
                    go('login');
                }
            };
        }
    }

    // Global Key Listener for Accessibility (A, B, C, D to pick quiz option, Enter to submit)
    window.addEventListener('keydown', e => {
        if (['quiz', 'quiz-routing', 'quiz-mesh'].includes(page)) {
            const key = e.key.toUpperCase();
            if (['A', 'B', 'C', 'D'].includes(key)) {
                const idx = key.charCodeAt(0) - 65;
                const opt = $(`[data-answer="${idx}"]`);
                if (opt) {
                    sfx.click();
                    $$('#opts [data-answer]').forEach(x => x.classList.remove('selected'));
                    opt.classList.add('selected');
                }
            } else if (e.key === 'Enter') {
                const sub = $('#submit');
                if (sub) sub.click();
            }
        }
    });

    // Theme setup on initial load
    if (S.dark) {
        document.body.classList.add('darkmode');
    } else {
        document.body.classList.remove('darkmode');
    }

    // Initialize View
    try {
        render();
    } catch (err) {
        console.error('Render error:', err);
        document.body.innerHTML = `
            <div style="max-width:600px;margin:50px auto;padding:24px;background:#fff1f2;border:2px solid #f43f5e;border-radius:12px;font-family:sans-serif;color:#9f1239">
                <h2>⚠️ Terjadi Kendala Tampilan</h2>
                <p><b>Pesan:</b> ${err.message}</p>
                <button onclick="localStorage.removeItem('sq-state');location.reload()" style="background:#e11d48;color:white;border:none;padding:10px 16px;border-radius:8px;font-weight:bold;cursor:pointer">
                    🔄 Reset Data & Muat Ulang
                </button>
            </div>
        `;
    }
})();
