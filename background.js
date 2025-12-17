const checkUrlsStatus = async () => {
  chrome.storage.local.get(['urls', 'emails'], async (data) => {
    const urls = data.urls || [];
    const emails = data.emails || [];
    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          sendNotification(url, emails);
        }
      } catch (error) {
        sendNotification(url, emails);
      }
    }
  });
};

const sendNotification = (url, emails) => {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: '/assets/icon128.png',
    title: 'URL Down',
    message: `The following URL is down: ${url}`
  });

  // Send email (requires integration with a backend or email API like SendGrid, AWS SES, Nodemailer, etc.)
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('checkUrls', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkUrls') {
    checkUrlsStatus();
  }
});