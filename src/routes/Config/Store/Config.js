import createStore from './lib/CreateStore';
import defaultConfig from './Default/Default.config';

export const config = createStore('config', defaultConfig);
