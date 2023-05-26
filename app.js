
// Get the canvas element
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


// Define the circle colors
var colors = [  'yellow', 'blue','red', 'green' ];

// Define the circle radius
var radius = 30;

// Calculate the x and y positions for the circles
var x = radius+10; // start position
var y = canvas.height/5;

// Initialize the circle states
var circleStates = [
    { x: x, y: y, color:colors[0],hit:false},
    { x: x, y: y + 2 * radius + 20, color: colors[1], hit: false },
    { x: x, y: y + 4 * radius + 40, color: colors[2], hit: false },
    { x: x, y: y + 6 * radius + 60, color: colors[3], hit: false },
]

 // Initialize the arrow states
 var arrowStates = [
    { sx: x + radius + 400, sy: y - radius / 2, ex: x + radius + 450, ey: y - radius / 2, dx: 0, dy: 0 },
    { sx: x + radius + 400, sy: y + 2 * radius + 20 - radius / 2, ex: x + radius + 450, ey: y + 2 * radius + 20 - radius / 2, dx: 0, dy: 0 },
    { sx: x + radius + 400, sy: y + 4 * radius + 40 - radius / 2, ex: x + radius + 450, ey: y + 4 * radius + 40 - radius / 2, dx: 0, dy: 0 },
    { sx: x + radius + 400, sy: y + 6 * radius + 60 - radius / 2, ex: x + radius + 450, ey: y + 6 * radius + 60 - radius / 2, dx: 0, dy: 0 },

];

// Add click event listener to the canvas
canvas.addEventListener('click', handleClick);

// Draw the initial circles and arrows
drawCirclesAndArrow();

function drawCirclesAndArrow(){
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(var i=0;i<circleStates.length;i++){
        var circle = circleStates[i];
        var arrow = arrowStates[i];
 
        // Draw the circle
        ctx.beginPath();
        ctx.arc(circle.x,circle.y,radius,0,2*Math.PI);
        ctx.fillStyle = circle.color;
        ctx.fill();
        ctx.closePath();

        //Draw the arrow line
        ctx.beginPath();
        ctx.moveTo(arrow.sx, arrow.sy);
        ctx.lineTo(arrow.ex, arrow.ey);
        ctx.stroke();
    }
}

function handleClick(event) {
     // Get the click coordinates
    var clickX = event.clientX - canvas.getBoundingClientRect().left;
    var clickY = event.clientY - canvas.getBoundingClientRect().top;

    // Check if the click is inside any circle
    for(var i=0;i<circleStates.length;i++){
        var circle = circleStates[i];

        // Calculate the distance between the click and the center of the circle
        var dx = clickX - circle.x;
        var dy = clickY - circle.y;

        var distance = Math.sqrt(dx * dx + dy * dy);

        // If the click is inside the circle
        if(distance <= radius){
            
            //calculate direction towards the circle
            var directionX = circle.x - arrowStates[i].sx;
            var directionY = circle.y - arrowStates[i].sy;

             // Update the arrow's direction and speed
             arrowStates[i].dx = directionX / 20;
             arrowStates[i].dy = directionY / 20;

             // Exit the loop since we found the clicked circle
            break;

        }

    }
}

function hitArrows(){
     // Move the arrows towards the circles
     for (var i = 0; i < arrowStates.length; i++) {
        var arrow = arrowStates[i];

        // Update the arrow's position
        arrow.sx += arrow.dx;
        arrow.sy += arrow.dy;

        // Check if the arrow has hit the corresponding circle
        if (
            arrow.sx + 30 >= circleStates[i].x &&
            arrow.sy >= circleStates[i].y &&
            arrow.sy <= circleStates[i].y + radius
          ) {
            // Mark the circle as hit
            circleStates[i].hit = true;

            // Change the color of the circle
            circleStates[i].color = 'gray';

            // Reset the arrow's position and speed
            arrow.sx = x + radius + 10;
            arrow.sy = circleStates[i].y - radius / 2;
            arrow.ex = x + radius + 70;
            arrow.ey = circleStates[i].y - radius / 2;
            arrow.dx = 0;
            arrow.dy = 0;
          }
}
 // Redraw the circles and arrows
 drawCirclesAndArrow();
}

function animate() {
    // Move the arrows
    hitArrows();

    // Request the next animation frame
    requestAnimationFrame(animate);
}

function reset() {
    // Reset the circle and arrow states
    for (var i = 0; i < circleStates.length; i++) {
        circleStates[i].color = colors[i];
        circleStates[i].hit = false;
        
        arrowStates[i].sx = x + radius + 400;
        // arrowStates[i].sy = arrowStates[i].sy;
        arrowStates[i].ex = x + radius + 450;
        // arrowStates[i].ey = arrowStates[i].ey;
        arrowStates[i].dx = 0;
        arrowStates[i].dy = 0;
      }

    // Redraw the circles and arrows
    drawCirclesAndArrows();
}

animate();