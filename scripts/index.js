document.querySelector('.overlay.start').addEventListener('click', function(e) {
    this.remove();
    
    makePlaygroundDisable();
    projectileMotion();
})

assignDefaultValues();

showScoreDots();

frameRateText.innerHTML = frameRate;

theme.addEventListener('change', handleThemeChange);

developerModeButton.addEventListener('mousedown', onMouseDown);
developerModeButton.addEventListener('mouseup', onMouseUp);
developerModeCloseButton.addEventListener('click', closeDeveloperModeDiv)
editableStyleTag.addEventListener('keydown', handleKeyDown);

accordions.forEach((accordion) => accordion.addEventListener('click', accordionEventListener));
