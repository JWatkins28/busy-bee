// COMPLETE TASK FUNCTION
const taskHandler = async (event) => {
  event.preventDefault();
  // CHECK ID FIELD
  if (event.target.hasAttribute("data-id")) {
    // CHECKING "STATUS" OF COMPLETE BUTTON
    if (event.target.hasAttribute("data-status")) {
      const taskStatus = event.target.getAttribute("data-status");
      // IF COMPLETED = FALSE
      if (taskStatus == "false") {
        // GRAB TASK ID AND USER ID FROM HTML - CHECK HANDLEBARS TO SEE
        const task_id = event.target.getAttribute("data-id");
        const user_id = event.target.getAttribute("data-user");
        // UPDATE TASK TO "COMPLETED"
        const response = await axios.put(`/api/tasks/${task_id}`, {
          completed: true,
        });
        // IF THE TASK UPDATE SUCCEEDS, MOVE ON
        if (response.status == 200) {
          // GET CURRENT USER INFO
          const userData = await axios.get(`/api/users/${user_id}`);
          // GRAB CURRENT HONEY VALUE AND ADD 5 TO IT, ALSO +1 TO COMPLETED TASKS
          const honey = userData.data.honey + 5;
          const completed_tasks = userData.data.completed_tasks + 1;
          // UPDATE SAME USER WITH THE ADDED INFO
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
        // IF TASK STATUS IS "COMPLETED" = TRUE
      } else {
        // GRAB TASK AND USER ID
        const task_id = event.target.getAttribute("data-id");
        const user_id = event.target.getAttribute("data-user");
        // UPDATE TASK TO BE FALSE
        const response = await axios.put(`/api/tasks/${task_id}`, {
          completed: false,
        });
        // IF SUCCEEDS, MOVE ON
        if (response.status == 200) {
          // GET USER DATA
          const userData = await axios.get(`/api/users/${user_id}`);
          // REMOVE HONEY AND COMPLETED TASK FROM USER DATA
          const honey = userData.data.honey - 5;
          const completed_tasks = userData.data.completed_tasks - 1;
          // UPDATE USER WITH NEW DATA
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

// SAME AS TASK EXCLUDING THE ADDING/REMOVING HONEY/COMPLETED TASK PORTION
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

// DELETE TASK FUNCTION
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
// THE SUBTASK BUTTONS NEED TO BE SELECTED, BUT IF THEY DON'T EXIST (NO SUBTASKS) YOU WILL GET AN ERROR. THIS IF CHECKS IF ANY EXIST
if (document.querySelector(".subtask-btns")) {
  // SELECT ALL SUBTASK "COMPLETE" BTNS
  const subtaskBtns = document.querySelectorAll(".subtask-btns");
  // FOR LOOP TO ADD EVENT LISTENER TO ALL PRESENT COMPLETE BUTTONS
  for (let i = 0; i < subtaskBtns.length; i++) {
    subtaskBtns[i].addEventListener("click", subtaskHandler);
  }
}
// THE SUBTASK BUTTONS NEED TO BE SELECTED, BUT IF THEY DON'T EXIST (NO SUBTASKS) YOU WILL GET AN ERROR. THIS IF CHECKS IF ANY EXIST
if (document.querySelector(".delete-btn")) {
  // SELECT ALL SUBTASK "DELETE" BTNS
  const delBtns = document.querySelectorAll(".delete-btn");
  // FOR LOOP TO ADD EVENT LISTENER TO ALL PRESENT DELETE BUTTONS
  for (let i = 0; i < delBtns.length; i++) {
    delBtns[i].addEventListener("click", deleteHandler);
  }
}
