import { useAtom } from "jotai";
import { timeLeftToPayAtom } from "../jotai/atoms";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

export const CountdownPay = () => {
  const [timeLeftOnQuote] = useAtom(timeLeftToPayAtom);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const queryClient = useQueryClient();

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const remaining = timeLeftOnQuote - now;
      setRemainingTime(remaining > 0 ? remaining : 0);
    };
    updateCountdown(); // Initialize immediately

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [timeLeftOnQuote]);

  useEffect(() => {
    if (remainingTime <= 0) {
      // navigate(`/payin/${uuid}/pay`)
    }
  }, [remainingTime]);

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
