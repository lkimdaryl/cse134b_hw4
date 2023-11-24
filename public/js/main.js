document.addEventListener('DOMContentLoaded', function () {
    mouseGlow();
});

function mouseGlow(){
    const glow = document.getElementById('glow');

    document.addEventListener('mousemove', (e) => {
        const x = e.pageX;
        const y = e.pageY;

        glow.style.left = `${x}px`;
        glow.style.top = `${y}px`;

        glow.style.display = 'block';
    });
}