// create and get root elementss
const userCardDetails = document.getElementById("users_card_details");
const userImg = document.getElementById("userImg");
const userName = document.getElementById("userName");
const userAddress = document.getElementById("userAddress");
const userGender = document.getElementById("userGender");
let userCards;
// append child elements into root elements

// fetch data from API
const userData = fetch(
  "https://randomuser.me/api/?inc=gender,name,nat,location,picture,email&results=20"
)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data.results)
    const userInfo = data.results;
    console.log(userInfo);
    if (userInfo.length >= 1) {
      console.log(userCardDetails);
      userInfo.forEach((element, index) => {
        userCards = document.createElement("div");
        const h6 = document.createElement("h6");
        const h2 = document.createElement("h2");
        const a = document.createElement("a");
        userCards.setAttribute("id", `userCardNo${index}`);
        h6.textContent = `${element.gender} NL`;
        h2.textContent = `${element.name.first} ${element.name.last} ${element.name.first}`;
        a.textContent = `${element.email}`;
        a.setAttribute("href", `mailto:${element.email}`);
        // add class to root elemnt
        userCards.setAttribute("class", "cards");
        userCardDetails.appendChild(userCards);
        userCards.appendChild(h6);
        userCards.appendChild(h2);
        userCards.appendChild(a);
        // console.log(index);
        userCards.addEventListener("click", function () {
          appendUserData(element, index);
        });
      });
      appendUserData(userInfo[0]);
    }
  });

appendUserData = (userData, index) => {
  if (index >= 0) {
    Array.from(document.querySelectorAll(".cards")).forEach(function (el) {
      el.classList.remove("selected_user");
    });
    document
      .getElementById(`userCardNo${index}`)
      .setAttribute("class", "selected_user cards");
  } else {
    document
      .getElementById(`userCardNo${0}`)
      .setAttribute("class", "selected_user cards");
  }
  userImg.setAttribute("src", userData.picture.medium);
  userName.textContent = `${userData.name.first} ${userData.name.last} ${userData.name.first}`;
  userAddress.textContent = `${userData.location.street.number} ${userData.location.street.name} ${userData.location.city} ${userData.location.country} ${userData.location.postcode}`;
  userGender.textContent = `${userData.gender}`;
};
