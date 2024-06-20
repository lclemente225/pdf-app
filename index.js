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
  let insertSignatureCheckbox = document.getElementById("insert-signature");
  let insertSignatureState = false;
  let signatureArray = []

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
  if(insertSignatureState){
    let {canvasX, canvasY, selectedCanvas} = getInsertCoords(e);
    console.log("this is the target", e)
    const ctx = selectedCanvas.getContext('2d');
    const sigCtx = signatureCanvas.getContext('2d');
    let sigH = sigCtx.canvas.height;
    let sigW = sigCtx.canvas.width;
    sigCtx.fillStyle = "rgba(100,100,200,1)";
    sigCtx.shadowColor = "rgba(100,100,200,1)";
    signatureArray.push({
      id: signatureArray.length+1,
      canvas: signatureCanvas
    })
    for(let canvas of signatureArray){
      const sigImgData = sigCtx.getImageData(0, 0, sigW, sigH)
      ctx.putImageData(sigImgData, canvasX, canvasY);

    }
  } else {
    console.log("target", e)
    return
  }
  

})   

insertSignatureCheckbox.addEventListener("click", (e) => insertSignatureState = e.target.checked)

  // file upload and save functions  
  fileUploadInput.addEventListener('change', (e) => {
      handleFileSelect(e, pdfContainer, pdfjsLib)
  })
  
  saveButton.addEventListener('click', () => { 
    let filteredCanvasElements = canvasElementsFiltered(canvasElements)
    let canvas = filteredCanvasElements[0].getBoundingClientRect();
    let signatureCtx = signatureCanvas.getContext('2d');
    console.log("saving sig", signatureCtx)
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
