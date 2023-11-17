let veri = "merhaba";

fetch("https://randomuser.me/api/")
  .then((res) => {
    console.log(res);

    return res.json();
  })
  .then((data) => {
    console.log(data);
    show(data.results);
  });

const show = (users) => {
  const userDiv = document.getElementById("user-div");
  users.forEach((item) => {
    const { picture, gender, name, location, email, phone } = item;
    userDiv.innerHTML +=`
    <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    <div class="card" >
      <img src="${picture["large"]}" class="card-img-top" alt="...">
      <div class="card-body ">
          <h5 class="card-title text-center">${name["title"]} ${name["first"]} ${name["last"]}</h5>
          <p class="card-text">${location["country"]} ${location["state"]} ${location["city"]}</p>
          <p class="card-text">${gender}</p>
          <p class="card-text">${email}</p>
          <p class="card-text">${phone}</p>
      
      </div>
     </div>
     </div>
    
    `
  });
};
