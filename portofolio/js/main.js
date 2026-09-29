/* TYPING EFFECT */

const typingText = document.getElementById("typing-text");

const names = [
    "Nabila Pracita Ramadanti",
    "Mahasiswa Sistem Informasi",
];
let nameIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) {
        return;
    }
    const currentName = names[nameIndex];
    if (isDeleting) {
        typingText.textContent =
            currentName.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent =
            currentName.substring(0, charIndex + 1);
        charIndex++;
    }
    let delay = isDeleting ? 50 : 100;
    if (!isDeleting && charIndex === currentName.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        nameIndex = (nameIndex + 1) % names.length;
        delay = 500;
    }
    setTimeout(typeEffect, delay);
}
typeEffect();
/* GENERATE MY JOURNEY */

const journeys = [
    {
        number: "01",
        title: "Awal Perkuliahan",
        description:
            "Memulai perjalanan sebagai mahasiswa Sistem Informasi dan mengenal berbagai dasar teknologi serta sistem informasi."
    },
    {
        number: "02",
        title: "Belajar Teknologi",
        description:
            "Mempelajari berbagai teknologi seperti HTML, CSS, JavaScript, database, dan dasar perancangan sistem."
    },
    {
        number: "03",
        title: "Menambah Pengalaman",
        description:
            "Mengikuti berbagai kegiatan kampus dan organisasi untuk mengembangkan kemampuan bekerja sama dan berkomunikasi."
    },
    {
        number: "04",
        title: "Terus Berkembang",
        description:
            "Terus belajar dan mencoba hal baru untuk mengembangkan kemampuan serta mempersiapkan diri menghadapi dunia kerja."
    }
];
// Ambil tempat untuk card
const journeyGrid = document.getElementById("journey-grid");
// Buat card jika elemennya ditemukan
if (journeyGrid) {
    journeys.forEach(function (journey) {
        const card = document.createElement("div");
        card.className = "journey-card";
        card.innerHTML = `
            <div class="journey-number">
                ${journey.number}
            </div>
            <h3>
                ${journey.title}
            </h3>
            <p>
                ${journey.description}
            </p>
        `;
        journeyGrid.appendChild(card);
    });
}