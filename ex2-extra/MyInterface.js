/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();
        
        var obj = this;

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        this.gui.add(this.scene, 'displayRoom').name('Display Room');

        this.gui.add(this.scene, 'displayTable').name('Display Table');

        this.gui.add(this.scene, 'displayChair').name('Display Chair');

        this.gui.add(this.scene, 'displayLaptop').name('Display Laptop');
        
        return true;
    }
}