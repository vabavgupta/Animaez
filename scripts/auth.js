

// status of the user
auth.onAuthStateChanged(user => {

  console.log(user)
  if(user){
     console.log('user logged ');
     db.collection('animae').onSnapshot(snapshot => {

        //console.log(snapshot.docs);
        setupGuides(snapshot.docs);
        setupUI(user);
     });

  }
  else
    {
  // console.log('user signed out');
setupUI();

      // alert('user logged out ');
      setupGuides([]);
}

});

// create databases
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit' ,(e) => {
e.preventDefault();

// create a guide form
db.collection('animae').add({
  title: createForm['title'].value,
  content: createForm['content'].value
}).then(()=> {
  // close the guide form
  const modal =document.querySelector('#modal-create');
  M.Modal.getInstance(modal).close();
  createForm.reset();
}).catch(err => {
  console.log(err.message);
})

});

// sign up
const signupForm =document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {

  e.preventDefault();

  // Info schema

  const email = signupForm['signup-email'].value;
  const password =signupForm['signup-password'].value;

/* mock test
  console.log(email,password); */

  // sign up the user

  auth.createUserWithEmailAndPassword(email,password).then(cred => {

    return db.collection('users').doc(cred.user.uid).set({
      name: signupForm['signup-name'].value
    });
    // console.log(cred);


  }).then(() =>{

    const modal =document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });



});


// logout feature

const logout =document.querySelector('#logout');
logout.addEventListener('click',(e) =>{
  e.preventDefault();
 auth.signOut().then(() => {
   console.log('user signed out');
 })

});


// login feature

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit' , (e)=> {
  e.preventDefault();

  // get user schema

  const email = loginForm['login-email'].value;
  const password =loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email,password).then(cred => {

    // console.log(cred.user);

    // reseeting the value
    const modal =document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();



  });

});
