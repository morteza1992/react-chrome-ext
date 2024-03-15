import { resampleTo16kHZ } from "./resample-to-16khz.js";

let audioContext;
let processor;
let input;
let socket;
let stream;
let isInitialMessageSent = false;

function stopAudio() {
  if (processor) {
    processor.disconnect();
    processor.onaudioprocess = null;
  }
  if (input) {
    input.disconnect();
  }
  if (audioContext) {
    audioContext.close();
    audioContext = null; // Set to null to ensure a new context is created on start
  }
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.close();
    socket = null; // Set to null to ensure a new socket is created on start
  }
  if (stream) {
    stream.getTracks().forEach(function (track) {
      track.stop();
    });
  }
  isInitialMessageSent = false; // Reset this flag
}

function sendToServer(data) {
  if (socket && socket.readyState === WebSocket.OPEN) {
    if (!isInitialMessageSent && data === null) {
      // Construct and send an initial JSON message
      let initialMessage = JSON.stringify({
        uid: "some-unique-id",
        multilingual: false,
        language: "en",
        task: "transcribe",
      });
      socket.send(initialMessage);
      isInitialMessageSent = true;
      return; // Return early since initial message has been sent
    }

    if (data instanceof Float32Array) {
      socket.send(data.buffer);
    } else {
      console.error("Unexpected data type:", typeof data);
    }
  }
}

function onAudioProcess(event) {
  if (!isInitialMessageSent) {
    sendToServer(null); // This will send the initial JSON message
    return; // Return early to wait for the next audio process event
  }

  let audioData = event.inputBuffer.getChannelData(0);
  let resampledData = resampleTo16kHZ(audioData, audioContext?.sampleRate);

  // Add a 500 millisecond delay before sending data to server
  setTimeout(function () {
    sendToServer(resampledData);
  }, 0);
}

async function startAudio(responseContainerRef) {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  // Deprecated, find a replacement
  processor = audioContext.createScriptProcessor(1024, 1, 1);

  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    input = audioContext.createMediaStreamSource(stream);
    input.connect(processor);
    processor.connect(audioContext.destination);
    processor.onaudioprocess = onAudioProcess;

    // Set up WebSocket connection
    socket = new WebSocket("wss://api.talkscriber.com:9090");
    socket.onopen = function (event) {
      console.log("WebSocket is open now.");
    };
    socket.onclose = function (event) {
      console.log("WebSocket is closed now.");
    };

    // Add the socket.onmessage function here
    socket.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log("Server response:", data);

      if (data.segments && data.segments.length > 0) {
        let allText = data.segments.map((segment) => segment.text).join("\n");
        responseContainerRef.innerText = allText;
        console.log("Server response text:", allText);
      } else {
        responseContainerRef.innerText =
          "Please start speaking into your microphone...";
        console.log(
          "Server response does not contain a text field in the expected format",
        );
      }
    };
  } catch (err) {
    console.error("Microphone access denied:", err);
  }
}

export { startAudio, stopAudio };
