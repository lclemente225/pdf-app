export async function saveCanvasToPDF(canvasElements, width, height) {
    // Create a new PDF document to store the combined pages
    const combinedPDF = new jsPDF();
    // Iterate through the array of canvases

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
    //DELETE last page before saving
    //because it's empty
    combinedPDF.deletePage(combinedPDF.internal.getNumberOfPages());
    combinedPDF.save('your-saved.pdf');
}

//EXTRA NOTE: remember that jsPDf is imported by CDN on index.html 