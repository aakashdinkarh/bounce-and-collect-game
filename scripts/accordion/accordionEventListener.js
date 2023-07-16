function accordionEventListener() {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    const container = this.parentElement;

    const isNestedPanel = panel.classList.contains('nested');

    if (isNestedPanel) {
        const containerMaxHeight = Array.from(container.children).reduce((prev, childNode) => prev + childNode.scrollHeight || 0, 0);
        container.style.maxHeight = containerMaxHeight + 'px';
    } else {
        container.style.maxHeight = container.scrollHeight + 'px';
    }

    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        panel.style.maxHeight = panel.scrollHeight + 'px';
    }

    // Close other open panels in the same container
    const otherPanels = container.getElementsByClassName('panel');
    Array.from(otherPanels).forEach((otherPanel) => {
        if (otherPanel !== panel) {
            otherPanel.style.maxHeight = null;
            otherPanel.previousElementSibling.classList.remove('active');
        }
    });
}