
class HapticVibrationService {
  constructor() {
    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
  }
  async successVibrate() {
    navigator.vibrate([100, 200, 150]);
    console.log("Vibration occurred");
    return true;
  }

  async warningVibrate(){
    navigator.vibrate([800,50,400]);
    return true;
  }

  async selectionVibrate(){
    navigator.vibrate([200]);
    return true;
  }


}

export default HapticVibrationService;