const storagePrefix = 'twitter_clone_1_';

type Value = string;

const storage = {
  get: <T extends Value>(key: string): T | null => {
    const value = window.localStorage.getItem(storagePrefix + key);
    return value ? JSON.parse(value) : null;
  },
  set: <T extends Value>(key: string, value: T) => {
    window.localStorage.setItem(storagePrefix + key, value);
  },
  clear: (key: string) => {
    window.localStorage.removeItem(storagePrefix + key);
  },
};

export default storage;
