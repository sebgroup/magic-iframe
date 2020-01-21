const magicIframe = document.getElementById('magicIframe');
const eventLogCounter = document.querySelector('#eventLog > h4');
const logOutput = document.getElementById('logOutput');
const activeSource = document.getElementById('activeSource');
let logEntries = [];

function writeToLog(event) {
  if(event.detail.event === 'iframe-loaded') {
    activeSource.innerHTML =`<strong>iframe source:</strong> ${event.target.source}`;
  }
  let detail;
  switch (event.detail.event) {
    case 'iframe-click':
      detail = `clicked: ${event.detail.details.target.toString()}`;
      break;
    case 'iframe-keyup':
      detail =`pressed: ${event.detail.details.key}`;
      break;
    case 'iframe-loaded':
      detail =`${event.target.source}`;
      break;
    case 'iframe-unloaded':
      detail =`${event.detail.details.target.URL}`;
      break;
    default:
      detail = JSON.stringify(event.detail.details);
      break;
  }
  const entry = `<div><strong class="mr-1">${event.detail.event}:</strong><span class="text-white">${detail}</span></div>`;
  logEntries = [entry,...logEntries];
  logOutput.innerHTML = logEntries.join('');
  eventLogCounter.innerText = `Magic iframe event: ${logEntries.length}`
}

function clearLog() {
  logEntries = [];
  logOutput.innerHTML = logEntries.join('');
  eventLogCounter.innerText = `Magic iframe event: ${logEntries.length}`
}

function reloadIframe() {
  magicIframe.reload();
}

magicIframe.addEventListener('magicIframeEvent', ($event) => writeToLog($event));
// magicIframe.styleUrls = ['./css/external-stylesheet.css', './css/fonts.css'];
let src = '/assets/fluid-page.html';
function toggleSource() {
  switch (src) {
    case '/assets/fluid-page.html':
      src = '/assets/fixed-width-page.html';
      break;
    case '/assets/fixed-width-page.html':
      src = '/assets/responsive-page.html';
      break;
    case '/assets/responsive-page.html':
      src = 'http://seb.se';
      break;
    case 'http://seb.se':
      src = '/assets/fluid-page.html';
      break;
  }
  magicIframe.source = src;
}


const inlineStylesCheckbox = document.getElementById('inlineStyle_checkbox');
inlineStylesCheckbox.checked = true;
function toggleInlineStyles() {
  magicIframe.styles =  magicIframe.styles === 'body { background: white; margin: 0 auto; }' ? '': 'body { background: white; margin: 0 auto; }';
}

const styleUrlsCheckbox = document.getElementById('externalStyle_checkbox');
styleUrlsCheckbox.checked = true;
let styleUrls = styleUrlsCheckbox.checked;
function toggleStyles() {
  magicIframe.styleUrls = styleUrls ? ['./css/external-stylesheet.css', './css/fonts.css'] : [];
  styleUrls = !styleUrls;
}

const autoResizeCheckbox = document.getElementById('autoResize_checkbox');
autoResizeCheckbox.checked = true;
function toggleAutoResize() {
  magicIframe.autoResize = !magicIframe.autoResize;
}

const scaleContentCheckbox = document.getElementById('scaleContent_checkbox');
scaleContentCheckbox.checked = true;
function toggleScaleContent() {
  magicIframe.scaleContent = !magicIframe.scaleContent;
}

const resizeDebounceMillis_input = document.getElementById('resizeDebounceMillis_input');
resizeDebounceMillis_input.value = 0;
function updateResizeDebounce() {
  magicIframe.resizeDebounce = resizeDebounceMillis_input.value;
}

const scaleDebounceMillis_input = document.getElementById('scaleDebounceMillis_input');
scaleDebounceMillis_input.value = 0;
function updateScaleDebounce() {
  magicIframe.scaleDebounce = scaleDebounceMillis_input.value;
}
const matchContentWidthRadioButtons = document.getElementsByName('matchContentWidth');
matchContentWidthRadioButtons[0].checked = true;

function changeMatchContentWidth() {
  const value = Array.from(matchContentWidthRadioButtons).find(radio => radio.checked).value;
  magicIframe.matchContentWidth = value === "'auto'" ? 'auto' : value === 'true';
}

function injectMaliciousScript() {
  magicIframe.source = 'jAvasCrIPT:alert(document.domain)';
}

toggleAutoResize();
toggleScaleContent();
toggleInlineStyles();
toggleStyles();
