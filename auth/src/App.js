import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';   
import { Header, Button, Spinner, CardSection, Field } from './components/common';
import LoginForm from './components/LoginForm'; 

class App extends Component {

    state = { loggedIn: null, email: '', updateEmail: null, error: '', password: '' }; 

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
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        }); 
    }

    onLogOut() {
        this.setState({ error: '' }); 
        firebase.auth().signOut();
    }

    //Use Firebase to check if it's possible the change the user his emailadress.
    changeEmail() {
        const { email } = this.state;
        const user = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            this.state.password
        );

        user.updateEmail(email).then(() => {
            user.reauthenticateWithCredential(credential).then(() => {
                this.setState({ updateEmail: true, error: 'Email succesfully updated' }); 
            }).catch((error) => {
                console.log(error);
                this.setState({ updateEmail: false, error: 'Wrong password' });
            }); 
        }).catch((error) => {
            this.setState({ error: 'Session ended, please log-in again!' }); 
             console.log(error); 
        });
    }

    //Shows message if user updates his emailadress.
    showAirmsg() {
        switch (this.state.updateEmail) {

        case true:
            return (
                    <Text> { this.state.error } </Text>
            );

        case false:
            return (
                <Text> { this.state.error } </Text>
            );
        
        default:
            return (
                    <Text> { this.state.error } </Text>
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
                                onChangeText={email => this.setState({ email })}
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
