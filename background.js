// background.js
const DEFAULT_URL = 'https://www.google.com/';
const MAX_TABS = 100;
const MAX_DELAY = 10000;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'openNewTab') {
    let url = typeof message.url === 'string' ? message.url : DEFAULT_URL;
    let count = parseInt(message.rep, 10);
    let delay = parseInt(message.delay, 10);

    // Validate and clamp values
    try {
      const parsedUrl = new URL(url);
      if (!['http:', 'https:'].includes(parsedUrl.protocol))
        throw new Error('Invalid protocol');
    } catch {
      url = DEFAULT_URL;
    }
    if (isNaN(count) || count < 1 || count > MAX_TABS) count = 1;
    if (isNaN(delay) || delay < 0 || delay > MAX_DELAY) delay = 0;

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        chrome.tabs.create({ url });
      }, i * delay);
    }
  }
});
