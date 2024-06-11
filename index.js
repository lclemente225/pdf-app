  import { handleFileSelect } from './utils/render.js';
  import * as pcDrawFn from './utils/pc-draw.js';
  import {saveCanvasToPDF} from './utils/save-file.js';
  import canvasElementsFiltered from './utils/canvas-filter-array.js';
  const { pdfjsLib } = globalThis;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.mjs';
  const {startDrawingPC, stopDrawingPC, drawPC, openModalHandler} = pcDrawFn;
  const fileUploadInput = document.getElementById('pdf-file-input');
  const saveButton = document.getElementById("save-pdf");
  const pdfContainer = document.getElementById("pdfContent");
  let canvasElements = pdfContainer.children;//this returns an HTMLCollection[]

  let openModalButton = document.getElementById("open-modal-signature");
  let modal = document.getElementsByClassName("signing-modal")[0];
  let closeModalButton = document.getElementsByClassName("close-modal")[0];

  function moveMoveHandler(e, drawOnThisCanvas, canvasIndex){
    return startDrawingPC(e, drawOnThisCanvas, canvasIndex)
  }
  openModalButton.addEventListener("click", () => {
    modal.classList.add("signing")
  })

  closeModalButton.addEventListener("click", () => {
    modal.classList.remove("signing")
  })
  //make function to create a square?
/*   

tHIS IS INITIAL ATTEMPT
when you click, you shoudl make a canvas and draw on it
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
          drawOnThisCanvas = canvas
            break; // Break out of the loop once the correct canvas is found
        }
    }

    pdfContainer.addEventListener("mousemove", moveMoveHandler(e, drawOnThisCanvas, canvasIndex))
  })  
 */
 /*  pdfContainer.addEventListener("mouseup", () => {
    stopDrawingPC()
    pdfContainer.removeEventListener("mousemove", moveMoveHandler)
  }) */
  
  fileUploadInput.addEventListener('change', (e) => {
      handleFileSelect(e, pdfContainer, pdfjsLib)
  })
  
  saveButton.addEventListener('click', () => { 
    let filteredCanvasElements = canvasElementsFiltered(canvasElements)
    let canvas = filteredCanvasElements[0].getBoundingClientRect();
    let widthInPixels = canvas.width;
    let heightInPixels = canvas.height;
    /* let dpi = 300;
    let widthInInches = widthInPixels / dpi;
    let heightInInches = heightInPixels / dpi;
    let widthInPoints = widthInInches * 120;
    let heightInPoints = heightInInches * 120; */
    saveCanvasToPDF(filteredCanvasElements, widthInPixels, heightInPixels);
  })


  //todo ideas
  //can add function to resize scale when the window changes.
  export {canvasElementsFiltered, canvasElements}
