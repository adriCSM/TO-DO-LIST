import router from '@/router';

export const hadlerError = {
  async errorHandler(err) {
    if (err.message == 'Invalid token specified') {
      router.push({ name: 'Login' });
    }
  },
};
