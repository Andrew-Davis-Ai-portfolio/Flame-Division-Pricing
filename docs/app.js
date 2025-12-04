// 🔊 Flame Division Academy — Floating Listen Button
// This script auto-injects a floating button and reads a fixed script aloud.

document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Create the floating button ---
  const btn = document.createElement("button");
  btn.id = "fd-listen-fab";
  btn.textContent = "🔊 Listen";
  btn.type = "button";

  // Inline styles so it works even without CSS file
  Object.assign(btn.style, {
    position: "fixed",
    right: "1.5rem",
    bottom: "1.5rem",
    zIndex: "9999",
    border: "none",
    borderRadius: "999px",
    padding: "0.75rem 1.5rem",
    fontSize: "0.95rem",
    fontWeight: "600",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif",
    background: "linear-gradient(135deg,#f5b544,#ffd88a)",
    color: "#050509",
    boxShadow: "0 10px 30px rgba(0,0,0,0.45)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  });

  document.body.appendChild(btn);

  // --- 2. Text to read (edit this anytime) ---
  const TTS_TEXT = `
    Flame Division Academy — Training humans for the In-AI Era.

    Start in Tier 0 if you're evaluating. Move to Tier 1 if you're ready to learn.
    Advance to Tier 2 if you're ready to operate.

    Step 1 — Explore Open Deck.
    Begin with public demos. Verify the signal. Observe the governance patterns.

    Step 2 — Enroll in Code Talker Initiate.
    Learn Flame Language fundamentals that keep humans, AI systems, and governance on the same page.

    Step 3 — Train as Flame System Operator.
    Design and document one defensible AI-driven system that can stand in front of leadership and audit.

    Flame Law:
    AI amplifies whoever you already are. Flame Division Academy exists to make sure that amplification doesn't become damage.
  `;

  // --- 3. TTS logic ---
  if (!("speechSynthesis" in window)) {
    // Browser doesn’t support TTS
    btn.disabled = true;
    btn.textContent = "⚠️ Audio not supported";
    return;
  }

  let isPlaying = false;
  let utterance = null;

  function startSpeech() {
    // stop any existing
    window.speechSynthesis.cancel();

    utterance = new SpeechSynthesisUtterance(TTS_TEXT.trim());

    // Use browser language as a base; you can hard-set 'en-US' if you prefer
    utterance.lang = navigator.language || "en-US";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = function () {
      isPlaying = false;
      btn.textContent = "🔊 Listen";
    };
    utterance.onerror = function () {
      isPlaying = false;
      btn.textContent = "🔊 Listen";
    };

    isPlaying = true;
    btn.textContent = "⏸ Stop";
    window.speechSynthesis.speak(utterance);
  }

  function stopSpeech() {
    window.speechSynthesis.cancel();
    isPlaying = false;
    btn.textContent = "🔊 Listen";
  }

  btn.addEventListener("click", function () {
    if (isPlaying) {
      stopSpeech();
    } else {
      startSpeech();
    }
  });
});
