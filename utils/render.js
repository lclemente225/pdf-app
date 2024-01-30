
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

    reader.onload = async function (event) {
      const pdfData = new Uint8Array(event.target.result);
        //ppromise then
      const pdfDoc = await pdfLib.getDocument({ data: pdfData }).promise;
  
  
      for(let i = 1; i < pdfDoc.numPages; i++) {
        const scale = 1.15;
        const newPage = await pdfDoc.getPage(i);
        const viewport = newPage.getViewport({ scale });
        const newCanvas = document.createElement("canvas");
        const newContext = newCanvas.getContext('2d');
  
        newCanvas.classList.add("canvas-render")
        newCanvas.width = viewport.width;
        newCanvas.height = viewport.height;
        canvas.append(newCanvas)
  
      // Render the PDF page on the canvas
        await newPage.render({ canvasContext: newContext, viewport }).promise;
      }
    };
  
    reader.readAsArrayBuffer(file);
  }
  export {handleFileSelect}