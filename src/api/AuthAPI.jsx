import {signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        GoogleAuthProvider,
        signInWithPopup,
        signOut} from 'firebase/auth';
import { auth } from  "../firebaseConfig"; 

export const LoginAPI = (email,password) =>{
    try {
        let response = signInWithEmailAndPassword(auth,email,password);
        return response;    
    } catch (err) {
        return err;
    }
    
};

export const RegisterAPI = (email,password) =>{
    try {
        let response = createUserWithEmailAndPassword(auth,email,password);
        return response;    
    } catch (err) {
        return err;
    }
    
};

export const GoogleSignInAPI = (email,password) =>{
    try {
        let googleProvider = new GoogleAuthProvider();
        let response = signInWithPopup(auth,googleProvider);
        return response;    
    } catch (err) {
        return err;
    }
    
};

export const onLogout = () =>{
    try {
        signOut(auth);
    } catch (error) {
        return error;
    }
};