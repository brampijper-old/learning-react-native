//Reducers are always being called with two arguments. 
    // 1. Curren state it has produced
    // 2.the second one is the action. 
const reducer = (state = [], action) => {
    if (action.type === 'split_string') {
        return ation.payload.split('');
    }  
};


const store = Redux.createStore(reducer);

store.getState(); 

//type property is always a string - command / instruction for the reducer.
//You want to manipulate the payload. 
const action = {
    type: 'split_string',
    payload: 'asdf'
};

// How to feed the action into the reducer?
store.dispatch(action);
store.getState();