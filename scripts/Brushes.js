var radius =  0;    
var nStartX = 0;    
var nStartY = 0;  
var bIsDrawing = false;
var nDeltaX = 0;
var nDeltaY = 0;


var putPoint = function(e){     // e is event: e.clientX and e.clientY are the coordinates of the mouse.
    nStartX = e.clientX;
    nStartY = e.clientY;
    bIsDrawing = true;
}
var stopPoint = function(e){    //These two are always the same. 
    bIsDrawing = false;         //We record the whole canvas and store that for the undo function.
    RecordHistory();
}

//drawPoint is the part of the drawing cycle that changes, so we have choice function and
//all the functions below are the drawing functions.
var drawPointChoice = function(choice, e){
    switch(choice){
        case 'Pen':
            return drawWithPen(e);
        case 'Eraser':
            return drawWithEraser(e);
        case 'Circle':
            return buildACircle(e);
        case 'Heart':
            return buildAHeart(e);
        case 'Line':
            return buildALine(e);
        case 'Rectangle':
            return buildARectangle(e);
        case 'Triangle':
            return buildATriangle(e);
        case 'Square':
            return buildASquare(e);
    }
}
var setOptions = function(){
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = brushColor;
    ctx.fillStyle = brushColor;
    ctx.globalAlpha = brushOpacity;
}

var drawWithPen = function(e){
    if(!bIsDrawing){return;}
    setOptions();
    
    ctx.beginPath();
    ctx.moveTo(nStartX, nStartY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();

    nStartX = e.clientX;  // This is how we get thousands of tiny lines wherever the mouse goes.
    nStartY = e.clientY;  
}
var drawWithEraser = function(e){
    if(!bIsDrawing){return;}
    setOptions();

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(nStartX, nStartY, 10, 0, Math.PI*2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
}
var buildACircle = function(e){  // This draws circles.
    if(!bIsDrawing){return;}
    setOptions();

    nDeltaX = nStartX - e.clientX;
    nDeltaY = nStartY - e.clientY;
    radius = Math.sqrt(nDeltaX * nDeltaX + nDeltaY * nDeltaY);

    ctx.beginPath();
    ctx.arc(nStartX, nStartY, radius, 0, Math.PI*2);
    ctx.fill();
}
var buildAHeart = function(e){  // This draws hearts.
    if(!bIsDrawing){return;}
    setOptions();

    nDeltaX = nStartX - e.clientX;
    nDeltaY = nStartY - e.clientY;
    radius = Math.sqrt(nDeltaX * nDeltaX + nDeltaY * nDeltaY);

    ctx.beginPath();
    ctx.moveTo(nStartX, nStartY);
    ctx.bezierCurveTo(nStartX + radius, nStartY, nStartX + radius, nStartY - radius, nStartX, nStartY - radius);
    ctx.bezierCurveTo(nStartX - radius, nStartY - radius, nStartX - radius, nStartY, nStartX, nStartY);
    ctx.fill();
}
var buildALine = function(e){        // This draws lines.
    if(!bIsDrawing){return;}
    setOptions();

    ctx.beginPath();
    ctx.moveTo(nStartX, nStartY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
}
var buildARectangle = function(e){   // This draws rectangles.
    if(!bIsDrawing){return;}
    setOptions();

    ctx.beginPath();
    ctx.rect(nStartX, nStartY, e.clientX - nStartX, e.clientY - nStartY);
    ctx.fill();
}
var buildATriangle = function(e){    // This draws triangles.
    if(!bIsDrawing){return;}
    setOptions();

    ctx.beginPath();
    ctx.moveTo(nStartX, nStartY);       //click point
    ctx.lineTo(e.clientX, e.clientY);   //mouse point
    ctx.lineTo(nStartX, e.clientY);     //click point's X, mouse point's Y
    ctx.lineTo(nStartX, nStartY);       //click point again
    ctx.fill();
}
var buildASquare = function(e){      // This draws squares.
    if(!bIsDrawing){return;}
    setOptions();

    ctx.beginPath();
    ctx.moveTo(nStartX, nStartY);       //click point
    ctx.lineTo(nStartX, e.clientY);     //click point's X, mouse point's Y
    ctx.lineTo(e.clientX, e.clientY);   //mouse point
    ctx.lineTo(e.clientX, nStartY);     //mouse point's X, click point's Y
    ctx.lineTo(nStartX, nStartY);       //click point again
    ctx.fill();
}


