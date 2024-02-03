const pcDraw = {
    canvas: null,
    isDrawing: false,
    ctx: null
}
let { canvas, isDrawing, ctx } = pcDraw


if( canvas ){
     ctx = pcDraw.canvas.getContext('2d')
     canvas.addEventListener('mousedown', startDrawingPC);
     canvas.addEventListener('mousemove', drawPC);
     canvas.addEventListener('mouseup', stopDrawingPC);
     canvas.addEventListener('mouseout', stopDrawingPC);
     console.log(pcDraw)
}

function startDrawingPC(e) {
  isDrawing = true;
  draw(e);
}

function stopDrawingPC() {
  isDrawing = false;
  ctx.beginPath(); // Start a new path
}

function drawPC(e, canvas) {
  if (!isDrawing) return;
  const x = e.clientX - canvas.offsetLeft;
  const y = e.clientY - canvas.offsetTop;
  
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = '#000';
  
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath(); // Start a new path for next segment
  ctx.moveTo(x, y);
}


export {startDrawingPC, stopDrawingPC, drawPC, pcDraw}