const urlInput = document.getElementById('url');
const repInput = document.getElementById('repetition');
const delayInput = document.getElementById('delay');
const goButton = document.getElementById( 'go-button' );
const resetButton = document.getElementById('app-reset');

function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

goButton.addEventListener( 'click', (e) => {
  e.preventDefault();
  const url = urlInput.value.trim();
  const rep = parseInt(repInput.value, 10);
  const delay = parseInt(delayInput.value, 10);

  if (!isValidUrl(url)) {
    alert('Please enter a valid http(s) URL.');
    return;
  }
  if (isNaN(rep) || rep < 1 || rep > 100) {
    alert('Repetition must be between 1 and 100.');
    return;
  }
  if (isNaN(delay) || delay < 0 || delay > 10000) {
    alert('Delay must be between 0 and 10000 ms.');
    return;
  }

  chrome.runtime.sendMessage( '', {
    type: 'openNewTab',
    url,
    rep,
    delay
  });
});

resetButton.addEventListener('click', () => {
  urlInput.value = '';
  repInput.value = '';
  delayInput.value = '';
});