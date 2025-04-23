function isGitHubPages() {
  const path = window.location.pathname;
  const dir = path.split('/');
  if (dir[1] === "mapping-migration") return true
  else return false
}

function getRelativeRoot() {
  const path = window.location.pathname;
  const depth = path.split('/').length - 2; // directory depth
  let relativeRoot = '';
  if (isGitHubPages()) depth--
  for (let i = 0; i < depth; i++) {
    relativeRoot += '../';
  }
  return relativeRoot;
}

function isHomePage() {
    const path = window.location.pathname;
    const dir = path.split('/');
    const depth = path.split('/').length - 2;
    if (depth === 0 || dir[1] === "mapping-movement") {
        return true
    } else {
        return false
    }
}

// Append the CSS file
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = getRelativeRoot() + 'assets/nav.css';
document.head.appendChild(link);

// Append min-size warning
const minWidth = 1200, minHeight = 600;
const minSizeMessage = document.createElement('div');
minSizeMessage.textContent = `Please resize your browser to at least ${minWidth}px x ${minHeight}px.`;
const minSize = document.createElement('div');
minSize.classList.add('minsize'); // Add the class
minSize.appendChild(minSizeMessage);
document.body.prepend(minSize);

// Create the navigation div for subdirectories
if (!isHomePage()) {
    const backLink = document.createElement('a');
    backLink.href = getRelativeRoot() + 'index.html';
    backLink.textContent = '←';
    const navDiv = document.createElement('div');
    navDiv.appendChild(backLink);
    navDiv.classList.add('backLink'); // Add the class
    document.body.appendChild(navDiv);
}


