// ! GELIR INPUT VARIABLES
const ekleFormu = document.getElementById("ekle-formu");
const ekleInput = document.getElementById("gelir-input");
const ekleBtn = document.getElementById("ekle-btn");

//!BASLANGIC DEGISKENLERI
let gelirler = 0;
let harcamaListesi = [];

//!HESAP TABLOSU
const gelirinizTd = document.getElementById("geliriniz");
const giderinizTd = document.getElementById("gideriniz");
const kalanTd = document.getElementById("kalan");

//!HARCAMA FORMU
const harcamaFormu = document.getElementById("harcama-formu");
const tarihInput = document.getElementById("tarih");
const miktarInput = document.getElementById("miktar");
const harcamaAlaniInput = document.getElementById("select");
//!HARCAMA TABLOSU
const harcamaBody=document.getElementById("harcama-body")

//*EKLE FORMU
ekleFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  gelirler = gelirler + Number(ekleInput.value);
  localStorage.setItem("gelirler", gelirler);
  gelirinizTd.innerText = gelirler;
  ekleFormu.reset();
});

//*SAYFA YENİDEN YÜKLENDİĞİNDE OLACAKLAR

window.addEventListener("load", () => {
  gelirler = Number(localStorage.getItem("gelirler")) || 0;
  gelirinizTd.innerText = gelirler;
  tarihInput.valueAsDate = new Date();
  harcamaListesi = JSON.parse(localStorage.getItem("harcamalar"));
});

//*HARCAMA LİSTESİNİ ARRAY E PUSHLAMA KISMI

harcamaFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  const yeniHarcama = {
    id: new Date().getTime(),
    tarih: new Date(tarihInput.value).toLocaleDateString(),
    alan: harcamaAlaniInput.value,
    miktar: miktarInput.value,
  };

  harcamaListesi.push(yeniHarcama);
  localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi));
  console.log(harcamaListesi);

  harcamaFormu.reset();
  tarihInput.valueAsDate = new Date();
  harcamayiDomaYaz(yeniHarcama);
});

//*HARCAMAYI DOM'A YAZDIK

const harcamayiDomaYaz = ({ id, tarih, alan, miktar }) => {
  const tr = document.createElement("tr");
  const appendTd = (content) => {
    const td = document.createElement("td");
    td.innerText = content;
    return td;
  };

  const lastElement=()=>{
    const td = document.createElement("td");
    const iElement=document.createElement("i");
    iElement.id=id
    iElement.classList="fa-solid fa-trash-can text-danger"
    iElement.type="button"
    td.appendChild(iElement)
    return td
  }

  tr.append(appendTd(tarih),appendTd(alan),appendTd(miktar),lastElement())
harcamaBody.appendChild(tr)
};
