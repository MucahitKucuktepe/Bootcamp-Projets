//!GELİR FORMU CONSTANTS
const ekleFormu=document.getElementById("ekle-formu")
console.log(ekleFormu);
const gelirInput=document.getElementById("gelir-input")
console.log(gelirInput); 
const ekleBtn=document.getElementById("ekle-btn")
console.log(ekleBtn);

let gelirler=0

//!HESAP TABLOSU
const gelirinizTd=document.getElementById("geliriniz")
const gidernizTd=document.getElementById("gideriniz")
const kalanTd=document.getElementById("kalan")


//!HARCAMA TABLOSU

const harcamaFormu =document.getElementById("harcama-formu")
const tarihInput=document.getElementById("tarih")
const miktarInput=document.getElementById("miktar")
const harcamaAlanıInput=document.getElementById("select")

//?EKLE FORMU 
ekleFormu.addEventListener("submit",(e)=>{
  e.preventDefault()
  gelirler =gelirler + Number(gelirInput.value)
  localStorage.setItem("gelirler",gelirler)
  gelirinizTd.innerText=gelirler
  ekleFormu.reset()
})

//? WINDOW LOAD OLDUGUNDA OLACAKLAR

window.addEventListener("load",()=>{
  gelirler=Number(localStorage.getItem("gelirler")) || 0
  gelirinizTd.innerText=gelirler
})
