import { useState } from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import TranscriptField from "./TranscriptField.tsx";
import { Icon } from "@iconify/react";

function Microphone() {
  const [isStartTranscript, setIsStartTranscript] = useState(false);
  return (
    <Box>
      <Typography mb={2} fontSize={20} fontWeight="bold">
        Transcribe your voice in live
      </Typography>
      <Typography mb={2} fontSize={20}>
        Click the microphone button to transcribe your voice in realtime.
      </Typography>
      <Box
        onClick={() => setIsStartTranscript(!isStartTranscript)}
        mb={2}
        padding="10px"
        sx={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          cursor: "pointer",
          border: "2px solid gray",
        }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: "50%",
            padding: "6px",
            cursor: "pointer",
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Icon
            style={{
              color: isStartTranscript ? "#FF5733" : "#0C97A6",
              fontSize: "38px",
            }}
            icon={
              isStartTranscript
                ? "heroicons:stop-solid"
                : "solar:microphone-2-outline"
            }
          />
        </Box>
      </Box>
      <TranscriptField isStartTranscript={isStartTranscript} />
    </Box>
  );
}

export default Microphone;
