//import {text} from 'pdf-lib'
const pdfContainer = document.getElementById("pdfContent");
const canvasElements = pdfContainer.children;
const signatureCanvas  = document.getElementById("signature-canvas");

/*
grab signature and put it in the pdf
*/

let insertingSig = false;

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
          let canvasX = e.clientX - rect.x;
          let canvasY = e.clientY - rect.y;
          
          //when you click on the canvas, the addImage method will activate
          //the coords are here
            return {canvasX, canvasY, selectedCanvas}

//            break; // Break out of the loop once the correct canvas is found
        }}
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
      
export {getInsertCoords} 