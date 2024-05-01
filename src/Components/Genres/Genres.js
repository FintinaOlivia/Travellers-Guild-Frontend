import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; 

import { fetchGenre } from '../../StateManagement/GenreActions';

import { GenreList } from './GenreList';
import { GenreForm } from './GenreForm';
import { GenreEdit } from './GenreEdit';

export function Genres() {
    const [content, setContent] = useState(<GenreList displayForm={displayForm} />);
    function displayList() {
      setContent(<GenreList displayForm={displayForm} />);
    }
    const navigate = useNavigate();
  
    function displayForm(Genre) {
      if (Genre){
          navigate(`/Genres/edit/${Genre.id}`, { state: { Genre } });
      }else{
          navigate('/Genres/add', { state: { Genre } });
      }
    }

    return (
      <div className="container my-5">
        <Routes>
          <Route path="/" element={content} />
          <Route path="/add" element={<GenreForm displayList={displayList} />} />
          <Route path="/edit/:id" element={<GenreEdit displayList={displayList} />} /> 
          <Route path="/:id" element={<GenreDetails />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
    );
  }


export function GenreDetails(){
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
    dispatch(fetchGenre(id)); 
    }, [dispatch, id]);
    
      // eslint-disable-next-line eqeqeq
    const genre = useSelector(state => state.genres.genres.find(char => char.genreID == id));
    console.log(useSelector(state => state.genres));
    
    if (!genre) {
    return <div>Currently fetching genre, hang on tight!</div>;
    }

    return (
    <div style={style}>
        <h2>Genre Details</h2>
        <p><span style={{ fontWeight: 'bold' }}>Name:</span> {genre.name}</p>
        <p><span style={{ fontWeight: 'bold' }}>Typical Traits:</span> {genre.typicalTraits}</p>
        <p><span style={{ fontWeight: 'bold' }}>Number of Characters: </span>{genre.numberOfCharacters}</p>
        <p><span style={{ fontWeight: 'bold' }}>Description:</span> {genre.description}</p>
    </div>
    );
}