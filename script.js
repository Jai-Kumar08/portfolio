const links = document.querySelectorAll('link');
const sections = document.querySelectorAll('section');
let activeLink = 0;
links.forEach((link, i) => {
    link.addEventListener('click', () => {
        if(activeLink != i){
            links[activeLink].classList.remove('active');
            link.classList.add('active');
            sections[activeLink].classList.remove('active');

            setTimeout(() => {
                activeLink = i;
                sections[i].classList.add('active');
            },1000)
        }
    })
})

const firebaseConfig = {
    apiKey: "AIzaSyDUvUi_3PTE3gsugbLwqMNk6sDYXffwoxk",
    authDomain: "my-portfolio-bbeba.firebaseapp.com",
    projectId: "my-portfolio-bbeba",
    storageBucket: "my-portfolio-bbeba.firebasestorage.app",
    messagingSenderId: "736928323294",
    appId: "1:736928323294:web:0d7397e16cf030cd0fd44f",
    measurementId: "G-D1TSE092ZW"
  };

// intialise the firebase
firebase.initializeApp(firebaseConfig);

//ensure that firebase is intialized after

if(!firebase.app.length){
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore(); //db

//handle contact form submittion

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if(contactForm){
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const mail = document.getElementById('mail').value;
            const message = document.getElementById('msg').value;

            if(!message || !name || !mail){
                alert("All fields are mandatory to fill.!!")
                return;
            }

            //store the data in the database
            db.collection('contacts').add({
                name: name,
                mail: mail,
                message: message
            })
            .then(() => {
                console.log("Contact form submitted successfully!");
                alert('Contact form submitted successfully!');
            })
            .catch((error) => {
                console.log("Error in submitting the form!");
                alert('Error in submitting the form!');
            });
        });  
    }else{
        console.error("Contact form not found in the document.");
    }
})