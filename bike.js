// bike.js content
const bikeDetailsEl = document.getElementById("bikeDetails");
const urlParams = new URLSearchParams(window.location.search);
const bikeId = urlParams.get("id");

db.collection("bikes").doc(bikeId).get().then(doc=>{
  if(!doc.exists){ bikeDetailsEl.innerHTML="<h2>Bike not found</h2>"; return; }
  const b = doc.data();
  let galleryHTML = '';
  b.imgURL.forEach(img=> galleryHTML += `<img src="${img}" loading="lazy">`);

  bikeDetailsEl.innerHTML = `
    <h2>${b.name}</h2>
    <p>${b.brand} • ${b.cc}cc • Mileage: ${b.mileage}</p>
    <p class="price">₹${b.price.toLocaleString()}</p>
    <div class="bike-gallery">${galleryHTML}</div>
    <button onclick="addToCompare('${bikeId}')">Add to Compare</button>
  `;
});

function addToCompare(id){
  let compareBikes = JSON.parse(localStorage.getItem("compareBikes")||"[]");
  if(!compareBikes.includes(id)) compareBikes.push(id);
  if(compareBikes.length>3) compareBikes.shift();
  localStorage.setItem("compareBikes", JSON.stringify(compareBikes));
  alert("Added to compare");
}
