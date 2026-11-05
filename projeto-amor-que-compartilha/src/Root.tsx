import { Composition } from "remotion";
import { MainSequence } from "./MainSequence";
import { DURATION, FPS, HEIGHT, WIDTH } from "./utils/timing";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="AmorQueCompartilha"
      component={MainSequence}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
