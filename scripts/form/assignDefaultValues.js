function assignDefaultValues(){
    form.elasticity.value = e;
    form.gravity.value = g;
    form['max-score'].value = maximumPossibleScore;
    form['play-mode'].value = (((form['play-mode'] || {}).options || [])[0] || {}).value;
}
