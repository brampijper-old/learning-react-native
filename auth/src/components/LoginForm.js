import React, { Component } from 'react';
import { Button, Card, CardSection, Field } from './common';

class LoginForm extends Component {
    state = { email: '', password: '' };

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

                <CardSection>
                    <Button>
                        Log in
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default LoginForm; 

