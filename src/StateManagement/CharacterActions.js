
import { fetchGenre } from './GenreActions';
import { store } from '../StateManagement/Store';


// Add character
export const ADD_CHARACTER_REQUEST = "ADD_CHARACTER_REQUEST";
export const ADD_CHARACTER_SUCCESS = "ADD_CHARACTER_SUCCESS";
export const ADD_CHARACTER_FAILURE = "ADD_CHARACTER_FAILURE";
 
// Update character
export const UPDATE_CHARACTER_REQUEST= 'UPDATE_CHARACTER_REQUEST';
export const UPDATE_CHARACTER_SUCCESS = 'UPDATE_CHARACTER_SUCCESS';
export const UPDATE_CHARACTER_FAILURE = 'UPDATE_CHARACTER_FAILURE';

// Delete character
export const DELETE_CHARACTER_REQUEST = 'DELETE_CHARACTER_REQUEST';
export const DELETE_CHARACTER_SUCCESS = 'DELETE_CHARACTER_SUCCESS';
export const DELETE_CHARACTER_FAILURE = 'DELETE_CHARACTER_FAILURE';

// One character
export const FETCH_CHARACTER_REQUEST = 'FETCH_CHARACTER_REQUEST';
export const FETCH_CHARACTER_SUCCESS = 'FETCH_CHARACTER_SUCCESS';
export const FETCH_CHARACTER_FAILURE = 'FETCH_CHARACTER_FAILURE';

// List of characters
export const FETCH_CHARACTERS_REQUEST = 'FETCH_CHARACTERS_REQUEST';
export const FETCH_CHARACTERS_SUCCESS = 'FETCH_CHARACTERS_SUCCESS';
export const FETCH_CHARACTERS_FAILURE = 'FETCH_CHARACTERS_FAILURE';

// Form validation
export const SET_FORM_VALIDATION_ERROR = 'SET_FORM_VALIDATION_ERROR';

export const SET_SELECTED_GENRE = 'SET_SELECTED_GENRE';

export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER';

// -------------------Utilities------------------

// Define the base URL for the API
// const baseURL = 'http://localhost:8082';


// -------------------FETCH CHARACTER ACTIONS-------------------
export const fetchCharacterRequest = () => ({
  type: FETCH_CHARACTER_REQUEST
});

export const fetchCharacterSuccess = (character) => ({
  type: FETCH_CHARACTER_SUCCESS,
  payload: character
});

export const fetchCharacterFailure = (error) => ({
  type: FETCH_CHARACTER_FAILURE,
  payload: error
});

export const fetchCharacter = (id) => {
  
  return async (dispatch) => {
    dispatch(fetchCharacterRequest());

    try {
      const response = await fetch(`http://localhost:8082/characters/${id}`);
      var data = null;
      if (!response.ok) {
        throw new Error('Failed to fetch character');
      }
      data = await response.json();

      dispatch(fetchCharacterSuccess(data));
      
    } catch (error) {
      dispatch(fetchCharacterFailure(error.message));
    }
  };
};

// List of characters
export const fetchCharactersRequest = () => ({
  type: FETCH_CHARACTERS_REQUEST
});

export const fetchCharactersSuccess = (characters) => ({
  type: FETCH_CHARACTERS_SUCCESS,
  payload: characters
});

export const fetchCharactersFailure = (error) => ({
  type: FETCH_CHARACTERS_FAILURE,
  payload: error
});

export const fetchCharacters = (page, pageSize = 10) => {
  if(page === undefined) {
    page = 1;
  }
  const integerPage = parseInt(page);
  const integerPageSize = parseInt(pageSize);

  const token = store.getState().auth.token.accessToken;

  return async (dispatch) => {
    dispatch(fetchCharactersRequest());
    
    var data = null;
    try {
      const response = await fetch(`http://localhost:8082/characters?page=${integerPage}&pageSize=${integerPageSize}`, {
        headers: {
          'Authorization': `${token}`, 
          'Content-Type': 'application/json'
        }
      });
      
      data = await response.json();
      
      dispatch(fetchCharactersSuccess(data));
    } catch (error) {
      dispatch(fetchCharactersFailure(error.message));
    }
  };
};

