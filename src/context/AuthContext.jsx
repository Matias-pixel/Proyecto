import { createContext, useEffect, useReducer } from "react";

import AuthReducer from "./AuthReducer";

const INITIAL_STATE = { currentUser: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null };


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


    useEffect(() => {
        try {
            const userData = JSON.stringify(state.currentUser);
            if (userData.length < 5000) {
                localStorage.setItem('user', userData);
            } else {
                console.warn("User data is too large to store in localStorage.");
            }
        } catch (e) {
            if (e instanceof DOMException && e.name === "QuotaExceededError") {
                console.error("Storage quota exceeded. Cannot save user data.");
            } else {
                console.error("An error occurred while saving to localStorage:", e);
            }
        }
    }, [state.currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}