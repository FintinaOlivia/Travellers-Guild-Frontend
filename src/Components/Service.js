export async function fetchCharacters() {
    try {
        // const response = await fetch("http://localhost:3005/characters");
        const response = await fetch("http://localhost:8082/characters");
        if (!response.ok) {
            throw new Error("Something went wrong! >:(");
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

export function fetchCharacter(id) {
//   return fetch(`http://localhost:3005/characters/${id}`)
    return fetch(`http://localhost:8082/characters/${id}`)
    .then((response) => response.json())
    .then((response) => {
        if(!response.ok){
            throw new Error("Something went wrong! >:(");
        }
        return response.json()})
    .catch(error => console.log(error));
}

export function deleteCharacter(id) {
    // return fetch(`http://localhost:3005/characters/${id}`, {
    return fetch(`http://localhost:8082/characters/${id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(!response.ok){
            throw new Error("Something went wrong! >:(");
        }
        return response.json();
    })
    .catch(error => console.log(error));
}
