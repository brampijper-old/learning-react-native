import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';   
import { Header, Button, Spinner, CardSection, Field } from './components/common';
import LoginForm from './components/LoginForm'; 

class App extends Component {

    state = { loggedIn: null, email: '' }; 

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

    onUpdatePress() {
        const { email } = this.state;

        const user = firebase.auth().currentUser;

        user.updateEmail(email).then(() => {
          console.log('succesfully changed email to', email);
        }).catch((error) => {
          console.log(error); 
        });
    }

    renderUserInfo() {
        const user = firebase.auth().currentUser;

        if (user != null) {
            return (
                <Field 
                    placeholder={user.email} 
                    label=" Your Email:" 
                    onChangeText={email => this.setState({ email })}
                /> 
            );
        }
    }

    renderContent() {
        switch (this.state.loggedIn) {
            
            case true:
                return (
                    <View>
                        <CardSection>
                            { this.renderUserInfo() }
                        </CardSection>
                        
                        <CardSection>
                        <Button onPress={this.onUpdatePress.bind(this)}>
                            Change email
                        </Button>
                        <Button onPress={() => firebase.auth().signOut()}>
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
            </View>
        );
    }
}

export default App; 
