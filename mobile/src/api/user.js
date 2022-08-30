import { BASE_URL } from "@env"

export const registerUser = async (
    username,
    email,
    password
) => {

    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        });

        const json = await response.json();
        console.log(json)
        return json;
    } catch (error) {
        console.log('Register User Error: ', error);
        return { error: true };
    }
};


export const loginUser = async (
    email,
    password,
) => {

    try {
        const response = await fetch(`${BASE_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            }),
        });

        const json = await response.json();
        console.log(json)
        return json;
    } catch (error) {
        console.log('Login User Error: ', error);
        return { error: true };
    }
};

export const getAllUsers = async (
    token,
) => {

    try {
        const response = await fetch(`${BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        const json = await response.json();
        console.log(json)
        return json;
    } catch (error) {
        console.log('Get All The Users Error: ', error);
        return { error: true };
    }
};

export const getProfile = async (
    token
) => {

    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        const json = await response.json();
        console.log(json)
        return json;
    } catch (error) {
        console.log('Get User Profile Error: ', error);
        return { error: true };
    }
};

export const updateUser = async (
    token,
    updateObject //['username', 'password', 'email']
) => {

    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updateObject),
        });

        const json = await response.json();
        console.log(json)
        return json;
    } catch (error) {
        console.log('Patch User Profile Error: ', error);
        return { error: true };
    }
};

export const deleteUser = async (
    token,
) => {

    try {
        const response = await fetch(`${BASE_URL}/users/me`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        const json = await response.json();
        console.log(json)
        return json;
    } catch (error) {
        console.log('Delete User Error: ', error);
        return { error: true };
    }
};

export const wordHistory = async (
    token,
) => {
    try {
        const response = await fetch(`${BASE_URL}/word-history`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        const json = await response.json();
        console.log(json)
        return json;
    } catch (error) {
        console.log('Word History Change Error: ', error);
        return { error: true };
    }
};