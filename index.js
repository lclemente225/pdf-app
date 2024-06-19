  import { handleFileSelect } from './utils/render.js';
  import * as pcDrawFn from './utils/pc-draw.js';
  import {saveCanvasToPDF} from './utils/save-file.js';
  import canvasElementsFiltered from './utils/canvas-filter-array.js';
  import { getInsertCoords } from './utils/insert-text.js';
  const { pdfjsLib } = globalThis;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.mjs';
  const {startDrawingPC, stopDrawingPC, drawPC, deleteDrawing} = pcDrawFn;
  const fileUploadInput = document.getElementById('pdf-file-input');
  const saveButton = document.getElementById("save-pdf");
  const pdfContainer = document.getElementById("pdfContent");
  let canvasElements = pdfContainer.children;//this returns an HTMLCollection[]

  let openModalButton = document.getElementById("open-modal-signature");
  let modal = document.getElementsByClassName("signing-modal")[0];
  let closeModalButton = document.getElementsByClassName("close-modal")[0];
  let signatureCanvas = document.getElementById("signature-canvas");
  let clearSignature = document.getElementById("clear-signature");


  openModalButton.addEventListener("click", (e) => {
    modal.classList.add("signing")
  })

  closeModalButton.addEventListener("click", () => {
    modal.classList.remove("signing")
  })

  clearSignature.addEventListener("click", () => deleteDrawing(signatureCanvas))

  signatureCanvas.addEventListener("mousedown", (e) => {
    let drawOnThisCanvas = signatureCanvas;
    startDrawingPC(e, drawOnThisCanvas)
  })
  
  signatureCanvas.addEventListener("mousemove", (e) => drawPC(e, signatureCanvas))

  signatureCanvas.addEventListener("mouseup", (e) => stopDrawingPC(e, signatureCanvas))

  signatureCanvas.addEventListener("mouseleave", (e) => stopDrawingPC(e, signatureCanvas))

pdfContainer.addEventListener("click",(e) => {
  let {canvasX, canvasY, selectedCanvas} = getInsertCoords(e);
 // pdf.addHTML(selectedCanvas, 300, 300)
    const ctx = selectedCanvas.getContext('2d');
    const sigCtx = signatureCanvas.getContext('2d');
    console.log(sigCtx.canvas)
    let sigH = sigCtx.canvas.height;
    let sigW = sigCtx.canvas.width;
    const sigImgData = sigCtx.getImageData(0, 0, sigW, sigH)
    ctx.putImageData(sigImgData, canvasX, canvasY);


    //210 297
    

//DELETE last page before saving
//because it's empty
 //selectedCanvas.addImage(signatureCanvas, 'JPEG', canvasX, canvasY, 300, 150 )


})   

  // file upload and save functions  
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
