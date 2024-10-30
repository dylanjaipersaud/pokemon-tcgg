AFRAME.registerComponent('drag-rotate-component', {
    schema: { speed: { default: 3 } },
    init: function () {
        
        this.ifMouseDown = false;
        this.x_cord = 0;
        this.y_cord = 0;
        document.addEventListener('mousedown', this.OnDocumentMouseDown.bind(this));
        document.addEventListener('mouseup', this.OnDocumentMouseUp.bind(this));
        document.addEventListener('mousemove', this.OnDocumentMouseMove.bind(this));
        document.addEventListener('markerLost', this.OnMarkerLost.bind(this));
    },
    OnDocumentMouseDown: function (event) {
        console.log("clicked on model")
        this.ifMouseDown = true;
        this.x_cord = event.clientX;
        this.y_cord = event.clientY;
    },
    OnDocumentMouseUp: function () {
        console.log("let go on model")
        this.ifMouseDown = false;
    },
    OnDocumentMouseMove: function (event) {
        console.log("moving model")
        if (this.ifMouseDown) {
            var temp_x = event.clientX - this.x_cord;
            var temp_y = event.clientY - this.y_cord;
            if (Math.abs(temp_y) < Math.abs(temp_x)) {
                this.el.object3D.rotation.y -= (temp_x * this.data.speed / 1000);
            }
            else {
                this.el.object3D.rotation.x += (temp_y * this.data.speed / 1000);
            }
            this.x_cord = event.clientX;
            this.y_cord = event.clientY;
        }
    },

    OnMarkerLost: function (){
        console.log("marker is lost");
        this.el.setAttribute('rotation', { x: 270, y: 0, z: 0 });
    }
});