import { createStore } from 'vuex';
import { service } from './service.module';
import { auth } from './auth.module';
import { user } from './user.module';

export default createStore({
  modules: {
    auth,
    service,
    user,
  },
});
