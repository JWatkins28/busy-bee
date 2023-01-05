// LOGOUT FUNCTION
const logout = async (event) => {
    const response = await axios.post('/api/users/logout');

    if (response.status == 204) {
        document.location.replace('/');
    } else {
        return;
    }
};
const logoutButton = document.getElementById('logout-btn').addEventListener('click', logout);
