import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields={
    displayName:"",
    email:"",
    password:"",
    confirmPassword:""
};

const SignUpForm = () =>
{

    const [formFields,setFormFields]=useState(defaultFormFields);
    const {displayName,email,password,confirmPassword}=formFields;

    console.log(formFields);
    const handleChange=(event)=>
    {
        const {name,value}=event.target;

        setFormFields({...formFields,[name]:value})
    }

    const handleSubmit = async (event)=>
    {
        event.preventDefault();
        
        if(password!=confirmPassword)
        {
            alert('passwords do not match');
            return;
        }
        try {
            const response=await createAuthUserWithEmailAndPassword(email,password);
            const userDocRef=createUserDocumentFromAuth(response.user);
        } catch (error) {
            console.log(error);
        }

    }

    return(
        <div>
            <h1>Sign up with email and password</h1>
            
            <form onSubmit={handleSubmit}>

            <label>Display Name</label>
            <input type="text" name="displayName" required onChange={handleChange} value={displayName}/>

            <label>Email</label>
            <input type="email" name="email" required onChange={handleChange} value={email}/>

            <label>Password</label>
            <input type="password" name="password" required onChange={handleChange} value={password}/>

            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword}/>
            <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export {SignUpForm};