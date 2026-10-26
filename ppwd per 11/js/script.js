
    // Nonaktifkan animasi otomatis jika pengguna meminta reduced motion
    jQuery.fx.off = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    $(function () {

        // 1. DROPDOWN NAVBAR
        $('.dropdown')
            .on('mouseenter', function () {
                $(this).find('.dropdown-menu').stop(true, true).slideDown(300);
            })
            .on('mouseleave', function () {
                $(this).find('.dropdown-menu').stop(true, true).slideUp(300);
            });

        // 2. TAB MENU MAKANAN KUCING
        $('.tab-panel').hide().first().show();

        $('.tab').on('click', function () {
            const target = $(this).data('target');

            if ($(target).is(':visible')) return;

            $('.tab').removeClass('active');
            $(this).addClass('active');

            $('.tab-panel:visible').stop(true, true).fadeOut(200, function () {
                $(target).stop(true, true).fadeIn(400);
            });
        });

        // 3. ANIMASI KARTU PRODUK
        $('.menu-card')
            .css('position', 'relative')
            .on('mouseenter', function () {
                $(this).stop().animate({ top: '-6px' }, 150);
            })
            .on('mouseleave', function () {
                $(this).stop().animate({ top: '0px' }, 150);
            });

        // 4. FORM PESANAN
        $('#formPesan .field')
            .on('focus', function () {
                $(this).addClass('is-focus').removeClass('is-error');
                $(this).siblings('.hint').stop(true, true).slideDown(150);
            })
            .on('blur', function () {
                $(this).removeClass('is-focus');
                $(this).siblings('.hint').stop(true, true).slideUp(150);

                if ($(this).hasClass('wajib')) {
                    $(this).toggleClass(
                        'is-error',
                        $(this).val().trim() === ''
                    );
                }
            });

        // NOTIFIKASI TOAST
        function tampilkanToast(pesan, tipe) {
            $('#toast')
                .stop(true, true)
                .removeClass('success error')
                .addClass(tipe)
                .text(pesan)
                .fadeIn(250)
                .delay(2500)
                .fadeOut(400);
        }

        // PROSES FORM PESANAN
        $('#formPesan').on('submit', function (e) {
            e.preventDefault();

            const nama = $('#nama').val().trim();
            const menu = $('#pilihMenu').val();

            if (nama === '' || menu === '') {
                $('.wajib').each(function () {
                    $(this).toggleClass(
                        'is-error',
                        $(this).val().trim() === ''
                    );
                });

                tampilkanToast(
                    'Lengkapi nama dan pilihan makanan kucing terlebih dahulu!',
                    'error'
                );
                return;
            }

            tampilkanToast(
                'Pesanan ' + menu + ' atas nama ' + nama +
                ' berhasil dikirim!',
                'success'
            );

            this.reset();
        });

        // 5. TOMBOL KEMBALI KE ATAS
        const $btnTop = $('#backToTop');

        $(window).on('scroll', function () {
            if ($(this).scrollTop() > 300) {
                $btnTop.fadeIn(200);
            } else {
                $btnTop.fadeOut(200);
            }
        });

        $btnTop.on('click', function () {
            $('html, body').animate({ scrollTop: 0 }, 500);
        });

        // 6. VALIDASI FORM PENDAFTARAN MEMBER
        $.validator.addMethod(
            'nomorHp',
            function (value, element) {
                return this.optional(element) ||
                    /^[0-9]{10,12}$/.test(value);
            },
            'Nomor HP harus 10-12 digit angka'
        );

        $.validator.addMethod(
            'hurufAngka',
            function (value, element) {
                return this.optional(element) ||
                    (/[A-Za-z]/.test(value) && /[0-9]/.test(value));
            },
            'Password harus mengandung huruf dan angka'
        );

        const validator = $('#formMember').validate({
            onfocusout: function (element) {
                this.element(element);
            },

            onkeyup: function (element) {
                $(element).valid();
            },

            rules: {
                nama: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    email: true
                },
                hp: {
                    required: true,
                    nomorHp: true
                },
                usia: {
                    required: true,
                    digits: true,
                    min: 17
                },
                password: {
                    required: true,
                    minlength: 8,
                    hurufAngka: true
                },
                konfirmasi: {
                    required: true,
                    equalTo: '#mPassword'
                }
            },

            messages: {
                nama: {
                    required: 'Nama wajib diisi',
                    minlength: 'Nama minimal 3 karakter'
                },
                email: {
                    required: 'Email wajib diisi',
                    email: 'Format email tidak valid'
                },
                hp: {
                    required: 'Nomor HP wajib diisi',
                    nomorHp: 'Nomor HP harus 10-12 digit angka'
                },
                usia: {
                    required: 'Usia wajib diisi',
                    digits: 'Usia harus berupa angka',
                    min: 'Usia minimal 17 tahun'
                },
                password: {
                    required: 'Password wajib diisi',
                    minlength: 'Password minimal 8 karakter',
                    hurufAngka: 'Password harus mengandung huruf dan angka'
                },
                konfirmasi: {
                    required: 'Konfirmasi password wajib diisi',
                    equalTo: 'Password konfirmasi tidak sama'
                }
            },

            errorElement: 'div',
            errorClass: 'pesan-error',

            errorPlacement: function (error, element) {
                error.insertAfter(element);
            },

            highlight: function (element) {
                $(element).addClass('is-error').removeClass('is-valid');
            },

            unhighlight: function (element) {
                $(element).removeClass('is-error').addClass('is-valid');
            },

            submitHandler: function (form) {
                const namaMember = $('#mNama').val().trim();

                tampilkanToast(
                    'Selamat datang, ' + namaMember +
                    '! Akun member Kimoy’s Store berhasil dibuat.',
                    'success'
                );

                $('#sukses')
                    .stop(true, true)
                    .slideDown(300)
                    .delay(3000)
                    .slideUp(300);

                form.reset();
                validator.resetForm();
                $('#formMember input').removeClass('is-error is-valid');
            }
        });

        // 7. SMOOTH SCROLL UNTUK LINK INTERNAL
        $('a[href^="#"]').on('click', function (e) {
            const href = $(this).attr('href');

            if (!href || href.length < 2) return;

            const $tujuan = $(href);

            if ($tujuan.length === 0) return;

            e.preventDefault();

            $('html, body').stop().animate({
                scrollTop: $tujuan.offset().top - 60
            }, 800, 'swing');
        });

    });