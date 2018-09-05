import * as aframe from "aframe"

export const keypressNavigateBack = (keys = ["Space"], callback) => {
    aframe.registerComponent("keypress-navigate-back", {
        init: function () {
            console.log("keypress-navigate-back registered")
            window.addEventListener("keydown", this.navigate.bind(this))
        },
        navigate: (event) => {
            console.log("Key pressed")
            if (keys.indexOf(event.code) !== -1) {
                console.log(`Pressed ${event.code}`)
                callback()
            }
        }
    })
}