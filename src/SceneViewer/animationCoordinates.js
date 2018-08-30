export const animationCoordinates = (startPosition) => {
    const { x, y, z } = startPosition

    // return { x: x * 5, y: y * 5, z: z * 5 }
    return `${x * 10} ${y * 10} ${z * 10}`
}