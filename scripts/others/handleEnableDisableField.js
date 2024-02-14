function updateStatusText({ isWait = true } = {}) {
	if (isWait) {
		statusTextContainer.innerText = 'Please wait...';
		statusTextContainer.className = 'wait';
	} else {
		statusTextContainer.innerHTML = `Throw... ${
			playMode !== 'free_play' ? `<strong style="color: initial" >(${PLAYER_NAME_LABEL_MAPPING[currentSelectedPlayer]})</strong>` : ''
		}`;
		statusTextContainer.className = 'throw';
	}
}

function makePlaygroundDisable() {
	// desktop
	field.removeEventListener('click', moveTheBall);

	field.removeEventListener('mousemove', showDirectionOfThrow);

	field.removeEventListener('mousedown', handleMouseDown);
	field.removeEventListener('mousedown', showDirectionOfThrow);

	field.removeEventListener('mouseup', handleMouseUp);

	// mobile
	field.removeEventListener('touchend', moveTheBall);

	field.removeEventListener('touchmove', showDirectionOfThrow);

	field.removeEventListener('touchstart', handleMouseDown);
	field.removeEventListener('touchstart', showDirectionOfThrow);

	field.removeEventListener('touchend', handleMouseUp);

	field.style.cursor = 'not-allowed';

	isPlaygroundDisabled = true;

	updateStatusText({ isWait: true });
}

function makePlaygroundEnable() {
	if (!isPlaygroundDisabled) {
		updateStatusText({ isWait: false });
		return;
	}

	// desktop
	field.addEventListener('click', moveTheBall);

	field.addEventListener('mousemove', showDirectionOfThrow);

	field.addEventListener('mousedown', handleMouseDown);
	field.addEventListener('mousedown', showDirectionOfThrow);

	field.addEventListener('mouseup', handleMouseUp);

	// mobile
	field.addEventListener('touchmove', showDirectionOfThrow, { passive: false });

	field.addEventListener('touchstart', handleMouseDown, { passive: true });
	field.addEventListener('touchstart', showDirectionOfThrow, { passive: true });

	field.addEventListener('touchend', handleMouseUp, { passive: true });
	field.addEventListener('touchend', moveTheBall, { passive: true });

	field.style.cursor = '';

	isPlaygroundDisabled = false;

	updateStatusText({ isWait: false });
}
