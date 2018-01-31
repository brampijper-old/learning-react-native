import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase from 'firebase'; 
import reducers from './reducers';
import LoginForm from './components/LoginForm';

class App extends Component {
    componentDidMount() {
        const config = {
            apiKey: 'AIzaSyCk6y1eiqUx18r36mA0dyyaF-CHTEZpUgs',
            authDomain: 'manager-7aae5.firebaseapp.com',
            databaseURL: 'https://manager-7aae5.firebaseio.com',
            projectId: 'manager-7aae5',
            storageBucket: 'manager-7aae5.appspot.com',
            messagingSenderId: '385395336645'
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
            <Provider store={createStore(reducers)}>
                <LoginForm />
            </Provider>
        );
    }
}

export default App;
