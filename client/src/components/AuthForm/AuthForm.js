import React from 'react'
import './AuthForm.css'
/**
* @author
* @function AuthForm
**/

const AuthForm = (props) => {
  return(
    <div>
        <form onSubmit={props.authenticate} className="auth-form">
            <label>e-mail</label>

            <input onChange={(e)=> props.emailHandler(e)}
                   value={props.email}
             type="email" placeholder="example@example.com" />

            <label>password</label>

            <input onChange={(e)=> props.passwordHandler(e)}
                    value={props.passcode}
             type="password" />

  <button type="submit">{!props.hasAccount? "Sign-up" : "Login"}</button>
        </form>
    </div>
   )

 }

export default AuthForm;