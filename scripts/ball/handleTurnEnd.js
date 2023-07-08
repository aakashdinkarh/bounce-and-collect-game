function handleTurnEnd(){
            
    highestScore = Math.max(currentScore, highestScore);
    updateHighestScore(highestScore);

    if(isPlaygroundDisabled){
        isPlaygroundDisabled = false;
        makePlaygroundEnable();
    }

    handlePlayModeChange(true);
}