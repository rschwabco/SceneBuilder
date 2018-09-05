export const animationCoordinates = (startPosition) => {
    const { x, y, z } = startPosition

    if (x === 0 && y === 0 && z === 0) {

        return `${2} ${y * -10} ${20}`
    }

    return `${x === 0 ? 10 : x * 10} ${y === 0 ? 10 : y * 10} ${z === 0 ? 10 : z * 10}`
}