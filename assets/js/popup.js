const url = document.getElementById('url');
const rep = document.getElementById('repetition');
const goButton = document.getElementById('go-button');
const reset = document.getElementById('app-reset');

goButton.addEventListener('click', () => {
  chrome.runtime.sendMessage( '', {
    type: 'openNewTab',
    url: url.value,
    rep: rep.value
  });
});

reset.addEventListener('click', () => {
  url.value = '';
  rep.value = 0;
});