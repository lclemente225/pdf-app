//import {text} from 'pdf-lib'
const pdfContainer = document.getElementById("pdfContent");
const canvasElements = pdfContainer.children;

function getInsertCoords(e){
    for (let i = 0; i < canvasElements.length; i++) {
        const canvas = canvasElements[i];
        const rect = canvas.getBoundingClientRect();
        //console.log("this is the parent canvas: ", rect)
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
          console.log("checking parent canvas position", parentCanvasLeft, parentCanvasTop)
          
          //when you click on the canvas, the addImage method will activate
          //the coords are here
            return {sigCanvasX, sigCanvasY, parentCanvasLeft, parentCanvasTop, selectedCanvas}

//            break; // Break out of the loop once the correct canvas is found
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



      /*  let signaturePDF = new jsPDF();
       let signatureImage = signatureCanvas.toDataUrl('image/jpeg'); */
       //combinedPDF.addImage(signatureImage, 'JPEG', 0, 0, 210, 297);
   
       /*
       1. create image from signature
       2. make variable of the selected canvas
       3. when you click on it, make check -> "insert sig here?"
         -> provide canvas element info and x and y of click
       4. grab signature canvas image and addImage to canvas element
   
       roadblock:
       - how do i select the correct canvas?
   
       */
      
export {getInsertCoords, getSignatureBounds} 