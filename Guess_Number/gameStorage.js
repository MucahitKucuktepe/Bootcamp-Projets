//?PC ye 1-20 arasında sayı tutturduk
let rasgeleSayi = Math.ceil(Math.random() * 20);
console.log(rasgeleSayi);

let mesaj = document.querySelector(".msg");
let skor = 10;
//*skor u index html den çekebilirdik ama çok kullancağımız için bu daha tercih edilen yol oldu
//! Local Storage da top-score adıyla bir değişken varsa onu getir yoksa 0 getir
let enYuksekSkor = localStorage.getItem("top-score") || 0;
//! browserda, DOM da top-score değerinin local storage dan okuyarak güncelle özellikle 2.ve 3. oyuncular için önemli
document.querySelector(".top-score").textContent = enYuksekSkor;

//?Her Check butonuna basıldıgında yapılacaklar
document.querySelector(".check").addEventListener("click", () => {
  const tahmin = document.querySelector(".guess").value;
  //!tahmin girmeden butona basıldıysa
  if (!tahmin) {
    mesaj.textContent = "Lütfen Bir Sayı Giriniz";
    //!Tahmin Dogruysa Calısacak kısım
  } else if (tahmin == rasgeleSayi) {
    mesaj.textContent = "Tebrikler Nildiniz!🎯";
    document.querySelector("body").style.backgroundColor = "green";
    document.querySelector(".number").textContent = rasgeleSayi;

    //*Top Scorre Kontrolü
    if (skor > enYuksekSkor) {
      localStorage.setItem("top-score", skor);
      enYuksekSkor = skor;
      document.querySelector(".top-score").textContent = enYuksekSkor;
    }

    //!Tahmin Yanlışsa
  } else {
    //? Skor 1'den büyük oldugu sürece tahmin hakkım var
    if (skor > 1) {
      skor--;
      document.querySelector(".score").textContent = skor;

      tahmin < rasgeleSayi
        ? (mesaj.textContent = "Arttır⏫")
        : (mesaj.textContent = "Azalt⏬");
      document.querySelector(".guess").value = "";
    } else {
      mesaj.textContent = "Oyunu Kaybettiniz🥹";
      document.querySelector(".score").textContent = 0;
      document.querySelector("body").style.backgroundColor = "red";
      document.querySelector(".guess").value = "";
    }
  }
});

//* Again butonuna basınca ayarlar baslangıc degerine kurulsun ve arka plan #2d3436 olsun

document.querySelector(".again").onclick = () => {
  document.querySelector("body").style.backgroundColor = "#2d3436";

  rasgeleSayi = Math.ceil(Math.random() * 20);
  console.log(rasgeleSayi);

  skor = 10;
  document.querySelector(".score").textContent = skor;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";
  mesaj.textContent = "Oyun yeni Oyuncu için başlıyor";
};

//!ENTER
//*Klavyeden Enter tusuna basıldıgında  check butonunu tetikle

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    //*Enter tusuna basıldıgında check butonunu tıkla
    document.querySelector(".check").click();
  }
});

document.querySelector(".check").addEventListener("click",()=>{
    tahmin=document.querySelector(".guess").value

    const tahminSayi=parseInt(tahmin)

    if(tahmin>=1 && tahminSayi <=20 && !isNaN(tahminSayi)){
        //*Dogru tahmin yapıldı oyuna devam
    }else{
        mesaj.textContent="Geçersiz sayı girdiniz (1-20) arasında bir sayı giriniz"
        skor ++
    }
})