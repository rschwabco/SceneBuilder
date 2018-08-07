import * as aframe from "aframe";

export const cameraToHere = (callback) => {
    aframe.registerComponent("camera-to-here", {
        init: function () {
            console.log("camera-to-here registered")

            var sceneEl = document.querySelector('a-scene')
            this.cameraEl = sceneEl.querySelector("#camera")

            this.rotation = { ...this.cameraEl.getAttribute("rotation") }

            this.callbackOptions = { cameraTo: "0 0 -15", rotationTo: { x: 0, y: 0, z: 0 } }

            this.el.addEventListener("click", (event) => {

                const cameraPosition = this.cameraEl.getAttribute("position")
                this.cameraEl.setAttribute("position", "0 0 0")
                console.log("Camera position: ", cameraPosition)

                callback({ ...this.callbackOptions })

                this.cameraEl.setAttribute("look-at", "#lookAtMe")
                setTimeout(() => {
                    console.log("Camera looking at: ", this.cameraEl.getAttribute("look-at"))
                    console.log("Camera rotation: ", this.cameraEl.getAttribute("rotation"))
                    callback({ ...this.callbackOptions, rotationTo: this.cameraEl.getAttribute("rotation") }) // This is not working as expected
                    this.cameraEl.removeAttribute("look-at")
                    this.cameraEl.setAttribute("rotation", "10 100 25") // For some reason this is not working
                    console.log("Camera rotation after removing look-at: ", this.cameraEl.getAttribute("rotation"))
                }, 1850)
            })
        },

    })
}