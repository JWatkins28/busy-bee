const editSubtaskHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#subtask-title").value.trim();
  const content = document.querySelector("#subtask-description").value.trim();

  if (title && content) {
    if (event.target.hasAttribute("data-id")) {
      try {
        const id = event.target.getAttribute("data-id");
        const task_id = event.target.getAttribute("data-task")

        const response = await axios.put(`/api/subtasks/${id}`, {
          title,
          content,
        });

        document.location.replace(`/task/${task_id}`);
      } catch (err) {
        document.getElementById("bad-login").style.opacity = "1";
        document.getElementById("bad-login").innerHTML =
          "Please fill out all fields and try again.";
        return;
      }
    }
  }
};

document
  .querySelector("#update-subtask")
  .addEventListener("click", editSubtaskHandler);
