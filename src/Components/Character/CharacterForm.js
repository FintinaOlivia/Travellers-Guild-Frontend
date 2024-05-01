// CharacterForm.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { ValidationErrorAlert, InputField } from "./CharacterEdit";
import GenreDropdown from "../Genres/GenreDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addCharacter, setFormValidationError} from "../../StateManagement/CharacterActions";
import { fetchGenres } from "../../StateManagement/GenreActions";


export function CharacterForm(props) {
  const styles = {
    width: "50%",
    margin: "auto",
    marginTop: "50px",
    marginBottom: "50px",
    padding: "20px",
  };

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ characterName: "", 
                                              age: "", 
                                              iconicLines: "", 
                                              creator: "", 
                                              genreID: "",
                                              description: "" 
                                            });
  const formValidationError = useSelector(state => state.characters.formValidationError);

  const genres = useSelector(state => state.genres.genres);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const character = { ...formData };

    if (!character.characterName || !character.age || !character.iconicLines || !character.creator) {
      dispatch(setFormValidationError("Please fill in all the fields!"));
      return;
    }else{
      dispatch(setFormValidationError("Character added successfully!"));
      dispatch(addCharacter(character));
      setFormData({ characterName: "", age: "", iconicLines: "", creator: "", description: "" });
    }
  };


  const handleGenreChange = (selectedGenre) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      genreID: selectedGenre ? selectedGenre.value : '' 
    }));
  };
   
    return (
      <div >
          <div className="card" style={styles}>
            <h2 className="card-header text-center mb-3">Add Character</h2>
            <div className="card-body">
              <Link to="/characters" className="btn btn-primary" 
                onClick={() => dispatch(setFormValidationError(null))}
              >
                Cancel
              </Link>
  
              <div className="row mt-3">
                <div className="col-md-6">
                  {formValidationError && 
                  <ValidationErrorAlert message={formValidationError} 
                    onClose={() => dispatch(setFormValidationError(null))}
                    />}
                  <form onSubmit={(event) => handleSubmit(event)}>
                    <InputField
                      label="Name"
                      name="characterName"
                      value={formData.characterName}
                      onChange={handleChange}
                      placeholder="Enter name...."
                    />
                    <InputField
                      label="Age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter age...."
                    />
                    <InputField
                      label="Iconic Lines"
                      name="iconicLines"
                      value={formData.iconicLines}
                      onChange={handleChange}
                      placeholder="Enter iconic lines...."
                    />
                    <InputField
                      label="Creator"
                      name="creator"
                      value={formData.creator}
                      onChange={handleChange}
                      placeholder="Enter creator...."
                    />
                    {/* <InputField
                      label="Genre"
                      name="genreID"
                      value={formData.genreID}
                      onChange={handleChange}
                      placeholder="Enter genre id...."
                    /> */}
                    <GenreDropdown
                      genres={genres}
                      value={formData.genreID}
                      onChange={handleGenreChange}
                    />
                    <InputField
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter description...."
                    />
                    <button type="submit" className="btn btn-primary sm-4">
                      Save
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
    
    );
  }