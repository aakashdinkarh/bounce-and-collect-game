function clearScoreDots(){
    const scoreDots = document.querySelectorAll('.score-point-dot');

    scoreDots.forEach((scoreDot) => scoreDot.remove());
}
