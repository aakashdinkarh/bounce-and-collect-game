function assignDefaultValues(){
    form.elasticity.value = e;
    form.gravity.value = g;
    form['max-points'].value = maximumPossiblePoints;
    form['play-mode'].value = (((form['play-mode'] || {}).options || [])[0] || {}).value;
}
