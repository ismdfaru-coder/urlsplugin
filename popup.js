document.addEventListener('DOMContentLoaded', () => {
  const urlInput = document.getElementById('url-input');
  const emailInput = document.getElementById('email-input');
  const addButton = document.getElementById('add-button');
  const urlsList = document.getElementById('urls-list');

  const loadUrls = () => {
    chrome.storage.local.get(['urls', 'emails'], (data) => {
      const urls = data.urls || [];
      urlsList.innerHTML = urls.map(url => `<li>${url}</li>`).join('');
    });
  };

  addButton.addEventListener('click', () => {
    const url = urlInput.value;
    const email = emailInput.value;
    if (url && email) {
      chrome.storage.local.get(['urls', 'emails'], (data) => {
        const urls = data.urls || [];
        const emails = data.emails || [];
        urls.push(url);
        if (!emails.includes(email)) emails.push(email);
        chrome.storage.local.set({ urls, emails }, () => {
          urlInput.value = '';
          emailInput.value = '';
          loadUrls();
        });
      });
    }
  });

  loadUrls();
});