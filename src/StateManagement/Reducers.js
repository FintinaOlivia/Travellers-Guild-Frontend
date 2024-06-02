import { combineReducers } from 'redux';
import CharacterReducer from './CharacterReducer';
import GenreReducer from './GenreReducer';
import serverStatusReducer from './ServerStatusReducer';
import AuthReducer from './AuthReducer';
import { SET_SELECTED_GENRE } from './CharacterActions';

export const rootReducer = combineReducers({
  characters: CharacterReducer,
  genres: GenreReducer,
  serverStatus: serverStatusReducer,
  auth: AuthReducer
});

const initialState = {
  selectedGenre: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_GENRE:
      return {
        ...state,
        selectedGenre: action.payload
      };
    default:
      return state;
  }
};

export default reducer;


