import React, { useState } from "react";
import KeypadButton from "./KeypadButton";
import useLoudness from "./hooks/useLoudness";
import useMuteWarning from "./hooks/useMuteWarning";
import "./OnCall.css";

const OnCall = ({ handleHangup, device, conn}) => {
  const [muted, setMuted] = useState(false);
  const [running, setRunning, loudness] = useLoudness();
  const [showMuteWarning] = useMuteWarning(loudness, running);

  const handleMute = () => {
    conn.mute(!muted);
    setMuted(!muted);
    setRunning(!muted);
  };

  const muteWarning = (
    <p className="warning">Are you speaking? You are on mute!</p>
  );

return (
  <>
    {showMuteWarning && muteWarning}
    <div className="call">
      <div className="buttons-row">
        <div className="call-options">
          <KeypadButton
            handleClick={() => handleMute()}
            className={`call-button ${muted ? "red" : "green"}`}
          >
            {muted ? "Unmute" : "Mute"}
          </KeypadButton>
        </div>
        <div className="hang-up">
          <KeypadButton
            handleClick={() => handleHangup()}
            className="red"
          >
            Hang up
          </KeypadButton>
        </div>
      </div>
    </div>
  </>
);
};

export default OnCall;