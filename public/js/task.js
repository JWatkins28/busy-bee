const taskHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute("data-id")) {
    if (event.target.hasAttribute("data-status")) {
      const taskStatus = event.target.getAttribute("data-status");

      if (taskStatus == "false") {
        const task_id = event.target.getAttribute("data-id");
        const user_id = event.target.getAttribute("data-user");

        const response = await axios.put(`/api/tasks/${task_id}`, {
          completed: true,
        });

        if (response.status == 200) {
          const userData = await axios.get(`/api/users/${user_id}`);

          const honey = userData.data.honey + 5;
          const completed_tasks = userData.data.completed_tasks + 1;

          const response2 = await axios.put(`/api/users/${user_id}`, {
            honey,
            completed_tasks,
          });

          if (response2.status == 200) {
            document.location.reload();
          }
        } else {
          document.location.reload();
        }
      } else {
        const task_id = event.target.getAttribute("data-id");
        const user_id = event.target.getAttribute("data-user");

        const response = await axios.put(`/api/tasks/${task_id}`, {
          completed: false,
        });

        if (response.status == 200) {
          const userData = await axios.get(`/api/users/${user_id}`);

          const honey = userData.data.honey - 5;
          const completed_tasks = userData.data.completed_tasks - 1;

          const response2 = await axios.put(`/api/users/${user_id}`, {
            honey,
            completed_tasks,
          });

          if (response2.status == 200) {
            document.location.reload();
          }
        } else {
          document.location.reload();
        }
      }
    }
  }
};

const subtaskHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute("data-id")) {
    if (event.target.hasAttribute("data-status")) {
      const taskStatus = event.target.getAttribute("data-status");

      if (taskStatus == "false") {
        const task_id = event.target.getAttribute("data-id");

        const response = await axios.put(`/api/subtasks/${task_id}`, {
          completed: true,
        });

        if (response.status == 200) {
          document.location.reload();
        }
      } else {
        const task_id = event.target.getAttribute("data-id");

        const response = await axios.put(`/api/subtasks/${task_id}`, {
          completed: false,
        });

        if (response.status == 200) {
          document.location.reload();
        } else {
          document.location.reload();
        }
      }
    }
  }
};

const deleteHandler = async (event) => {
  event.preventDefault();

  if (event.target.hasAttribute("data-id")) {
    task_id = event.target.getAttribute("data-id");
    taskType = event.target.getAttribute("data-type");

    const response = await axios.delete(`/api/${taskType}/${task_id}`);

    if (response.status == 200 && taskType == "tasks") {
      document.location.replace("/mytasks");
    } else {
      document.location.reload();
    }
  }
};

document.querySelector("#task-btn").addEventListener("click", taskHandler);
if (document.querySelector(".subtask-btns")) {
  const subtaskBtns = document.querySelectorAll(".subtask-btns");
  for (let i = 0; i < subtaskBtns.length; i++) {
    subtaskBtns[i].addEventListener("click", subtaskHandler);
  }
}
if (document.querySelector(".delete-btn")) {
  const delBtns = document.querySelectorAll(".delete-btn");
  for (let i = 0; i < delBtns.length; i++) {
    delBtns[i].addEventListener("click", deleteHandler);
  }
}
