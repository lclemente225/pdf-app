export async function saveCanvasToPDF(canvasElements, width, height) {
    // Create a new PDF document to store the combined pages
    let combinedPDF = new jsPDF();
    // Iterate through the array of canvases
    console.log(canvasElements[0].width)
    if(canvasElements[0].width > 2000){
      combinedPDF = new jsPDF({orientation: 'landscape', width: 'px'});
      for (const element of canvasElements) {
          const imageDataUrl = element.toDataURL('image/jpeg');
          
          //210 297
          combinedPDF.addImage(imageDataUrl, 'JPEG', 0, 0, width, height);
          combinedPDF.addPage();
      }
    } else {
      for (const element of canvasElements) {
      //each loop: 
      //1. converts canvas to jpg
      //2. puts jpg onto new jsPDF canvas
      //3. adds a page to the pdf 
      //4. continue loop
        const imageDataUrl = element.toDataURL('image/jpeg');
        
        //210 297
        combinedPDF.addImage(imageDataUrl, 'JPEG', 0, 0, 210, 297);
        combinedPDF.addPage();
      }
    }

    
    //DELETE last page before saving
    //because it's empty
    combinedPDF.deletePage(combinedPDF.internal.getNumberOfPages());
    combinedPDF.save('your-saved.pdf');
}

//EXTRA NOTE: remember that jsPDf is imported by CDN on index.html 