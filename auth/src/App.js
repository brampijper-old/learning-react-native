import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';   
import { Header } from './components/common';

class App extends Component {
    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyB9ygNf-EWLCJb_EbjO8L5-inxRuZRmF0Y',
            authDomain: 'authenticator-b3162.firebaseapp.com',
            databaseURL: 'https://authenticator-b3162.firebaseio.com',
            projectId: 'authenticator-b3162',
            storageBucket: 'authenticator-b3162.appspot.com',
            messagingSenderId: '921021726389'
        }); 
    }

    render() {
        return (
            <View>
                <Header headerText='Authentication' /> 
                <Text>Second App!</Text>
            </View>
        );
    }
}

export default App; 
