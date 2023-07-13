import defaultOptions from './Default/Default.options';
import createStore from './lib/CreateStore';

export const options = createStore('options', defaultOptions);
