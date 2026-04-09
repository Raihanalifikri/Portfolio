document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.getElementById("transition-overlay");
    const links = document.querySelectorAll('nav ul li a, .logo, .logout');

    // Skenario 1: Saat halaman baru dimuat, hilangkan blur secara smooth
    if (overlay) {
        overlay.classList.remove("active");
    }

    // Skenario 2: Saat link diklik untuk pindah halaman
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const destination = link.getAttribute("href");

            // Validasi link
            if (destination && destination !== "#" && !destination.startsWith("http")) {
                e.preventDefault();
                
                // Aktifkan efek hitam samar + blur
                overlay.classList.add("active");

                setTimeout(() => {
                    window.location.href = destination;
                }, 500); // Harus sama dengan durasi transition di CSS
            }
        });
    });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle class active di tombol
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');

        // Ambil teks kategori (di-lowercase biar aman)
        const filter = btn.textContent.toLowerCase();

        projectCards.forEach(card => {
            // Ambil semua class yang ada di card
            const categories = card.className.toLowerCase();
            
            if (filter === 'semua' || categories.includes(filter.replace(' ', '-'))) {
                card.classList.remove('is-hidden');
            } else {
                card.classList.add('is-hidden');
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // 1. Pindahin class active
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            // 2. Ambil nilai filter dari data-filter
            const target = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                // Kita cek apakah card punya class yang sama dengan target filter
                if (target === 'all' || card.classList.contains(target)) {
                    card.classList.remove('is-hidden');
                } else {
                    card.classList.add('is-hidden');
                }
            });
        });
    });
});

function updateClock() {
    const clockTime = document.getElementById('clock-time');
    const clockDate = document.getElementById('clock-date');
    
    const now = new Date();
    
    // Format Jam: HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Format Tanggal (Contoh: Thursday, 9 April 2026)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', options);

    if (clockTime && clockDate) {
        clockTime.textContent = `${hours}:${minutes}:${seconds}`;
        clockDate.textContent = dateString;
    }
}

// Jalankan setiap detik
setInterval(updateClock, 1000);

// Panggil sekali pas awal biar gak nunggu 1 detik buat muncul
updateClock();

document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-btn');
    const themeIcon = themeBtn.querySelector('i');
    const currentTheme = localStorage.getItem('theme');

    // Cek di awal apakah user sebelumnya pake light mode
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        // Cek apakah sekarang light mode atau dark mode
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun'); // Ganti ke icon matahari
            localStorage.setItem('theme', 'light');           // Simpan pilihan
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon'); // Ganti ke icon bulan
            localStorage.setItem('theme', 'dark');            // Simpan pilihan
        }
    });
});