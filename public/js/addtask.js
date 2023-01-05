const addTaskHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#task-title').value.trim();
    const content = document.querySelector('#task-description').value.trim();

    if (title && content) {
        const response = await axios.post('/api/tasks', { title, content })
        console.log(response);
        };

        if (response.status == 200) {
            document.location.replace('/mytasks');
        } else {
            alert(response.statusText);
        }
    };

document.querySelector('.add-form').addEventListener('submit', addTaskHandler);