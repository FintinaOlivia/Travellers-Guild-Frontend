import { setFormValidationError } from "./CharacterActions";

// Add genre
export const ADD_GENRE_REQUEST = "ADD_GENRE_REQUEST";
export const ADD_GENRE_SUCCESS = "ADD_GENRE_SUCCESS";
export const ADD_GENRE_FAILURE = "ADD_GENRE_FAILURE";

// Update genre
export const UPDATE_GENRE_REQUEST = 'UPDATE_GENRE_REQUEST';
export const UPDATE_GENRE_SUCCESS = 'UPDATE_GENRE_SUCCESS';
export const UPDATE_GENRE_FAILURE = 'UPDATE_GENRE_FAILURE';

// Delete genre
export const DELETE_GENRE_REQUEST = 'DELETE_GENRE_REQUEST';
export const DELETE_GENRE_SUCCESS = 'DELETE_GENRE_SUCCESS';
export const DELETE_GENRE_FAILURE = 'DELETE_GENRE_FAILURE';

// One genre
export const FETCH_GENRE_REQUEST = 'FETCH_GENRE_REQUEST';
export const FETCH_GENRE_SUCCESS = 'FETCH_GENRE_SUCCESS';
export const FETCH_GENRE_FAILURE = 'FETCH_GENRE_FAILURE';

// List of genres
export const FETCH_GENRES_REQUEST = 'FETCH_GENRES_REQUEST';
export const FETCH_GENRES_SUCCESS = 'FETCH_GENRES_SUCCESS';
export const FETCH_GENRES_FAILURE = 'FETCH_GENRES_FAILURE';


export const fetchGenreRequest = () => ({
    type: FETCH_GENRE_REQUEST
  });
  
  export const fetchGenreSuccess = (genre) => ({
    type: FETCH_GENRE_SUCCESS,
    payload: genre
  });
  
  export const fetchGenreFailure = (error) => ({
    type: FETCH_GENRE_FAILURE,
    payload: error
  });
  
  export const fetchGenre = (id) => {
    return async (dispatch) => {
  
      dispatch(fetchGenreRequest());
  
      try {
        const response = await fetch(`http://localhost:8082/genres/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch genre');
        }
        const data = await response.json();
        dispatch(fetchGenreSuccess(data));
  
      } catch (error) {
        dispatch(fetchGenreFailure(error.message));
      }
    };
  };
  
  // List of genres
  export const fetchGenresRequest = () => ({
    type: FETCH_GENRES_REQUEST
  });
  
  export const fetchGenresSuccess = (genres) => ({
    type: FETCH_GENRES_SUCCESS,
    payload: genres
  });
  
  export const fetchGenresFailure = (error) => ({
    type: FETCH_GENRES_FAILURE,
    payload: error
  });
  
  export const fetchGenres = (page = 1, pageSize  = 10) => {
    if (page === undefined) {
      page = 1;
    }
    const integerPage = parseInt(page);
    const integerPageSize = parseInt(pageSize);
    return async (dispatch) => {
      dispatch(fetchGenresRequest());
      
      try {
        const response = await fetch(`http://localhost:8082/genres?page=${integerPage}&pageSize=${integerPageSize}`);
        if (!response.ok) {
          throw new Error('Failed to fetch genres');
        }
        const data = await response.json();
  
        dispatch(fetchGenresSuccess(data));
      } catch (error) {
        dispatch(fetchGenresFailure(error.message));
      }
    }
  }

  // export const fetchGenres = () => {
  //   return async (dispatch) => {
  //     dispatch(fetchGenresRequest());
      
  //     try {
  //       const response = await fetch('http://localhost:8082/genres');
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch genres');
  //       }
  //       const data = await response.json();
  //       dispatch(fetchGenresSuccess(data));
  //     } catch (error) {
  //       dispatch(fetchGenresFailure(error.message));
  //     }
  //   };
  // };
  
  
  
  // -------------------ADD genre ACTIONS-------------------
  
  
  export const addGenreRequest = (genre) => ({
    type: ADD_GENRE_REQUEST,
    payload: genre
  });
  
  export const addGenreSuccess = (genre) => ({
    type: ADD_GENRE_SUCCESS,
    payload: genre
  });
  
  export const addGenreFailure = (error) => ({
    type: ADD_GENRE_FAILURE,
    payload: error
  });
  
  export const addGenre = (genre) => {
    return async (dispatch) => {
      try {
        dispatch(addGenreRequest(genre));
  
        const response = await fetch('http://localhost:8082/genres', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(genre)
        });
  
        if (!response.ok) {
          throw new Error('Failed to add genre, please try again later.');
        }
  
        const data = await response.json();
        dispatch(addGenreSuccess(data));
      } catch (error) {
        dispatch(addGenreFailure(error.message));
        dispatch(setFormValidationError(error.message));
      }
    };
  }
  
  // -------------------EDIT genre ACTIONS-------------------
  
  export const updateGenreRequest = (id, updatedData) => ({
    type: UPDATE_GENRE_REQUEST,
    payload: { id, updatedData }
  });
  
  export const updateGenreSuccess = (id, updatedData) => ({
    type: UPDATE_GENRE_SUCCESS,
    payload: { id, updatedData }
  });
  
  export const updateGenreFailure = (error) => ({
    type: UPDATE_GENRE_FAILURE,
    payload: error
  });
  
  export const updateGenre = (id, updatedData) => {
    return async (dispatch) => {
      try {
        dispatch(updateGenreRequest(id, updatedData));
  
        const response = await fetch(`http://localhost:8082/genres/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedData)
        });
  
        if (!response.ok) {
          throw new Error('Failed to edit genre, please try again later.');
        }
  
        dispatch(updateGenreSuccess(id, updatedData));
        dispatch(fetchGenre(id));
      } catch (error) {
        dispatch(updateGenreFailure(error.message));
        dispatch(setFormValidationError(error.message));
      }
    };
  }
  
  // -------------------DELETE genre ACTIONS-------------------
  export const deleteGenreRequest = (id) => ({
    type: DELETE_GENRE_REQUEST,
    payload: id
  });
  
  export const deleteGenreSuccess = (id) => ({
    type: DELETE_GENRE_SUCCESS,
    payload: id
  });
  
  export const deleteGenreFailure = (error) => ({
    type: DELETE_GENRE_FAILURE,
    payload: error
  });
  
  export const deleteGenre = (id) => {
    return async (dispatch) => {
      try {
        dispatch(deleteGenreRequest(id));
  
        const response = await fetch(`http://localhost:8082/genres/${id}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete genre');
        }
  
        dispatch(deleteGenreSuccess(id));
      } catch (error) {
        dispatch(deleteGenreFailure(error.message));
      }
    };
  };
