import { BASE_URL } from "@env"
const baseURL = process.env.BASE_URL

export const postWord = async (
    token,
    main,
    from,
    to
) => {
    console.log('token', token, 'main: ', main, 'from: ', from, 'to: ', to, "baseURL", baseURL);

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
        console.log(json)
        return json;
    } catch (error) {
        console.log('Post word error: ', error);
        return { error: true };
    }
};