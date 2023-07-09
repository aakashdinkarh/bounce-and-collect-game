overlay.addEventListener('click', function() {
    overlay.remove();
    projectileMotion();
})

assignDefaultValues();

// writeFieldCoords();

frameRateText.innerHTML = frameRate;

// document.addEventListener('mousemove', writeMouseCoords);

makePlaygroundEnable();

theme.addEventListener('change', handleThemeChange);

developerModeButton.addEventListener('mousedown', onMouseDown);
developerModeButton.addEventListener('mouseup', onMouseUp);
developerModeCloseButton.addEventListener('click', closeDeveloperModeDiv)
editableStyleTag.addEventListener('keydown', handleKeyDown);
