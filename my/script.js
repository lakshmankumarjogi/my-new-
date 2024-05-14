const steeringImg = document.getElementById('steering-img');
const steeringContainer = document.getElementById('steering-container');

let isDragging = false;

function rotateSteeringTo(targetAngle) {
    steeringImg.style.transition = 'transform 0.5s ease';
    steeringImg.style.transform = `rotate(${targetAngle}deg)`;

    setTimeout(() => {
        steeringImg.style.transition = 'none';
    }, 500);
}

function handleDragStart(event) {
    event.preventDefault();
    isDragging = true;
}

function handleDragMove(event) {
    if (isDragging) {
        const centerX = steeringContainer.offsetWidth / 2;
        const centerY = steeringContainer.offsetHeight / 2;
        let mouseX, mouseY;

        if (event.type === 'touchmove') {
            mouseX = event.touches[0].clientX - centerX;
            mouseY = event.touches[0].clientY - centerY;
        } else {
            mouseX = event.clientX - centerX;
            mouseY = event.clientY - centerY;
        }

        const targetAngle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

        rotateSteeringTo(targetAngle);
    }
}

function handleDragEnd(event) {
    if (isDragging) {
        isDragging = false;
    }
}

steeringImg.addEventListener('mousedown', handleDragStart);
document.addEventListener('mousemove', handleDragMove);
document.addEventListener('mouseup', handleDragEnd);

steeringImg.addEventListener('touchstart', (event) => {
    handleDragStart(event.touches[0]);
});
document.addEventListener('touchmove', handleDragMove);
document.addEventListener('touchend', handleDragEnd);
