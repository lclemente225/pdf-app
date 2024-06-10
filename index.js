  import { handleFileSelect } from './utils/render.js';
  import * as pcDrawFn from './utils/pc-draw.js';
  import {saveCanvasToPDF} from './utils/save-file.js';
  const { pdfjsLib } = globalThis;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.mjs';
  const {startDrawingPC, stopDrawingPC, drawPC, pcDraw} = pcDrawFn;
  const fileUploadInput = document.getElementById('pdf-file-input');
  const saveButton = document.getElementById("save-pdf");
  const pdfContainer = document.getElementById("pdfContent");
  let canvasElements = pdfContainer.children;//this returns an HTMLCollection[]

  function canvasElementsFiltered(htmlCollection){
    let canvasElementsArray = Array.from(htmlCollection);
    let canvasElementsFilter = canvasElementsArray.filter((element) => {
      let pageNumSelect = Array.from(element.classList).includes("page-number");
      return !pageNumSelect
    })
    return canvasElementsFilter
  }


  //make function to create a square?
  pdfContainer.addEventListener("mousedown",  function(e) {
    let drawOnThisCanvas;
    let canvasIndex;
    let filteredCanvasElements = canvasElementsFiltered(canvasElements)
    for (let i = 0; i < filteredCanvasElements.length; i++) {
        const canvas = filteredCanvasElements[i];
        //getBoundingClientRect obtains properties of the canvas (e.g. width, height)
        const rect = canvas.getBoundingClientRect();
        //canvas.classList.add(`drawing-${i}`)
   
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          canvasIndex = e.target.classList[1];
          //put width height and border color on canvas index 
          drawOnThisCanvas = canvas
            //getCursorPosition(canvas, e);
            break; // Break out of the loop once the correct canvas is found
        }
    }

    startDrawingPC(e, drawOnThisCanvas, canvasIndex, e.clientX, e.clientY) 
  })  
  
  fileUploadInput.addEventListener('change', (e) => {
      handleFileSelect(e, pdfContainer, pdfjsLib)
  })
  
  saveButton.addEventListener('click', () => { 
    let filteredCanvasElements = canvasElementsFiltered(canvasElements)
    console.log("save canvaserlemtns",filteredCanvasElements)
    let canvas = filteredCanvasElements[0].getBoundingClientRect();
    let widthInPixels = canvas.width;
    let heightInPixels = canvas.height;
    let dpi = 300;
    let widthInInches = widthInPixels / dpi;
    let heightInInches = heightInPixels / dpi;
    let widthInPoints = widthInInches * 120;
    let heightInPoints = heightInInches * 120;
    saveCanvasToPDF(filteredCanvasElements, widthInPixels, heightInPixels);
  })

  
  //this should be an onclick event
  //it creates a canvas where you can sign
  //hopefully
 /*  function relMouseCoords(event){
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
  HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords; */

  //todo ideas
  //can add function to resize scale when the window changes.
  export {canvasElementsFiltered, canvasElements}
