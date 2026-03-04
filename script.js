const products = document.querySelectorAll('#other-products .card');
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const closeModal = document.getElementById("closeModal");

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