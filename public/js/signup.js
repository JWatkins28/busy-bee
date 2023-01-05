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
      try {
        const response = await axios.post("/api/users", {
          name,
          email,
          password,
        });
      } catch (error) {
        console.error(error);
        document.getElementById("bad-login").style.opacity = "1";
        document.getElementById("bad-login").innerHTML =
          "Error signing up, please try again.";
        return;
      }
      document.location.replace("/mytasks");
    }
  };

document.querySelector('#signup-btn').addEventListener('click', signupFormHandler);