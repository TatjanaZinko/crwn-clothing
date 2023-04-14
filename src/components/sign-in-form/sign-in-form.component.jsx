import { useState } from "react";

import {  
    signInWithGooglePopup,
    sighInAuthUserWithEmailAndPassword 
} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from "../button/button.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await sighInAuthUserWithEmailAndPassword( email, password ); 
            resetFormFields();
        } catch(error) {
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user assosiated with this email');
                    break;
                default: 
                    console.log(error);
            } 
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value});
    }

    const logGoogleUser = async () => {
        await signInWithGooglePopup();
    }

    return(
        <div className="sign-up-container">
            <h2>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Email"
                    type="email"
                    name="email"
                    onChange = { handleChange } 
                    value = { email }
                    required
                />

                <FormInput 
                    label="Password"
                    type="password"
                    name="password"
                    onChange = { handleChange }  
                    value = { password }
                    required
                />

                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>                
                    <Button type="button" onClick={logGoogleUser} buttonType="google">Google sign in</Button>
                </div>                
                
            </form>
        </div>
    );               

}

export default SignInForm;
