import * as aframe from "aframe"

// Callback returns click target
export const clickToNavigate = callback => {

    aframe.registerComponent('click-to-navigate', {
        init: function () {
            console.log("Registered click-to-navigate")
            this.el.addEventListener('click', (event) => {
                console.log('click-to-navigate target: ', event.target);
                callback(event.target)
            });
        }
    });
}