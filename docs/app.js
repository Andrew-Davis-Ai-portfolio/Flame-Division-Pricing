document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("fd-listen-btn");
  if (!btn || !("speechSynthesis" in window)) {
    console.log("🎧 No button or no speech synthesis support.");
    return;
  }

  let isSpeaking = false;

  btn.addEventListener("click", () => {
    // If already speaking, stop
    if (isSpeaking) {
      speechSynthesis.cancel();
      isSpeaking = false;
      btn.textContent = "🔊 Listen";
      return;
    }

    const text = `
      Flame Division Academy.
      Training humans for the In A I Era.
      Start in Tier zero if you are evaluating.
      Move to Tier one if you are ready to learn.
      Advance to Tier two if you are ready to operate.
      Enrollment is invite only.
    `.trim();

    const utterance = new SpeechSynthesisUtterance(text);

    // Try to match browser language, fall back to English
    let lang = navigator.language || "en-US";
    if (!lang.toLowerCase().startsWith("en")) {
      lang = navigator.language;
    }
    utterance.lang = lang;

    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      isSpeaking = true;
      btn.textContent = "⏹ Stop";
    };

    utterance.onend = () => {
      isSpeaking = false;
      btn.textContent = "🔊 Listen";
    };

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  });
});
