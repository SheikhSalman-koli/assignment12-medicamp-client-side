import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../Components/firebase/initialize';
import { 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
        
} from 'firebase/auth';

const AuthProvider = ({children}) => {

    const provider = new GoogleAuthProvider()
  
 const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)
    console.log(user);

    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const updateUser =(updatedfile)=>{
        return updateProfile(auth.currentUser ,updatedfile)
    }

    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const logout =()=>{
        return signOut(auth)
    }


    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser)=>{
            
                setUser(currentUser)
                setLoading(false)
            
        })
        
        return ()=> {
            unSubscribe()
        }
    },[])

    const allFunc = {
       createUser,
       loading,
       user,
       logout,
       signInUser,
       updateUser,
       signInWithGoogle
    }

    return (
        <AuthContext value={allFunc}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;