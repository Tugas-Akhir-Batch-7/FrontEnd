import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import SecureLS from 'secure-ls';
import auth from './auth'

const ls = new SecureLS({ isCompression: false });

export default createStore({
  modules: {
    auth
  },
  plugins: [createPersistedState({
    key: 'bebas.com',
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key)
    }
  })],
})
