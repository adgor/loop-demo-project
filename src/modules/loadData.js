const BASE_URL = "https://challenge-api.view.agentur-loop.com/api.php/";

// bind load more button
const loadMoreBtn = document.getElementById("load_btn");
loadMoreBtn.onclick = function () {
  getUSerInfo(
    parseInt(loadMoreBtn.dataset.page) + 1,
    loadMoreBtn.dataset.limit,
    loadMoreBtn.dataset.filter
  );
  loadMoreBtn.dataset.page = parseInt(loadMoreBtn.dataset.page) + 1;
};

// team filters
const filterLinks = document.querySelector(".team-links");
filterLinks.addEventListener("click", (e) => {
  //  deactivate existing active
  filterLinks.querySelector(".active").classList.remove("active");
  if (e.target.classList.contains("team-links__item")) {
    if (e.target.getAttribute("data-name") === "all") {
      e.target.classList.toggle("active");
      const filterValue = e.target.getAttribute("data-name");
      const loadMoreBtn = document.getElementById("load_btn");
      getUSerInfo(
        parseInt((loadMoreBtn.dataset.page = 1)),
        loadMoreBtn.dataset.limit,
        (loadMoreBtn.dataset.filter = ""),
        "innerHTML"
      );
    } else {
      console.log(e.target.classList.contains("team-links__item"));
      // add active on clicked
      e.target.classList.toggle("active");
      const filterValue = e.target.getAttribute("data-name");
      const loadMoreBtn = document.getElementById("load_btn");
      getUSerInfo(
        parseInt((loadMoreBtn.dataset.page = 1)),
        loadMoreBtn.dataset.limit,
        (loadMoreBtn.dataset.filter = filterValue),
        "innerHTML"
      );
    }
  }
});

// fetch team
function getUSerInfo(
  page = 1,
  limit = 5,
  filteredDuty = "",
  renderData = "insertAdjacentHTML"
) {
  // set params
  const params = new URLSearchParams({
    page,
    limit,
  });
  // add duty param for filtering
  let duty = filteredDuty;
  if (duty !== "") {
    params.append("duty", duty);
  }

  // fetch data from url
  fetch(`${BASE_URL}?${params}`)
    .then((response) => {
      if (response.status >= 200 && response.status <= 299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    // .then((response) => response.json())
    .then((people) => {
      // destruct data
      const users = people.data.data,
        itemsContainer = document.getElementById("box-container");
      // map throught data
      let items = users.map((item) => crewTemplate(item)).join("");

      // render the data
      // insertAdjacentHTML (initial fetch & button)
      // innerHTML (filtering links)
      renderData === "insertAdjacentHTML"
        ? itemsContainer.insertAdjacentHTML("beforeend", items)
        : (itemsContainer.innerHTML = items);
    })
    .catch(function (error) {
      console.log(error);
    });
}

// template to show
function crewTemplate(data) {
  const { name, image, duties } = data;
  return `
    <div class="box">
    <img
    src="${image}"
    alt="${name}"
    />
    <div class="content">
    <h3>${name}</h3>
    <p>${duties}</p>
    </div>
    </div>`;
}
export default getUSerInfo;
