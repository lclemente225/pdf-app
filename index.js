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
  let signatureCanvas = document.getElementById("signature-canvas");
  let insertSignature = document.getElementById("insert-signature");
  let signatureCanvasInsert;

  function moveMoveHandler(e, drawOnThisCanvas, canvasIndex){
    return startDrawingPC(e, drawOnThisCanvas, canvasIndex)
  }

  openModalButton.addEventListener("click", (e) => {
    modal.classList.add("signing")
  })

  closeModalButton.addEventListener("click", () => {
    modal.classList.remove("signing")
  })

  insertSignature.addEventListener("click", () => {
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
    modal.classList.remove("signing")
  })


  signatureCanvas.addEventListener("mousedown", (e) => {
    let drawOnThisCanvas = signatureCanvas;
    let canvasIndex = drawOnThisCanvas.classList;
    signatureCanvas.addEventListener("mousemove", moveMoveHandler(e, drawOnThisCanvas, canvasIndex))
  })

  signatureCanvas.addEventListener("mouseup", () => {
    stopDrawingPC()
    signatureCanvas.removeEventListener("mousemove", moveMoveHandler)
  })
  //make function to create a square?

  pdfContainer.addEventListener("click",  function(e) {
    let selectedCanvas;
    let canvasIndex;
    let filteredCanvasElements = canvasElements
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
          selectedCanvas = canvas
          let mouseX = e.clientX - rect.x;
          let mouseY = e.clientY - rect.y;
          
          //when you click on the canvas, the addImage method will activate
          //the coords are here


            break; // Break out of the loop once the correct canvas is found
        }}
      /*
      1. give selectedCanvas and x and y to addimage function
        
      --> need to make a function to store image
      */
    })
  
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
