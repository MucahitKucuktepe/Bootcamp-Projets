const addButton = document.querySelector(".fa-regular");
console.log(addButton);
const ul = document.querySelector("ul");
const input = document.querySelector("input");

//? add event listener metodu ile butonuma event tanımlıyorum

addButton.addEventListener("click", () => {
  if (!input.value.trim()) {
    alert("Lütfen bir faaliyet ekleyiniz!");
  } else {
    const li = document.createElement("li");
    const text = document.createTextNode(input.value);
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginInlineStart="5px"
    checkbox.style.marginInlineEnd="5px"
    li.appendChild(checkbox);
    li.appendChild(text);
    ul.appendChild(li);

    input.value = "";
  }
});

input.focus();
