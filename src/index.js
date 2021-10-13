import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import ToDo from './ToDo';
import CreateAccount from './CreateAccount';
import SignIn from './SignIn';

import firebaseApp from './firebase';

const auth = getAuth();

class App extends React.Component{

    constructor(props){
        super(props);
        
        this.state = {
            signInPage: true,
            isSignedIn: false, 
            email: '', 
            password: '', 
            uid: ''
        };

        this.onSubmitSignIn = this.onSubmitSignIn.bind(this);
        this.onSubmitCreateAccount = this.onSubmitCreateAccount.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onPress = this.onPress.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
    }
    
    onSubmitSignIn(){
        signInWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);

            this.setState({
                isSignedIn: true,
                uid: user.uid
            });
            
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            });
    }

    onSubmitCreateAccount(){
        console.log('creating account');
        createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then((userCredential) => {
                const user = userCredential.user;

                this.setState({
                    isSignedIn: true, 
                    uid: user.uid
                });
                // user authorized
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    }

    onInputChange(event, email){
        if(email){
            this.setState({
                email: event.target.value
            });
        } else{
            this.setState({
                password: event.target.value
            });
        }
    }

    onPress(){

        this.setState({
            signInPage: !this.state.signInPage
        });
    }

    onSignOut(){

        this.setState({
            signInPage: true,
            isSignedIn: false, 
            email: '', 
            password: '', 
            uid: ''
        });
    }

    render(){
        const button = <button onClick={this.onPress}>switch</button>;

        return(
            <div>
                {this.state.isSignedIn ? 
                    <ToDo
                        email={this.state.email}
                        uid={this.state.uid}
                        signOut={this.onSignOut}
                    /> :
                    <div>
                        {this.state.signInPage ? 
                            <SignIn
                                onSubmit={this.onSubmitSignIn}
                                onChange={this.onInputChange}
                            /> :
                            <CreateAccount
                                onSubmit={this.onSubmitCreateAccount}
                                onChange={this.onInputChange}

                            />
                        }
                        {button}
                    </div>
                    
                    
                }
                
            </div>
            
            
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));