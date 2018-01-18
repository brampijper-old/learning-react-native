import React, { Component } from 'react';
import { Text } from 'react-native'; 
import firebase from 'firebase';
import { Button, Card, CardSection, Field, Spinner } from './common';

class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };

    onButtonPress() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true }); 

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password) 
                    .catch(() => {
                        this.setState({ error: 'Authentication Failed.' }); 
                    });
            });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />; 
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
            Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Field
                        capitalize="none"
                        placeholder="user@gmail.com"
                        label="Email:"
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Field
                        secureTextEntry
                        capitalize="none"
                        label="Password:"
                        placeholder="password"
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center', 
        color: 'red'
    }
};

export default LoginForm; 

