//* URL'de ki arama parametrelerine(search-param) eriş

//*JS'de tarayıcı alakalı olan verilere erişmek istiyorsak 'window nesnesi' ile erişebiliriz.

//*JS'de URL'de ki paramatrelerini yönetmeye yarayan yerleşik bir class vardır. ''URLSearchParams''

const params = new URLSearchParams(window.location.search);

//*Yukarıda ki classta oluşturduğumuz nesne sayesinde URL'de ki paramatreleri güncellemeye/erişmeye/silmeye yarayan methodları kullanabiliyoruz, bu şekilde de get moethdu ile 'ıd' parametresine eriştik.
const id = params.get("id");

//*Sayfanın yüklenme olayını izle
document.addEventListener("DOMContentLoaded", async () => {
  //*APİ'den verileri al
  try {
    const res = await fetch("../db.json");
    const data = await res.json();

    //*Veriler arasında URL'de ki 'ID'ye denk gelen ürünü bul
    const product = data.menu.find((item) => item.id == id);

    if (!product) {
      //*Ürün bulunamazsa 404 sayfasını renderla
      renderNotFound();
    } else {
      //*Ürün bulunursa: Sayfa içeriğni APİ'den alınan ürüne göre renderla
      renderPage(product);
    }

    //*Sayfa içeriğini APİ'den aldığımız ürüne göre değiştir
    renderPage(product);
  } catch (error) {
    //*Api isteğinde hata olursa 404 hata fırlatacak
    renderNotFound();
    return alert("Üzgünüz, bir sorun oluştu");
  }
});

//*HTML'de ki DİV elementini çağıran fonksiyon
const outlet = document.getElementById("outlet");
//*Sayfa içeriğini aldığı parametreye göre oluşturan fonksiyon
function renderPage(product) {
  outlet.innerHTML = ` 
    <div class="d-flex justify-content-between fs-6">
        <a href="/">
          <img width="35px" src="images/home.png" alt="home-icon" />
        </a>
        <p>anasayfa / ${product.category} / ${product.title.toLowerCase()}</p>
      </div>
      <h1 class="text-center my-4">${product.title}</h1>
      <img
        src="${product.img} "
        style="max-height: 400px"
        class="rounded object-fit-cover shadow"
        alt=""
      />

      <h4 class="mt-4">
        <span>Ürünün Kategorisi</span>
        <span class="text-success">${product.category}</span>
      </h4>
      <h4 class="mt-4">
        <span>Ürünün fiyatı</span>
        <span class="text-success">${(product.price * 30).toFixed(2)} ₺</span>
      </h4>
      <p class="lead">
      ${product.desc}
      </p> `;
}

//*404 Sayfa içeriğini ekrana basan fonksiyon
function renderNotFound() {
  outlet.innerHTML = `
  <div style="height:90vh" class="d-flex justify-content-center align-items-center"> 
  <div class="d-flex flex-column align-items-center gap-3>
    <h1 class="text-center fs-6 bg-dark">Aradığınız ürün artık mevcut değil</h1>
    
    <a href="/">Ana sayfaya dönün</a>
    </div>
    </div>
    `;
}
