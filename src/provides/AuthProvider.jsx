import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, photo) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }

    const emailSignIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = (googleProvider) => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const gitHubSignIn = (githubProvider) => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    const logOut = async () => {
        setLoading(true)
        // const {data} = await axios(`${import.meta.env.VITE_API_URL}/logout`)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail }
            if(currentUser){
                axios.post('http://localhost:5000/jwt', loggedUser, {withCredentials: true})
                .then()
                .catch()
            }
            else{
                axios.get('http://localhost:5000/logout', loggedUser, {withCredentials: true})
                .then()
                .catch()
            }

            console.log('state changed', currentUser);
            setLoading(false)
            setUser(currentUser)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const userInfo = { user, loading, createUser, updateUserProfile, emailSignIn, googleSignIn, gitHubSignIn, logOut }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;