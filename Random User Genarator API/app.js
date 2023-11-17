const userRandom = async () => {
  try {
    const res = await fetch("https://randomuser.me/api/");
    if (!res.ok) {
      throw new Error(`Something went wrong:${res.status}`);
    }
    const data = await res.json();
    renderUser(data.results);
   
  } catch (error) {
    const userDiv = document.getElementById("user-div");
    userDiv.innerHTML += `
        <h2>${error}</h2>
  
        `;
  }
};
const renderUser = (users) => {
  const userDiv = document.getElementById("user-div");

  users.forEach((item) => {
    const { picture, gender, name, location, email, phone } = item;

    userDiv.innerHTML += `
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
  <div class="card" >
    <img src="${picture["thumbnail"]}" class="card-img-top" alt="...">
    <div class="card-body ">
        <h5 class="card-title text-center">${name["title"]} ${name["first"]} ${name["last"]}</h5>
        <p class="card-text">${location["country"]} ${location["state"]} ${location["city"]}</p>
        <p class="card-text">${gender}</p>
        <p class="card-text">${email}</p>
        <p class="card-text">${phone}</p>
    
    </div>
   </div>
   </div>
  `;
  });
};

window.addEventListener("load", () => {
  userRandom();
});
