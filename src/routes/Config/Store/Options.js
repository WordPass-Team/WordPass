import { defaultOptions } from './Default/Default.options';
import { createWritableStore } from './lib/CreateStore';

export const options = createWritableStore('options', defaultOptions, true);
