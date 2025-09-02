export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const devDelay = async (ms: number = 2000) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`🐌 개발 딜레이: ${ms}ms`);
    await sleep(ms);
  }
};
