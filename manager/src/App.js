import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase'; 
import ReduxThunk from 'redux-thunk';
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
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk)); 
        return (
            <Provider store={store}>
                <LoginForm />
            </Provider>
        );
    }
}

export default App;
