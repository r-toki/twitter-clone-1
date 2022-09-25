// NOTE: for JWT

const storagePrefix = 'twitter_clone_1_';

type Key = 'access_token' | 'refresh_token';

const storage = {
  get: (key: Key): string | null => {
    return window.localStorage.getItem(storagePrefix + key);
  },
  set: (key: Key, value: string) => {
    window.localStorage.setItem(storagePrefix + key, value);
  },
  clear: (key: Key) => {
    window.localStorage.removeItem(storagePrefix + key);
  },
};

export default storage;
