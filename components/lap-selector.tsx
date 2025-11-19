"use client";

import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface LapSelectorProps {
  laps: number[];
  onSelect: (lap: number) => void;
}

export default function LapSelector({ laps, onSelect }: LapSelectorProps) {
  const [selected, setSelected] = useState(laps[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="btn">{`Lap: ${selected}`}</DropdownMenuTrigger>
      <DropdownMenuContent>
        {laps.map((lap) => (
          <DropdownMenuItem
            key={lap}
            onSelect={() => {
              setSelected(lap);
              onSelect(lap);
            }}
          >
            {lap}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
