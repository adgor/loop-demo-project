// LOOP DEMO PROJECT

import navbar from "./modules/navbar";
import modal from "./modules/modal";
import getUSerInfo from "./modules/loadData";
import "./styles/main.scss";

const btn = document.getElementById("menu-btn");
const nav = document.getElementById("menu");

btn.addEventListener("click", () => {
  btn.classList.toggle("open");
  nav.classList.toggle("show");
});

// call the navbar
navbar();

// fetch initial data
getUSerInfo();
