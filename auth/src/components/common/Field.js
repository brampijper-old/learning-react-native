import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Field = ({ label, onChangeText, placeholder, capitalize, secureTextEntry }) => {
    const { fieldStyle, labelStyle, containerStyle } = styles; 

    return (
        <View style={containerStyle}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                secureTextEntry={secureTextEntry}
                autoCapitalize={capitalize}
                placeholder={placeholder}
                autoCorrect={false}
                onChangeText={onChangeText}
                style={fieldStyle}
            />
        </View>
    );
};

const styles = {
    fieldStyle: {
        color: '#000',
        paddingRight: 5, 
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        height: 20,
        width: 100
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { Field };

