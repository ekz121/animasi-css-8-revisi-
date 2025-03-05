// Data anggota untuk lightbox
const members = [
    { id: 1, name: "Nagato (Pain)", desc: "Pemimpin Akatsuki dengan kemampuan Rinnegan yang sangat kuat.", img: "images/pain.jpeg" },
    { id: 2, name: "Konan", desc: "Anggota inti yang loyal, ahli manipulasi kertas.", img: "images/konan.jpeg" },
    { id: 3, name: "Itachi Uchiha", desc: "Ninja legendaris dengan Mangekyo Sharingan.", img: "images/itachi.jpeg" },
    { id: 4, name: "Kisame Hoshigaki", desc: "Pakar pedang dengan kekuatan fisik luar biasa.", img: "images/kisame.jpeg" },
    { id: 5, name: "Deidara", desc: "Ahli ledakan yang percaya seni adalah ledakan.", img: "images/deidara.jpeg" },
    { id: 6, name: "Sasori", desc: "Master boneka dengan teknik racun mematikan.", img: "images/sasori.jpeg" },
    { id: 7, name: "Hidan", desc: "Anggota abadi dengan ritual darah yang unik.", img: "images/hidan.jpeg" },
    { id: 8, name: "Kakuzu", desc: "Pengumpul harta yang menguasai lima elemen.", img: "images/kakuzu.jpeg" },
    { id: 9, name: "sasuke", desc: "balas dendam kepada desa konoha", img: "images/sasuke.jpeg" }, // Perbaikan gambar
    { id: 10, name: "Tobi (Obito Uchiha)", desc: "Manipulator tersembunyi dengan Sharingan dan Rinnegan.", img: "images/ovito.jpeg" }
];

// Fungsi membuka lightbox
function openLightbox(memberId) {
    const member = members.find(m => m.id === memberId);
    if (member) {
        document.getElementById("lightbox-img").src = member.img;
        document.getElementById("lightbox-name").textContent = member.name;
        document.getElementById("lightbox-desc").textContent = member.desc;
        document.getElementById("lightbox").style.display = "flex";
    }
}

// Fungsi menutup lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Animasi Transisi untuk Navigasi
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = link.href; // Langsung navigasi tanpa animasi fade-out
    });
});

// Transisi Halaman untuk Next dan Prev
const teamPage = document.getElementById("team-page");
const videoPage = document.getElementById("video-page");
const descPage = document.getElementById("desc-page");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

let currentPage = "team";
let isTransitioning = false; // Tambahkan flag untuk mencegah transisi ganda

// Fungsi untuk menangani transisi halaman
function transitionPage(fromPage, toPage, direction) {
    if (isTransitioning) return; // Cegah transisi ganda
    isTransitioning = true;

    fromPage.classList.remove("active");
    fromPage.classList.add(direction === "left" ? "exit-left" : "exit-right");
    setTimeout(() => {
        toPage.classList.add(direction === "left" ? "enter-right" : "enter-left");
        toPage.classList.add("active");
        if (toPage === descPage) {
            // Animasi teks deskripsi
            setTimeout(() => {
                document.querySelectorAll(".desc-container h2, .desc-text").forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add("visible");
                    }, index * 200);
                });
            }, 100);
        }
        isTransitioning = false; // Reset flag setelah transisi selesai
    }, 500);
}

nextBtn.addEventListener("click", () => {
    if (currentPage === "team") {
        transitionPage(teamPage, videoPage, "left");
        currentPage = "video";
        prevBtn.style.display = "block";
    } else if (currentPage === "desc") {
        transitionPage(descPage, videoPage, "left");
        currentPage = "video";
    }
});

prevBtn.addEventListener("click", () => {
    if (currentPage === "video") {
        transitionPage(videoPage, descPage, "right");
        currentPage = "desc";
    } else if (currentPage === "team") {
        transitionPage(teamPage, descPage, "right");
        currentPage = "desc";
    }
});