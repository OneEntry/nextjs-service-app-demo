/* eslint-disable @typescript-eslint/no-explicit-any */
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useEffect, useRef, useState } from 'react';

import {
  ClearIcon,
  DragIcon,
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
  RestartIcon,
  ReverseIcon,
  SettingsIcon,
} from './icons';

const cn = 'size-full';

// buttons
const buttons = [
  {
    name: 'Prev',
    icon: <PrevIcon cn={cn} />,
    function: (timeline: any) => {
      timeline.progress(0);
      timeline.pause();
    },
  },
  {
    name: 'Play',
    icon: <PlayIcon cn={cn} />,
    function: (timeline: { play: () => void }) => {
      timeline.play();
    },
  },
  {
    name: 'Pause',
    icon: <PauseIcon cn={cn} />,
    function: (timeline: { pause: () => void }) => {
      timeline.pause();
    },
  },
  {
    name: 'Next',
    icon: <NextIcon cn={cn} />,
    function: (timeline: any) => {
      timeline.progress(100);
      timeline.pause();
    },
  },
  {
    name: 'Restart',
    icon: <RestartIcon cn={cn} />,
    function: (timeline: { restart: () => void }) => {
      timeline.restart();
    },
  },
  {
    name: 'Reverse',
    icon: <ReverseIcon cn={cn} />,
    function: (timeline: { reverse: () => void }) => {
      timeline.reverse();
    },
  },
  {
    name: 'Clear',
    icon: <ClearIcon cn={cn} />,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function: (timeline: any) => {
      // timeline.progress(0);
      // timeline.pause();
    },
  },
  {
    name: 'Settings',
    icon: <SettingsIcon cn={cn} />,
    function: () => {
      //
    },
  },
];

const Toggle = ({
  label,
  state,
  setState,
}: {
  label: string;
  state: boolean;
  setState: any;
}) => {
  return (
    <label htmlFor="markers">
      <span className="mr-2 text-xs">{label}</span>
      <input
        type="checkbox"
        onChange={() => {
          setState(!state);
        }}
        name="markers"
        id="markers"
        defaultChecked={state}
      />
    </label>
  );
};

const Button = ({ tl, button }: { tl: any; button: any }) => {
  return (
    <button
      title={button.name}
      className="size-6 rounded-full bg-white p-1.5 text-xs hover:bg-white/50"
      key={button.name}
      onClick={() => button.function(tl)}
    >
      {button.icon}
    </button>
  );
};

const GsapControls = ({ timeline }: { timeline: any }) => {
  const boxRef = useRef<any>(null);
  const dragRef = useRef<any>(null);
  const [markersState, setMarkers] = useState<boolean>(false);

  useEffect(() => {
    // Draggable
    gsap.registerPlugin(Draggable, GSDevTools);
    Draggable.create(boxRef.current, {
      type: 'x,y',
      trigger: dragRef.current,
      edgeResistance: 0.65,
      bounds: window,
      inertia: true,
    });
  }, [boxRef, timeline]);

  return (
    <div
      ref={boxRef}
      className="z-500 absolute bottom-2 right-4 flex flex-col gap-2 rounded-sm bg-white/60 p-3 pb-16 backdrop-blur-lg"
    >
      <div className="flex w-full justify-between gap-2">
        <Toggle
          label="Show markers"
          state={markersState}
          setState={setMarkers}
        />
        <div ref={dragRef} className="size-6 p-1">
          <DragIcon cn={cn} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {/* buttons */}
        <div className="flex flex-row gap-1.5">
          {buttons.map((button) => {
            return <Button key={button.name} tl={timeline} button={button} />;
          })}
        </div>
        {/* slider */}
        {/* <Slider tl={tl} /> */}
      </div>
    </div>
  );
};

// use as tag {/* <GsapControls timeline={stageTl} />; */}

export default GsapControls;
