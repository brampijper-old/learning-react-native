import React, { Component } from 'react';
import { Button, Card, CardSection, Field } from './common';

class LoginForm extends Component {
    state = { email: '' };

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
                <CardSection />

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

