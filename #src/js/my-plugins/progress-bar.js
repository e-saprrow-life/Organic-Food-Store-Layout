function addProgressBarOnAPage() {
    let body = document.querySelector('body');

    function createEl(tagName, className) {
        let el = document.createElement(tagName);
        el.className = className;
        return el;
    };

    // new elements
    let barWrapper = createEl('div', 'progress-bar');
    let barScale = createEl('div', 'progress-bar__scale');

    // Paste elements
    body.append(barWrapper);
    barWrapper.append(barScale);
    barScale.style.width = 0 + '%';
    function changeProgress() {
        barScale.style.width = window.pageYOffset / ((body.scrollHeight - body.clientHeight) / 100) + '%';
    };

    window.addEventListener('scroll', changeProgress);
    window.addEventListener('resize', changeProgress);
};

/* Классы 
----- css:
.progress-bar {}
.progress-bar__scale {}

----- scss:
.progress-bar {
    position: fixed;
    width: 100%;
    top: 0;
    height: 5px;
    background: rgba(100, 200, 200, 0.5);
    &__scale {}
        height: 100%;
        background: #646496;
}
