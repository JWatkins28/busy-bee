const loginFormHandler = async (event) => {
  event.preventDefault();
  // GRAB INPUT VALUES
  const name = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  // IF INPUTS HAVE VALUES
  if (name && password) {
    try {
      const response = await axios.post("/api/users/login", {
        name,
        password,
      });
    } catch (error) {
      console.error(error);
      document.getElementById("bad-login").style.opacity = "1";
      document.getElementById("bad-login").innerHTML =
        "Invalid login, please check your username and password and try again.";
      return;
    }
    document.location.replace("/mytasks");
  }
};

document
  .querySelector("#login-btn")
  .addEventListener("click", loginFormHandler);
