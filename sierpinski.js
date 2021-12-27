// Globals.
const gWidth = 400; // canvas width = height
const gSide = 360; // triangle side length
let gTriangle; // enclosing triangle
let gPoint; // point that gets drawn then updated in each iteration

// Set up the canvas, the triangle and a seed point.
function setup() {
  createCanvas(gWidth, gWidth);
  background(0);

  gTriangle = setupTriangle();
  drawTriangle();

  gPoint = randomPoint();
}

// Return the vertices of the triangle.
// The triangle is equilateral, points upward and
// its base is centred along the x-axis of the canvas.
// Its offset from the bottom of the canvas is equal
// to its offset from the left side of the canvas.
function setupTriangle() {
  const offset = (gWidth-gSide)/2;
  return [
    createVector(offset, gSide+offset),
    createVector(gSide+offset, gSide+offset),
    createVector((gSide+offset)/2, gWidth-offset-gSide*0.866) // 0.866 = sqrt(3)/2
  ];
}

// Draw the triangle.
function drawTriangle() {
  noFill();
  stroke('white');
  strokeWeight(2);
  triangle(
    gTriangle[0].x, gTriangle[0].y,
    gTriangle[1].x, gTriangle[1].y,
    gTriangle[2].x, gTriangle[2].y,
  );
}

// Draw a point at (x, y).
function drawMark(x, y) {
  noStroke();
  stroke('white');
  strokeWeight(2);
  point(x, y);
}

// Generate a random point in the triangle.
// Algorithm: https://blogs.sas.com/content/iml/2020/10/19/random-points-in-triangle.html
function randomPoint() {
  const [p1, p2, p3] = gTriangle;
  const p2_p1 = p5.Vector.sub(p2, p1);
  const p3_p1 = p5.Vector.sub(p3, p1);
  let [u1, u2] = [random(), random()];
  if (u1 + u2 > 1) {
    [u1, u2] = [1 - u1, 1 - u2];
  }
  return p5.Vector.add(
    p1,
    p5.Vector.add(
      p5.Vector.mult(p2_p1, u1),
      p5.Vector.mult(p3_p1, u2)
    )
  );
}

// Run a step of the algorithm.
function step() {
  // 1 Generate a random point p in the triangle
  // 2 Pick a random triangle vertex v
  // 3 Let m be the midpoint of p and v
  // 4 Draw m
  // 4 Set p to m
  // 5 Go to step 2
  drawMark(gPoint.x, gPoint.y);
  let randomVertex = gTriangle[floor(random()*3)];
  gPoint = p5.Vector.div(
    p5.Vector.add(gPoint, randomVertex),
    2
  );
}

// Main rendering function, called in a loop.
function draw() {
  iterate();
}
