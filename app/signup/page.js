'use client'
import { initFirebase, db } from '../config/firebase';
import { getAuth, 
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';
import { setDoc, doc } from "firebase/firestore";



export default function Signup(){


    //call functions
    const app = initFirebase();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    //adding Data to Database
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [street, setStreet] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [contact, setContact] = useState('');

    let registerButton;
    let fillOut;
    let doesNotMatch;

    if((firstName != '' && lastName != '' && email != '' && password != '' && confirmPassword != '') && (password == confirmPassword)){
         registerButton = async (e) => {
            if((confirmPassword == password)){
                e.preventDefault();
                await setDoc(doc(db, "user", email),{
                    firstName,
                    lastName,
                    email,
                    password,
                    contact,
                    street,
                    district,
                    city
                });
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential)  => {
                // Signed up 
                    const user = userCredential.user;
                })
                .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                });
            }
        }
    }
    else if (password != confirmPassword){
        doesNotMatch = async (e) =>{
            <div className = "w-96 h-64 ">
                <h1>Password does not match</h1>
            </div>
        }
    }
    else{
        fillOut = async (e) => { 
            <div className = "asdasdasd">
                <h1>Please fill out the form</h1>
            </div>
        }
    }
    //Sign in with Email and password

    //Google Auth
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    //check if user is login
    if(user){
        router.push("/");
    }  

    const signIn = async () => {

        const result = await signInWithPopup(auth, provider);
    }

    

    //Reading data in database
        
    return(
        <form className = "relative w-screen h-[125vh] md:h-[110vh] opacity-0 animate-fadeInAnimation animate-delay-100">
            <h1 className = "text-3xl pt-20 text-center">Create an Account</h1>
            <div className = "grid grid-cols-1 w-80  mx-auto">
                <h1 className = "pt-8 pb-2 text-lg">First Name:</h1>
                <input type = "text" className = "border rounded border-[#BDBDBD]" id = "1" placeholder = "First Name" value = {firstName} onChange={(e) => setFirstname(e.target.value)}></input>
                <h1 className = "pt-8 pb-2 text-lg">Last Name:</h1>
                <input type = "text" className = "border rounded border-[#BDBDBD]" id = "2" placeholder = "Last Name" value = {lastName} onChange={(e) => setLastname(e.target.value)}></input>
                <h1 className = "pt-8 pb-2 text-lg " >Email:</h1>
                <input type = "text" className = "border rounded border-[#BDBDBD]" id = "3" placeholder = "Email" value = {email} onChange={(e) => setEmail(e.target.value)}></input>
                <h1 className = "pt-8 pb-2 text-lg">Password:</h1>
                <input type = "password" className = "border rounded border-[#BDBDBD]" id = "4" placeholder = "Password" value = {password} onChange={(e) => setPassword(e.target.value)}></input>
                <h1 className = "pt-8 pb-2 text-lg">Confirm Password:</h1>
                <input type = "password" className = "border rounded border-[#BDBDBD]" id = "5" placeholder = "Confirm Password" value = {confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                <h1 className = "pt-8 pb-2 text-lg">Contact No:</h1>
                <input type = "password" className = "border rounded border-[#BDBDBD]" id = "5" placeholder = "Confirm Password" value = {confirmPassword} onChange={(e) => setContact(e.target.value)}></input>
                <h1 className = "pt-8 pb-2 text-lg">Street:</h1>
                <input type = "password" className = "border rounded border-[#BDBDBD]" id = "5" placeholder = "Confirm Password" value = {confirmPassword} onChange={(e) => setStreet(e.target.value)}></input>
                <h1 className = "pt-8 pb-2 text-lg">District:</h1>
                <input type = "password" className = "border rounded border-[#BDBDBD]" id = "5" placeholder = "Confirm Password" value = {confirmPassword} onChange={(e) => setDistrict(e.target.value)}></input>
                <h1 className = "pt-8 pb-2 text-lg">City:</h1>
                <input type = "password" className = "border rounded border-[#BDBDBD]" id = "5" placeholder = "Confirm Password" value = {confirmPassword} onChange={(e) => setCity(e.target.value)}></input>
                <button type = "submit" onClick = {registerButton} className = "rounded-md hover:bg-[#aa8a40] active:bg-[#977b39] bg-[#BD9A48] mt-8 py-3 text-center text-xl text-white shadow-xl">Register</button>
                {fillOut}
                {doesNotMatch}
                
                <p className = "text-sm mt-4 text-center">By creating an account, you agree to our Terms of Use & Privacy Policy</p>
                <button className = "py-2 w-64 place-self-center text-sm mt-4 text-center active:bg-[#cccccc] hover:bg-[#e5e5e5] hover:rounded-md">Already have an account? Log in</button>
            </div>
        </form>
    )
}
