const products = document.querySelectorAll('#other-products .card');
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");
// Referensi Elemen Modal
const productModal = document.getElementById('productModal');
const checkoutModal = document.getElementById('checkoutModal');
const paymentModal = document.getElementById('paymentModal');

// Tombol Navigasi
const btnPesanSekarang = document.getElementById('btnPesanSekarang');
const btnLanjutPembayaran = document.getElementById('btnLanjutPembayaran');
const btnKirimPesanan = document.getElementById('btnKirimPesanan');

const productDescriptions = {
    "Pembersih Mawar": "Membersihkan wajah secara lembut dengan ekstrak mawar alami, cocok untuk semua jenis kulit.",
    "Penyegar Mawar": "Menyegarkan dan membantu mengecilkan pori-pori dengan aroma mawar alami.",
    "Masker Natural": "Masker berbahan herbal untuk membantu mencerahkan dan menutrisi kulit.",
    "Facial Foam": "Busa lembut yang membersihkan tanpa membuat kulit kering.",
    "Bedak Herbal": "Bedak ringan dengan kandungan herbal alami untuk tampilan natural.",
    "Lip Cream": "Lip cream tahan lama dengan warna natural dan formula ringan."
};

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", function(e) {
        if(e.target.classList.contains("btn")) return;

        const img = this.querySelector("img").src;
        const title = this.querySelector("h3").innerText;
        // Gunakan innerHTML agar tag HTML desain diskon ikut tersalin
        const priceHTML = this.querySelector(".price").innerHTML; 

        modalImg.src = img;
        modalTitle.innerText = title;
        // Gunakan innerHTML agar desain dirender dengan benar di dalam modal
        modalPrice.innerHTML = priceHTML; 
        modalDesc.innerText = productDescriptions[title] || "Deskripsi produk belum tersedia.";

        modal.style.display = "flex";
    });
});

closeModal.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
    if(e.target === modal){
        modal.style.display = "none";
    }
};

let promoApplied = false;

document.getElementById('promoBtn').addEventListener('click', function() {
    if (promoApplied) return;
    
    const code = document.getElementById('promoCode').value;
    const message = document.getElementById('promoMessage');
    const validCode = 'DISKON20';
    
    if (code.toUpperCase() === validCode) {
        const prices = document.querySelectorAll('.price');
        
        prices.forEach(priceEl => {
            let priceText = priceEl.innerText.replace(/[^0-9]/g, '');
            if (priceText) {
                let originalPrice = parseInt(priceText);
                let newPrice = originalPrice * 0.8;
                
                let originalFormatted = 'Rp ' + originalPrice.toLocaleString('id-ID');
                let newFormatted = 'Rp ' + newPrice.toLocaleString('id-ID');
                
                priceEl.innerHTML = `
                    <div><span class="price-discounted">${newFormatted}</span></div>
                    <div>
                        <span class="price-original">${originalFormatted}</span>
                        <span class="discount-label">20%</span>
                    </div>
                `;
            }
        });
        
        message.style.color = 'green';
        message.innerText = 'Promo berhasil diterapkan!';
        promoApplied = true;
    } else {
        message.style.color = 'red';
        message.innerText = 'Kode promo tidak valid.';
    }
});

// Logika Tutup Modal
document.getElementById('closeModal').onclick = () => productModal.style.display = "none";
document.getElementById('closeCheckout').onclick = () => checkoutModal.style.display = "none";
document.getElementById('closePayment').onclick = () => paymentModal.style.display = "none";
document.getElementById('closeBanner').onclick = () => {
  document.getElementById('promoBanner').style.display = 'none';
};

// Trigger Checkout ke Form Data
btnPesanSekarang.onclick = () => {
  productModal.style.display = "none";
  checkoutModal.style.display = "flex"; // Sesuaikan dengan CSS display modal kamu
};

// Trigger Form ke Pilihan Pembayaran
btnLanjutPembayaran.onclick = () => {
  const nama = document.getElementById('buyerName').value.trim();
  const hp = document.getElementById('buyerPhone').value.trim();
  const alamat = document.getElementById('buyerAddress').value.trim();

  if (!nama || !hp || !alamat) {
    alert("Mohon lengkapi semua data pengiriman!");
    return;
  }
  checkoutModal.style.display = "none";
  paymentModal.style.display = "flex";
};

// Trigger Pilihan Pembayaran ke WhatsApp
btnKirimPesanan.onclick = () => {
  const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
  if (!selectedPayment) {
    alert("Mohon pilih metode pembayaran!");
    return;
  }

  const productName = document.getElementById('modalTitle').innerText;
  const productPrice = document.getElementById('modalPrice').innerText;
  const nama = document.getElementById('buyerName').value;
  const hp = document.getElementById('buyerPhone').value;
  const alamat = document.getElementById('buyerAddress').value;
  const payment = selectedPayment.value;

  const waNumber = "6283847842429";
  const message = `Halo Admin Rahayu ID, saya ingin memesan produk:\n\n*Produk:* ${productName}\n*Harga:* ${productPrice}\n\n*Data Pembeli:*\nNama: ${nama}\nNo. HP: ${hp}\nAlamat: ${alamat}\n\n*Metode Pembayaran:* ${payment}\n\nMohon informasi selanjutnya ya. Terima kasih!`;
  
  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, '_blank');
  paymentModal.style.display = "none";
};