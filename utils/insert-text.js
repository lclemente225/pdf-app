const pdfContainer = document.getElementById("pdfContent");
const canvasElements = pdfContainer.children;

function getInsertCoords(e){
    for (let i = 0; i < canvasElements.length; i++) {
        const canvas = canvasElements[i];
        const rect = canvas.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          let selectedCanvas = canvas;
          let sigCanvasX = e.clientX - rect.x;
          let sigCanvasY = e.clientY - rect.y;
          let parentCanvasLeft = rect.left;
          let parentCanvasTop = rect.top;
          
          //when you click on the canvas, the addImage method will activate
          //the coords are here
            return {sigCanvasX, sigCanvasY, parentCanvasLeft, parentCanvasTop, selectedCanvas}
        }}
}

function getSignatureBounds(canvas) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  let minX = 5000, minY = 5000, maxX = -5000, maxY = -5000;

  // Scan the image data
  for(let y = 0; y < canvas.height; y++) {
    for(let x = 0; x < canvas.width; x++) {
      const alpha = data[(y * canvas.width + x) * 4 + 3];
      if(alpha > 0) { // If the pixel is not transparent
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }
  // Return the bounds
  return { minX, minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}
      
export {getInsertCoords, getSignatureBounds} 