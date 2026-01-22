import "./style.css";

const targetDate = new Date("November 8, 2026 19:00:00").getTime();

function updateCountdown() {
	const now = new Date().getTime();
	const distance = targetDate - now;

	if (distance < 0) {
		document.querySelector(".countdown").innerHTML =
			"🎉 Acara sedang berlangsung!";
		return;
	}

	const days = Math.floor(distance / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((distance % (1000 * 60)) / 1000);

	document.getElementById("days").innerText = days;
	document.getElementById("hours").innerText = hours;
	document.getElementById("minutes").innerText = minutes;
	document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// script transisi scroll
const observer = new IntersectionObserver(entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add("active");
		}
	});
});

const elements = document.querySelectorAll(".reveal");
elements.forEach(el => observer.observe(el));

// Script Pesan dan Doa
// Ambil data awal dari LocalStorage
let pesanList = JSON.parse(localStorage.getItem("pesanList")) || [];

// Ambil container div untuk menampilkan pesan
const container = document.getElementById("pesan-container");

// Fungsi render pesan
function tampilkanPesan() {
	container.innerHTML = ""; // kosongkan dulu
	const data = JSON.parse(localStorage.getItem("pesanList")) || [];

	data.forEach((item, index) => {
		const div = document.createElement("div");
		div.className = "pesan-buble";
		div.innerHTML = `
      <p class="nama-pesan">${item.nama}</p>
      <p class="isi-pesan">${item.pesan}</p>
    `;
		container.appendChild(div);
	});
}

// Event submit form
document.getElementById("formPesan").addEventListener("submit", function (e) {
	e.preventDefault();

	const nama = document.getElementById("nama").value;
	const isiPesan = document.getElementById("pesan").value;

	// buat objek pesan
	const pesanBaru = { nama: nama, pesan: isiPesan };

	// simpan ke array dan LocalStorage
	pesanList.push(pesanBaru);
	localStorage.setItem("pesanList", JSON.stringify(pesanList));

	// render ulang
	tampilkanPesan();

	// reset form
	this.reset();
});

// render saat pertama kali load
tampilkanPesan();
