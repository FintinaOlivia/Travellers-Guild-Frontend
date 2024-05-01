// Fetch all characters from the json-server
export function jsonFetchCharacters() {
    return fetch('http://localhost:3005/characters')
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

// Fetch all genres from the json-server
export function jsonFetchGenres() {
    return fetch('http://localhost:3005/genres')
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

// Fetch one character from the json-server
export function jsonFetchCharacter(id) {
    return fetch(`http://localhost:3005/characters/${id}`)
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

// Fetch one genre from the json-server
export function jsonFetchGenre(id) {
    return fetch(`http://localhost:3005/genres/${id}`)
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

// Add a new character to the json-server
export function jsonAddCharacter(character, shouldAddToModified = true) {
  fetch('http://localhost:3005/characters', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(character),
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

    const characterWithOperation = {
        ...character,
        operation: 'added'
      };

    fetch('http://localhost:3005/modifiedCharacters', {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(characterWithOperation),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
}

// Add a new genre to the json-server
export function jsonAddGenre(genre, shouldAddToModified = true) {
    fetch('http://localhost:3005/genres', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(genre),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    
        const genreWithOperation = {
            ...genre,
            operation: 'added'
        };
    
        fetch('http://localhost:3005/modifiedGenres', {
            method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(genreWithOperation),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

// Update a character in the json-server
export function jsonUpdateCharacter(character, shouldAddToModified = true) {
    fetch(`http://localhost:3005/characters/${character.id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(character),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

        const characterWithOperation = {
            ...character,
            operation: 'updated'
        };
    
        fetch('http://localhost:3005/modifiedCharacters', {
            method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(characterWithOperation),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

// Update a genre in the json-server
export function jsonUpdateGenre(genre, shouldAddToModified = true) {
    fetch(`http://localhost:3005/genres/${genre.id}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(genre),
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

        const genreWithOperation = {
            ...genre,
            operation: 'updated'
        };
    
        fetch('http://localhost:3005/modifiedGenres', {
            method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(genreWithOperation),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

// Delete a character from the json-server
export function jsonDeleteCharacter(id, shouldAddToModified = true) {
    fetch(`http://localhost:3005/characters/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

        const characterWithOperation = {
            id,
            operation: 'deleted'
        };

        fetch(`http://localhost:3005/modifiedCharacters/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(characterWithOperation),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

// Delete a genre from the json-server
export function jsonDeleteGenre(id, shouldAddToModified = true) {
    fetch(`http://localhost:3005/genres/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));

        const genreWithOperation = {
            id,
            operation: 'deleted'
        };

        fetch(`http://localhost:3005/modifiedGenres/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(genreWithOperation),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }

// Add a list to json-server
export function jsonAddListOfCharacters(list){
    for (let i = 0; i < list.length; i++) {
        if(jsonFetchCharacters().includes(list[i]) === false){
            jsonAddCharacter(list[i], false);
        }
    }
}

export function deleteAllFromJsonServer(){
    for(let i = 0; i < jsonFetchCharacters().length; i++){
        jsonDeleteCharacter(jsonFetchCharacters()[i].id);
    }

    for(let i = 0; i < jsonFetchGenres().length; i++){
        jsonDeleteGenre(jsonFetchGenres()[i].id);
    }

}

// json fetch modified characters
export function jsonFetchModifiedCharacters() {
    return fetch('http://localhost:3005/modifiedCharacters')
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}

// deleteAllFromJsonServer();