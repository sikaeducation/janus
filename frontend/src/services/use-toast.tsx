/* eslint @typescript-eslint/no-explicit-any: "off" */
import { drop } from "lodash/fp";
import { useEffect, useRef, useState } from "react";

export default function useToast() {
  const [toasts, setToasts] = useState<string[]>([]);
  // const toastCount = useRef<number>(0);

  // useEffect(() => {
  //   if (toasts.length > toastCount.current) {
  //     toastCount.current += 1;
  //     const timer = setTimeout(() => {
  //       setToasts(drop(1)(toasts));
  //       toastCount.current -= 1;
  //     }, 7000);
  //     return () => {
  //       clearTimeout(timer);
  //     };
  //   }
  // }, [toasts]);

  return [toasts, setToasts] as const;
}
