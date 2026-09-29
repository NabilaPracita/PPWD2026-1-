const penerima = document.getElementById("penerima");
const pesan = document.getElementById("pesan");
const tema = document.getElementById("tema");

const buatKartu = document.getElementById("buatKartu");
const reset = document.getElementById("reset");

const kartu = document.getElementById("kartu");

const previewPenerima =
    document.getElementById("previewPenerima");

const previewPesan =
    document.getElementById("previewPesan");

penerima.addEventListener("input", function () {
    if (penerima.value === "") {
        previewPenerima.textContent = "Nama Penerima";
    } else {
        previewPenerima.textContent = penerima.value;
    }
});
pesan.addEventListener("input", function () {
    if (pesan.value === "") {
        previewPesan.textContent =
            "Pesan ucapan akan muncul di sini.";
    } else {
        previewPesan.textContent = pesan.value;
    }
});
tema.addEventListener("change", function () {
    kartu.className = "kartu " + tema.value;
});
buatKartu.addEventListener("click", function () {
    if (
        penerima.value === "" ||
        pesan.value === ""
    ) {
        alert("Nama penerima dan pesan wajib diisi!");
        return;
    }
    previewPenerima.textContent = penerima.value;
    previewPesan.textContent = pesan.value;
    alert("Kartu ucapan berhasil dibuat!");
});
reset.addEventListener("click", function () {
    penerima.value = "";
    pesan.value = "";
    tema.value = "pink";
    previewPenerima.textContent =
        "Nama Penerima";
    previewPesan.textContent =
        "Pesan ucapan akan muncul di sini.";
    kartu.className = "kartu pink";
});