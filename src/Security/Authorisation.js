import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../StateManagement/Store";

import { useDispatch } from "react-redux";
import { setAuthenticated, setUserRoles, setToken, setUser } from "../StateManagement/AuthActions";

import { decodeJwt } from "./Decoding";

export function Authorisation({ action }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFormSubmit = async (e) => {
        dispatch(setUserRoles([]));
        e.preventDefault();
        if (action !== "login" && action !== "register") {
            console.error("Invalid action");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8082/auth/${action}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} successful`);
                if (action === "login") {
                    const token = await response.json();
                    dispatch(setToken(token));
                    const userData = decodeJwt(token);
                    const roles = userData.role;
    
                    console.log("Username:", userData.sub);
    
                    dispatch(setAuthenticated(true));
                    dispatch(setUserRoles(roles));
                    dispatch(setUser(userData.sub));
    
                    console.log(store.getState().auth.username);
                    navigate("/");
                } else { 
                    navigate("/auth/login");
                }
            } else {
                console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} failed`);
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title text-center mb-4">{action === 'login' ? 'Login' : 'Register'}</h1>
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">{action === 'login' ? 'Login' : 'Register'}</button>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <p className="mb-0">{action === 'login' ? "New here? " : "Already have an account? "}
                                <Link to={action === 'login' ? "/auth/register" : "/auth/login"}>
                                    {action === 'login' ? "Let's get you started!" : "Login here."}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
