const searchBtn = document.getElementById("button");
const searchInput = document.getElementById("searchFollowers");
const cardsDiv = document.getElementById("cards");

//!https://api.github.com/users/anthonyharold67/followers?per_page=100

let followers = [];

const getFollowers = async (username) => {
  cardsDiv.innerHTML = "";
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/followers?per_page=100`
    );
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      followers = data;
      searchInput.style.display = "flex";
      data.forEach((item) => crearElem(item));
    } else {
      searchInput.style.display = "none";
      cardsDiv.innerHTML = `<h1>Kullanıcı Bulunamadı</h1>`;
    }
    // const data =await res.json()
  } catch (error) {}
};

const crearElem = (user) => {
  //   console.log(user);
  const { login, html_url, avatar_url } = user;
  //   console.log(user.login);
  //   console.log(login);
  const newElem = `
    <div class="col">
        <div class="card">
        <img src="${avatar_url}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${login}</h5>
            <a href="${html_url}" target="_blank" class="btn btn-dark">View Profile</a>
        </div>
        </div>
    </div>
    `;
  cardsDiv.innerHTML += newElem;
};

// getFollowers("MucahitKucuktepe");

searchBtn.addEventListener("click", () => {
  const value = document.getElementById("searchText").value.trim();
  console.log(value);
  if (value) {
    getFollowers(value);
  } else {
    alert("Lütfen geçerli bir kullanıcı ismi giriniz");
  }
});
//!input a özgü event
searchInput.addEventListener("input", (e) => {
  cardsDiv.innerHTML = "";
  console.log(
    followers
      .filter((item) => item.login.includes(e.target.value))
      .forEach((user) => crearElem(user))
  );
  followers
    .filter((item) => item.login.includes(e.target.value.toLowerCase()))
    .forEach((user) => crearElem(user));
});

window.addEventListener("load", () => {
  searchInput.style.display = "none";
});
