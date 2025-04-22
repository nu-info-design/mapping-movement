// Append the CSS file
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '../assets/nav.css';
document.head.appendChild(link);

// Append min-size warning
const w = 1200, h = 600;
const minSizeMessage = document.createElement('div');
minSizeMessage.textContent = `Please resize your browser to at least ${w}px x ${h}px.`;
const minSize = document.createElement('div');
minSize.classList.add('minsize'); // Add the class
minSize.appendChild(minSizeMessage);
document.body.prepend(minSize);

// Create the navigation div
const backLink = document.createElement('a');
backLink.href = '../index.html';
backLink.textContent = '←';
const navDiv = document.createElement('div');
navDiv.appendChild(backLink);
navDiv.classList.add('backLink'); // Add the class
document.body.appendChild(navDiv);

