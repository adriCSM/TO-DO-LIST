import { createStore } from 'vuex';
import { service } from './service.module';
import { auth } from './auth.module';

export default createStore({
  modules: {
    auth,
    service,
  },
});
