import {auth,signInWithGooglePopup,createUserDocumentFromAuth,signInWithGoogleRedirect,signInWithAppEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { SignUpForm } from "../../components/sign-up-form/sign-up-form.component";
import { useEffect,useState } from "react";
import { getRedirectResult } from "firebase/auth";
import './authentication.styles.scss';
import { Button } from "../../components/button/button.component";
import { FormInput } from "../../components/form-input/form-input.component";
import { SignIn } from "../../components/sign-in-form/sign-in-form.component";
const Authentication = () =>
{
    useEffect(() => {
    async function fetchData(){
    const response=await getRedirectResult(auth);
    console.log(response);
    if(response){
    const userDocRef=createUserDocumentFromAuth(response.user);
    }
    }
    fetchData();
    }, []);
    return(
<div className="authentication-container">
    <SignIn/>
    <SignUpForm/>
</div>
)
}

export {Authentication}