import { Composition } from "remotion";
import { MainSequence } from "./MainSequence";
import { Sequence369 } from "./scenes_369/Sequence369";
import { DURATION_369, FPS_369, HEIGHT_369, WIDTH_369 } from "./scenes_369/timing_369";
import { DURATION, FPS, HEIGHT, WIDTH } from "./utils/timing";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="369app0611"
        component={Sequence369}
        durationInFrames={DURATION_369}
        fps={FPS_369}
        width={WIDTH_369}
        height={HEIGHT_369}
      />
      <Composition
        id="procurarajuda"
        component={MainSequence}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="amarenaojulgar"
        component={MainSequence}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="AmorQueCompartilha"
        component={MainSequence}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
