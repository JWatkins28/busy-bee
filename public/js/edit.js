const editTaskHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#task-title").value.trim();
  const content = document.querySelector("#task-description").value.trim();
  const dateField = document.querySelector('input[type="date"]');
  const date = dateField.value.trim();
  const date_due = new Date(date.replace(/-/g, "/"));

  if (title && content && date_due) {
    if (event.target.hasAttribute("data-id")) {
      const id = event.target.getAttribute("data-id");
      // const body = JSON.stringify({ title, content, date_due });
      // console.log(body);
      const response = await axios.put(`/api/tasks/${id}`, {title, content, date_due});

      if (response.status == 200) {
        console.log(response);
        document.location.replace("/mytasks");
      } else {
        document.getElementById("bad-login").style.opacity = "1";
        document.getElementById("bad-login").innerHTML =
        "Please fill out all fields and try again.";
        return;
      }
    }
  }
};

document
  .querySelector("#update-task")
  .addEventListener("click", editTaskHandler);
