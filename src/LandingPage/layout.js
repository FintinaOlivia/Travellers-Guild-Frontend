import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthenticated, setUserRoles, setToken } from "../StateManagement/AuthActions";

import { store } from '../StateManagement/Store';


export function Navbar() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(setAuthenticated(false));
        dispatch(setUserRoles([]));
        dispatch(setToken(""));
    }

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const auth = store.getState().auth;
            setIsAuthenticated(auth.isAuthenticated);
        });

        return () => {
            unsubscribe();
        }
    });
    

    return(
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" to="/">Character Manager</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link text-dark" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/characters">Characters</Link>
                    </li>                    
                    <li>
                        <Link className="nav-link" to="/genres">Genres</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/characters/chart">Chart</Link>
                    </li>
                </ul>

                {!isAuthenticated ?
                    <ul className="navbar-nav ml-auto"> 
                        <li className="nav-item">
                            <Link className="nav-link" to="/auth/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/auth/register">Register</Link>
                        </li>
                    </ul>
                    :
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" onClick={handleLogout}>Logout</Link>
                        </li>
                    </ul>
                }

                </div>
            </div>
        </nav>
    );
}

export function Footer() {
    return(
        <footer style={{ backgroundColor: '#f8f9fa', color: '#6c757d', position: 'fixed', bottom: '0', width: '100%' }} className="text-center text-lg-start">
            <div className="text-center p-3">
                <p>© 2024 – I really hope this is okay 😬</p>
            </div>
        </footer>
    );
}