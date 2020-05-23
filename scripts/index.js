// setting the animae collection

const guideList = document.querySelector('.guides');
const loggedOutLinks =document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
// set up the guides
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if(user)
  {
    // get the name input

    db.collection('users').doc(user.uid).get().then(doc =>{
      // account Info
      const html =`
      <div> logged in as ${user.email}</div>
       <div> Welcome ${doc.data().name}</div>

      `;
      accountDetails.innerHTML =html;

    })


    loggedInLinks.forEach(item => item.style.display ='block');
    // loggedInLinks.forEach(item => item.style.display ='block');
    loggedOutLinks.forEach(item => item.style.display ='none');
  }
  else{

    // hide account Info
    accountDetails.innerHTML ='';

    loggedInLinks.forEach(item => item.style.display ='none');
    // loggedInLinks.forEach(item => item.style.display ='block');
    loggedOutLinks.forEach(item => item.style.display ='block');

  }
}
const setupGuides = (data) => {
  if(data.length){
  let html = '';
  data.forEach(doc => {
    const guide = doc.data();
    // console.log(guide);

    const li = `<l1>
     <div class="collapsible-header grey lighten-4">${guide.title}</div>
     <div class="collapsible-body white">${guide.content}</div>


      </li>`;
    html += li;
  });
  guideList.innerHTML = html;
}
else {
  guideList.innerHTML = '<h5 class ="center-align"> Login to view </h5>'
}


}







document.addEventListener('DOMContentLoaded', () => {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
