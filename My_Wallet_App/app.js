//?CONSTANTS
const ekleBtn = document.getElementById("ekle-btn");
const gelirInput = document.getElementById("gelir-input");
const ekleFormu = document.getElementById("ekle-formu");

//?Variables
let gelirler = 0;
let harcamaListesi = [];

//*Hesap Tablosu
const gelirinizTd = document.getElementById("geliriniz");
const giderinizTd = document.getElementById("gideriniz");
const kalanTd = document.getElementById("kalan");

//*Harcama Formu
const harcamaFormu = document.getElementById("harcama-formu");
const harcamaAlanıInput = document.querySelector("select");
const tarihInput = document.getElementById("tarih");
const miktarInput = document.getElementById("miktar");

console.log(harcamaAlanıInput);

//*Harcama Tablosu

const harcamaBody = document.getElementById("harcama-body");
const temizleBtn = document.getElementById("temizle-btn");

//! EKLE FORMU
ekleFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  gelirler = gelirler + Number(gelirInput.value);
  console.log(gelirler);
  localStorage.setItem("gelirler", gelirler);
  gelirinizTd.innerText = gelirler;
  ekleFormu.reset();
  hesaplaVeGuncelle()
});
//!Sayfa yüklendiğinde olacsklst
window.addEventListener("load", () => {
  gelirler = Number(localStorage.getItem("gelirler"));
  gelirinizTd.innerText = gelirler;
  tarihInput.valueAsDate = new Date();
  harcamaListesi=JSON.parse(localStorage.getItem("harcamalar"))||[]

  harcamaListesi.forEach((harcama)=>harcamayıDomaYaz(harcama))
hesaplaVeGuncelle()
});

//!HARCAMA FORMU

harcamaFormu.addEventListener("submit", (e) => {
  e.preventDefault();
  const yeniHarcama = {
    id: new Date().getTime(),
    // tarih: tarihInput.value,
    tarih: new Date(tarihInput.value).toLocaleDateString(),
    alan: harcamaAlanıInput.value,
    miktar: miktarInput.value,
  };
  console.log(yeniHarcama);
  harcamaFormu.reset();
  tarihInput.valueAsDate = new Date();
  harcamaListesi.push(yeniHarcama);
  localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi));
  harcamayıDomaYaz(yeniHarcama);
});

const harcamayıDomaYaz = ({ id, tarih, alan, miktar }) => {
  //   harcamaBody.innerHTML += `
  // <tr>
  //   <td>${tarih}</td>
  //   <td>${alan}</td>
  //   <td>${miktar}</td>
  //   <td><i id=${id} class="fa-solid fa-trash-can text-danger"></i></td>
  // </tr>
  // `;
  const tr = document.createElement("tr");
  const appendTd = (content) => {
    const td = document.createElement("td");
    td.textContent = content;
    return td;
  };

  const createLastTd = () => {
    const td = document.createElement("td");
    const iElement = document.createElement("i");
    iElement.id = id;
    iElement.className = "fa-solid fa-trash-can text-danger";
    iElement.type = "button";
    td.appendChild(iElement);
    return td;
  };
  tr.append(appendTd(tarih), appendTd(alan), appendTd(miktar),createLastTd());
  harcamaBody.append(tr)
};


const hesaplaVeGuncelle=()=>{
  gelirinizTd.innerText=new Intl.NumberFormat().format(gelirler)
  const giderler=harcamaListesi.reduce((toplam,harcama)=>
    toplam+Number(harcama.miktar),0
    
  )
  giderinizTd.innerText=new Intl.NumberFormat().format(giderler)
  kalanTd.innerText=new Intl.NumberFormat().format(gelirler-giderler)
  const borclu=gelirler-giderler <0
  kalanTd.classList.toggle("text-danger",borclu)

}

harcamaBody.addEventListener("click",(e)=>{
  console.log(e.target);
  if(e.target.classList.contains("fa-trash-can")){
    e.target.closest("tr").remove()
  }

  const id=e.target.id
  harcamaListesi=harcamaListesi.filter((harcama)=> harcama.id !=id)
 localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi))
 hesaplaVeGuncelle()
})

temizleBtn.addEventListener("click",()=>{
  if(confirm("silmek istediğinize emin misiniz?")){
    harcamaListesi=[]
    gelirler=0
    // localStorage.clear() //*tüm local storage i siler
    localStorage.removeItem("gelirler")
    localStorage.removeItem("harcamalar")
    harcamaBody.innerHTML=""
    hesaplaVeGuncelle()
  }
})

