const bikeListEl = document.getElementById("bikeList");
const brandFilter = document.getElementById("brandFilter");
const priceFilter = document.getElementById("priceFilter");
const ccFilter = document.getElementById("ccFilter");
const sortFilter = document.getElementById("sortFilter");
const searchInput = document.getElementById("search");

let bikes = [];

db.collection("bikes").onSnapshot(snapshot => {
  bikes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  populateBrandFilter();
  displayBikes(bikes);
});

function populateBrandFilter() {
  const brands = [...new Set(bikes.map(b => b.brand))];
  brandFilter.innerHTML = `<option value="">All Brands</option>` + brands.map(b => `<option>${b}</option>`).join('');
}

function displayBikes(list) {
  bikeListEl.innerHTML = list.map(b => `
    <div class="bike-card">
      <img src="${b.imgURL[0]}" alt="${b.name}">
      <h3>${b.name}</h3>
      <p>${b.brand} • ${b.cc}cc</p>
      <p>Mileage: ${b.mileage}</p>
      <p class="price">₹${b.price.toLocaleString()}</p>
      <a href="bike.html?id=${b.id}" class="details-btn">View Details</a>
      <button onclick="addToCompare('${b.id}')">Compare</button>
    </div>
  `).join('');
}

function filterBikes() {
  const brand = brandFilter.value;
  const price = priceFilter.value;
  const cc = ccFilter.value;
  const sort = sortFilter.value;
  const keyword = searchInput.value.toLowerCase();

  let filtered = bikes.filter(b =>
    (!brand || b.brand === brand) &&
    (!price || b.price <= price) &&
    (!cc || b.cc == cc) &&
    (!keyword || b.name.toLowerCase().includes(keyword))
  );

  if(sort === "price-asc") filtered.sort((a,b)=>a.price-b.price);
  else if(sort === "price-desc") filtered.sort((a,b)=>b.price-a.price);
  else if(sort === "mileage-desc") filtered.sort((a,b)=>parseFloat(b.mileage)-parseFloat(a.mileage));

  displayBikes(filtered);
}

brandFilter.addEventListener("change", filterBikes);
priceFilter.addEventListener("change", filterBikes);
ccFilter.addEventListener("change", filterBikes);
sortFilter.addEventListener("change", filterBikes);
searchInput.addEventListener("input", filterBikes);

// Compare Feature
let compareBikes = JSON.parse(localStorage.getItem("compareBikes")||"[]");
function addToCompare(id) {
  if(!compareBikes.includes(id)) compareBikes.push(id);
  if(compareBikes.length>3) compareBikes.shift();
  localStorage.setItem("compareBikes", JSON.stringify(compareBikes));
  alert("Added to compare");
}
