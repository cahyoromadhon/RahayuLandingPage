const products = document.querySelectorAll('#other-products .card');
const pagination = document.getElementById('pagination');
const perPage = 4;
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
        const price = this.querySelector(".price").innerText;

        modalImg.src = img;
        modalTitle.innerText = title;
        modalPrice.innerText = price;
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

function showPage(page){
    const start = (page-1)*perPage;
    const end = start+perPage;

    products.forEach((item,i)=>{
        item.style.display=(i>=start && i<end)?"block":"none";
    });

    document.querySelectorAll('.pagination button').forEach((btn,i)=>{
        btn.classList.toggle('active',i+1===page);
    });
}

function setupPagination(){
    const total=Math.ceil(products.length/perPage);
    for(let i=1;i<=total;i++){
        const btn=document.createElement('button');
        btn.innerText=i;
        btn.onclick=()=>showPage(i);
        pagination.appendChild(btn);
    }
}

setupPagination();
showPage(1);