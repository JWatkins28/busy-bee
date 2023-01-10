const editTaskHandler = async (event) => {
  event.preventDefault();
  // GRAB INPUT VALUES
  const title = document.querySelector("#task-title").value.trim();
  const content = document.querySelector("#task-description").value.trim();
  const dateField = document.querySelector('input[type="date"]');
  const date = dateField.value.trim();
  const date_due = new Date(date.replace(/-/g, "/"));
  // IF INPUTS HAVE VALUES
  if (title && content && date_due) {
    if (event.target.hasAttribute("data-id")) {
      try {
        // GRABBING THE "DATA-ID" FROM THE HTML - CHECK HTML TO SEE
        const id = event.target.getAttribute("data-id");

        const response = await axios.put(`/api/tasks/${id}`, {title, content, date_due});
  
        document.location.replace("/mytasks");
      } catch (err) {
        document.getElementById("bad-login").style.opacity = "1";
        document.getElementById("bad-login").innerHTML = "Please fill out all fields and try again.";
        return;
      }
    }
  }
};

document
  .querySelector("#update-task")
  .addEventListener("click", editTaskHandler);
