// LOGOUT FUNCTION
const logout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
        document.location.reload();
    } else {
        return;
    }
};

document.querySelector('#logout-btn').addEventListener('click', logout);