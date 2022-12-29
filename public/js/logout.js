// LOGOUT FUNCTION
const logout = async (event) => {
    console.log('logout button clicked', event);
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        return;
    }
};
const logoutButton = document.getElementById('logout-btn').addEventListener('click', logout);
