document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(['urls'], (result) => {
    const content = document.getElementById('content');
    content.innerHTML = result.urls.join('<br>');
  });
});