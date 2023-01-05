const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirm = document.querySelector('#confirm-password-signup').value.trim();
  
    if (password !== confirm) {
      document.getElementById("bad-login").style.opacity = "1";
      document.getElementById("bad-login").innerHTML = "Your passwords do not match, please try again.";
      return;
    }

    if (name && email && password) {
      const response = await axios.post('/api/users', {name, email, password });

      if (response.status == 200) {
        document.location.replace('/mytasks');
      } else {
        document.getElementById("bad-login").style.opacity = "1";
        document.getElementById("bad-login").innerHTML = "Your password must be at least 8 characters long, please try again.";
      }
    }
  };

document.querySelector('#signup-btn').addEventListener('click', signupFormHandler);