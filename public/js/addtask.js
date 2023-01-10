const addTaskHandler = async (event) => {
  event.preventDefault();
  // GRAB INPUT VALUES
  const title = document.querySelector("#task-title").value.trim();
  const content = document.querySelector("#task-description").value.trim();
  const dateField = document.querySelector('input[type="date"]');
  const date = dateField.value.trim();
  const date_due = new Date(date.replace(/-/g, "/"));
  // IF INPUTS HAVE VALUES - DO THIS
  if (title && content && date_due) {
    const response = await axios.post("/api/tasks", {
      title,
      content,
      date_due,
    });

    if (response.status == 200) {
      document.location.replace("/mytasks");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector(".add-form").addEventListener("submit", addTaskHandler);
