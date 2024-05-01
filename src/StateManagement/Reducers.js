import { combineReducers } from 'redux';
import CharacterReducer from './CharacterReducer';
import GenreReducer from './GenreReducer';
import serverStatusReducer from './ServerStatusReducer';
import { SET_SELECTED_GENRE } from './CharacterActions';

export const rootReducer = combineReducers({
  characters: CharacterReducer,
  genres: GenreReducer,
  serverStatus: serverStatusReducer
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


