$(document).ready(function () {
    let cart = [];

    $(".tambah").click(function () {
        let nama = $(this).data("nama");
        let harga = Number($(this).data("harga"));
        cart.push({ nama: nama, harga: harga });
        tampilkanCart();
    });

    function hitungTotal() {
        let total = 0;

        cart.forEach(function (item) {
            total += item.harga;
        });

        let diskon = 0;

        if (total > 100000) {
            diskon = total * 0.1;
        }

        return {
            total: total,
            diskon: diskon,
            totalBayar: total - diskon
        };
    }

    function tampilkanCart() {
        $("#daftarKeranjang").html("");

        if (cart.length === 0) {
            $("#daftarKeranjang").text("Belum ada produk.");
        } else {
            cart.forEach(function (item) {
                $("#daftarKeranjang").append(
                    "<p>" + item.nama + " - Rp" + item.harga.toLocaleString("id-ID") + "</p>"
                );
            });
        }

        let hasil = hitungTotal();

        $("#totalHarga").text("Rp" + hasil.total.toLocaleString("id-ID"));
        $("#diskon").text("Rp" + hasil.diskon.toLocaleString("id-ID"));
        $("#totalBayar").text("Rp" + hasil.totalBayar.toLocaleString("id-ID"));
    }

    function prosesPesanan() {
        let nama = $("#nama").val().trim();
        let alamat = $("#alamat").val().trim();
        let nohp = $("#nohp").val().trim();

        if (cart.length === 0) {
            alert("Keranjang masih kosong!");
            return;
        }

        if (nama.length < 3) {
            alert("Nama minimal 3 karakter!");
            $("#nama").focus();
            return;
        }

        if (alamat.length < 5) {
            alert("Alamat harus diisi!");
            $("#alamat").focus();
            return;
        }

        if (!/^\d{10,}$/.test(nohp)) {
            alert("Nomor HP minimal 10 angka!");
            $("#nohp").focus();
            return;
        }

        let hasil = hitungTotal();

        let pesanan = {
            nama: nama,
            alamat: alamat,
            nohp: nohp,
            produk: cart.map(function (item) {
                return item.nama;
            }).join(", "),
            subtotal: hasil.total,
            diskon: hasil.diskon,
            totalBayar: hasil.totalBayar,
            tanggal: new Date().toLocaleString("id-ID")
        };

        let riwayat = JSON.parse(localStorage.getItem("riwayatPesanan") || "[]");

        riwayat.push(pesanan);

        localStorage.setItem("riwayatPesanan", JSON.stringify(riwayat));

        tampilkanRiwayat();

        alert("Pesanan berhasil dibuat!");

        cart = [];
        tampilkanCart();

        $("#formPembeli")[0].reset();
        $("#pesan").text("");
    }

    $("#checkout").click(function () {
        prosesPesanan();
    });

    $("#formPembeli").submit(function (event) {
        event.preventDefault();
        prosesPesanan();
    });

    function tampilkanRiwayat() {
        let riwayat = JSON.parse(localStorage.getItem("riwayatPesanan") || "[]");

        $("#riwayatPesanan").html("");

        if (riwayat.length === 0) {
            $("#riwayatPesanan").text("Belum ada pesanan.");
            return;
        }

        riwayat.forEach(function (item) {
            $("#riwayatPesanan").append(`
                <div class="history-item">
                    <strong>${item.nama}</strong>
                    <p>${item.tanggal}</p>
                    <p>Alamat: ${item.alamat}</p>
                    <p>No. HP: ${item.nohp}</p>
                    <p>Produk: ${item.produk}</p>
                    <p>Subtotal: Rp${item.subtotal.toLocaleString("id-ID")}</p>
                    <p>Diskon: Rp${item.diskon.toLocaleString("id-ID")}</p>
                    <p><strong>Total Bayar: Rp${item.totalBayar.toLocaleString("id-ID")}</strong></p>
                </div>
            `);
        });
    }
    tampilkanCart();
    tampilkanRiwayat();
});