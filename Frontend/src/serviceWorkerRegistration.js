// This file is adapted from the standard create-react-app registration file
// to ensure our custom service-worker.js is used for PWA functionality.
// This prevents the self.__WB_MANIFEST compilation error.

export function register(config) {
  if ('serviceWorker' in navigator) {
    // Check if the service worker can be found
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      return;
    }

    window.addEventListener('load', () => {
      // IMPORTANT: We explicitly reference our custom service worker file in the public folder.
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
          console.log('Service Worker registration successful:', registration.scope);
          // Call optional callbacks if provided in the register() call
          if (config && config.onSuccess) {
            config.onSuccess(registration);
          }
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
          if (config && config.onError) {
            config.onError(error);
          }
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
