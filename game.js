let lastRenderTime = 0;
const DRAGON_SPEED = 1;
// loop function
function main(currentTime) {
  window.requestAnimationFrame(main);
  const secondsLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsLastRender < 1 / DRAGON_SPEED) return;

  console.log("Render"); //1 second update
  lastRenderTime = currentTime;

  // game logic
  // update loop
  update(); //Move the dragon to the correct position, make the dragon bigger or smaller, or lost the game
  draw(); // take the logic from update, where rat needs to go
}
// run the loop for the first time
window.requestAnimationFrame(main);
