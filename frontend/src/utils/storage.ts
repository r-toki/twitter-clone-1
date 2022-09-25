// NOTE: for JWT

const storagePrefix = 'twitter_clone_1_';

const storage = {
  get: (key: string): string | null => {
    return window.localStorage.getItem(storagePrefix + key);
  },
  set: (key: string, value: string) => {
    window.localStorage.setItem(storagePrefix + key, value);
  },
  clear: (key: string) => {
    window.localStorage.removeItem(storagePrefix + key);
  },
};

export default storage;
