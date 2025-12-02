// compare.js content
const compareContainer = document.getElementById("compareContainer");
let compareBikes = JSON.parse(localStorage.getItem("compareBikes")||"[]");

if(compareBikes.length==0){ compareContainer.innerHTML="<h2>No bikes selected for comparison</h2>"; }

compareBikes.forEach(id=>{
  db.collection("bikes").doc(id).get().then(doc=>{
    if(!doc.exists) return;
    const b = doc.data();
    const card = document.createElement("div");
    card.className = "compare-card";
    card.innerHTML = `
      <img src="${b.imgURL[0]}" loading="lazy">
      <h3>${b.name}</h3>
      <p>${b.brand} • ${b.cc}cc</p>
      <p>Mileage: ${b.mileage}</p>
      <p class="price">₹${b.price.toLocaleString()}</p>
    `;
    compareContainer.appendChild(card);
  });
});
