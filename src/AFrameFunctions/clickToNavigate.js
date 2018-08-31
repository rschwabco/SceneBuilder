import * as aframe from "aframe";
import { throttle, debounce } from "underscore"


export const clickToNavigate = (callback, timeout = 500) => {
    aframe.registerComponent("click-to-navigate", {
        schema: {
            toScene: { default: "#", type: "string" }
        },
        init: function () {
            console.log("click-to-navigate registered")

            var sceneEl = document.querySelector('a-scene')
            this.cameraEl = sceneEl.querySelector("#camera")

            // this.rotation = { ...this.cameraEl.getAttribute("rotation") }

            this.callbackOptions = {
                currentScene: this.data.toScene
            }

            this.el.addEventListener("click", debounce(() => {

                callback({ ...this.callbackOptions })

            }, timeout + 5, true))
        },

    })
}