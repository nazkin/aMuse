import React, {useState} from 'react'
import AuthForm from "../../components/AuthForm/AuthForm";
import axios from "axios";
/**
* @author
* @function Auth
**/

const Auth = (props) => {
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[hasAccount, setHasAccount] = useState(false);


    //passed on to the form through props
    const emailChangeHandler = (event)=> {
        setEmail(event.target.value);
    }
    //passed on to the form through props
    const passwordChangeHandler = (event)=> {
        setPassword(event.target.value);
    }
    //passed on to the form through props
    const submissionHandler = (event)=> {
        event.preventDefault();
        console.log(email);
        console.log(password);
        //Object to be passed to back-end for authentication
        const authObj = {
            username: email, 
            password: password
        }
        let url = 'http://localhost:8080/api/signup';
        if(hasAccount){
            url = 'http://localhost:8080/api/login';
        }
        //Post request
        axios.post(url, authObj)
            .then(res => {
                console.log('Success', res);
                const secretToken = res.data.token;
                //Store token in sessionStorage*****
                sessionStorage.setItem('jwtToken', secretToken);
                //Clear the input fields
                setEmail("");
                setPassword("");
                //redirect to protected route
                props.history.push('/home');
            })
            .catch(err=> console.log(err));
    }
  return(
    <div>
        <h3>To access more functionality, create an account!</h3>
        <AuthForm emailHandler={emailChangeHandler}
                  passwordHandler= {passwordChangeHandler}
                  authenticate= {submissionHandler} 
                  email = {email}
                  passcode = {password}
                  hasAccount = {hasAccount}/>
        <hr/>
        {!hasAccount?<h6>Already have an account??? Login</h6> :
                    <h6>Don't have an account yet?? Sign-up</h6>} 
        <button onClick={()=> setHasAccount(!hasAccount)}>Here</button>
    </div>
   )

 }

export default Auth