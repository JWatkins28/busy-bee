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
      const body = JSON.stringify({ title, content, date_due });
      console.log("updating task with", body);

      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        body,
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log(response);
        document.location.replace("/mytasks");
      } else {
        alert(response.statusText);
      }
    }
  }
};

document
  .querySelector("#update-task")
  .addEventListener("click", editTaskHandler);
