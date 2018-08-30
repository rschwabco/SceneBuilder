import * as aframe from "aframe";
import { throttle, debounce } from "underscore"


export const cameraToHere = (callback, timeout) => {
    aframe.registerComponent("camera-to-here", {
        schema: {
            cameraTo: { default: "0 0 5", type: "string" },
            lookAt: { default: "#lookAtMe", type: "string" }
        },
        init: function () {
            console.log("camera-to-here registered")

            var sceneEl = document.querySelector('a-scene')
            this.cameraEl = sceneEl.querySelector("#camera")

            this.rotation = { ...this.cameraEl.getAttribute("rotation") }

            this.callbackOptions = {
                cameraTo: this.data.cameraTo,
                rotationTo: { x: 0, y: 0, z: 0 },
                currentScene: this.data.lookAt
            }

            this.el.addEventListener("click", debounce((event) => {

                const cameraPosition = this.cameraEl.getAttribute("position")
                this.cameraEl.setAttribute("position", "0 1.6 0")
                console.log("Camera position: ", cameraPosition)

                callback({ ...this.callbackOptions })

                // this.cameraEl.setAttribute("look-at", this.data.lookAt)
                // setTimeout(() => {

                //     console.log("Camera looking at: ", this.cameraEl.getAttribute("look-at"))
                //     console.log("Camera rotation before removing: ", this.cameraEl.getAttribute("rotation"))

                //     this.rotation = this.cameraEl.getAttribute("rotation")

                //     this.cameraEl.removeAttribute("look-at")

                //     callback({ rotationTo: this.rotation })

                //     console.log("Camera rotation after removing look-at: ", this.cameraEl.getAttribute("rotation"))
                // }, timeout)
            }, timeout + 5, true))
        },

    })
}