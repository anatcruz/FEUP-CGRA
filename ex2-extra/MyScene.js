/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.room = new MyRoom(this);
        this.table = new MyTable(this);
        this.chair = new MyChair(this);
        this.laptop = new MyLaptop(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayRoom = true;
        this.displayTable = true;
        this.displayChair = true;
        this.displayLaptop = true;
        this.scaleFactor = 1;
    }
    initLights() {
        this.lights[0].setPosition(10, 4, 3, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
                    0.0, this.scaleFactor, 0.0, 0.0,
                    0.0, 0.0, this.scaleFactor, 0.0,
                    0.0, 0.0, 0.0, 1.0];

        this.multMatrix(sca);

        // ---- BEGIN Primitive drawing section

        if(this.displayRoom){
            this.setDiffuse(1,1,1);
            this.pushMatrix();
            this.translate(7.5, 2.5, 0);
            this.room.display();
            this.popMatrix();
        }
        
        if(this.displayTable){
            this.setDiffuse(0.8, 0.8, 0.8);
            this.pushMatrix();
            this.translate(4, 0 ,4);
            this.table.display();
            this.popMatrix();
        }

        if(this.displayChair){
            this.setDiffuse(0.5216, 0.3411, 0.1372);
            this.pushMatrix();
            this.translate(5, 0, 6);
            this.chair.display();
            this.popMatrix();
        }

        if(this.displayLaptop){
            this.setDiffuse(0.3, 0.3, 0.3);
            this.pushMatrix();
            this.translate(5.5, 1.9, 5);
            this.laptop.display();
            this.popMatrix();
        }

        // ---- END Primitive drawing section
    }
}