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
  
  document.getElementById('upvote-book-2').addEventListener('click', event => {
    event.preventDefault()
    upvotebookcover2(userSession);
  })
  
    document.getElementById('upvote-book-3').addEventListener('click', event => {
    event.preventDefault()
    upvotebookcover3(userSession);
  })

  function showProfile (profile) {
    let person = new blockstack.Person(profile);

    document.getElementById('section-1').style.display = 'none';
    document.getElementById('section-2').style.display = 'block';
    document.getElementById('site-wrapper-inner').style.verticalAlign = 'top';
  }

  function listExpense (userSession) {
    document.getElementById('crypto').style.display = 'flex';
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
  
   function listExpense(userSession) {
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
  
   function updateBookCover1Points(userSession) {
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
  
    function updateBookCover2Points(userSession) {
    document.getElementById('crypto').style.display = 'block';
    document.getElementById('deleteExpenses').style.display = 'flex';
    let options = {
      decrypt: false
    }

    userSession.getFile("/bookcover2.json", options)
    .then((fileContents) => {
        var points =  JSON.parse(fileContents || 0);
       document.getElementById('book2points').innerHTML = points;
        console.log('fileContents of listExpense', fileContents);
        console.log('points in listExpense', points);
    });
  }
  
     function updateBookCover3Points(userSession) {
    document.getElementById('crypto').style.display = 'block';
    document.getElementById('deleteExpenses').style.display = 'flex';
    let options = {
      decrypt: false
    }

    userSession.getFile("/bookcover3.json", options)
    .then((fileContents) => {
        var points =  JSON.parse(fileContents || 0);
       document.getElementById('book3points').innerHTML = points;
        console.log('fileContents of listExpense', fileContents);
        console.log('points in listExpense', points);
    });
  }
  
 

  function upvotebookcover1(userSession) {
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
            updateBookCover1Points(userSession);
        })
    });
  }
  
 
  function upvotebookcover2(userSession) {
    let options = {
      encrypt: false
    }
    userSession.getFile("/bookcover2.json", {
      decrypt: false
    })
    .then((fileContents) => {
        // get the contents of the file /expenses.txt
        var bookcover2 = JSON.parse(fileContents || 0);
        console.log('bookcover2: ', bookcover2);
      
        bookcover2 += 1;
        userSession.putFile("/bookcover2.json", JSON.stringify(bookcover2), options)
        .then(() => {
            updateBookCover2Points(userSession);
        })
    });
  }
  
   function upvotebookcover3(userSession) {
    let options = {
      encrypt: false
    }
    userSession.getFile("/bookcover3.json", {
      decrypt: false
    })
    .then((fileContents) => {
        // get the contents of the file /expenses.txt
        var bookcover3 = JSON.parse(fileContents || 0);
        console.log('bookcover3: ', bookcover3);
      
        bookcover3 += 1;
        userSession.putFile("/bookcover3.json", JSON.stringify(bookcover3), options)
        .then(() => {
            updateBookCover3Points(userSession);
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


