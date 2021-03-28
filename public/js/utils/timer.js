export let timeSeconds;
export const timer = () => {
  const timer = document.querySelector(".timer");
  if (timer) {
    timeSeconds = timer.dataset.time * 60;
    function updateCountdown() {
      let hours, minutes, seconds;
      if (timeSeconds >= 3600) {
        hours = Math.floor(timeSeconds / 3600);
        minutes = Math.floor((timeSeconds % 3600) / 60);
        seconds = Math.floor((timeSeconds % 3600) % 60);
      } else {
        minutes = Math.floor(timeSeconds / 60);
        seconds = timeSeconds % 60;
      }
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      timer.textContent = hours
        ? `${hours}:${minutes}:${seconds}`
        : `${minutes}:${seconds}`;
      timeSeconds--;
    }
    setInterval(updateCountdown, 1000);
  }
};
