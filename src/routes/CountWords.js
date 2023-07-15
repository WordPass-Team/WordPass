import { createWritableStore } from './Config/Store/lib/CreateStore';

export const count = createWritableStore('count', {}); // writable(0);
