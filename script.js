// Menjalankan script setelah semua konten HTML selesai di-load
document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. LOGIKA DARK MODE (GANTI TEMA) =====
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // Target tag <html>

    // Cek tema yang tersimpan di localStorage saat halaman dimuat
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Jika tidak ada, gunakan preferensi sistem (jika sistem dark mode)
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            htmlElement.setAttribute('data-theme', 'dark');
        }
    }

    // Event listener untuk tombol
    themeToggle.addEventListener('click', () => {
        // Cek tema saat ini
        const currentTheme = htmlElement.getAttribute('data-theme');
        
        // Ganti tema
        if (currentTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light'); // Simpan pilihan
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark'); // Simpan pilihan
        }
    });

    // ===== 2. ANIMASI SAAT SCROLL (Intersection Observer) =====
    // Ini adalah cara modern & efisien untuk animasi scroll
    
    // Pilih semua elemen yang ingin dianimasikan saat di-scroll
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // isIntersecting = true jika elemen masuk ke layar
            if (entry.isIntersecting) {
                // Tambahkan kelas '.visible' untuk memicu animasi CSS
                entry.target.classList.add('visible');
                
                // (Opsional) Berhenti mengamati elemen ini agar animasi tidak terulang
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Picu animasi saat 10% elemen terlihat
    });

    // Mulai amati setiap elemen
    scrollElements.forEach(el => {
        observer.observe(el);
    });

    
    // ===== 3. EFEK MESIN TIK (TYPING EFFECT) =====
    const typingElement = document.getElementById('typing-effect');
    const wordsToType = ["Web Developer", "UI/UX Enthusiast", "Problem Solver", "Data Analyst"]; // Ganti dengan jabatan Anda
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        // Dapatkan kata saat ini
        const currentWord = wordsToType[wordIndex];
        
        // Tampilkan substring dari kata
        if (isDeleting) {
            // Sedang menghapus
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Sedang mengetik
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        // Tentukan kecepatan mengetik
        let typeSpeed = 150;
        if (isDeleting) {
            typeSpeed /= 2; // Hapus lebih cepat
        }

        // Cek jika kata selesai diketik
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Jeda sebelum mulai menghapus
            isDeleting = true;
        } 
        // Cek jika kata selesai dihapus
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Pindah ke kata selanjutnya
            wordIndex = (wordIndex + 1) % wordsToType.length;
            typeSpeed = 500; // Jeda sebelum mengetik kata baru
        }

        // Panggil fungsi type lagi setelah jeda
        setTimeout(type, typeSpeed);
    }

    // Mulai efek mengetik
    type();

    // ===== 4. NAVIGASI SMOOTH SCROLL =====
    // (Meskipun sudah ada 'scroll-behavior: smooth' di CSS, 
    // ini adalah backup yang baik untuk browser lama)
    document.querySelectorAll('.main-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Hentikan aksi default link

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});