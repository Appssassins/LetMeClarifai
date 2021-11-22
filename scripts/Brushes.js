var putPoint = function(e){ // e is event: e.clientX and e.clientY are the coordinates of the mouse.
    nStartX = e.clientX;
    nStartY = e.clientY;
    bIsDrawing = true;
}
var stopPoint = function(e){
    bIsDrawing = false;
    RecordHistory();
}
var drawPoint = function(choice, e){
    switch(choice){
        case 'Pen':
            drawPointPen(e);
            break;
        case 'Eraser':
            drawPointEraser(e);
            break;
        case 'Circle':
            drawPointCircle(e);
            break;
        case 'Heart':
            drawPointHeart(e);
            break;
        case 'Line':
            drawPointLine(e);
            break;
        case 'Rectangle':
            drawPointRectangle(e);
            break;
        case 'Triangle':
            drawPointTriangle(e);
            break;
        case 'Star':
            drawPointStar(e);
            break;
    }
}

var drawPointPen = function(e){
    if(!bIsDrawing){
        return;
    }
    ctx.beginPath();
    ctx.moveTo(nStartX, nStartY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
    nStartX = e.clientX;
    nStartY = e.clientY;
}
var drawPointEraser = function(e){
    if(!bIsDrawing){
        return;
    }
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(nStartX, nStartY, 10, 0, Math.PI*2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
}
var drawPointCircle = function(e){  // This draws circles.
    if(!bIsDrawing)
        return;
    var nDeltaX = nStartX - e.clientX;
    var nDeltaY = nStartY - e.clientY;
    radius = Math.sqrt(nDeltaX * nDeltaX + nDeltaY * nDeltaY)
    ctx.beginPath();
    ctx.arc(nStartX, nStartY, radius, 0, Math.PI*2);
    ctx.fill();
}
var drawPointHeart = function(e){  // This draws hearts.
    if(!bIsDrawing)
        return;
    var nDeltaX = nStartX - e.clientX;
    var nDeltaY = nStartY - e.clientY;
    radius = Math.sqrt(nDeltaX * nDeltaX + nDeltaY * nDeltaY)
    ctx.beginPath();
    ctx.moveTo(nStartX, nStartY);
    ctx.bezierCurveTo(nStartX + radius, nStartY, nStartX + radius, nStartY - radius, nStartX, nStartY - radius);
    ctx.bezierCurveTo(nStartX - radius, nStartY - radius, nStartX - radius, nStartY, nStartX, nStartY);
    ctx.fill();
}
var drawPointLine = function(e){  // This draws lines.
    if(!bIsDrawing)
        return;
    ctx.beginPath();
    ctx.moveTo(nStartX, nStartY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.stroke();
}
var drawPointRectangle = function(e){  // This draws rectangles.
    if(!bIsDrawing)
        return;
    ctx.beginPath();
    ctx.rect(nStartX, nStartY, e.clientX - nStartX, e.clientY - nStartY);
    ctx.fill();
}
var drawPointTriangle = function(e){  // This draws triangles.
    if(!bIsDrawing)
        return;
    ctx.beginPath();
    ctx.moveTo(nStartX, nStartY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.lineTo(nStartX, e.clientY);
    ctx.lineTo(nStartX, nStartY);
    ctx.fill();
}
var drawPointStar = function(e){  // This draws stars.
    if(!bIsDrawing)
        return;
    ctx.beginPath();
    ctx.moveTo(nStartX, nStartY);
    ctx.lineTo(e.clientX, e.clientY);
    ctx.lineTo(nStartX, e.clientY);
    ctx.lineTo(e.clientX, nStartY);
    ctx.lineTo(nStartX, nStartY);
    ctx.fill();
}


