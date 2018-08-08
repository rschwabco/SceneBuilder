import * as aframe from "aframe";

export const cameraToHere = (callback) => {
    aframe.registerComponent("camera-to-here", {
        schema: {
            cameraTo: { default: "0 0 -15", type: "string" },
            lookAt: { default: "#lookAtMe", type: "string" }
        },
        init: function () {
            console.log("camera-to-here registered")

            var sceneEl = document.querySelector('a-scene')
            this.cameraEl = sceneEl.querySelector("#camera")

            this.rotation = { ...this.cameraEl.getAttribute("rotation") }

            this.callbackOptions = { cameraTo: this.data.cameraTo, rotationTo: { x: 0, y: 0, z: 0 } }

            this.el.addEventListener("click", (event) => {

                const cameraPosition = this.cameraEl.getAttribute("position")
                this.cameraEl.setAttribute("position", "0 0 0")
                console.log("Camera position: ", cameraPosition)

                callback({ ...this.callbackOptions })

                this.cameraEl.setAttribute("look-at", this.data.lookAt)
                setTimeout(() => {
                    console.log("Camera looking at: ", this.cameraEl.getAttribute("look-at"))
                    console.log("Camera rotation before removing: ", this.cameraEl.getAttribute("rotation"))
                    this.rotation = this.cameraEl.getAttribute("rotation")

                    this.cameraEl.removeAttribute("look-at")

                    callback({ ...this.callbackOptions, rotationTo: this.rotation })

                    console.log("Camera rotation after removing look-at: ", this.cameraEl.getAttribute("rotation"))
                }, 1850)
            })
        },

    })
}