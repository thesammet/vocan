import { BASE_URL } from "@env"
const baseURL = process.env.BASE_URL

export const translateWord = async (
    token,
    main,
    from,
    to
) => {

    try {
        const response = await fetch(`${baseURL}/words`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                main,
                from,
                to
            }),
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Translate word error: ', error);
        return { error: true };
    }
};

export const getAllWordsHistory = async (
    token
) => {

    try {
        const response = await fetch(`${baseURL}/words`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Get all words history error: ', error);
        return { error: true };
    }
};

export const getWordById = async (
    token,
    id
) => {

    try {
        const response = await fetch(`${baseURL}/words/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Post word error: ', error);
        return { error: true };
    }
};

export const favouriteWord = async (
    token,
    id
) => {

    try {
        const response = await fetch(`${baseURL}/words/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Favourite word error: ', error);
        return { error: true };
    }
};

export const getFavouriteWords = async (
    token
) => {

    try {
        const response = await fetch(`${baseURL}/favourites`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Get favourite words error: ', error);
        return { error: true };
    }
};

export const deleteWord = async (
    token,
    id
) => {

    try {
        const response = await fetch(`${baseURL}/words/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        const json = await response.json();
        return json;
    } catch (error) {
        console.log('Delete word error: ', error);
        return { error: true };
    }
};

