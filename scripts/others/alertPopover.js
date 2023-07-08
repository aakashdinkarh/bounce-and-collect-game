function alertPopover(text = '', className = ''){
    const div = document.createElement('div');
    div.className = 'alert-popover' + ' ' + className;
    div.innerHTML = text;

    document.body.append(div);

    setTimeout(() => div.remove(), 3000);
}
