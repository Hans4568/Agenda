const firebaseConfig = {
  apiKey: "AIzaSyByFGixxYz-ghqyr28naw_RlZvqEA0wEpA",
  authDomain: "test---agenda.firebaseapp.com",
  projectId: "test---agenda",
  storageBucket: "test---agenda.appspot.com",
  messagingSenderId: "29326857778",
  appId: "1:29326857778:web:7f77c096c3f4fdb24b0e2b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

let nombre = document.getElementById("name");
let cel = document.getElementById("celphone");
let save_btn = document.getElementById("save-btn");
let lista = document.getElementById("lista");
save_btn.addEventListener("click", () => {
  let data = {
    nombre: nombre.value,
    celular: cel.value,
  };
  save_data_firebase(data);
});

const save_data_firebase = (d) => {
  db.collection("contactos")
    .add(d)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      get_data_firebase();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
};

let contactos_arr = [];

const get_data_firebase = () => {
  contactos_arr = [];
  db.collection("contactos")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        contactos_arr.push(doc.data());
      });
      buildList();
    });
};

const buildList = () => {
  lista.innerHTML = "";
  contactos_arr.forEach((e) => {
    lista.insertAdjacentHTML(
      "beforeend",
      `
     <li>${e.nombre} - ${e.celular}</li>
    `
    );
  });
};

get_data_firebase();