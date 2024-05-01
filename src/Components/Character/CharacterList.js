import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters, deleteCharacter } from "../../StateManagement/CharacterActions";
import { store } from "../../StateManagement/Store";
import { fetchGenres } from "../../StateManagement/GenreActions";
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardActions  } from "@mui/material";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export function CharacterList() {
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);

    // eslint-disable-next-line no-unused-vars
    const [genreMap, setGenreMap] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const characters = useSelector(state => state.characters.characters);
    
    const loading = useSelector(state => state.characters.loading);
    const hasMore = useSelector(state => state.characters.hasMore);
    const pageRef = useRef(1);
    const nrElementsPerPage = 10;

    useEffect(() => {
        dispatch(fetchCharacters(pageRef.current));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchGenres(pageRef.current, nrElementsPerPage));
        const constructGenreMap = (genres) => {
            const map = {};
            genres.forEach(genre => {
                map[genre.genreID] = genre.name;
            });
            setGenreMap(map);
        };
        const unsubscribe = store.subscribe(() => {
            const genres = store.getState().genres.genres;
            constructGenreMap(genres);
        });

        return () => {
            unsubscribe();
        };
    }, [dispatch]);

    const handleDeleteConfirmation = (id) => {
        setSelectedCharacterId(id);
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteCancelled = () => {
        setDeleteConfirmationOpen(false);
    };

    const handleDeleteConfirmed = () => {
        dispatch(deleteCharacter(selectedCharacterId));
        setDeleteConfirmationOpen(false);
    };


    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
        
            if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
                console.log("Fetching more characters...");
                pageRef.current += 1;
                dispatch(fetchCharacters(pageRef.current, nrElementsPerPage));
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore, dispatch, nrElementsPerPage]);

    const handleCardDoubleClick = (params) => {
        navigate(`/characters/${params}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            characters.filter(character => {
                if (character.characterName.toLowerCase().includes(event.target.value.toLowerCase())) {
                    navigate(`/characters/${character.id}`);
                    return true;
                }
                return false;
            });
        }
    }

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>✨ List of Characters ✨</Typography>

            <div style={{ marginBottom: '20px', marginTop: '10px' , align: 'center', justifyContent: 'center' }}> 
                <Button component={Link} to="/characters/add" variant="contained" color="primary" className="me-2 mb-3">
                    Add
                </Button>
                <Button onClick={() => dispatch(fetchCharacters())} variant="outlined" color="primary" className="me-2  mb-3">
                    Refresh
                </Button>
                <Button component={Link} to={`/characters/chart`} variant="contained" color="primary" className="me-2 mb-3">
                    Chart
                </Button>
                <textarea
                    rows="3"
                    id="search-bar"
                    placeholder="Looking for something?"
                    style={{
                        borderRadius: '20px',
                        padding: '10px',
                        marginLeft: '50%',
                        border: '1px solid #ccc',
                        height: '45px',
                        width: '300px',
                        resize: 'none'
                    }}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div>
                {characters.map(character => (
                    <Card key={character.id} className="character-card" 
                                    onDoubleClick={() => handleCardDoubleClick(character.id)} 
                                    sx={{ marginBottom: '20px', padding: '15px' }}>
                        <CardContent>
                            <Typography component="div" sx={{ fontWeight: 'bold' }}>Character</Typography>
                            <Typography>{character.characterName}<br /></Typography>
                            <Typography component="div" sx={{ fontWeight: 'bold' }}>Age</Typography>
                            <Typography>{character.age}<br /></Typography>
                            <Typography component="div" sx={{ fontWeight: 'bold' }}>Iconic Line</Typography>
                            <Typography>{character.iconicLines}<br /></Typography>
                            <Typography component="div" sx={{ fontWeight: 'bold' }}>Creator</Typography>
                            <Typography>{character.creator}<br /></Typography>
                            <Typography component="div" sx={{ fontWeight: 'bold' }}>Genre</Typography>
                            <Typography>{character.genreID}</Typography>
                        </CardContent>
                        <CardActions>
                            <Button
                                component={Link}
                                to={`/characters/edit/${character.id}`}
                                size="small"
                                startIcon={<EditOutlinedIcon />}
                            >
                                Edit
                            </Button>
                            <Button
                                onClick={() => handleDeleteConfirmation(character.id)}
                                size="small"
                                startIcon={<DeleteOutlinedIcon />}
                            >
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>

            <Dialog open={deleteConfirmationOpen} onClose={handleDeleteCancelled}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this character?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancelled} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteConfirmed} color="secondary">Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
