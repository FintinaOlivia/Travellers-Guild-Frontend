import { LineChart, Line, Tooltip } from 'recharts';
import { CartesianGrid, Legend } from 'recharts';
import { XAxis, YAxis } from 'recharts';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../../StateManagement/CharacterActions';

import { Button } from '@mui/material';



export function ChartPage(){
  const dispatch = useDispatch();
  const characterData = useSelector(state => state.characters.characters);

  const chartStyle = {
    marginLeft: "20%",
    marginTop: "2%"
  }

  const buttonStyle = {
    marginLeft: "47%",
    marginTop: "20px",
    marginBottom: "20px"
  }

  const headerStyle = {
    marginLeft: "45%",
    marginTop: "2%"
  
  }

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  // Count characters for each creator
  const creators = {};
  characterData.forEach(character => {
    const creator = character.creator;
    if (creators[creator]) {
      creators[creator]++;
    } else {
      creators[creator] = 1;
    }
  });

  // Convert creators object to array of objects for recharts
  const data = Object.keys(creators).map(creator => ({
    name: creator,
    characters: creators[creator],
  }));


  return (
      <div>
        <h2 style={headerStyle}> ✨ Chart ✨ </h2>
        <LineChart width={1000} height={400} data={data} style={chartStyle}>
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="characters" stroke="#8884d8"/>
          <Tooltip 
          label={() => 'Creator'} 
          formatter={(value, _name, props) => [value, `${props.payload.name}`]} 
          />
          <Legend formatter={(value) => `Number of ${value} per Creator`} /> {/* Custom legend formatter */}
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }}/>
          <YAxis /> 
        </LineChart><Button variant="contained" color="primary" href="/characters" style={buttonStyle}>Go back</Button>
      </div>
  );
}