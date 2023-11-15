//!EKLE FORMU CONSTANTS
const ekleFormu = document.getElementById("ekle-formu");

const gelirInput = document.getElementById("gelir-input");

const ekleBtn = document.getElementById("ekle-btn");

//!DEĞİŞKENLER
let gelirler = 0;
let harcamaListesi = [];

//!HESAP TABLOSU
const gelirinizTd = document.getElementById("geliriniz");
const giderinizTd = document.getElementById("gideriniz");
const kalanTd = document.getElementById("kalan");

//!EKLE FORMU
ekleFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  gelirler = gelirler + Number(gelirInput.value);
  localStorage.setItem("gelirler", gelirler);
  gelirinizTd.innerText = gelirler;
  ekleFormu.reset();
});

//!WİNDOW LOAD OLDUGUNDA OLACAKLAR
window.addEventListener("load", () => {
  gelirler = Number(localStorage.getItem("gelirler"));
  gelirinizTd.innerText = gelirler;
});

//! <================> HARCAMA FORMU <==============>

//?Harcama Formu

const harcamaFormu = document.getElementById("harcama-formu");
const tarihInput = document.getElementById("tarih");
const miktarInput = document.getElementById("miktar");
const harcamaAlanıInput = document.getElementById("select");

harcamaFormu.addEventListener("submit",(e)=>{
  e.preventDefault()
  const yeniHarcama={
    id:new Date().getTime(),
    tarih:tarihInput.value,
    alan:harcamaAlanıInput.value,
    mikar:miktarInput.value
  }

  harcamaListesi.push(yeniHarcama)
  console.log(harcamaListesi);
  localStorage.setItem("harcamalar",JSON.stringify(harcamaListesi))
  harcamaFormu.reset()
  harcamayıDomaYaz(yeniHarcama)
})

//! <================> HARCAMA TABLOSU <==============>
const harcamaBody=document.getElementById("harcama-body")

const harcamayıDomaYaz=({id,tarih,alan,miktar})=>{
  const tr=document.createElement("tr")
  const appendTd=(content)=>{
    const td=document.createElement("td")
    td.textContent=content
    return td
  }
  const lastElement=()=>{
    const td=document.createElement("td")
    const iElement=document.createElement("i")
    iElement.id=id
    iElement.classList="fa-solid fa-trash-can text-danger"
    iElement.type="button"
    td.appendChild(iElement)
    return td
  }

  tr.append(appendTd(tarih),appendTd(alan),appendTd(miktar),lastElement())

  harcamaBody.appendChild(tr)


}