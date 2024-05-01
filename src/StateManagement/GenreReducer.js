
import { 
    ADD_GENRE_REQUEST,
    ADD_GENRE_SUCCESS,
    ADD_GENRE_FAILURE,

    UPDATE_GENRE_REQUEST,
    UPDATE_GENRE_SUCCESS,
    UPDATE_GENRE_FAILURE,

    FETCH_GENRE_REQUEST, 
    FETCH_GENRE_SUCCESS, 
    FETCH_GENRE_FAILURE,

    FETCH_GENRES_REQUEST, 
    FETCH_GENRES_SUCCESS, 
    FETCH_GENRES_FAILURE,

    DELETE_GENRE_REQUEST, 
    DELETE_GENRE_SUCCESS, 
    DELETE_GENRE_FAILURE,
  } from './GenreActions';
  
import { SET_FORM_VALIDATION_ERROR
  } from './CharacterActions';

  const initialState = {
    genres: [], 
    loading: false, 
    error: null,
    formValidationError: null 
  };

  const genreReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_FORM_VALIDATION_ERROR:
        return {
          ...state,
          formValidationError: action.payload
        };
      case ADD_GENRE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case ADD_GENRE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        };
      case ADD_GENRE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case UPDATE_GENRE_REQUEST:
        return {
          ...state,
          updatingGenre: true,
          updateGenreError: null,
        };
      case UPDATE_GENRE_SUCCESS:        
        return {
          ...state,
          updatingGenre: false,
        };
      case UPDATE_GENRE_FAILURE:
        return {
          ...state,
          updatingGenre: false,
          updateGenreError: action.payload,
        };
      case DELETE_GENRE_REQUEST:
        return {
          ...state,
          loading: true
        };
      case DELETE_GENRE_SUCCESS:
        return {
          ...state,
          loading: false,
          genres: state.genres.filter(genre => genre.genreID !== action.payload),
          error: null
        };
      case DELETE_GENRE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case FETCH_GENRE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_GENRE_SUCCESS:
        const existingGenreIndex = state.genres.findIndex(genre => genre.genreID === action.payload.genreID);
        if (existingGenreIndex !== -1) {
          const updatedGenres = [...state.genres];
          updatedGenres[existingGenreIndex] = action.payload;

          return {
            ...state,
            genres: updatedGenres,
            loading: false,
            error: null
          };
        } else {
          return {
            ...state,
            genres: [...state.genres, action.payload],
            loading: false,
            error: null
          };
        }

      case FETCH_GENRE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case FETCH_GENRES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_GENRES_SUCCESS:
        const uniqueGenres = action.payload.filter(newGenre =>
          !state.genres.some(existingGenre => existingGenre.genreID === newGenre.genreID)
        );
        
        return {
          ...state,
          genres: [...state.genres, ...uniqueGenres],
          loading: false,
          error: null
        };
      case FETCH_GENRES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default genreReducer;