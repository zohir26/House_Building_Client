import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword,  getAuth,  onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../Firebase/firebase.init';
import useAxiosPublic from '../Hooks/useAxiosPublic';


export const auth = getAuth(app)
export const AuthContext= createContext()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading]= useState(true) 
    console.log(user)  
    const axiosPublic = useAxiosPublic();
    // create new user
const createNewUser= (email,password)=>{
    return createUserWithEmailAndPassword(auth, email,password)
}
//sign in user
const signInUser= (email,password)=>{
    return signInWithEmailAndPassword(auth,email,password)
}
// set observer
useEffect(()=>{
    const observer= onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        if(currentUser){
            //get token and store client
            const userInfo = {email: currentUser.email}
            axiosPublic.post('/jwt', userInfo )
            .then(res =>{
                if (res.data.token){
                    localStorage.setItem('access-token',res.data.token )
                }
            })
        }
        else{
            // todo: remove token if token stored in client side (local storage, cash, query, cookie)
            localStorage.removeItem('access-token')
        }
        setLoading(false)      
    })
    return ()=>{
        observer()
    }
},[])

//sign Out user

const signOutUser = (auth)=>{
return signOut (auth)
}


const authInfo= {
    user,
    setUser,
    loading,
    setLoading,
    createNewUser,
    signInUser,
    signOutUser,
   

}
   
return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
);
};

export default AuthProvider;