import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const GenreDropdown = ({ genres, value, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (selectedOption, actionMeta) => {
    if (actionMeta.action === 'create-option') {
      const newValue = { value: inputValue, label: inputValue };
      onChange(newValue);
    } else {
      onChange(selectedOption ? selectedOption : '');
    }
  };

  const handleInputChange = (inputValue) => {
    setInputValue(inputValue);
  };

  const options = genres.map(genre => ({ value: genre.genreID, label: genre.name }));

  return (
    <CreatableSelect
      isClearable
      onChange={handleChange}
      onInputChange={handleInputChange}
      options={options}
      value={options.find(option => option.value === value)}
      inputValue={inputValue}
      placeholder="Select genre..."
    />
  );
};

export default GenreDropdown;
