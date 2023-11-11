//?CONSTANTS


save.addEventListener("click", () => {
  //*input u tanıttım
  const date = document.getElementById("validationTooltip01").value;
  console.log(date);
  const amount = document.getElementById("validationTooltip02").value;
  console.log(amount);
  const expenditure = document.querySelector(".expenditure").value;

  //*table ı tanıttım
  const table = document.querySelector(".spend");

  //*Kaydetten sonra rowleri ve celleri yapıyorum

  const newRow = table.insertRow();

  const dateCell = newRow.insertCell(0);
  const spendTypeCell = newRow.insertCell(1);
  const quantityCell = newRow.insertCell(2);
  const actionCell = newRow.insertCell(3);

  //* hücrelerin içeriğini belirliyorum
  dateCell.textContent = date;
  spendTypeCell.textContent = expenditure;
  quantityCell.textContent = amount;

//   const deletebtn = document.createElement("button");
//   deletebtn.classList.add('delete', 'btn', 'btn-danger');
//   deletebtn.innerText = "Delete";
//   actionCell.appendChild(deletebtn);
});
