import { 
  ADD_CHARACTER_REQUEST,
  ADD_CHARACTER_SUCCESS,
  ADD_CHARACTER_FAILURE
} from './CharacterActions';
import {
  UPDATE_CHARACTER_REQUEST,
  UPDATE_CHARACTER_SUCCESS,
  UPDATE_CHARACTER_FAILURE,
} from './CharacterActions';
import { 
  FETCH_CHARACTER_REQUEST, 
  FETCH_CHARACTER_SUCCESS, 
  FETCH_CHARACTER_FAILURE 
} from './CharacterActions';
import { 
  FETCH_CHARACTERS_REQUEST, 
  FETCH_CHARACTERS_SUCCESS, 
  FETCH_CHARACTERS_FAILURE 
} from './CharacterActions';
import { 
  DELETE_CHARACTER_REQUEST, 
  DELETE_CHARACTER_SUCCESS, 
  DELETE_CHARACTER_FAILURE 
} from './CharacterActions';
import { SET_FORM_VALIDATION_ERROR
} from './CharacterActions';

const initialState = {
  characters: [], 
  formValidationError: null,
};

const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_VALIDATION_ERROR:
      return {
        ...state,
        formValidationError: action.payload
      };
      case ADD_CHARACTER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case ADD_CHARACTER_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null
        };
      case ADD_CHARACTER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case UPDATE_CHARACTER_REQUEST:
        return {
          ...state,
          updatingCharacter: true,
          updateCharacterError: null,
        };
      case UPDATE_CHARACTER_SUCCESS:
        return {
          ...state,
          updatingCharacter: false,
        };
      case UPDATE_CHARACTER_FAILURE:
        return {
          ...state,
          updatingCharacter: false,
          updateCharacterError: action.payload,
        };
      case DELETE_CHARACTER_REQUEST:
        return {
          ...state,
          loading: true
        };
      case DELETE_CHARACTER_SUCCESS:
        return {
          ...state,
          loading: false,
          characters: state.characters.filter(character => character.id !== action.payload),
          error: null
        };
      case DELETE_CHARACTER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case FETCH_CHARACTER_REQUEST:
        return {
          ...state,
          loading: true, 
          error: null 
        };
      case FETCH_CHARACTER_SUCCESS:
        const existingCharacterIndex = state.characters.findIndex(char => char.id === action.payload.id);
        if (existingCharacterIndex !== -1) {
            const updatedCharacters = [...state.characters];
            updatedCharacters[existingCharacterIndex] = action.payload;
    
            return {
                ...state,
                characters: updatedCharacters,
                loading: false,
                error: null 
            };
        } else {
            return {
                ...state,
                characters: [...state.characters, action.payload],
                loading: false,
                error: null 
            };
        }
      case FETCH_CHARACTER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      case FETCH_CHARACTERS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_CHARACTERS_SUCCESS:
        const uniqueCharacters = action.payload.filter(newChar => 
          !state.characters.some(oldChar => oldChar.id === newChar.id));

        return {
          ...state,
          characters: [...state.characters, ...uniqueCharacters],
          loading: false,
          error: null
        };
      case FETCH_CHARACTERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      
      default:
        return state;
  }
};

export default characterReducer;