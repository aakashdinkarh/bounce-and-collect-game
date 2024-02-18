document.querySelector('.overlay.start').addEventListener('click', function(e) {
    this.remove();
    
    makePlaygroundDisable();
    projectileMotion();
});

(function hydratePlayModeOptions(){
    document.getElementsByName('play-mode')[0].innerHTML = PLAY_MODE_OPTIONS.map(getOptionElem).join('');
})();

(function applyInitialFormValues() {
	form.elasticity.value = E;
	form.gravity.value = G;
	form['max-score'].value = MAXIMUM_POSSIBLE_SCORE;
	form['play-mode'].value = PLAY_MODE_OPTIONS[0].value;
})();

showScoreDots();

frameRateText.innerHTML = FRAME_RATE;

theme.addEventListener('change', handleThemeChange);

developerModeButton.addEventListener('mousedown', onMouseDown);
developerModeButton.addEventListener('mouseup', onMouseUp);
developerModeCloseButton.addEventListener('click', closeDeveloperModeDiv)
editableStyleTag.addEventListener('keydown', handleKeyDown);

accordions.forEach((accordion) => accordion.addEventListener('click', accordionEventListener));
