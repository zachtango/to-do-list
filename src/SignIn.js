import React from 'react';


function SignIn(props){

    
        return(
            <form 
                className='account'
                onSubmit={(event) => {
                event.preventDefault();
                props.onSubmit();
                
            }}>
                <h2>Sign In</h2>
                <label>
                    <h4>Email</h4>
                    <input 
                        type='text'
                        value={props.email}
                        onChange={(e) => props.onChange(e, true)}
                    />
                </label>

                <label>
                    <h4>Password</h4>
                    <input 
                        type='password'
                        value={props.password}
                        onChange={(e) => props.onChange(e, false)}
                    />
                </label>
                
                <input id='submit' type='submit' value='Sign In' />
                <button type='button' onClick={props.onSwitch}>Create Account</button>
            </form>
        );
    
}


export default SignIn;