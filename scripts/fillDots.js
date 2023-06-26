const dotWidth = 10;
const dotHeight = 20;

function fillDots(){
    const [totalHeight, totalWidth] = [field.clientHeight, field.clientWidth];

    const fragment = document.createDocumentFragment();

    const totalNumberOfDots = (Math.floor(totalWidth / dotWidth) * Math.floor(totalHeight / dotHeight));
    for(let i = 0; i < totalNumberOfDots; i++){
        const dot = document.createElement('div');
        dot.innerHTML = '. ';
        dot.style.cssText = `
            display: inline-block;
            height: 20px;
            margin: 0 3px;
        `;
        fragment.append(dot);
    }
    field.append(fragment);
}
