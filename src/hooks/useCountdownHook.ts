import { useEffect } from "react";
import { useAtom } from "jotai";
import { countdownAtom } from "../jotai/atoms";

  export const useCountdown = (targetTime: number) => {
    const [, setCountdown] = useAtom(countdownAtom);
  
    useEffect(() => {
      setCountdown(targetTime);
    }, [targetTime, setCountdown]);
  };
  

//   useEffect(() => {
//     const updateCountdown = () => {
//       const now = Date.now();
//       const remaining = targetTime - now;
//       setCountdown(remaining > 0 ? remaining : 0);
//     };

//     updateCountdown(); // Initialize countdown

//     const interval = setInterval(updateCountdown, 1000);

//     return () => clearInterval(interval);
//   }, [targetTime, setCountdown]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCountdown((prev) => (prev && prev > 1000 ? prev - 1000 : 0));
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [setCountdown]);
// };


// const useCountdown = (targetTimeAtom) => {
//   if (!targetTime || typeof targetTime !== "number" || isNaN(targetTime)) {
//     throw new Error("Invalid targetTime provided");
//   }

//   const calculateTimeLeft = () => {
//     const now = Date.now();
//     const difference = targetTime - now;
//     return difference > 0 ? difference : 0;
//   };

//   const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//   useEffect(() => {
//     if (timeLeft <= 0) return;

//     const timer = setTimeout(() => {
//       setTimeLeft(calculateTimeLeft());
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [targetTime, timeLeft]);

//   // Helper to format milliseconds to hh:mm:ss
//   const formatTime = (time) => {
//     const hours = Math.floor(time / 3600000);
//     const minutes = Math.floor((time % 3600000) / 60000);
//     const seconds = Math.floor((time % 60000) / 1000);

//     return `${hours}:${minutes}:${seconds}`;
//   };
//   return formatTime(timeLeft);
// };

// export default useCountdown;
