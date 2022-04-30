import links from "../utils/links";

//  select a list for links
const navbarLinks = document.querySelectorAll(".nav-links");

// map throught navigation list
function navbar() {
  const navLinks = links
    .map((link) => {
      const { title } = link;
      return `
      <a href="#!" class="nav-links__link">
        ${title}
      </a>
      `;
    })
    .join("");

  // can call insertAdjacentHtml on an individual element in the above list
  navbarLinks[0].insertAdjacentHTML("beforeEnd", navLinks);
  navbarLinks[1].insertAdjacentHTML("beforeEnd", navLinks);
  // insertAdjacentHTML insertion: 'beforeBegin', 'afterBegin', 'beforeEnd', or 'afterEnd'.
}

export default navbar;
