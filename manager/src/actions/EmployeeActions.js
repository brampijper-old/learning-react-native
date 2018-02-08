import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMPLOYEE_UPDATE, EMPLOYEE_CREATE, EMPLOYEE_FETCH_SUCCES } from './types';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }

    };
};

export const employeeCreate = ({ name, phone, shift }) => {
    const { currentUser } = firebase.auth(); 

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .push({ name, phone, shift }) 
        .then(() => {
            dispatch({ type: EMPLOYEE_CREATE });
            Actions.pop(); 
        });
    }; 
};

export const employeeFetch = () => {
    const { currentUser } = firebase.auth(); 

    return (dispatch) => {
        firebase.database().ref(`users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({ EMPLOYEE_FETCH_SUCCES, payload: snapshot.val() }); 
            }); 
    };
};
