document.getElementById('generateBtn').addEventListener('click', async () => {
  const status = document.getElementById('status');
  status.textContent = 'Checking current tab...';

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url || !tab.url.includes('youtube.com/watch')) {
      status.textContent = '⚠️ Please open a YouTube lecture video first.';
      return;
    }

    status.textContent = 'Opening OmniStudy AI...';
    const appUrl = `http://localhost:3000/?url=${encodeURIComponent(tab.url)}`;
    chrome.tabs.create({ url: appUrl });
  } catch (err) {
    status.textContent = 'Error: ' + err.message;
  }
});