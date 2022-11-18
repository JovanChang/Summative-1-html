document.getElementById('press').addEventListener('click', Text);

function Text() {
    document.getElementById('hiddenText').innerHTML = 'Wow this paragraph is not hidden anymore';
}