function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;

    e = form.elasticity.value;
    g = form.gravity.value;

    ball.style.top = 0 + 'px';
    ball.style.left = 0 + 'px';

    freeFall();
}