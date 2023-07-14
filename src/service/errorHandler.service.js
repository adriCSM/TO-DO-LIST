import router from '@/router';

export const hadlerError = {
  async errorHandler(err) {
    console.log(err.message);
    if (err.message == 'Invalid token specified') {
      router.push({ name: 'Login' });
    }
  },
};
