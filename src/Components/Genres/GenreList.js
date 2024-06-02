import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent, CardActions } from "@mui/material";
import { fetchGenres, deleteGenre } from "../../StateManagement/GenreActions";
import { fetchCharacters } from "../../StateManagement/CharacterActions";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export function GenreList() {
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [selectedGenreId, setSelectedGenreId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); 

    const genres = useSelector(state => state.genres.genres);
    const roles = useSelector(state => state.auth.roles);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loading = useSelector(state => state.genres.loading);
    const hasMore = useSelector(state => state.genres.hasMore);
    const pageRef = useRef(1);
    const nrElementsPerPage = 10;

    useEffect(() => {
        dispatch(fetchGenres(pageRef.current));
        dispatch(fetchCharacters());
    }, [dispatch]);

    useEffect(() => {
        const handleScroll = () => {
            console.log("Scrolled!");
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            if (scrollTop + clientHeight >= scrollHeight - 500 && !loading) {
                console.log("Fetching more genres...");
                pageRef.current += 1;
                dispatch(fetchGenres(pageRef.current, nrElementsPerPage));
            }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [loading, hasMore, dispatch, nrElementsPerPage]);
    
    useEffect(() => {
        setIsAdmin(roles.includes('ADMIN'));
    }, [roles]);

    const handleDeleteConfirmation = (id) => {
        setSelectedGenreId(id);
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteCancelled = () => {
        setDeleteConfirmationOpen(false);
    };

    const handleDeleteConfirmed = () => {
        dispatch(deleteGenre(selectedGenreId));
        setDeleteConfirmationOpen(false);
    };

    const handleCardDoubleClick = (params) => {
        navigate(`/genres/${params.genreID}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const filteredGenres = genres.filter(genre => {
                if (genre.name.toLowerCase().includes(event.target.value.toLowerCase())) {
                    return true;
                } 
                return false;
            });
            
            if (filteredGenres.length > 0) {
                navigate(`/genres/${filteredGenres[0].genreID}`);   
            }
        }
    };

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>✨ List of Genres ✨</Typography>

            <div style={{ marginBottom: '20px', marginTop: '10px', display: 'flex', justifyContent: 'center' }}> 
                {isAdmin && (
                    <Button component={Link} to="/genres/add" variant="contained" color="primary" className="me-2 mb-3">
                        Add
                    </Button>
                )}
                <Button onClick={() => dispatch(fetchGenres(pageRef.current, nrElementsPerPage))} variant="outlined" color="primary" className="me-2  mb-3">
                    Refresh
                </Button>
                <textarea
                    rows="3"
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
                {genres.map(genre => (
                    <Card key={genre.genreID} className="genre-card" 
                                onDoubleClick={() => handleCardDoubleClick(genre)}
                                sx={{ marginBottom: '20px', padding: '15px' }}>
                        <CardContent>
                            <Typography component="div" sx={{ fontWeight: 'bold' }}>Name</Typography>
                            <Typography>{genre.name} <br /></Typography>
                            <Typography component="div" sx={{ fontWeight: 'bold' }}>Typical Traits</Typography>
                            <Typography>{genre.typicalTraits}<br /></Typography>
                            <Typography component="div" sx={{ fontWeight: 'bold' }}>Number of Characters</Typography>
                            <Typography>{genre.numberOfCharacters}<br /></Typography>
                        </CardContent>
                        <CardActions>
                            {isAdmin && (
                                <>
                                    <Button
                                        component={Link}
                                        to={`/genres/edit/${genre.genreID}`}
                                        size="small"
                                        startIcon={<EditOutlinedIcon />}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDeleteConfirmation(genre.id)}
                                        size="small"
                                        startIcon={<DeleteOutlinedIcon />}
                                    >
                                        Delete
                                    </Button>
                                </>
                            )}
                        </CardActions>
                    </Card>
                ))}
            </div>

            <Dialog open={deleteConfirmationOpen} onClose={handleDeleteCancelled}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this genre?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancelled} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteConfirmed} color="secondary">Yes</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
