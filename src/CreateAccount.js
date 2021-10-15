import React from 'react';

function CreateAccount(props){

    
        return(
            
            <form 
                className='account'
                onSubmit={(event) => {
                event.preventDefault();
                props.onSubmit();
            }}>
                <h2>Create Account</h2>
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
                        type='text'
                        value={props.password}
                        onChange={(e) => props.onChange(e, false)}
                    />
                </label>
                
                <input id='submit' type='submit' value='Create Account' />
                <button type='button' onClick={props.onSwitch}>Sign In</button>
            </form>
        );
    
}


export default CreateAccount;