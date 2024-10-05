//! Arayüzü etkileyecek tüm fonksiyonlar burada çalışacak

//*Menü-List divini çağır
const menuList = document.getElementById("menu-list");

//* Menü elemanlarını parametre olarak alıp dizideki her bir elemanı ekrana basma
export const renderCards = (data) => {
  //*Data dizisindeki her bir nesne için bir tane kart html'i oluştur

  const cardsHTML = data
    .map(
      (item) => `
     <a
        href="/detail.html?id=${item.id}"
        id="card"
        class="d-flex flex-column flex-md-row text-dark gap-3 text-decoration-none"
      >
        <img class="rounded shadow img-fluid" src="${item.img}" />

        <div>
          <div class="d-flex justify-content-between">
            <h5>${item.title}</h5>
            <p class="text-success fw-bold">${(item.price * 30).toFixed(2)}₺</p>
          </div>
          <p class="lead">
            ${item.desc}
          </p>
        </div>
      </a> `
    )
    //! Join methodu ile dizileri stringe çevirdik
    .join("");

  //*Oluşturulan kartları(db.json) #menuList divinin içine aktar
  menuList.innerHTML = cardsHTML;
};