// -------------------ADD CHARACTER ACTIONS-------------------


export const addCharacterRequest = (character) => ({
  type: ADD_CHARACTER_REQUEST,
  payload: character
});

export const addCharacterSuccess = (character) => ({
  type: ADD_CHARACTER_SUCCESS,
  payload: character
});

export const addCharacterFailure = (error) => ({
  type: ADD_CHARACTER_FAILURE,
  payload: error
});

export const addCharacter = (character) => {
  return async (dispatch) => {
    try {
      dispatch(addCharacterRequest(character));

      const response = await fetch('http://localhost:8082/characters', {
        method: 'POST',
        headers: {
          'Authorization': `${store.getState().auth.token.accessToken}`, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(character)
      });

      var data = null;
      if (!response.ok) {
        throw new Error('Failed to add character, please try again later.');
      }

      data = await response.json();
      dispatch(addCharacterSuccess(data));
    } catch (error) {
      dispatch(addCharacterFailure(error.message));
      dispatch(setFormValidationError(error.message));
    }
  };
}

// -------------------EDIT CHARACTER ACTIONS-------------------

export const updateCharacterRequest = (id, updatedData) => ({
  type: UPDATE_CHARACTER_REQUEST,
  payload: { id, updatedData }
});

export const updateCharacterSuccess = (id, updatedData) => ({
  type: UPDATE_CHARACTER_SUCCESS,
  payload: { id, updatedData }
});

export const updateCharacterFailure = (error) => ({
  type: UPDATE_CHARACTER_FAILURE,
  payload: error
});

export const updateCharacter = (id, updatedData) => {
  return async (dispatch) => {
    try {
      dispatch(updateCharacterRequest(id, updatedData));

      const response = await fetch(`http://localhost:8082/characters/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `${store.getState().auth.token.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });

    
      if (!response.ok) {
        throw new Error('Failed to edit character, please try again later.');
      }

      dispatch(updateCharacterSuccess(id, updatedData));
      dispatch(fetchCharacter(id));
      console.log("Genre id:", updatedData.genreID);
      dispatch(fetchGenre(updatedData.genreID.toString()))
    } catch (error) {
      dispatch(updateCharacterFailure(error.message));
      dispatch(setFormValidationError(error.message));
    }
  };
}

// -------------------DELETE CHARACTER ACTIONS-------------------
export const deleteCharacterRequest = (id) => ({
  type: DELETE_CHARACTER_REQUEST,
  payload: id
});

export const deleteCharacterSuccess = (id) => ({
  type: DELETE_CHARACTER_SUCCESS,
  payload: id
});

export const deleteCharacterFailure = (error) => ({
  type: DELETE_CHARACTER_FAILURE,
  payload: error
});

export const deleteCharacter = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteCharacterRequest(id));

      const response = await fetch(`http://localhost:8082/characters/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${store.getState().auth.token.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete character');
      }

      dispatch(deleteCharacterSuccess(id));
    } catch (error) {
      dispatch(deleteCharacterFailure(error.message));
    }
  };
};

// -------------------FORM VALIDATION ACTIONS-------------------
export const setFormValidationError = (errorMessage) => {
  console.log("Setting form validation error:", errorMessage);
  return {
    type: SET_FORM_VALIDATION_ERROR,
    payload: errorMessage
  };
};

// ------------------Drop-Drown-----------------------------------
export const setSelectedGenre = (selectedGenre) => ({
  type: SET_SELECTED_GENRE,
  payload: selectedGenre
});

// ------------------Sync with server-----------------------------
// export const syncCharacters = () => {
//   const modifiedCharacters = jsonFetchModifiedCharacters();
//   for(const character of modifiedCharacters) {
//     if(character.operation === 'added') {
//       addCharacter(character);
//     } else if(character.operation === 'updated') {
//       updateCharacter(character.id, character);
//     } else if(character.operation === 'deleted') {
//       deleteCharacter(character.id);
//     }
//   }
// }

// ------------------Pagination-----------------------------
export const setPageNumber = (pageNumber) => ({
  type: SET_PAGE_NUMBER,
  payload: pageNumber,
});