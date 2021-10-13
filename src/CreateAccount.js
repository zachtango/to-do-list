import React from 'react';

function CreateAccount(props){

    
        return(
            
            <form onSubmit={(event) => {
                event.preventDefault();
                props.onSubmit();
            }}>
                <div>Create Account</div>
                <label>
                    <div>Email</div>
                    <input 
                        type='text'
                        value={props.email}
                        onChange={(e) => props.onChange(e, true)}
                    />
                </label>

                <label>
                    <div>Password</div>
                    <input 
                        type='text'
                        value={props.password}
                        onChange={(e) => props.onChange(e, false)}
                    />
                </label>
                
                <input type='submit' value='Submit' />
            </form>
        );
    
}


export default CreateAccount;