"use client";

import { useCallback, useEffect, useState } from "react";

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

export function useCountdown(deadline: string | undefined): CountdownValue {
  const target = deadline ? new Date(deadline).getTime() : 0;

  const calc = useCallback((): CountdownValue => {
    if (!target) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    const diff = target - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      days: Math.floor(diff / 86_400_000),
      hours: Math.floor((diff % 86_400_000) / 3_600_000),
      minutes: Math.floor((diff % 3_600_000) / 60_000),
      seconds: Math.floor((diff % 60_000) / 1_000),
      expired: false,
    };
  }, [target]);

  const [value, setValue] = useState<CountdownValue>(calc);

  useEffect(() => {
    const id = setInterval(() => setValue(calc()), 1000);
    return () => clearInterval(id);
  }, [calc]);

  return value;
}
