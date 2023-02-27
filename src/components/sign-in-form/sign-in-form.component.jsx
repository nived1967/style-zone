import './sign-in-form.styles.scss';
import {auth,signInWithGooglePopup,createUserDocumentFromAuth,signInWithGoogleRedirect,signInWithAppEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { SignUpForm } from "../../components/sign-up-form/sign-up-form.component";
import { useEffect,useState } from "react";
import { getRedirectResult } from "firebase/auth";
import './sign-in-form.styles.scss';
import { Button } from "../../components/button/button.component";
import { FormInput } from "../../components/form-input/form-input.component";
const defaultFormFields={
    email:"",
    password:"",
};
const SignIn = () =>{
    const [formFields,setFormFields]=useState(defaultFormFields);
    const {email,password}=formFields;
    const handleChangeSignIn=(event)=>
    {
        const {name,value}=event.target;
        setFormFields({...formFields,[name]:value})
        console.log(formFields)
    }

    const handleSubmitGoogle = async (event)=>
    {
        const response=await signInWithGooglePopup();
        console.log(response);
        const userDocRef=createUserDocumentFromAuth(response.user);
    }

    const handleSubmitEmailPassword = async (event)=>
    {
        event.preventDefault();
        try{
        const response=await signInWithAppEmailAndPassword(email,password);
        console.log(response);
        if(response.user.uid)
            alert('Signed in successfully');
        }
        catch(error)
        {
            console.log(error);
            if(error.code==='auth/user-not-found' || error.code==='auth/wrong-password')
            alert('Invalid email or password');
        }
    }

    return(
        <div className="sign-in-container">
        <h2>I already have an account</h2>
        <span>Sign in with your email and passwords</span>
        <form>
        <FormInput label="Email" type="email" name="email" required onChange={handleChangeSignIn} value={email}/>
        <FormInput label="Password" type="password" name="password" required onChange={handleChangeSignIn} value={password}/>
        <div className="sign-in-buttons">
        <div className="sign-in-with-email-and-password">
        <Button onClick={handleSubmitEmailPassword}>Sign in</Button>
        </div>
        <div className="sign-in-with-google">
        <Button buttonType='google' onClick={handleSubmitGoogle}>Sign in with Google</Button>
        </div>
        </div>
        </form>
        </div>
    )
}

export {SignIn};