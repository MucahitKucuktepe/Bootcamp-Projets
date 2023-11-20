// ! GELİR INPUT SELECTORS
const ekleFormu = document.getElementById("ekle-formu");
const gelirInput = document.getElementById("gelir-input");
const ekleBtn = document.getElementById("ekle-btn");

let gelirler = 0;
let harcamaListesi = [];

//!HARCAMA TABLOSU SELECTORS
const gelirinizTd = document.getElementById("geliriniz");
const giderinizTd = document.getElementById("gideriniz");
const kalanTd = document.getElementById("kalan");
const temizleBtn = document.getElementById("temizle-btn");

// !HARCAMA FORMU SELECTORS
const harcamaFormu = document.getElementById("harcama-formu");
const tarihInput = document.getElementById("tarih");
const miktarInput = document.getElementById("miktar");
const harcamaAlaniInput = document.getElementById("select");
const harcamaBody = document.getElementById("harcama-body");
// *EKLE FORMU
ekleFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  gelirler = gelirler + Number(gelirInput.value);
  console.log(gelirler);
  localStorage.setItem("gelirler", gelirler);
  gelirinizTd.innerText = gelirler;
  ekleFormu.reset();
  hesaplaVeGuncelle();
});

// * WINDOWS YENİDEN YÜKLENDİĞİNDE OLACAKLAR

window.addEventListener("load", () => {
  gelirler = Number(localStorage.getItem("gelirler"));
  gelirinizTd.innerText = gelirler;
  tarihInput.valueAsDate = new Date();
  harcamaListesi = JSON.parse(localStorage.getItem("harcamalar")) || [];
  harcamaListesi.forEach((item) => {
    harcamayiDomaYaz(item);
  });
  hesaplaVeGuncelle();
});

//*HARCAMA FORMU (Her yeni harcamayı harcama listesi isminde bir array e pushladık.)

harcamaFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  const yeniHarcama = {
    id: new Date().getTime(),
    tarih: new Date(tarihInput.value).toLocaleDateString(),
    alan: harcamaAlaniInput.value,
    miktar: miktarInput.value,
  };
  harcamaListesi.push(yeniHarcama);
  console.log(harcamaListesi);
  localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi));

  harcamaFormu.reset();
  tarihInput.valueAsDate = new Date();
  harcamayiDomaYaz(yeniHarcama);
  hesaplaVeGuncelle();
});

// *HARCAMAYI DOM' A YAZDIRMA İŞLEMİ

const harcamayiDomaYaz = ({ id, tarih, alan, miktar }) => {
  const tr = document.createElement("tr");
  const appendTd = (content) => {
    const td = document.createElement("td");
    td.innerText = content;
    return td;
  };

  const lastElement = () => {
    const td = document.createElement("td");
    const iElement = document.createElement("i");
    iElement.id = id;
    iElement.className = "fa-solid fa-trash-can text-danger";
    iElement.type = "button";
    td.appendChild(iElement);
    return td;
  };

  tr.append(appendTd(tarih), appendTd(alan), appendTd(miktar), lastElement());
  return harcamaBody.appendChild(tr);
};

//*HESAPLAMA KISMI

const hesaplaVeGuncelle = () => {
  gelirinizTd.innerText = new Intl.NumberFormat().format(gelirler);

  const giderler = harcamaListesi.reduce(
    (toplam, harcama) => toplam + Number(harcama.miktar),
    0
  );
  giderinizTd.innerText = new Intl.NumberFormat().format(giderler);

  kalanTd.innerText = new Intl.NumberFormat().format(gelirler - giderler);

  const borclu = gelirler - giderler < 0;
  kalanTd.classList.toggle("text-danger", borclu);
};

harcamaBody.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-trash-can")) {
    e.target.closest("tr").remove();
  }

  const id = e.target.id;
  harcamaListesi = harcamaListesi.filter((harcama => harcama.id != id));
  localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi));
 hesaplaVeGuncelle()
});

temizleBtn.addEventListener("click", () => {
  if (confirm("Silmek istediğinizden emin misiniz?")) {
    harcamaListesi = [];
    gelirler = 0;
    localStorage.removeItem("gelirler");
    localStorage.removeItem("giderler");
    harcamaBody.innerHTML = "";
    hesaplaVeGuncelle();
  }
});
