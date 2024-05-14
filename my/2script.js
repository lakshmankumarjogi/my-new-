const steeringImg = document.getElementById('steering-img');
const steeringContainer = document.getElementById('steering-container');

let isDragging = false;

function handleMouseMove(event) {
    if (isDragging) {
        const containerRect = steeringContainer.getBoundingClientRect();
        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + containerRect.height / 2;

        const mouseX = event.clientX - centerX;
        const mouseY = event.clientY - centerY;

        const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        steeringImg.style.transform = `rotate(${angle}deg)`;
    }
}

function handleMouseDown(event) {
    isDragging = true;
    steeringContainer.setPointerCapture(event.pointerId); // Capture pointer to receive events outside the element
}

function handleMouseUp() {
    isDragging = false;
}

steeringContainer.addEventListener('pointermove', handleMouseMove);
steeringContainer.addEventListener('pointerdown', handleMouseDown);
steeringContainer.addEventListener('pointerup', handleMouseUp);
