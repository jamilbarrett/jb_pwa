const butInstall = document.getElementById('buttonInstall');

// TODO: Add an event handler to the `beforeinstallprompt` event
let deferredPrompt; // To store the event for later use

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior of the browser's install prompt
  event.preventDefault();
  // Store the event for later use
  deferredPrompt = event;
  // Show your custom install button or UI element
  butInstall.style.display = 'block';
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  if (deferredPrompt) {
    // Show the browser's install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the PWA installation');
    } else {
      console.log('User dismissed the PWA installation');
    }
    // Hide the install button
    butInstall.style.display = 'none';
    // Clear the deferredPrompt variable
    deferredPrompt = null;
  }
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App successfully installed as a PWA');
});