import * as aframe from "aframe";
export const clickLogInfo = (callback) => {
    aframe.registerComponent("click-log-info", {
        init: function () {
            console.log("click-log-info registered")
            this.el.addEventListener("click", (event) => {
                callback({
                    position: this.el.getAttribute("position"),
                    scale: this.el.getAttribute("scale")
                })
            })
        }
    })
}