import React from 'react';
import { CharacterList } from '../Components/Character/CharacterList';
import { GenreList } from '../Components/Genres/GenreList';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

export function Profile() {
    const username = useSelector(state => state.auth.username);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Welcome, {username}!
            </Typography>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'flex-start', mt: 4 }}>
                <Box sx={{ flex: 1, mx: 2, textAlign: 'center' }}>
                    <CharacterList username={username} />
                </Box>
                <Box sx={{ flex: 1, mx: 2, textAlign: 'center' }}>
                    <GenreList username={username} />
                </Box>
            </Box>
        </Box>
    );
}
