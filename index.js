  import { handleFileSelect } from './utils/render.js';
  import * as pcDrawFn from './utils/pc-draw.js';
  const { pdfjsLib } = globalThis;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.mjs';
  const {startDrawingPC, stopDrawingPC, drawPC, pcDraw} = pcDrawFn;
  
  const pdfContainer = document.getElementById("pdfContent");
  const canvasElements = pdfContainer.children;//this returns an HTMLCollection[]
  //const { degrees, PDFDocument, StandardFonts, rgb } = PDFLib;

  pdfContainer.addEventListener('change', () => {
    try{
      if(canvasElements){
        
      pcDraw.canvas = canvasElements
      console.log("pcdraw canvas is setting", pcDraw)
      }else{
        console.log("What is happenign oh no")
      }

    }catch(e) {
      console.log("Error!!: ", e)
    }
  })

  //make function to create a square?
  pdfContainer.addEventListener("mousedown",  function(e) {
    for (let i = 0; i < canvasElements.length; i++) {
        const canvas = canvasElements[i];
        //check this function getBoundingClientRect
        const rect = canvas.getBoundingClientRect();
        //canvas.classList.add(`drawing-${i}`)
   
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
            getCursorPosition(canvas, e);
            break; // Break out of the loop once the correct canvas is found
        }
    }
  })  
  
  document.getElementById('pdf-file-input').addEventListener('change', (e) => handleFileSelect(e, pdfContainer, pdfjsLib))

  function getCursorPosition(canvas, event) {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      console.log("canvas", canvas, "x: " + x + " y: " + y)
  }
  
  //this should be an onclick event
  //it creates a canvas where you can sign
  //hopefully
  function relMouseCoords(event){
      var totalOffsetX = 0;
      var totalOffsetY = 0;
      var canvasX = 0;
      var canvasY = 0;
      var currentElement = this;
      console.log("check whop whop")
      do{
          totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
          totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      }
      while(currentElement = currentElement.offsetParent)

          canvasX = event.pageX - totalOffsetX;
          canvasY = event.pageY - totalOffsetY;

      return {x:canvasX, y:canvasY}
  }
  HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

  const saveButton = document.getElementById("save-pdf");
  
  saveButton.addEventListener('click', () => {
    pdfContainer.removeChild(canvasElements[0])
    console.log("removing child", canvasElements, "length: ",canvasElements.length)
  })
  export {canvasElements}
