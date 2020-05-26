// Cat changer to Doggo
catChanger = (fact) => {
  if (fact.includes("Cats")) {
    return fact.trim().replace(/Cats/g, "Dogs");
  } else if (fact.trim().includes("cats")) {
    return fact.trim().replace(/cats/g, "dogs");
  } else if (fact.trim().includes("kittens")) {
    return fact.trim().replace(/kittens/g, "puppies");
  } else if (fact.trim().includes("Kittens")) {
    return fact.trim().replace(/Kittens/g, "Puppies");
  } else if (fact.trim().includes("cat's")) {
    return fact.trim().replace(/cat's/g, "dog's");
  } else if (fact.trim().includes("cat")) {
    return fact.trim().replace(/cat/g, "dog");
  } else if (fact.trim().includes("Cat")) {
    return fact.trim().replace(/Cat/g, "Dog");
  } else if (fact.trim().includes("gato")) {
    return fact.trim().replace(/gato/g, "Perro");
  } else if (fact.trim().includes("kitty")) {
    return fact.trim().replace(/kitty/g, "puppy");
  } else if (fact.trim().includes("hairball")) {
    return fact.trim().replace(/hairball/g, "doggo");
  } else if (fact.trim().includes("tigers")) {
    return fact.trim().replace(/tiger/g, "doggos");
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
  // For some reason fact must go through catChanger three times to change all 'cats' into dogs
  const newFact = catChanger(fact);
  const newDoggoFact = catChanger(newFact);
  tableData1.textContent = i + 1;
  tableData2.textContent = newDoggoFact;
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
pages.forEach((page) => {
  page.addEventListener("click", (e) => {
    e.preventDefault();
    // loader on/off
    document.getElementById("spin").classList.replace("d-none", "d-block");
    table.textContent = "";
    // Load new doggos facts
    fetchApi(startingFacts, fetchNumberFacts);
    // Refresh active class
    pages.forEach((page) => {
      page.parentElement.classList.remove("active");
    });
    // Set active class
    page.parentElement.classList.add("active");
  });

  // Calculations for fetching
  const fetchNumberFacts = page.id * factsPerPage;
  const startingFacts = fetchNumberFacts - 15;
});

// Fetching data from API on click request
fetchApi = (startingFacts, facts) => {
  fetch("https://cat-fact.herokuapp.com/facts")
    .then((response) => response.json())
    .then((data) => data.all)
    .then((data) => {
      // loader on/off
      document.getElementById("spin").classList.replace("d-block", "d-none");
      for (let i = startingFacts; i < facts; i++) {
        const dogFact = catChanger(data[i].text);
        addToTable(dogFact, i);
      }
    })
    .catch((err) => console.log(`Įvyko klaida gaunant duomenis: ${err}`));
};

// Initial API request
fetchApi(loadingIndex, factsPerPage);
document.querySelector("li").classList.add("active");

//Random fact

fetch("https://cat-fact.herokuapp.com/facts/random")
  .then((response) => response.json())
  .then((data) => {
    const randFact = document.getElementById("randFact");
    randFact.textContent = catChanger(data.text);
  })
  .catch((err) => console.log(`Įvyko klaida gaunant duomenis: ${err}`));
