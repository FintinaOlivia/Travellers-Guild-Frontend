import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addGenre } from "../../StateManagement/GenreActions";
import { setFormValidationError } from "../../StateManagement/CharacterActions";
import { InputField, ValidationErrorAlert } from "../Character/CharacterEdit";

export function GenreForm() {
  const styles = {
    width: "50%",
    margin: "auto",
    marginTop: "50px",
    marginBottom: "50px",
    padding: "20px",
  };

  const dispatch = useDispatch();
  const formValidationError = useSelector(state => state.genres.formValidationError);
  const [formData, setFormData] = useState({
    name: "",
    typicalTraits: "",
    description: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const genre = { ...formData };

    if (!Object.values(genre).every(value => value !== "")) {
      dispatch(setFormValidationError("Please fill in all the fields!"));
      return;
    }

    dispatch(setFormValidationError("Genre added successfully!"));
    dispatch(addGenre(genre));
    setFormData({
      name: "",
      typicalTraits: "",
      description: ""
    });
    dispatch(setFormValidationError(null));
  };

  return (
    <div>
      <div className="card" style={styles}>
        <h2 className="card-header text-center mb-3">Add Genre</h2>
        <div className="card-body">
          <Link to="/genres" className="btn btn-primary" onClick={() => dispatch(setFormValidationError(null))}>
            Cancel
          </Link>

          <div className="row mt-3">
            <div className="col-md-6">
              {formValidationError && (
                <ValidationErrorAlert message={formValidationError} onClose={() => dispatch(setFormValidationError(null))} />
              )}
              <form onSubmit={handleSubmit}>
                <InputField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  placeholder="Enter name..."
                />
                <InputField
                  label="Typical Traits"
                  name="typicalTraits"
                  value={formData.typicalTraits}
                  onChange={(event) => setFormData({ ...formData, typicalTraits: event.target.value })}
                  placeholder="Enter typical traits..."
                />
                <InputField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                  placeholder="Enter description..."
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
