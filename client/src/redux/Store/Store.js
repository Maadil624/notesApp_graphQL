import { createStore } from 'redux'
import reducer from '../Reducer/Reducer';

const store = createStore(reducer);
// console.log(store)
export default store;
