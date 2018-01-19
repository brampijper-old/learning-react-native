import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';   
import { Header, Button, Spinner, CardSection } from './components/common';
import LoginForm from './components/LoginForm'; 

class App extends Component {

    state = { loggedIn: null }; 

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

    renderContent() {
        switch (this.state.loggedIn) {
            
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );
            
            case false:
                return <LoginForm />; 
            
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
            </View>
        );
    }
}

export default App; 
