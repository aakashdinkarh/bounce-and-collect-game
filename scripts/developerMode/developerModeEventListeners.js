const prefillCss = `
    @keyframes spinBall {
        0% {
            width: 0;
            height: 0;
            left: 20px;
            top: 20px;
            box-shadow: 0 0 10px 20px blue;
        }
        50% {
            transform: rotate(360deg) ;
            width: 40px;
            height: 40px;
            left: 0;
            top: 0;
            box-shadow: 0 0 40px 20px red;
        }
        100% {
            width: 0;
            height: 0;
            left: 20px;
            top: 20px;
            box-shadow: 0 0 10px 20px blue;
        }
    }

    @keyframes chasBoojh {
        0% {
            background-color: yellow;
        }
        50% {
            background-color: black;
        }
        100% {
            background-color: yellow;
        }
    }

    #field {
        animation: chasBoojh 1s linear infinite ;
    }

    #ball img {
        animation: spinBall 1s linear infinite ;
    }
`;

const sampelCss = `
    .developer-mode > style {
        background-color: #e2e2e2;
    }
`;

let longClickTimer;

function onMouseDown(){
    longClickTimer = setTimeout(() => {
        clearTimeout(longClickTimer);
        developerModeDiv.classList.add('show');
    }, 3000)
}

function onMouseUp(){
    clearTimeout(longClickTimer);
}

function closeDeveloperModeDiv(){
    developerModeDiv.classList.remove('show');
}

function handleThemeChange(e){
    const isChecked = e.target.checked;
    const editableStyleTag = developerModeDiv.querySelector('style');

    if(isChecked){
        editableStyleTag.textContent = prefillCss;
    } else {
        editableStyleTag.textContent = sampelCss;
    }
}

function insertCustomChar(char) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    const textNode = document.createTextNode(char);

    range.insertNode(textNode);

    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
}

function handleKeyDown(event){
    if (event.key === 'Enter') {
        event.preventDefault();
        insertCustomChar('\n');
    } else if (event.key === 'Tab'){
        event.preventDefault();
        insertCustomChar('\t');
    }
}
