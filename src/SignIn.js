import React from 'react';


function SignIn(props){

    
        return(
            <form onSubmit={(event) => {
                event.preventDefault();
                props.onSubmit();
            }}>
                <div>Sign In</div>
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


export default SignIn;