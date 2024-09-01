import { buttonsData, menu } from "./js/db.js";
import { calculatePrice, elements } from "./js/helpers.js";

//! Fonksiyonlar
const renderMenuItems = (menuItems) => {
  /*
   * Dizideki her bir obje için bir elemanı temsil eden
   * HTML elemanı oluşturur.Bu HTML'i bir diziye aktarır.
   */
  let menuHTML = menuItems.map(
    (item) =>
      `
      <a
      href="/productDetail.html?id=${item.id}"
      class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
      id="card"
      >
          <img src="${item.img}" class="rounded shadow" />
          <div>
          <div class="d-flex justify-content-between">
              <h5>${item.title}</h5>
              <p class="text-success">${calculatePrice(item.price)} ₺</p>
          </div>
          <p class="lead">
              ${item.desc}
          </p>
          </div>
      </a>`
  );
  //   let menuHTML = menuItems.map((item) => {
  //     return `
  //     <a
  //     href="productDetail.html?id=2"
  //     class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2"
  //     id="card"
  //     >
  //         <img src="${item.img}" class="rounded shadow" />
  //         <div>
  //         <div class="d-flex justify-content-between">
  //             <h5>${item.title}</h5>
  //             <p class="text-success">${item.price} ₺</p>
  //         </div>
  //         <p class="lead">
  //             ${item.desc}
  //         </p>
  //         </div>
  //     </a>`;
  //   });
  menuHTML = menuHTML.join("");
  elements.menuArea.innerHTML = menuHTML;
};
//* Tıklanılan butona göre o butonun kategorisine ait ürünleri listele
const searchCategory = (e) => {
  const category = e.target.dataset.category;
  //* Tüm dizi elemanlarından yalnızca kategori değeri butonun kategori değeri ile
  //* eşleşenleri getir ve bir dizi şeklinde değişkene aktar.
  const filtredMenu = menu.filter((item) => item.category === category);
  //* Hepsi seçilirse bütün menüyü ekrana aktarır.
  if (category == "undefined") {
    return;
  } else if (category === "all") {
    renderMenuItems(menu);
  } else {
    //* Filtrelenen elemanları ekrana aktarması için menu dizisinden
    //* oluşturduğumuz filtredMenu dizisini ekrana aktarır
    renderMenuItems(filtredMenu);
  }
  //* Seçtiğimiz kategorinin butonu aktifleştirebilmek için categoryi parametre olarak gönderdik.
  renderButtons(category);
};
//* Ekrana butonları basma
const renderButtons = (active) => {
  console.log(active);
  //* Eski butonları ekrandan sil
  elements.buttonsArea.innerHTML = "";
  //* Yeni butonlar oluşturma
  buttonsData.forEach((btn) => {
    console.log(btn);
    //* HTML butonu oluşturma
    const buttonEle = document.createElement("button");
    //* butonlara classlarını ekleme
    buttonEle.className = "btn btn-outline-dark filter-btn";
    //* İçerisideki yazıyı değiştirme
    buttonEle.textContent = btn.text;
    //* Hangi kategori olduğu bilgisini buton elementine ekleme
    buttonEle.dataset.category = btn.value;
    //* Eğer ki active kategorisiyle buton eşleşirse ona farklı class ekle
    if (btn.value === active) {
      buttonEle.classList.add("bg-dark", "text-light");
    }
    //* HTML'e gönderme
    elements.buttonsArea.appendChild(buttonEle);
  });
};

//! Olay İzleyicileri
// document.addEventListener("DOMContentLoaded", renderMenuItems(menu));
//* Sayfa yüklendiği anda ekrana renderButtons ve renderMenuItems fonksiyonlarını çalıştır.
document.addEventListener("DOMContentLoaded", () => {
  renderButtons("all");
  renderMenuItems(menu);
});
elements.buttonsArea.addEventListener("click", searchCategory);