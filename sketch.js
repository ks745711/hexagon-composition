//Based on code from p5 example: https://editor.p5js.org/p5/sketches/Motion:_Bounce

let size = 60;
let xpos = [100, 300, 200, 50];
let ypos = [200, 400, 600, 60];

let horizontalspeed = [7, 9, 3, 15];
let verticalspeed = [3, 9, 20, 2];

let xdirection = [1.4, -2, .5, -1];
let ydirection = [1, -1, .5, -.3]; 

let redness= [249, 240, 230, 255];

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  intro = select('.div-block');
  intro.position(0, 0);
  
  


  gui = new Gui();
  let gui_setup = new dat.GUI();
  gui_setup.add(gui, 'show_introduction').onChange(introduction);
  gui_setup.add(gui, 'size', 5, 150);
  gui_setup.add(gui, 'horizontal_speed', .1, 40);
  gui_setup.add(gui, 'vertical_speed', .1, 40);
  gui_setup.add(gui, 'extra_hexes', 4, 1000);
  
var save_button = {
        download_png: function () {
            save("hexagons.png"); // give file name
            print("saved png image");
            noLoop(); // we just want to export once
        }
    };

    gui_setup.add(save_button, 'download_png');

}

function draw() {
  background(255);


  for (var x = 0; x < xpos.length; x++) {
    xpos[x] = xpos[x] + horizontalspeed[x] * gui.horizontal_speed * xdirection[x] * .1;
    ypos[x] = ypos[x] + verticalspeed[x] * gui.vertical_speed * ydirection[x] * .1;

    if (xpos[x] > windowWidth - gui.size || xpos[x] < gui.size) {
      xdirection[x] *= -1;
    }

    if (ypos[x] > windowHeight - gui.size || ypos[x] < gui.size) {
      ydirection[x] *= -1;
    }

    if (x%2 == 0) {
      fill(255,255,255,0);
      stroke(255, 215, 164);
      hexagon(xpos[x], ypos[x], gui.size, 2);
    } else {
      fill(redness[x], 139, 136);
      hexagon(xpos[x], ypos[x], gui.size, 0);
    }


  }

  if (gui.extra_hexes > xpos.length) {
    var dif = gui.extra_hexes - xpos.length;
    for (var x = 0; x < dif; x++) {
      xpos.push(random(50, windowWidth - 50));
      ypos.push(random(50, windowHeight - 50));
      horizontalspeed.push(random(1, 20));
      verticalspeed.push(random(1, 20));
      xdirection.push(random(-1, 1));
      ydirection.push(random(-1, 1));
      redness.push(random(220, 255));

    }
  }


  if (gui.extra_hexes < xpos.length) {
    var reversedif = xpos.length - gui.extra_hexes;
    for (var x = 0; x < reversedif; x++) {
      xpos.pop();
      ypos.pop();
      horizontalspeed.pop();
      verticalspeed.pop();
      xdirection.pop();
      ydirection.pop();
      redness.pop();


    }
  }
}

function Gui() {
  this.size = 20;
  this.horizontal_speed = 3;
  this.vertical_speed = 3;
  this.extra_hexes = 4;
  this.show_introduction = true;
}

function introduction() {
  if (gui.show_introduction) {
    intro.style('display', 'block');
    }
    else {
      intro.style('display', 'none');

      }
    }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
