import * as aframe from "aframe"

export const keypressShowInfo = (keys = ["Tab"], callback) => {
    aframe.registerComponent("keypress-show-info", {
        init: function () {
            console.log("keypress-show-info registered")
            window.addEventListener("keydown", this.toggleOverlay.bind(this))
        },
        toggleOverlay: (event) => {
            console.log("Key pressed: ", event.code)
            if (keys.indexOf(event.code) !== -1) {
                console.log(`Pressed ${event.code}`)
                callback()
            }
        }
    })
}