export default {
	set: (key, value) => {
		try {
			value = JSON.stringify(value);
			localStorage.setItem(key, value);
			return true;
		} catch {
			return false;
		}
	},
	get: (key) => {
		try {
			let value = localStorage.getItem(key);
			value = JSON.parse(value);
			return value;
		} catch {
			return false;
		}
	}
};
