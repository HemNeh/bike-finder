// script.js content
const bikeListEl = document.getElementById("bikeList");
const searchInput = document.getElementById("search");

let bikes = [];

db.collection("bikes").get().then(snapshot=>{
  bikes = snapshot.docs.map(doc=>({id:doc.id, ...doc.data()}));
  populateFilters();
  renderBikes(bikes);
});

function renderBikes(data){
  bikeListEl.innerHTML = '';
  data.forEach(b=>{
    const card = document.createElement("div");
    card.className = "bike-card";
    card.innerHTML = `
      <img src="${b.imgURL[0]}" alt="${b.name}" loading="lazy">
      <h3>${b.name}</h3>
      <p>${b.brand} • ${b.cc}cc</p>
      <p>Mileage: ${b.mileage}</p>
      <p class="price">₹${b.price.toLocaleString()}</p>
      <a class="details-btn" href="bike.html?id=${b.id}">Details</a>
      <button onclick="addToCompare('${b.id}')">Compare</button>
    `;
    bikeListEl.appendChild(card);
  });
}

function addToCompare(id){
  let compareBikes = JSON.parse(localStorage.getItem("compareBikes")||"[]");
  if(!compareBikes.includes(id)) compareBikes.push(id);
  if(compareBikes.length>3) compareBikes.shift();
  localStorage.setItem("compareBikes", JSON.stringify(compareBikes));
  alert("Added to compare");
}

function populateFilters(){
  const brands = [...new Set(bikes.map(b=>b.brand))];
  const brandFilter = document.getElementById("brandFilter");
  brandFilter.innerHTML = '<option value="">Brand</option>';
  brands.forEach(b=>brandFilter.innerHTML += `<option value="${b}">${b}</option>`);

  searchInput.addEventListener("input",()=>filterBikes());
  brandFilter.addEventListener("change",()=>filterBikes());
  document.getElementById("priceFilter").addEventListener("change",()=>filterBikes());
  document.getElementById("ccFilter").addEventListener("change",()=>filterBikes());
  document.getElementById("sortFilter").addEventListener("change",()=>filterBikes());
}

function filterBikes(){
  const search = searchInput.value.toLowerCase();
  const brand = document.getElementById("brandFilter").value;
  const price = parseInt(document.getElementById("priceFilter").value)||Infinity;
  const cc = parseInt(document.getElementById("ccFilter").value)||Infinity;
  const sort = document.getElementById("sortFilter").value;

  let filtered = bikes.filter(b=>{
    return (b.name.toLowerCase().includes(search) || b.brand.toLowerCase().includes(search)) &&
           (brand=="" || b.brand==brand) &&
           b.price <= price &&
           (cc==Infinity || b.cc==cc);
  });

  if(sort=="price-asc") filtered.sort((a,b)=>a.price-b.price);
  else if(sort=="price-desc") filtered.sort((a,b)=>b.price-a.price);
  else if(sort=="mileage-desc") filtered.sort((a,b)=>parseFloat(b.mileage)-parseFloat(a.mileage));

  renderBikes(filtered);
}
