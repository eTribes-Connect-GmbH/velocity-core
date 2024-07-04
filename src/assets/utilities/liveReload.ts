const initLiveReload = async () => {
  document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('scroll')) {
      document.documentElement.scrollTop = Number(sessionStorage.getItem('scroll'));
      sessionStorage.removeItem('scroll');
    }
  });
  const retryReady = async (retries = 0) => {
    if (retries >= 50) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 50 + retries * 10));
    await fetch('/_ready').catch(() => retryReady(retries + 1));
  };
  try {
    await fetch('/_closing');
  } catch {
    await retryReady();
    sessionStorage.setItem('scroll', String(document.documentElement.scrollTop));
    location.reload();
  }
};

export default initLiveReload;
