import { useAtomValue } from "jotai";
import { timeLeftToPayAtom } from "../jotai/atoms";
import { useEffect, useState } from "react";

export const CountdownPay = () => {
  const timeLeftToPay = useAtomValue<number>(timeLeftToPayAtom);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const remaining = timeLeftToPay - now;
      setRemainingTime(remaining > 0 ? remaining : 0);
    };
    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [timeLeftToPay]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return <div>{timeLeftToPay ? formatTime(remainingTime) : "Loading..."}</div>;
};
