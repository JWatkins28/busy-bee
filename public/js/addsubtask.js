const addSubTaskHandler = async (event) => {
    event.preventDefault();
    // GRAB INPUT VALUES
    const title = document.querySelector('#subtask-title').value.trim();
    const content = document.querySelector('#subtask-description').value.trim();
    // IF INPUTS HAVE VALUES - DO THIS
    if (title && content) {
    
        if (event.target.hasAttribute('data-id')) {
            // GRABBING THE "DATA-ID" FROM THE HTML - CHECK HTML TO SEE
            const task_id = event.target.getAttribute('data-id');

            const response = await axios.post('/api/subtasks', { title, content, task_id });

            if (response.status == 200) {
                document.location.replace(`/task/${task_id}`);
            } else {
                alert(response.statusText);
            }
        }
    }
}

document.querySelector('#add-task').addEventListener('click', addSubTaskHandler);