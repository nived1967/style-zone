import { signInWithGooglePopup,createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const Signin = () =>
{
    const logGoogleUser = async() =>
    {
        const response=await signInWithGooglePopup();
        const userDocRef=createUserDocumentFromAuth(response.user);
    }

    return(
<div>
    <button onClick={logGoogleUser}>Sign in with Google Popup</button>
</div>
)
}

export {Signin}