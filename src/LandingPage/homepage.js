import React from "react";
import { useSelector } from 'react-redux';
import { Box } from "@mui/material";

export function Home() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userName = useSelector(state => state.auth.username);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
            <Box
                sx={{
                    width: '400px',
                    p: 3,
                    boxShadow: 2,
                    textAlign: 'center'
                }}
            >
                <h2 className="mb-3">Home</h2>
                {isAuthenticated ? (
                    <p>Welcome, {userName}! Welcome back to the Blorbo Manager!</p>
                ) : (
                    <p>Welcome to the Blorbo Manager!</p>
                )}
            </Box>
        </div>
    );
}
