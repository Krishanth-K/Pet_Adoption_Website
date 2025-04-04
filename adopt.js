document.addEventListener("DOMContentLoaded", () => {
  const petToHighlight = localStorage.getItem("highlightPet");

  if (petToHighlight) {
    const cards = document.querySelectorAll(".card");

    for (const card of cards) {
      const nameTag = card.querySelector("h2");
      if (
        nameTag &&
        nameTag.textContent.trim().toUpperCase() ===
          petToHighlight.toUpperCase()
      ) {
        card.classList.add("highlighted");
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      }
    }

    localStorage.removeItem("highlightPet");
  }
});

const pets = [
  {
    name: "Karman",
    age: 7,
    gender: "Male",
    type: "Senior",
    location: "Pune",
    owner: "Nikita",
    image: "images/karman.jpg",
    cart: false,
  },
  {
    name: "Busky",
    age: 3,
    gender: "Female",
    type: "Young",
    location: "Delhi",
    owner: "Mithuraa",
    image: "images/busky.jpg",
    cart: false,
  },
  {
    name: "Max",
    age: 3,
    gender: "Male",
    type: "Adult",
    location: "Mumbai",
    owner: "Mithuraa",
    image: "images/cat.jpg",
    cart: false,
  },
  {
    name: "Rico",
    age: 4,
    gender: "Male",
    type: "Adult",
    location: "India Gate, New Delhi",
    owner: "Mithuraa",
    image:
      "https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg",
    cart: false,
  },
  {
    name: "Jesse",
    age: 3,
    gender: "Male",
    type: "Young",
    location: "Panjim, Goa",
    owner: "Mithuraa",
    image:
      "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg",
    cart: false,
  },
  {
    name: "McCabe",
    age: "Adult",
    gender: "Male",
    type: "English Springer Spaniel",
    location: "Lalbagh, Bangalore",
    owner: "Mithuraa",
    image:
      "https://cdn.pixabay.com/photo/2019/08/07/14/11/dog-4390885_1280.jpg",
    cart: false,
  },
  {
    name: "Luna",
    age: "1",
    gender: "Female",
    type: "Beagle Mix",
    location: "Dubai Sandhu, Hyderabad",
    owner: "Mithuraa",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Cute_dog.jpg/2560px-Cute_dog.jpg",
    cart: false,
  },
  {
    name: "Min",
    age: "2",
    gender: "Male",
    type: "Golden Retriever",
    location: "Charminar, Hyderabad",
    owner: "Mithuraa",
    image:
      "https://cdn.pixabay.com/photo/2017/09/25/13/12/puppy-2785074_1280.jpg",
    cart: false,
  },
  {
    name: "Bella",
    age: "8",
    gender: "Female",
    type: "Pembroke Welsh Corgi",
    location: "Egmore, Chennai",
    owner: "Mithuraa",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTROLLARPFP-cJesIVqS44x8QONuh8rlMQjjQ&s",
    cart: false,
  },
];

Init();
AddListenerstoButtons();
UpdateCartButtons();
Hightlight();

function Init() {
  const container = document.getElementById("container");

  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
            <img src="${pet.image}" alt="${pet.name}" />
            <div class="card-content">
            <h2>${pet.name} - ${pet.age} years old</h2>
            <p>${pet.gender}, ${pet.type}</p>
            <p>${pet.location}</p>

            <div class="contact-details">
            <p><span>Owner:</span> ${pet.owner}</p>
            <p><span>Number:</span> Contact Now</p>
            </div>

            <a href="larger-card.html?${new URLSearchParams(pet)}" target="_blank" class="details-link">See more details ↗</a>

            <button class="cart-button" data-name=${pet.name}>Add To Cart</button>

            <button class="buy-button" data-name=${pet.name}>Buy Now</button> 
            <!--  <a href="cart.html?${new URLSearchParams(pet)}" target="_blank"><button class="buy-button">Buy Now</button></a>-->
            </div>
            `;
    container.appendChild(card);
  });
}

function AddListenerstoButtons() {
  // buy-button
  let buyButtons = document.getElementsByClassName("buy-button");
  [...buyButtons].forEach((element) => {
    element.addEventListener("click", function () {
      BuyItem(element.dataset.name);
    });
  });

  // add to cart button
  let cartButtons = document.getElementsByClassName("cart-button");
  [...cartButtons].forEach((element) => {
    element.addEventListener("click", function () {
      AddItemToCart(element.dataset.name, this);
    });
  });
}

// function to happen when buy-now is clicked
function BuyItem(name) {
  let pet = pets.find((pet) => pet.name === name);
  let BuyNowpets = [];
  BuyNowpets.push(pet);

  // store the pet in storage
  localStorage.setItem("buyNow", JSON.stringify(BuyNowpets));

  // redirect to checkout page
  window.location.href = "cart.html";
}

// function to add a pet to cart
function AddItemToCart(name, btn) {
  let pet = pets.find((pet) => pet.name === name);
  pet.cart = !pet.cart;

  if (pet.cart) {
    btn.innerText = "Remove from Cart";
  } else {
    btn.innerText = "Add To Cart";
  }

  console.log(pet.cart);

  // find all pets in cart
  let petsInCart = pets.filter((pet) => pet.cart);
  localStorage.setItem("petsInCart", JSON.stringify(petsInCart));
}

function UpdateCartButtons() {
  const storedCart = JSON.parse(localStorage.getItem("petsInCart")) || [];

  pets.forEach((pet) => {
    pet.cart = storedCart.some((item) => item.name === pet.name);
  });

  let cartButtons = document.getElementsByClassName("cart-button");
  [...cartButtons].forEach((element) => {
    let pet = pets.find((p) => element.dataset.name === p.name);

    if (pet.cart) {
      element.innerHTML = "Remove from Cart";
    }
  });
}

function Hightlight() {
  const nameToHighlight = localStorage.getItem("highlightPet") || "";

  document.querySelectorAll(".card").forEach((card) => {
    const petNameTag = card.querySelector("h2");
    if (petNameTag) {
      const petName = petNameTag.textContent.split(" - ")[0].trim();
      if (petName.toLowerCase() === nameToHighlight.toLowerCase()) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.classList.add("highlighted");

        setTimeout(() => {
          card.classList.add("fade");
          card.classList.remove("highlighted");

          // optional: clean up the 'fade' class after transition ends
          setTimeout(() => {
            card.classList.remove("fade");
          }, 1000);
        }, 3000);
      }
    }
  });
}
