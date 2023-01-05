// LOGOUT FUNCTION
const logout = async (event) => {
    console.log('logout button clicked', event);
    const response = await axios.post('/api/users/logout');
    console.log(response);

    if (response.status == 204) {
        document.location.replace('/');
    } else {
        return;
    }
};
const logoutButton = document.getElementById('logout-btn').addEventListener('click', logout);
