function toast(text = '', bgColor = ''){
    const div = document.createElement('div');
    div.className = 'alert-popover';
    div.style.backgroundColor = bgColor;
    div.innerHTML = text;

    document.body.append(div);

    setTimeout(() => div.remove(), 3000);
}
