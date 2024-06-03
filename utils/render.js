import { canvasElements } from "../index.js";
import { pcDraw } from './pc-draw.js';

function handleFileSelect(event, container, library) {
    const fileInput = event.target;
    const files = fileInput.files;

    if (files.length > 0) {
      const pdfFile = files[0];

      // Check if the selected file is a PDF
      if (pdfFile.type === 'application/pdf') {
        downloadAndRenderPDF(container, pdfFile, library);
      } else {
        alert('Please select a valid PDF file.');
      }
    }
  }

  //i understand this
  //the event is listening onto the file upload element
  //when that element is changed aka a file is uploadded
  //this function will trigger

  async function downloadAndRenderPDF(canvas, file, pdfLib) {
    const reader = new FileReader();
    
    reader.readAsArrayBuffer(file);

    if(canvasElements.length > 0){
        canvas.innerHTML = "";
    }

    reader.onload = async function (event) {
      const pdfData = new Uint8Array(event.target.result);
        //ppromise then
      const pdfDoc = await pdfLib.getDocument({ data: pdfData }).promise;
  
      //iterate through all pages and render and append to canvas container
      for(let i = 1; i <= pdfDoc.numPages; i++) {
        let scale = 1.15;
        const newPage = await pdfDoc.getPage(i);
        let pdfWidth = newPage._pageInfo.view[2];

        //scale so if it's too large, then make it smaller
        if(pdfWidth > 900){
          let windowWidth = window.innerWidth * 0.8
          let scaleValue = windowWidth/pdfWidth;
          scale = scaleValue;
        }
        const viewport = newPage.getViewport({ scale });
        const newCanvas = document.createElement("canvas");
        const newContext = newCanvas.getContext('2d');
        newCanvas.width = viewport.width;
        newCanvas.height = viewport.height;
        console.log("newpage", newPage.getViewport())
  
        newCanvas.classList.add("canvas-render")
        newCanvas.classList.add(`${i}`)
        canvas.appendChild(newCanvas)
  
      // Render the PDF page on the canvas
        await newPage.render({ canvasContext: newContext, viewport }).promise;
      }
      
      try{
        if(canvasElements.length === pdfDoc.numPages){
          pcDraw.canvas = canvasElements;
          console.log("pcdraw canvas is setting", pcDraw, "thisi s canvas: ", canvas)
        }
  
      }catch(e) {
        console.log("Error!!: ", e)
      }
    };
  }

  export {handleFileSelect}