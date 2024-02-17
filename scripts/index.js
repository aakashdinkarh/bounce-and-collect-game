document.querySelector('.overlay.start').addEventListener('click', function(e) {
    this.remove();
    
    makePlaygroundDisable();
    projectileMotion();
});

(function hydratePlayModeOptions(){
    document.getElementsByName('play-mode')[0].innerHTML = PLAY_MODE_OPTIONS.map(({ label, value }) => `<option label='${label}' value='${value}' ></option>`).join('');
})();

assignDefaultValues();

showScoreDots();

frameRateText.innerHTML = frameRate;

theme.addEventListener('change', handleThemeChange);

developerModeButton.addEventListener('mousedown', onMouseDown);
developerModeButton.addEventListener('mouseup', onMouseUp);
developerModeCloseButton.addEventListener('click', closeDeveloperModeDiv)
editableStyleTag.addEventListener('keydown', handleKeyDown);

accordions.forEach((accordion) => accordion.addEventListener('click', accordionEventListener));
