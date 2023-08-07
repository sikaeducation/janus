declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
    }
  }
  interface Window {
    store: any;
    env?: 'test';
  }
}

export {};
