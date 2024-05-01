import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'; 
import { fetchCharacter } from '../../StateManagement/CharacterActions';

import { CharacterList } from './CharacterList';
import { CharacterForm } from './CharacterForm';
import { CharacterEdit } from './CharacterEdit';

export function Characters() {
    const [content, setContent] = useState(<CharacterList displayForm={displayForm} />);
    function displayList() {
      setContent(<CharacterList displayForm={displayForm} />);
    }
    const navigate = useNavigate();
  
    function displayForm(character) {
      if (character){
          navigate(`/characters/edit/${character.id}`, { state: { character } });
      }else{
          navigate('/characters/add', { state: { character } });
      }
    }
  
  

    return (
      <div className="container my-5">
        <Routes>
          <Route path="/" element={content} />
          <Route path="/add" element={<CharacterForm displayList={displayList} />} />
          <Route path="/edit/:id" element={<CharacterEdit displayList={displayList} />} /> 
          <Route path="/:id" element={<CharacterDetails />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    );
  }


export function CharacterDetails() {
  const style = {
    border: '1px solid black',
    borderRadius: '15px',
    padding: '20px',
    marginRight: '10%',
    marginLeft: '10%',
    marginTop: '5%',
    marginBottom: '5%',
  };

  const { id } = useParams();
  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(fetchCharacter(id));
  }, [dispatch, id]);

  // eslint-disable-next-line eqeqeq
  const character = useSelector(state => state.characters.characters.find(char => char.id == id)); 


  if (!character) {
    return <div>Currently fetching character, hang on tight!</div>;
  }

  return (
    <div style={style}>
      <h2>Character Details</h2>
      <p><span style={{ fontWeight: 'bold' }}>Name:</span> {character.characterName}</p>
      <p><span style={{ fontWeight: 'bold' }}>Age:</span> {character.age}</p>
      <p><span style={{ fontWeight: 'bold' }}>Iconic Lines:</span> {character.iconicLines}</p>
      <p><span style={{ fontWeight: 'bold' }}>Creator:</span> {character.creator}</p>
      <p><span style={{ fontWeight: 'bold' }}>Description:</span> {character.description}</p>
    </div>
  );
}

