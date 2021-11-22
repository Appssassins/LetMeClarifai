function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function displayImage() {           // Create a popup window to ask for user copy paste link
    img.src = 'example.png';
    img.addEventListener('load', function () {
        ctx.drawImage(img, 0, 0);
    }, false);
}

download.addEventListener('click', function(e) {//This oddly only works before any images are drawn.
    const link = document.createElement('a');   // create temporary link
    link.download = 'image.png';                // set the name of the download file 
    link.href = canvas.toDataURL();             // set the link to the data URL
    link.click();                               // click the link
    link.delete;                                // delete the link
});

function Undo() {
    if (history.length > 0 && memory > 0) {
        history.pop();
        clearCanvas();
        ctx.putImageData(history[memory--], 0, 0);
    }
}
function RecordHistory() {
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    memory = history.length;
}
function Redo() {
    if (history.length > 0 && memory < history.length) {
        history.pop();
        clearCanvas();
        ctx.putImageData(history[memory++], 0, 0);
    }
}

