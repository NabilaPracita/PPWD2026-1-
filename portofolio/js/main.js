/* TYPING EFFECT */

$(document).ready(function () {

        const names = [
            "Nabila Pracita Ramadanti",
            "Mahasiswa Sistem Informasi",
        ];
        let nameIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const typingText = $("#typing-text");  
            if (!typingText) {
                return;
            }
            const currentName = names[nameIndex];
            if (isDeleting) {
                typingText.text(
                    currentName.substring(0, charIndex - 1)
                );
                charIndex--;
            } else {
                typingText.text(
                    currentName.substring(0, charIndex + 1)
                );
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
        const journeyGrid = $("#journey-grid");
        // Buat card jika elemennya ditemukan
         if (journeyGrid.length > 0) {
            journeys.forEach(function (journey) {
                journeyGrid.append(`
                <div class="journey-card">
                    <div class="journey-number">
                        ${journey.number}
                    </div>
                    <h3>
                        ${journey.title}
                    </h3>
                    <p>
                        ${journey.description}
                    </p>
                </div>
            `);
        });

        // Ganti nama
        $("#btnGantiNama").click(function () {
                $("#typing-text")
            .stop(true, true)
            .fadeOut(200, function () {
                $(this)
                    .text("Nabila Pracita")
                    .fadeIn(400);
            });
        });


        // Efek foto
        $("#btnEfekFoto").click(function () {
            $(".pink-circle")
            .stop(true, true)
            .animate({
                opacity: 0.4
            }, 300)
            .animate({
                opacity: 1,
                marginTop: "-15px"
            }, 300)
            .animate({
                marginTop: "0px"
            }, 300);
        });


        // Tambah journey
        $("#btnTambahJourney").click(function () {
            $("#journey-grid").append(`
                 <div class="journey-card new-journey">
                <div class="journey-number">
                    05
                </div>
                <h3>
                    Pengalaman Baru
                </h3>
                <p>
                    Terus menambah pengalaman melalui kegiatan,
                    pembelajaran, dan berbagai kesempatan baru.
                </p>
            </div>
        `);
        // Efek muncul pada card baru
        $(".new-journey")
            .last()
            .hide()
            .fadeIn(600);
        });

        // Reset
        $("#btnReset").click(function () {
            // Kembalikan nama
            $("#typing-text")
                .stop(true, true)
                .text("Nabila Pracita Ramadanti")
                .show();
            // Kembalikan foto
            $(".pink-circle")
                .stop(true, true)
                .css({
                    opacity: 1,
                    marginTop: "0px"
                });
            // Hapus journey tambahan
            $(".new-journey").remove();
        });
        }
});