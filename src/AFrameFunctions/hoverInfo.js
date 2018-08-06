import * as aframe from "aframe";

export const hoverInfo = (callback) => {
    console.log("Hover info about to register") // Why isn't this registering?
    aframe.registerComponent("hover-info", {
        init: function () {
            console.log("Hover-info registered")
            this.el.addEventListener("mouseenter", (event) => {
                callback(`Hover-info Mouse entered: ${event.target}`);
                // that.setState({ showInfoModal: true })
            })
            this.el.addEventListener("mouseleave", (event) => {
                callback(`Hover-info Mouse left: ${event.target}`);
                // that.setState({ showInfoModal: false })
            })
        }
    })
}