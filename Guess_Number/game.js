//?PC ye 1-20 arasında sayı tutturduk
let rasgeleSayi = Math.ceil(Math.random() * 20);
console.log(rasgeleSayi);

let mesaj = document.querySelector(".msg");
let skor = 10;
//*skor u index html den çekebilirdik ama çok kullancağımız için bu daha tercih edilen yol oldu

let enYuksekSkor = 0;
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

    //!Tahmin Yanlışsa
  } else {
    //? Skor 1'den büyük oldugu sürece tahmin hakkım var
    if (skor > 1) {
      skor--;
      document.querySelector(".score").textContent = skor;

      tahmin < rasgeleSayi
        ? (mesaj.textContent = "Arttır⏫")
        : (mesaj.textContent = "Azalt⏬");
    } else {
      mesaj.textContent = "Oyunu Kaybettiniz🥹";
      document.querySelector(".score").textContent = 0;
      document.querySelector("body").style.backgroundColor = "red";
    }
  }
});
