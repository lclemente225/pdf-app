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

  let pdfUIntArray;

  async function downloadAndRenderPDF(pdfContainer, file, pdfLib) {
    const reader = new FileReader();
    
    reader.readAsArrayBuffer(file);

    if(canvasElements.length > 0){
        pdfContainer.innerHTML = "";
    }

    reader.onload = async function (event) {
      const pdfData = new Uint8Array(event.target.result);
      pdfUIntArray = pdfData
        //ppromise then
      const pdfDoc = await pdfLib.getDocument({ data: pdfData }).promise;
  
      //iterate through all pages and render and append to canvas container
      for(let i = 1; i <= pdfDoc.numPages; i++) {
        const newPage = await pdfDoc.getPage(i);
        let pdfWidth = newPage._pageInfo.view[2];
          let scale = 1.75;
        console.log("pdf width", pdfWidth, window.innerWidth, window.innerWidth*0.9/pdfWidth)
        //scale so if it's too large, then make it smaller
        if(pdfWidth > window.innerWidth*0.9){
          let windowWidth = window.innerWidth * 0.9;
          let scaleValue = windowWidth/pdfWidth;
          scale = scaleValue;
          console.log("scaleValue",scaleValue)
        }

        const viewport = newPage.getViewport({ scale });
        const newCanvas = document.createElement("canvas");
        const newContext = newCanvas.getContext('2d');
        newCanvas.width = viewport.width;
        newCanvas.height = viewport.height;
        console.log("This is a new page for the pdf in render.js file: ", newPage.getViewport())
        

        newCanvas.classList.add("canvas-render")
        newCanvas.classList.add(`canvas-${i}`)
        pdfContainer.appendChild(newCanvas)
  
      // Render the PDF page on the canvas
        await newPage.render({ canvasContext: newContext, viewport }).promise
        .then(() => {
          //add page numbers
          const pageNum = document.createElement("span");
          pageNum.classList.add(`page-number-${i}`)
          pageNum.classList.add(`page-number`)
          pageNum.textContent = `Page ${i}`
          newCanvas.parentNode.insertBefore(pageNum, newCanvas)
        });
      }
      
    };
  }

  export {handleFileSelect, pdfUIntArray}