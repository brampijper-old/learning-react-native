//Reducers are always being called with two arguments. 
    // 1. Curren state it has produced
    // 2.the second one is the action. 
const reducer = (state = [], action) => {
    if (action.type === 'split_string') {
        return ation.payload.split('');
    } else if (action.type === 'add_character') {
        return [ ...state, action.payload ]; 
    }
    
    return state;
};

//Instances of a store with one reducer. 
const store = Redux.createStore(reducer);

store.getState(); 

//type property is always a string - command / instruction for the reducer.
//You want to manipulate the payload. 
//Action -> you want to tell the reducer to update the state in a specific way. 
const action = {
    type: 'split_string',
    payload: 'asdf'
};

// How to feed the action into the reducer?
store.dispatch(action);

//The state is either going to be an empty array or an array of characters. 
store.getState();


const action2 = {
    type: 'add_character',
    payload: 'a'
};
store.dispatch(action2); 



//Why would you use Redux?
// Redux Is on of the best libraries for scaling an application, to be very large, with the least ammount of code complexity.

//You always return brand new objects from reducers.