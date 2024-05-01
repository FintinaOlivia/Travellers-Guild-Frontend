import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { fetchGenre, updateGenre } from "../../StateManagement/GenreActions";
import { InputField, ValidationErrorAlert } from "../Character/CharacterEdit";
import { setFormValidationError } from "../../StateManagement/CharacterActions";


export function GenreEdit(props) {

    const styles = {
    width: "50%",
    margin: "auto",
    marginTop: "50px",
    marginBottom: "50px",
    padding: "20px",
    };

    const { id } = useParams();
    const dispatch = useDispatch();
    //eslint-disable-next-line   
    const genre = useSelector(state => state.genres.genres.find(g => g.genreID == id)); 
    const [formData, setFormData] = useState({});
    const formValidationError = useSelector(state => state.genres.formValidationError);

    useEffect(() => {
    dispatch(fetchGenre(id)); 
    }, [dispatch, id]);

    useEffect(() => {
    setFormData(genre);
    }, [genre]);

    const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const genreData = { ...formData };

        if (!genreData.name || !genreData.typicalTraits || !genreData.description) {
        dispatch(setFormValidationError("Please fill in all the fields!"));
        return;
        } else {
        dispatch(setFormValidationError("Genre updated successfully!"));
        dispatch(updateGenre(id, formData));  
        }
    }

    return (
    <div className="card" style={styles}>
      <h2 className="card-header text-center mb-3">Edit Genre</h2>
      <div className="card-body">
        <Link to="/genres" className="btn btn-secondary"
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
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
              />
              <InputField
                label="Typical Traits"
                name="typicalTraits"
                value={formData.typicalTraits || ""}
                onChange={handleChange}
              />
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
