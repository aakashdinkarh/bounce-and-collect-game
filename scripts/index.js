overlay.addEventListener('click', function() {
    overlay.remove();
    
    makePlaygroundDisable();
    projectileMotion();
})

assignDefaultValues();

showScoreDots();
// writeFieldCoords();

frameRateText.innerHTML = frameRate;

// document.addEventListener('mousemove', writeMouseCoords);

theme.addEventListener('change', handleThemeChange);

developerModeButton.addEventListener('mousedown', onMouseDown);
developerModeButton.addEventListener('mouseup', onMouseUp);
developerModeCloseButton.addEventListener('click', closeDeveloperModeDiv)
editableStyleTag.addEventListener('keydown', handleKeyDown);

accordions.forEach((accordion) => accordion.addEventListener('click', accordionEventListener))