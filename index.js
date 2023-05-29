function init() {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
    let speech = {
      enabled: true,
      listening: false,
      recognition: new window.SpeechRecognition(),
      text: ""
    };

    speech.recognition.continuous = true;
    speech.recognition.interimResults = true;
    speech.recognition.lang = "en-US";
    speech.recognition.addEventListener("result", (event) => {
      const audio = event.results[event.results.length - 1];
      speech.text = audio[0].transcript;
      const tag = document.activeElement.nodeName;
      if (tag === "INPUT" || tag === "TEXTAREA") {
        if (audio.isFinal) {
          document.activeElement.value += speech.text;
        }
      }
      result.innerText = speech.text;
    });

    const toggle = document.getElementById("toggle");
    const submitButton = document.getElementById("submit");
    const formInputs = document.querySelectorAll("input, textarea");

    toggle.addEventListener("click", () => {
      toggleSpeechRecognition(speech, toggle);
    });

    toggle.addEventListener("touchstart", (event) => {
      event.preventDefault();
      toggleSpeechRecognition(speech, toggle);
    });

    submitButton.addEventListener("click", () => {
      result.innerText = "Form submitted. Thanks, doctor!";
      formInputs.forEach((input) => {
        input.value = "";
      });
    });

    submitButton.addEventListener("touchstart", (event) => {
      event.preventDefault();
      result.innerText = "Form submitted. Thanks, doctor!";
      formInputs.forEach((input) => {
        input.value = "";
      });
    });
  }
}

function toggleSpeechRecognition(speech, toggle) {
  speech.listening = !speech.listening;
  if (speech.listening) {
    toggle.classList.add("listening");
    toggle.innerText = "Listening ...";
    speech.recognition.start();
  } else {
    toggle.classList.remove("listening");
    toggle.innerText = "Toggle listening";
    speech.recognition.stop();
  }
}

init();
