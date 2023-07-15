import { createWritableStore } from './lib/CreateStore';
import { defaultConfig } from './Default/Default.config.js';

export const config = createWritableStore('config', defaultConfig, true);
