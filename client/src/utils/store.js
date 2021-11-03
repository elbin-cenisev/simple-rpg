// Import the function to create a Redux store
import { createStore } from 'redux';

// Import the reducers file which will handle state updates based on dispatched actions
import reducers from './reducers';

// export the created Redux store which uses reducers to calculate new states
export default createStore(reducers);