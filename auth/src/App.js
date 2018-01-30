import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';   
import { Header, Button, Spinner, CardSection, Field } from './components/common';
import LoginForm from './components/LoginForm'; 

class App extends Component {
    state = { loggedIn: null, updatedEmail: '', updateEmail: null, error: '', password: '', originalEmail: '' }; 

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyB9ygNf-EWLCJb_EbjO8L5-inxRuZRmF0Y',
            authDomain: 'authenticator-b3162.firebaseapp.com',
            databaseURL: 'https://authenticator-b3162.firebaseio.com',
            projectId: 'authenticator-b3162',
            storageBucket: 'authenticator-b3162.appspot.com',
            messagingSenderId: '921021726389'
        });
        
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true, originalEmail: user.email });
                console.log(user.email);
            } else {
                this.setState({ loggedIn: false });
            }
        }); 
    }

    onLogOut() {
        this.setState({ error: '', originalEmail: '' }); 
        firebase.auth().signOut();
    }

    //Use Firebase to check if it's possible the change the user his emailadress.
    changeEmail() {
        const { updatedEmail, originalEmail, password } = this.state;

        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            originalEmail,
            password
        );

        user.updateEmail(updatedEmail).then(() => {
            user.reauthenticateWithCredential(credential).then(() => {
                this.setState({ updateEmail: true, error: 'Email succesfully updated' }); 
            }).catch((error) => {
                console.log(user.email);
                console.log(updatedEmail); 
                console.log(originalEmail); 
                console.log(error);
                this.setState({ updateEmail: false, error: 'Wrong password' });
            }); 
        }).catch((error) => {
            if (error.code === 'auth/invalid-email') {
                this.setState({ error: 'Your new emailadress is invalid' }); 
            } else {
                this.setState({ error: 'this is a firebase error' }); 
            }
             console.log(error); 
        });
    }

    //Shows message if user updates his emailadress.
    showAirmsg() {
        const { error } = this.state; 
        switch (this.state.updateEmail) {

        case true:
            return (
                    <Text> { error } </Text>
            );

        case false:
            return (
                <Text> { error } </Text>
            );
        
        default:
            return (
                    <Text> { error } </Text>
            );
        }
    }

    renderContent() {
        const user = firebase.auth().currentUser;

        switch (this.state.loggedIn) {
            
            case true:
                return (
                    <View>
                        <CardSection>
                            <Field 
                                capitalize="none"
                                placeholder={user.email} 
                                label=" Your Email:" 
                                onChangeText={updatedEmail => this.setState({ updatedEmail })}
                            />
                        </CardSection>

                        <CardSection>
                            <Field 
                                secureTextEntry
                                placeholder={'Your current psw'} 
                                label="Password:" 
                                onChangeText={password => this.setState({ password })}
                            />
                        </CardSection>
                        
                        <CardSection>
                        <Button onPress={this.changeEmail.bind(this)}>
                            Change email
                        </Button>
                        <Button onPress={this.onLogOut.bind(this)}>
                            Log Out
                        </Button>
                        </CardSection>
                    </View>
                );
            
            case false:
                return (
                    <LoginForm />
                ); 
            
            default:
                return (
                    <View style={{ marginTop: 260 }}>
                        <Spinner spinnerSize="large" />
                    </View>
                );
        }
    }
 
    render() {
        return (
            <View>
                <Header headerText='Authentication' /> 
                { this.renderContent() }
                { this.showAirmsg() }          
            </View>
        );
    }
}

export default App; 
