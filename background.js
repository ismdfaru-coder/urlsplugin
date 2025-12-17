chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension Installed');

  chrome.storage.sync.set({ urls: [] }, () => {
    console.log('Initialized URLs');
  });
});