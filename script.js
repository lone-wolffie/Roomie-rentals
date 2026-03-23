const listings = [
  {
    title: "Bedsitter in Nairobi",
    region: "Nairobi",
    price: 8000,
    size: "bedsitter",
    image: "assets/images/house1.jpg"
  },
  {
    title: "1 Bedroom in Mombasa",
    region: "Mombasa",
    price: 12000,
    size: "1bedroom",
    image: "assets/images/house2.jpg"
  },
  {
    title: "2 Bedroom in Kisumu",
    region: "Kisumu",
    price: 15000,
    size: "2bedroom",
    image: "assets/images/house3.jpg"
  }
];

function displayListings(data) {
  const container = document.getElementById("listings");
  container.innerHTML = "";

  data.forEach(house => {
    container.innerHTML += `
      <div class="card">
        <img src="${house.image}" alt="house">
        <div class="card-content">
          <h3>${house.title}</h3>
          <p>${house.region}</p>
          <p class="price">KES ${house.price}</p>
          <p>${house.size}</p>
        </div>
      </div>
    `;
  });
}

function filterListings() {
  const search = document.getElementById("search").value.toLowerCase();
  const region = document.getElementById("region").value;
  const price = document.getElementById("price").value;
  const size = document.getElementById("size").value;

  let filtered = listings.filter(house => {
    return (
      (search === "" || house.title.toLowerCase().includes(search)) &&
      (region === "" || house.region === region) &&
      (price === "" || house.price <= price) &&
      (size === "" || house.size === size)
    );
  });

  displayListings(filtered);
}

// Validate image quality before upload
function validateImage(file) {
  const minWidth = 800;
  const minHeight = 600;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    if (img.width < minWidth || img.height < minHeight) {
      alert("Image quality too low. Use a better camera.");
    }
  };
}

// Load all 
displayListings(listings);