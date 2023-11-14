//?CONSTANTS
const ekleBtn = document.getElementById("ekle-btn");
const gelirInput = document.getElementById("gelir-input");
const ekleFormu = document.getElementById("ekle-formu");

//?Variables
let gelirler =0 ;

//*Hesap Tablosu
const gelirinizTd = document.getElementById("geliriniz");
const giderinizTd = document.getElementById("gideriniz");
const kalanTd = document.getElementById("kalan");

//*Harcama Formu

ekleFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  gelirler = gelirler + Number(gelirInput.value);
  console.log(gelirler);
  localStorage.setItem("gelirler", gelirler);
  gelirinizTd.innerText = gelirler;
  ekleFormu.reset();
});
//!Sayfa yüklendiğinde olacsklst
window.addEventListener("load", () => {
  gelirler = Number(localStorage.getItem("gelirler")) ;
  gelirinizTd.innerText = gelirler;
});
