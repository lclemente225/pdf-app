 
  export async function saveCanvasToPDF(canvas, pdfDoc, filename) {
    // Step 1: Convert canvas content to image data URL
    const imageDataUrl = canvas.toDataURL('image/png');
  
    // Step 2: Add a new page to the existing PDF document
    const page = pdfDoc.addPage();
  
    // Step 3: Add the image to the new page
    const img = await fetch(imageDataUrl).then(res => res.blob());
    page.image(img, { fit: [canvas.width, canvas.height] });
  
    // Step 4: Save the updated PDF document
    const blob = await pdfDoc.save();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'canvas.pdf';
    link.click();
    URL.revokeObjectURL(url);
  }
  