const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (name && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/mytasks');
      } else {
        document.getElementById("bad-login").style.opacity = "1";
        document.getElementById("bad-login").innerHTML = "Invalid login, please check your username and password and try again.";
      }
    }
  };
  
document.querySelector('#login-btn').addEventListener('click', loginFormHandler);