import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { fetchCharacter, updateCharacter, setFormValidationError} from "../../StateManagement/CharacterActions";
import { fetchGenres } from "../../StateManagement/GenreActions";
import GenreDropdown from "../Genres/GenreDropdown";

export const ValidationErrorAlert = ({ message, onClose }) => (
  <div className="alert alert-warning alert-dismissible fade show" role="alert">
    {message}
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
      onClick={onClose}
    ></button>
  </div>
);


export const InputField = ({ label, name, value, onChange }) => (
  <div className="mb-3">
    <label htmlFor={name} className="col-sm-4 col-form-label">
      {label}
    </label>
    <div className="mb-3">
      <input
        id={name}
        type="text"
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export function CharacterEdit(props) {

  const styles = {
    width: "50%",
    margin: "auto",
    marginTop: "50px",
    marginBottom: "50px",
    padding: "20px",
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  // eslint-disable-next-line eqeqeq
  const character = useSelector(state => state.characters.characters.find(char => char.id == id)); 
  const [formData, setFormData] = useState({});
  const formValidationError = useSelector(state => state.characters.formValidationError);
  const genres = useSelector(state => state.genres.genres);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);


  useEffect(() => {
    dispatch(fetchCharacter(id)); 
  }, [dispatch, id]);

  useEffect(() => {
    setFormData(character);
  }, [character]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const character = { ...formData };

    if (!character.characterName || !character.age || !character.iconicLines || !character.creator) {
      dispatch(setFormValidationError("Please fill in all the fields!"));
      return;
    }else{
      dispatch(setFormValidationError("Character updated successfully!"));
      dispatch(updateCharacter(id, formData));  
    }
  }

  const handleGenreChange = (selectedGenre) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      genreID: selectedGenre ? selectedGenre.value : '' 
    }));
  };
  
  return (
    <div className="card" style={styles}>
      <h2 className="card-header text-center mb-3">Edit Character</h2>
      <div className="card-body">
        <Link to="/characters" className="btn btn-secondary"
          onClick={() => dispatch(setFormValidationError(null))}
        >
          Cancel
        </Link>

        <div className="row mt-3">
          <div className="col-md-6">
            {formValidationError && (
              <ValidationErrorAlert
                message={formValidationError}
                onClose={() => dispatch(setFormValidationError(null))}
              />
            )}

            <form onSubmit={handleSubmit}>
              <InputField
                label="Name"
                name="characterName"
                value={formData.characterName || ""}
                onChange={handleChange}
              />
              <InputField
                label="Age"
                name="age"
                value={formData.age || ""}
                onChange={handleChange}
              />
              <InputField
                label="Iconic Lines"
                name="iconicLines"
                value={formData.iconicLines || ""}
                onChange={handleChange}
              />
              <InputField
                label="Creator"
                name="creator"
                value={formData.creator || ""}
                onChange={handleChange}
              />
              <div className="mb-3">
                <label htmlFor="genreID" className="col-sm-4 col-form-label">
                  Genre
                </label>
                <GenreDropdown
                  genres={genres}
                  value={formData.genreID}
                  onChange={handleGenreChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="col-sm-4 col-form-label">
                  Description
                </label>
                <div className="mb-3">
                  <textarea
                    id="description"
                    className="form-control"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <button type="submit" className="btn btn-primary sm-4">
                Save
              </button>
            </form>
          </div>
        </div>
        </div>
    </div>
  );
}