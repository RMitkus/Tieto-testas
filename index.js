// Cat changer to Doggo
catChanger = (fact) => {
  if (fact.includes("Cats")) {
    return fact.split("Cats").join("Dogs");
  } else if (fact.includes("cats")) {
    return fact.split("cats").join("dogs");
  } else if (fact.includes("kittens")) {
    return fact.split("kittens").join("puppies");
  } else if (fact.includes("Kittens")) {
    return fact.split("Kittens").join("Puppies");
  } else if (fact.includes("cat's")) {
    return fact.split("cat's").join("dog's");
  } else if (fact.includes("cat")) {
    return fact.split("cat").join("dog");
  } else if (fact.includes("Cat")) {
    return fact.split("Cat").join("Dog");
  } else if (fact.includes("gato")) {
    return fact.split("gato").join("Perro");
  } else if (fact.includes("kitty")) {
    return fact.split("kitty").join("puppy");
  } else if (fact.includes("hairball")) {
    return fact.split("hairball").join("doggo");
  } else if (fact.includes("tigers")) {
    return fact.split("tiger").join("doggos");
  } else {
    return fact;
  }
};

// Add facts to the table
const table = document.querySelector("tbody");
addToTable = (fact, i) => {
  const row = table.insertRow();
  row.classList.add("w-100");
  const tableData1 = row.insertCell();
  const tableData2 = row.insertCell();
  tableData1.textContent = i + 1;
  tableData2.textContent = catChanger(fact);
};

// Pagination and fetch setup
const pagesNum = 9;
const factsPerPage = 26;
const loadingIndex = 0;

// Pagination pages function
const pagination = document.querySelector("ul");
addPaginationPages = (num) => {
  for (let i = 1; i <= num; i++) {
    pagination.innerHTML += `<li class="page-item "><a class="page-link text-secondary" id="${i}" href="#top">${i}</a></li>`;
  }
};
// Invoke pagination
addPaginationPages(pagesNum);

// Pagination event listener
const pages = document.querySelectorAll("a");
pages.forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("spin").classList.replace("d-none", "d-block");
    table.textContent = "";
    // Load new doggos facts
    fetchApi(startingFacts, fetchNumberFacts);
    // Refresh active class
    pages.forEach((element) => {
      element.parentElement.classList.remove("active");
    });
    // Set active class
    element.parentElement.classList.add("active");
  });

  // Calculations for fetching
  const fetchNumberFacts = element.id * factsPerPage;
  const startingFacts = fetchNumberFacts - 15;
});

// Fetching data from API on click request
fetchApi = (startingFacts, facts) => {
  fetch("https://cat-fact.herokuapp.com/facts")
    .then((response) => response.json())
    .then((data) => data.all)
    .then((data) => {
      document.getElementById("spin").classList.replace("d-block", "d-none");
      for (let i = startingFacts; i < facts; i++) {
        console.log(data[i].text);
        addToTable(data[i].text, i);
      }
    })
    .catch((err) => console.log(`Įvyko klaida gaunant duomenis: ${err}`));
};

// Initial API request
fetchApi(loadingIndex, factsPerPage);
document.querySelector("li").classList.add("active");
