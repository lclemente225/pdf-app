import { canvasElements } from "../index.js";

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
    
    if(canvasElements.length > 1){
        canvas.innerHTML = "";
    }

    reader.onload = async function (event) {
      const pdfData = new Uint8Array(event.target.result);
        //ppromise then
      const pdfDoc = await pdfLib.getDocument({ data: pdfData }).promise;
  
      for(let i = 1; i < pdfDoc.numPages; i++) {
        let scale = 1.15;
        const newPage = await pdfDoc.getPage(i);
        if(newPage._pageInfo.view[2] > 900){
          scale = 0.5;
        }
        const viewport = newPage.getViewport({ scale });
        const newCanvas = document.createElement("canvas");
        const newContext = newCanvas.getContext('2d');
        newCanvas.width = viewport.width;
        newCanvas.height = viewport.height;
        console.log("newpage", viewport.width, newPage._pageInfo.view[2], newPage._pageInfo.view[3])
  
        newCanvas.classList.add("canvas-render")
        canvas.appendChild(newCanvas)
  
      // Render the PDF page on the canvas
        await newPage.render({ canvasContext: newContext, viewport }).promise;
      }
    };
  
  }
  export {handleFileSelect}