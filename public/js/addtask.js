const addTaskHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#task-title').value.trim();
    const content = document.querySelector('#task-description').value.trim();

    if (title && content) {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/mytasks');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.add-form').addEventListener('submit', addTaskHandler);

