//!GELİR FORMU CONSTANTS
const ekleFormu = document.getElementById("ekle-formu");
console.log(ekleFormu);
const gelirInput = document.getElementById("gelir-input");
console.log(gelirInput);
const ekleBtn = document.getElementById("ekle-btn");
console.log(ekleBtn);

let gelirler = 0;
let harcamaListesi = [];

//!HESAP TABLOSU
const gelirinizTd = document.getElementById("geliriniz");
const gidernizTd = document.getElementById("gideriniz");
const kalanTd = document.getElementById("kalan");

//!HARCAMA FORMU

const harcamaFormu = document.getElementById("harcama-formu");
const tarihInput = document.getElementById("tarih");
const miktarInput = document.getElementById("miktar");
const harcamaAlanıInput = document.getElementById("select");

//!HARCAMA TABLOSU
const harcamaBody = document.getElementById("harcama-body");
const temizleBtn = document.getElementById("temizle-btn");

//?EKLE FORMU
ekleFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  gelirler = gelirler + Number(gelirInput.value);
  localStorage.setItem("gelirler", gelirler);
  gelirinizTd.innerText = gelirler;
  ekleFormu.reset();
});

//? WINDOW LOAD OLDUGUNDA OLACAKLAR

window.addEventListener("load", () => {
  gelirler = Number(localStorage.getItem("gelirler")) || 0;
  gelirinizTd.innerText = gelirler;
  tarihInput.valueAsDate = new Date();
  harcamaListesi = JSON.parse(localStorage.getItem("harcamalar")) || [];
  harcamaListesi.forEach((harcama)=>harcamayıDomaYaz(harcama))
});

//?HARCAMA FORMU

harcamaFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  const yeniHarcama = {
    id: new Date().getTime(),
    tarih: new Date(tarihInput.value).toLocaleDateString(),
    alan: harcamaAlanıInput.value,
    miktar: miktarInput.value,
  };
  harcamaFormu.reset();
  tarihInput.valueAsDate = new Date();
  //?Yeni harcama listesini harcama listesine push luyrouz
  harcamaListesi.push(yeniHarcama);
  //?Güncel harcama listesini localstorage e gönderiyoruz
  localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi));
  harcamayıDomaYaz(yeniHarcama);
});

//?HARCAMAYI DOM'A YAZ

const harcamayıDomaYaz = ({ id, tarih, alan, miktar }) => {
  const tr = document.createElement("tr");

  const appendTd = (content) => {
    const td = document.createElement("td");
    td.textContent = content;
    return td;
  };

  const lastElement = () => {
    const td = document.createElement("td");
    const iElement = document.createElement("i");
    iElement.id = id;
    iElement.classList = "fa-solid fa-trash-can text-danger";
    iElement.type = "button";
    td.appendChild(iElement);
    return td;
  };
  tr.append(appendTd(tarih), appendTd(alan), appendTd(miktar), lastElement());
  harcamaBody.append(tr);
};
