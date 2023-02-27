import { useState } from "react";
import { createAuthUserWithEmailAndPassword,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import {FormInput} from "../../components/form-input/form-input.component";
import {Button} from '../../components/button/button.component'
import './sign-up-form.styles.scss'
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
    const resetFormFields = () => setFormFields(defaultFormFields);
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
            console.log(response);
            const userDocRef= await createUserDocumentFromAuth(response.user,{displayName});
            resetFormFields();
        } catch (error) {
            console.log(error.message)
            if(error.code=='auth/email-already-in-use')
            alert('Email already in use');
        }

    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account? </h2>
            <span>Sign up with email and password</span>
            
            <form onSubmit={handleSubmit}>

            <FormInput label="Display Name" type="text" name="displayName" required onChange={handleChange} value={displayName}/>

            <FormInput label="Email" type="email" name="email" required onChange={handleChange} value={email}/>

            <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password}/>

            <FormInput label="Confirm Password" type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword}/>
            <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export {SignUpForm};