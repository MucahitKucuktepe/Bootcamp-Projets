const addButton = document.querySelector(".fa-regular");
console.log(addButton);
const ul = document.querySelector("ul");
const input = document.querySelector("input");

const checkbox = document.getElementById("itemCheckBox");
const li = document.querySelector("li");

const renkler={
  renk:"#c300ff"
}

//? add event listener metodu ile butonuma event tanımlıyorum

addButton.addEventListener("click", () => {
  if (!input.value.trim()) {
    alert("Lütfen bir faaliyet ekleyiniz!");
  } else {
    const li = document.createElement("li");
    const text = document.createTextNode(input.value);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "itemCheckBox";
    checkbox.style.marginInlineStart = "5px";
    checkbox.style.marginInlineEnd = "5px";
    li.appendChild(checkbox);
    li.appendChild(text);
    ul.appendChild(li);
    input.value = "";
    checkbox.addEventListener("click", (e) => {
      console.log(e.target);
      li.style.backgroundColor = "red";
      li.style.textDecoration="line-through"
      setTimeout(() => {
        li.style.display = "none";
      }, 800);
    });
  }
});
//?Sayfa her yenilendiğinde input kısmına focuslanmasını sağladık
input.focus();

checkbox.addEventListener("click", (e) => {
  console.log(e.target);
  li.style.backgroundColor = "red"
  li.style.textDecoration="line-through"
      setTimeout(() => {
        li.style.display = "none";
      }, 800);
});
