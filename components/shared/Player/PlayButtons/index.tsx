import { FC } from "react";
import { PlayIcon, PauseIcon, ChevronFirst, ChevronLast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButtonsProps } from "./types";

const IconButtons: FC<IconButtonsProps> = ({
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
}) => {
  return (
    <>
      <Button
        variant="ghost"
        className="active:bg-accent dark:active:bg-accent/50 h-10 w-10 rounded-full hover:bg-transparent"
        onClick={onPrev}
      >
        <ChevronFirst className="!size-6" />
      </Button>
      <Button
        variant="ghost"
        className="active:bg-accent dark:active:bg-accent/50 h-10 w-10 rounded-full hover:bg-transparent"
        onClick={onPlayPause}
      >
        {isPlaying ? (
          <PauseIcon className="!size-6" />
        ) : (
          <PlayIcon className="!size-6" />
        )}
      </Button>
      <Button
        variant="ghost"
        className="active:bg-accent dark:active:bg-accent/50 h-10 w-10 rounded-full hover:bg-transparent"
        onClick={onNext}
      >
        <ChevronLast className="!size-6" />
      </Button>
    </>
  );
};

export default IconButtons;
