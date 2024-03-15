import { memo, useEffect, useMemo, useRef } from "react";

import { styled } from "@mui/system";
import {
  startAudio,
  stopAudio,
} from "../../utils/audio/transcribe-microphone-audio.js";

function TranscriptField(props) {
  const { isStartTranscript } = props;
  const responseContainerRef = useRef(null);

  const startAudioHandler = () => {
    startAudio(responseContainerRef.current);
  };

  useEffect(() => {
    if (isStartTranscript) {
      responseContainerRef.current.style.color = "#000000";
      responseContainerRef.current.style.border = "2px solid #525CEB";
      startAudioHandler();
    } else {
      responseContainerRef.current.style.border = "none";
      stopAudio();
    }

    return () => {
      stopAudio();
    };
  }, [isStartTranscript]);

  const Transcript = styled("div")`
    width: 100%;
    min-height: 300px;
    background-color: #ececec;
    border-radius: 16px;
    padding: 20px;
    color: #a1a1a1;
  `;
  return useMemo(() => {
    return (
      <Transcript ref={responseContainerRef}>
        Transcribing your voice here...
      </Transcript>
    );
  }, [responseContainerRef]);
}

export default memo(TranscriptField);
