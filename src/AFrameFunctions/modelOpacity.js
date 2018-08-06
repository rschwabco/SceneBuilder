import * as aframe from "aframe"

// Returns opacity amount. Perhaps should return something more generic
export const modelOpacity = (callback) => {
    aframe.registerComponent('model-opacity', {
        schema: { default: 1.0 },
        init: function () {
            console.log("model-opacity registered")
            this.el.addEventListener('model-loaded', this.update.bind(this));
            this.el.addEventListener('mouseenter', this.fadeOut.bind(this))

            this.el.addEventListener('mouseleave', this.fadeIn.bind(this))
        },
        fadeOut: function (event) {
            console.log("Mouse entered")
            console.log('I was entered by: ', event.target); // Probably use something like this to do per-asset animation
            callback(0.5)
        },
        fadeIn: function () {
            console.log("Mouse left")
            callback(1)
        },
        update: function (event) {
            var mesh = this.el.getObject3D('mesh');
            var data = this.data;
            if (!mesh) { return; }
            mesh.traverse(function (node) {
                if (node.isMesh) {
                    node.material.opacity = data;
                    node.material.transparent = data < 1.0;
                    node.material.needsUpdate = true;
                }
            });
        }
    });
}