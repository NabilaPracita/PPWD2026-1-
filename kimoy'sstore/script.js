
$(document).ready(function () {
    const produk = [
        { id: 1, nama: "Whiskas Salmon", harga: 7000, emoji: "🐟" },
        { id: 2, nama: "Royal Canin", harga: 75000, emoji: "🐈" },
        { id: 3, nama: "Me-O Tuna", harga: 8000, emoji: "🐠" },
        { id: 4, nama: "Whiskas Kaleng Tuna Flavor", harga: 9500, emoji: "🥫" },
        { id: 5, nama: "Fur Love Chicken Flavor", harga: 12000, emoji: "🍗" },
        { id: 6, nama: "Pro Plan", harga: 18000, emoji: "🍖" },
        { id: 7, nama: "Happy Cat Dry Food", harga: 15000, emoji: "😺" },
        { id: 8, nama: "Dental Treat", harga: 22000, emoji: "🦴" }
    ];

    let keranjang = [];
    let riwayat = JSON.parse(localStorage.getItem("riwayatKimoy")) || [];

    function rupiah(angka) {
        return "Rp" + angka.toLocaleString("id-ID");
    }

    function tampilProduk(keyword = "") {
        let hasil = produk.filter(p =>
            p.nama.toLowerCase().includes(keyword.toLowerCase())
        );

        $("#daftarProduk").html("");

        if (hasil.length === 0) {
            $("#daftarProduk").html("<p>Produk tidak ditemukan.</p>");
            return;
        }

        hasil.forEach(p => {
            $("#daftarProduk").append(`
                <div class="produk">
                    <div class="gambar-produk">${p.emoji}</div>
                    <h3>${p.nama}</h3>
                    <p class="harga">${rupiah(p.harga)}</p>
                    <button class="tambah" data-id="${p.id}">
                        + Tambah ke Keranjang
                    </button>
                </div>
            `);
        });
    }

    function hitungTotal() {
        let subtotal = keranjang.reduce(
            (total, item) => total + item.harga * item.jumlah, 0
        );

        let diskon = subtotal > 100000 ? subtotal * 0.1 : 0;

        $("#subtotal").text(rupiah(subtotal));
        $("#diskon").text(rupiah(diskon));
        $("#totalBayar").text(rupiah(subtotal - diskon));
        $("#jumlahKeranjang").text(
            keranjang.reduce((total, item) => total + item.jumlah, 0)
        );
    }

    function tampilKeranjang() {
        $("#daftarKeranjang").html("");

        if (keranjang.length === 0) {
            $("#daftarKeranjang").html("<p>Keranjang masih kosong.</p>");
        }

        keranjang.forEach(item => {
            $("#daftarKeranjang").append(`
                <div class="item-keranjang">
                    <div>
                        <strong>${item.nama}</strong><br>
                        ${rupiah(item.harga)} x ${item.jumlah}
                    </div>
                    <div>
                        <button class="ubah-jumlah" data-id="${item.id}" data-aksi="kurang">−</button>
                        <button class="ubah-jumlah" data-id="${item.id}" data-aksi="tambah">+</button>
                        <button class="hapus-item" data-id="${item.id}">🗑</button>
                    </div>
                </div>
            `);
        });

        hitungTotal();
    }

    function tampilRiwayat() {
        $("#daftarRiwayat").html("");

        if (riwayat.length === 0) {
            $("#daftarRiwayat").html("<p>Belum ada pesanan.</p>");
            return;
        }
        riwayat.forEach(pesanan => {
            $("#daftarRiwayat").append(`
                <div class="item-riwayat">
                    <strong>Pesanan #${pesanan.id}</strong><br>
                    Nama: ${pesanan.nama}<br>
                    Nomor HP: ${pesanan.hp}<br>
                    Alamat: ${pesanan.alamat}<br>
                    Tanggal: ${pesanan.tanggal}<br>
                    Produk: ${pesanan.produk}<br>
                    Total: <strong>${rupiah(pesanan.total)}</strong>
                </div>
            `);
        });
    }

    $("#cariProduk").on("input", function () {
        tampilProduk($(this).val());
    });

    $("#daftarProduk").on("click", ".tambah", function () {
        let id = Number($(this).data("id"));
        let item = keranjang.find(p => p.id === id);

        if (item) {
            item.jumlah++;
        } else {
            let p = produk.find(p => p.id === id);
            keranjang.push({ ...p, jumlah: 1 });
        }

        tampilKeranjang();
    });

    $("#daftarKeranjang").on("click", ".ubah-jumlah", function () {
        let id = Number($(this).data("id"));
        let aksi = $(this).data("aksi");
        let item = keranjang.find(p => p.id === id);

        if (aksi === "tambah") item.jumlah++;
        else item.jumlah--;

        keranjang = keranjang.filter(p => p.jumlah > 0);
        tampilKeranjang();
    });

    $("#daftarKeranjang").on("click", ".hapus-item", function () {
        let id = Number($(this).data("id"));
        keranjang = keranjang.filter(p => p.id !== id);
        tampilKeranjang();
    });

    
    $("#bukaKeranjang").click(function () {
        $("#modalKeranjang").css("display", "flex");
    });

    $("#tutupKeranjang, #lanjutBelanja").click(function () {
        $("#modalKeranjang").hide();
    });

    $("#modalKeranjang").click(function (event) {
        if (event.target === this) {
            $(this).hide();
        }
    });

    $("#checkout").click(function () {
        if (keranjang.length === 0) {
            alert("Keranjang masih kosong. Pilih produk terlebih dahulu!");
            return;
        }

        $("#formPembeli").css("display", "flex");
    });

    $("#tutupForm").click(function () {
        $("#formPembeli").hide();
    });

    $("#formCheckout").submit(function (event) {
        event.preventDefault();

        if (keranjang.length === 0) {
            alert("Keranjang masih kosong!");
            $("#formPembeli").hide();
            return;
        }

        let nama = $("#namaPembeli").val().trim();
        let hp = $("#nomorHP").val().trim();
        let alamat = $("#alamat").val().trim();

        if (!nama || !alamat || !/^08\d{8,11}$/.test(hp)) {
            alert("Isi data dengan benar. Nomor HP harus diawali 08 dan terdiri dari 10–13 digit.");
            return;
        }

        let subtotal = keranjang.reduce(
            (total, item) => total + item.harga * item.jumlah, 0
        );

        let total = subtotal - (subtotal > 100000 ? subtotal * 0.1 : 0);

        riwayat.unshift({
            id: Date.now(),
            nama: nama,
            hp: hp,
            alamat: alamat,
            tanggal: new Date().toLocaleString("id-ID"),
            produk: keranjang.map(p => `${p.nama} (${p.jumlah})`).join(", "),
            total: total
        });

        localStorage.setItem("riwayatKimoy", JSON.stringify(riwayat));

        alert("Pesanan berhasil dibuat! Terima kasih sudah berbelanja 🐱");

        keranjang = [];
        tampilKeranjang();
        tampilRiwayat();
        $("#formCheckout")[0].reset();
        $("#formPembeli").hide();
    });

    $("#hapusRiwayat").click(function () {
        if (riwayat.length === 0) {
            alert("Belum ada riwayat yang bisa dihapus.");
            return;
        }

        if (confirm("Yakin ingin menghapus semua riwayat pesanan?")) {
            riwayat = [];
            localStorage.removeItem("riwayatKimoy");
            tampilRiwayat();
        }
    });

    tampilProduk();
    tampilKeranjang();
    tampilRiwayat();
});