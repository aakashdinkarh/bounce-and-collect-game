function fillDots(){
    const [totalHeight, totalWidth] = [field.clientHeight, field.clientWidth];

    const fragement = document.createDocumentFragment();

    const totalNumberOfDots = (Math.floor(totalWidth /10) * Math.floor(totalHeight / 20));
    for(let i = 0; i < totalNumberOfDots; i++){
        const dot = document.createElement('div');
        dot.innerHTML = '. ';
        dot.style.cssText = `
            display: inline-block;
            height: 20px;
            margin: 0 3px;
        `;
        fragement.append(dot);
    }
    field.append(fragement);
}