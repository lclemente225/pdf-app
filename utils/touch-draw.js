import { canvasElements } from "../index.js";
const canvas = canvasElements;
const ctx = canvas.getContext('2d');
let isDrawing = false;

function startDrawing(e) {
  isDrawing = true;
  draw(e);
}

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath(); // Start a new path
}

function draw(e) {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';
  
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath(); // Start a new path for next segment
  ctx.moveTo(x, y);
}

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', function(e) {
  e.preventDefault(); // Prevent scrolling on touch devices
  draw(e.touches[0]); // Pass the first touch event
});
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);
//1/28/24 DONT TOUCH THIS YET DO PC TOUCH FIRST