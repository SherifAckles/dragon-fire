let lastRenderTime= 0

// loop function
function main(currentTime) {
    window.requestAnimationFrame(main)
    console.log(currentTime);
}
// run the loop for the first time
window.requestAnimationFrame(main)