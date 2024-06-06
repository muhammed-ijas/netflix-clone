
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword,
        getAuth,
        signInWithEmailAndPassword,
        signOut} from 'firebase/auth';
import {addDoc,
        collection, 
        getFirestore} from 'firebase/firestore';
import { toast } from "react-toastify";


        const firebaseConfig = {
  apiKey: "AIzaSyCUD-x-IBwv4N0rAs5Egsuzx-Fhzo94E5g",
  authDomain: "netflix-clone-4aa5f.firebaseapp.com",
  projectId: "netflix-clone-4aa5f",
  storageBucket: "netflix-clone-4aa5f.appspot.com",
  messagingSenderId: "356197230586",
  appId: "1:356197230586:web:38dfbb225510d911906643"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name,email,password)=>{
    try {
       const res =  await createUserWithEmailAndPassword(auth,email,password);
       const user = res.user;
       await addDoc(collection (db, "user"),{
        uid: user.uid,
        name,
        authProvider : "local",
        email,
       })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}


const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))

    }
}

const logout = ()=>{
    signOut(auth)
}

export { auth , db , login , signup , logout};