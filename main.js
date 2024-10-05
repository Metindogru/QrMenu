import { renderCards } from "./scripts/ui.js";

//* Data'yı fonksiyon dışına çıkararak her yerden erişebilir hale getirdik
let data;

//*menü verilerini JSON dosyasından çeken fonksiyon

async function fetchMenu() {
  //*Api'den verileri al
  const res = await fetch("./db.json");

  //*json verisini JS formatına çevirme
  data = await res.json();
}

//! sayfanın yüklenme olayını izle
window.addEventListener("DOMContentLoaded", () => {
  //*Verileri çeken fonksiyonu çalıştır
  fetchMenu()
    //*Fonksiyon başarılı olduğu zaman kartları ekrana basacak fonksiyonu çalıştır
    .then(() => renderCards(data.menu));
});

//*Buttons alanındaki İnputları çağırma
const inputs = document.querySelectorAll("#buttons input");

//*İnputlar dizisini dön
inputs.forEach((input) => {
  //*Her bir inputun seçilme olayını izle
  input.addEventListener("change", () => {
    //*Seçilen kategori
    const selected = input.id;
    //! Eğer hepsi seçiliyse tüm datayı ekrana bas
    if (selected === "all") {
      renderCards(data.menu);
    } else {
      //*menü elemanlarından seçilen kategoriye ait olanları filtrele
      const filtred = data.menu.filter((i) => i.category === selected);

      //*Filtrelenen datayı ekrana bas
      renderCards(filtred);
    }
  });
});
