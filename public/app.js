document.addEventListener("DOMContentLoaded", event => {
  const appConfig = new blockstack.AppConfig()
  const userSession = new blockstack.UserSession({ appConfig: appConfig })

  document.getElementById('signin-button').addEventListener('click', event => {
    event.preventDefault()
    userSession.redirectToSignIn()
  })

  document.getElementById('signout-button').addEventListener('click', event => {
    event.preventDefault()
    userSession.signUserOut()
    window.location = window.location.origin
  })

  document.getElementById('save-expense').addEventListener('click', event => {
    event.preventDefault()
    saveExpense(userSession);
  })

  function showProfile (profile) {
    let person = new blockstack.Person(profile);

    document.getElementById('section-1').style.display = 'none';
    document.getElementById('section-2').style.display = 'block';
    document.getElementById('site-wrapper-inner').style.verticalAlign = 'top';
  }

  function listExpense (userSession) {
    document.getElementById('crypto').style.display = 'block';
    document.getElementById('deleteExpenses').style.display = 'flex';
    let options = {
      decrypt: false
    }

    userSession.getFile("/bookcover1.json", options)
    .then((fileContents) => {
        var points =  JSON.parse(fileContents || 0);
       document.getElementById('book1points').innerHTML = points;
        console.log('fileContents of listExpense', fileContents);
        console.log('points in listExpense', points);
    });
  }

  function saveExpense(userSession) {
    let options = {
      encrypt: false
    }
    userSession.getFile("/bookcover1.json", {
      decrypt: false
    })
    .then((fileContents) => {
        // get the contents of the file /expenses.txt
        var bookcover1 = JSON.parse(fileContents || 0);
        console.log('bookcover1: ', bookcover1);
      
        bookcover1 += 1;
        userSession.putFile("/bookcover1.json", JSON.stringify(bookcover1), options)
        .then(() => {
            listExpense(userSession);
        })
    });

  }

  function deleteList(userSession) {
    userSession.deleteFile("/expense5.json")
    .then(() => {
       listExpense(userSession);
    })
  }

  function deleteLastItem(userSession) {
    userSession.getFile("/expense5.json", { decrypt: false })
    .then((fileContents) => {
      var expenses = JSON.parse(fileContents || '[]');
      if (expenses.length > 1) { 
        expenses.pop(); 
        console.log('after deleting last item', expenses);
        
        userSession.putFile("/expense5.json", JSON.stringify(expenses), { decrypt: false })
        .then(() => {
          listExpense(userSession);
        })
      } else if (expenses.length === 1) {
        document.getElementById('expenses').style.display = 'none';
        document.getElementById('expense-body').innerHTML = '';
        userSession.putFile("/expense5.json", [], { decrypt: false })
        .then(() => {
          listExpense(userSession);
        })
      }; 
    })
  }

  if (userSession.isUserSignedIn()) {
    const profile = userSession.loadUserData().profile;
    showProfile(profile);
    listExpense(userSession);
  } else if (userSession.isSignInPending()) {
    userSession.handlePendingSignIn().then(userData => {
      window.location = window.location.origin
    })
  }
})


