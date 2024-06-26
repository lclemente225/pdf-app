  import { handleFileSelect } from './utils/render.js';
  import * as pcDrawFn from './utils/pc-draw.js';
  import {saveCanvasToPDF} from './utils/save-file.js';
  import canvasElementsFiltered from './utils/canvas-filter-array.js';
  import { getInsertCoords,getSignatureBounds } from './utils/insert-text.js';
  import { isMouseInSig } from './utils/move-sig.js';
  const { pdfjsLib } = globalThis;
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.379/pdf.worker.mjs';
  const {startDrawingPC, stopDrawingPC, drawPC, deleteDrawing, clearSig, startDrawingTouch, stopDrawingTouch, drawTouch} = pcDrawFn;
  const fileUploadInput = document.getElementById('pdf-file-input');
  const saveButton = document.getElementById("save-pdf");
  let contentBody = document.getElementsByClassName("main-body")[0];
  const pdfContainer = document.getElementById("pdfContent");
  let canvasElements = pdfContainer.children;//this returns an HTMLCollection[]

  let openModalButton = document.getElementById("open-modal-signature");
  let modal = document.getElementsByClassName("signing-modal")[0];
  let closeModalButton = document.getElementsByClassName("close-modal")[0];
  let signatureCanvas = document.getElementById("signature-canvas");
  let clearSignature = document.getElementById("clear-signature");
  let insertSignatureCheckbox = document.getElementById("insert-signature");
  let undoSignature = document.getElementById("undo-signature");
  let insertSignatureState = false;
  let signatureArray = [];
  let sigScale = 0.9;


  openModalButton.addEventListener("click", (e) => {
    document.body.classList.add('lock-screen');
    modal.classList.add("signing")
  })

  closeModalButton.addEventListener("click", () => {
    document.body.classList.remove('lock-screen');
    modal.classList.remove("signing")
  })

  clearSignature.addEventListener("click", () => clearSig(signatureCanvas))

  signatureCanvas.addEventListener("mousedown", (e) => {
    let drawOnThisCanvas = signatureCanvas;
    startDrawingPC(e, drawOnThisCanvas)
  })
  
  signatureCanvas.addEventListener("mousemove", (e) => drawPC(e, signatureCanvas))

  signatureCanvas.addEventListener("mouseup", (e) => stopDrawingPC(e, signatureCanvas))

  signatureCanvas.addEventListener("mouseleave", (e) => stopDrawingPC(e, signatureCanvas))

  pdfContainer.addEventListener("click",(e) => {
    if(insertSignatureState){
      let {sigCanvasX, sigCanvasY, parentCanvasLeft, parentCanvasTop, selectedCanvas} = getInsertCoords(e);
      const ctx = selectedCanvas.getContext('2d');
      let locationScaleX = 0.5;
      let locationScaleY = 0.75;

      const bounds = getSignatureBounds(signatureCanvas);
      const croppedCanvas = document.createElement('canvas');
      croppedCanvas.classList.add("signature-on-pdf");
      croppedCanvas.width = bounds.width;
      croppedCanvas.height = bounds.height;
      const croppedCtx = croppedCanvas.getContext('2d');
      
      console.log("insertsig scale: ", e.view.innerWidth ,selectedCanvas.width, e.view.innerWidth/selectedCanvas.width)
      //sigScale = e.view.innerWidth/selectedCanvas.width;
      if(e.view.innerWidth > 760 && e.view.innerWidth < 1400){
        sigScale = 0.6;
        locationScaleX = 0.4;
      } else if (e.view.innerWidth <= 760 ){
        sigScale = 0.7;
        locationScaleX = 0.6;
      }
      croppedCtx.scale(sigScale,sigScale)
      croppedCtx.drawImage(signatureCanvas, bounds.minX, bounds.minY, bounds.width, bounds.height, 0, 0, bounds.width*sigScale, bounds.height*sigScale);
      
      signatureArray.push({
          id: signatureArray.length+1,
          parentCanvas: selectedCanvas,
          canvasElementContext: croppedCtx,
          width: croppedCanvas.width,
          height: croppedCanvas.height,
          x: sigCanvasX + parentCanvasLeft - croppedCanvas.height*locationScaleX,
          y: sigCanvasY + parentCanvasTop,
          sigPlacementX:sigCanvasX-(croppedCanvas.height*locationScaleX),
          sigPlacementY: sigCanvasY-(croppedCanvas.height*locationScaleY*sigScale),
          imageData: ctx.getImageData(0,0,selectedCanvas.width,selectedCanvas.height) 
      })
      //canvas, source x-location, source y-location, width, height
      //destination x-location, destination y-location, destination width, destination height
      //destination x and y location are like that to make sure that the signature will appear right above the mouse for easy placement
//+25, -29
      ctx.drawImage(croppedCanvas, 0, 0, croppedCanvas.width, croppedCanvas.height, 
        (sigCanvasX-(croppedCanvas.height*locationScaleX*sigScale)), (sigCanvasY-(croppedCanvas.height*locationScaleY*sigScale)), croppedCanvas.width*sigScale, croppedCanvas.height*sigScale);
      
    } else {
      console.log("target not found beep boop")
      return
    }
  })   

  undoSignature.addEventListener("click", () => {
    let prevPdfImg = signatureArray[signatureArray.length-1]["imageData"];
    let removedSig = signatureArray.pop();
    let parentCanvas = removedSig.parentCanvas;
    let parentCanvasCtx = parentCanvas.getContext('2d');

    parentCanvasCtx.putImageData(prevPdfImg, 0, 0)

  })

  /* for moving signature */
  function selectSigCanvas (e){
    e.preventDefault();
    let startX = e.clientX;
    let startY = e.clientY;
    for(let signature of signatureArray){
      
      if(isMouseInSig(startX, startY, signature)){
        //console.log("true")
      } else {
        //console.log("false")
      }
      
    }
  }

  window.document.addEventListener('DOMContentLoaded', () => {
    
 /* let signingLine = document.createElement('span');
  signingLine.style.borderTop= '1px solid black';
  signingLine.style.position = 'absolute';
  signingLine.innerText='Insert Signature Above';
  
  pdfContainer.addEventListener("mousemove", (e) => {
    selectSigCanvas(e);
    signingLine.style.top = `${e.clientY - 25}`; //screenXY
    signingLine.style.left = `${e.clientX - 20} `;
    contentBody.appendChild(signingLine);

  })
  //

   insertSignatureCheckbox.addEventListener("click", (e) => {
    insertSignatureState = e.target.checked;
    if(e.target.checked){
      signingLine.style.display = 'inline-block';
    } else {
      signingLine.style.display = 'none';
    } 
  })*/
  })

  insertSignatureCheckbox.addEventListener("click", (e) => {
    insertSignatureState = e.target.checked;
  })
    // file upload and save functions  
  fileUploadInput.addEventListener('change', (e) => {
        handleFileSelect(e, pdfContainer, pdfjsLib)
  })
  
  saveButton.addEventListener('click', () => { 
    let filteredCanvasElements = canvasElementsFiltered(canvasElements)
    let canvas = filteredCanvasElements[0].getBoundingClientRect();
    let signatureCtx = signatureCanvas.getContext('2d');
    let widthInPixels = canvas.width;
    let heightInPixels = canvas.height;
    /* let dpi = 300;
    let widthInInches = widthInPixels / dpi;
    let heightInInches = heightInPixels / dpi;
    let widthInPoints = widthInInches * 120;
    let heightInPoints = heightInInches * 120; */
    saveCanvasToPDF(filteredCanvasElements, widthInPixels, heightInPixels);
  })


  /*
  Touch Screen Functionality
  */
 
  signatureCanvas.ontouchstart = (e) => {
    let drawOnThisCanvas = signatureCanvas;
    startDrawingTouch(e, drawOnThisCanvas)
  }
  
  signatureCanvas.ontouchmove = (e) => {
    drawTouch(e, signatureCanvas)}

  signatureCanvas.ontouchend = (e) => {
    stopDrawingTouch(e, signatureCanvas)}

  signatureCanvas.ontouchcancel = (e) =>stopDrawingTouch(e, signatureCanvas)


  //todo ideas
  //can add function to resize scale when the window changes.
  export {canvasElementsFiltered, canvasElements }
