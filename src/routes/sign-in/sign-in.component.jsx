import {auth,signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import { SignUpForm } from "../../components/sign-up-form/sign-up-form.component";

const Signin = () =>
{

    const logGoogleUser = async() =>
    {
        const response=await signInWithGooglePopup();
        console.log(response);
        const userDocRef=createUserDocumentFromAuth(response.user);
    }

    return(
<div>
    <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    <SignUpForm/>
</div>
)
}

export {Signin}