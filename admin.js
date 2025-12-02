// admin.js content
function loginAdmin(){
  const email = document.getElementById("adminEmail").value;
  const pass = document.getElementById("adminPass").value;
  auth.signInWithEmailAndPassword(email, pass)
    .then(userCred=>{
      userCred.user.getIdTokenResult().then(idToken=>{
        if(idToken.claims.admin){
          document.getElementById("adminLogin").style.display="none";
          document.getElementById("adminPanel").style.display="block";
        }else{
          alert("Not authorized");
          auth.signOut();
        }
      });
    })
    .catch(err=>alert(err.message));
}

function addBike(){
  const name = document.getElementById("bikeName").value;
  const brand = document.getElementById("bikeBrand").value;
  const cc = parseInt(document.getElementById("bikeCC").value);
  const price = parseInt(document.getElementById("bikePrice").value);
  const mileage = document.getElementById("bikeMileage").value;
  const files = document.getElementById("bikeImages").files;

  if(!name || !brand || !cc || !price || !mileage || files.length==0){
    alert("Please fill all fields and select images");
    return;
  }

  let imgURLs = [];
  let uploaded = 0;
  Array.from(files).forEach(file=>{
    const storageRef = storage.ref('bikes/'+file.name);
    storageRef.put(file).then(snapshot=>{
      snapshot.ref.getDownloadURL().then(url=>{
        imgURLs.push(url);
        uploaded++;
        if(uploaded==files.length){
          db.collection("bikes").add({name, brand, cc, price, mileage, imgURL: imgURLs})
            .then(()=>{ alert("Bike added successfully"); location.reload(); })
            .catch(err=>alert(err.message));
        }
      });
    });
  });
}
