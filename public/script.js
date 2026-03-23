let filteredListings = [LISTINGS];

const listingsGrid = document.getElementById("listingsGrid");
const resultsCount = document.getElementById("resultsCount");
const totalListings = document.getElementById("totalListings");

const searchBtn = document.getElementById("searchBtn");
const searchRegion = document.getElementById("searchRegion");
const searchType = document.getElementById("searchType");
const searchPrice = document.getElementById("searchPrice");

const sortBy = document.getElementById("sortBy");

const gridBtn = document.getElementById("gridViewBtn");
const listBtn = document.getElementById("listViewBtn");

const regionsGrid = document.getElementById("regionsGrid");

// Modal
// const modalOverlay = document.getElementById("modalOverlay");
// const modalBody = document.getElementById("modalBody");
// const modalGallery = document.getElementById("modalGallery");
// const modalClose = document.getElementById("modalClose");

function init() {
  displayListings(LISTINGS);
  renderRegions();
  totalListings.textContent = LISTINGS.length;
}

window.onload = init;

// Display Listings 
function displayListings(data) {
  listingsGrid.innerHTML = "";

  if (data.length === 0) {
    document.getElementById("emptyState").style.display = "block";
    return;
  } else {
    document.getElementById("emptyState").style.display = "none";
  }

  resultsCount.textContent = `Showing ${data.length} listing(s)`;

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "property-card";

    card.innerHTML = `
      <div class="card-image">
        <img src="${item.photos[0]}" alt="${item.title}">
        
      </div>

      <div class="card-body">
        <div class="card-region">${item.region}</div>
        <div class="card-title">${item.title}</div>

        <div class="card-meta">
          <span>${item.bedrooms} bedroom(s)</span>
          <span>${item.bathrooms} bathroom(s)</span>
          <span>${item.size} sqm</span>
        </div>

        <div class="card-footer">
          <div class="card-price">Ksh ${item.price}</div>
          <button class="card-contact">View</button>
        </div>
      </div>
    `;

    //card.addEventListener("click", () => openModal(item));
    listingsGrid.appendChild(card);
  });
}

// Search
searchBtn.addEventListener("click", () => {
  const region = searchRegion.value;
  const type = searchType.value;
  const price = searchPrice.value;

  filteredListings = LISTINGS.filter(item => {
    return (
      (region === "" || item.region === region) &&
      (type === "" || item.type === type) &&
      (price === "" || item.price <= price)
    );
  });

  displayListings(filteredListings);
});

// Sort
sortBy.addEventListener("change", () => {
  let sorted = [filteredListings];

  switch (sortBy.value) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "size-asc":
      sorted.sort((a, b) => a.size - b.size);
      break;
    default:
      sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  }

  displayListings(sorted);
});

// Toggle
gridBtn.addEventListener("click", () => {
  listingsGrid.classList.remove("list-view");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  listingsGrid.classList.add("list-view");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

// Regions
function renderRegions() {
  regionsGrid.innerHTML = "";

  REGIONS.forEach(region => {
    const count = LISTINGS.filter(l => l.region === region.name).length;

    const card = document.createElement("div");
    card.className = "region-card";

    card.innerHTML = `
      <div class="region-emoji">${region.emoji}</div>
      <div class="region-name">${region.name}</div>
      <div class="region-count">${count} listings</div>
    `;

    card.addEventListener("click", () => {
      searchRegion.value = region.name;
      searchBtn.click();
      window.scrollTo({ top: 500, behavior: "smooth" });
    });

    regionsGrid.appendChild(card);
  });
}

// Modal
function openModal(item) {
  modalOverlay.classList.add("open");

  modalGallery.innerHTML = `
    <img src="${item.photos[0]}" alt="">
  `;

  modalBody.innerHTML = `
    <h2 class="modal-title">${item.title}</h2>
    <p class="modal-region">${item.region}, ${item.neighbourhood}</p>
    <div class="modal-price">KES ${item.price}</div>

    <div class="modal-grid">
      <div class="modal-stat"><strong>${item.bedrooms}</strong><span>Bedrooms</span></div>
      <div class="modal-stat"><strong>${item.bathrooms}</strong><span>Bathrooms</span></div>
      <div class="modal-stat"><strong>${item.size} sqm</strong><span>Size</span></div>
    </div>

    <p class="modal-desc">${item.description}</p>

    <div class="modal-amenities">
      ${item.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join("")}
    </div>

    <div class="modal-contact">
      <button class="btn-primary">Call ${item.phone}</button>
    </div>
  `;
}

async function loadListings() {
  const res = await fetch("http://localhost:3000/api/listings");
  const data = await res.json();

  LISTINGS = data;
  displayListings(LISTINGS);
}

window.onload = () => {
  loadListings();
};

// Close Modal
modalClose.addEventListener("click", () => {
  modalOverlay.classList.remove("open");
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("open");
  }
});