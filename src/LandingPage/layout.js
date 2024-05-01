import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
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

                </div>
            </div>
        </nav>
    );
}

export function Footer() {
    return(
        <footer className="bg-body-tertiary text-center text-lg-start">
            <div className="text-center p-3">
                <p>© 2024 – I really hope this is okay 😬</p>
            </div>
        </footer>
    );
}