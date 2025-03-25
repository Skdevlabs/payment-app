import { useAtomValue } from "jotai";
import { timeLeftOnQuoteAtom } from "../jotai/atoms";
import { useEffect, useState } from "react";

interface CountdownAcceptProps {
  refetch: () => void;
}

export const CountdownAccept = ({ refetch }: CountdownAcceptProps) => {
  const timeLeftOnQuote = useAtomValue(timeLeftOnQuoteAtom);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const remaining = timeLeftOnQuote - now;
      setRemainingTime(remaining > 0 ? remaining : 0);
    };
    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [timeLeftOnQuote]);

  useEffect(() => {
    if (remainingTime <= 0) {
      console.log("Timer expired, refetching data...");
      refetch();
    }
  }, [remainingTime, refetch]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div>{timeLeftOnQuote ? formatTime(remainingTime) : "Loading..."}</div>
  );
};
