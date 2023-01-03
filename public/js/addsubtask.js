const addSubTaskHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#subtask-title').value.trim();
    const content = document.querySelector('#subtask-description').value.trim();

    if (title && content) {

        if (event.target.hasAttribute('data-id')) {

            const task_id = event.target.getAttribute('data-id');

            const response = await fetch('/api/subtasks', {
                method: 'POST',
                body: JSON.stringify({ title, content, task_id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace(`/task/${task_id}`);
            } else {
                alert(response.statusText);
            }
        }
    }
}

document.querySelector('#add-task').addEventListener('click', addSubTaskHandler);