import { createContext, useEffect, useMemo, useState } from "react";

type toastContextType = {
  toasts: string[];
  setToasts: (toasts: string[]) => void;
};
export const toastContext = createContext<toastContextType>({} as unknown as toastContextType);

type props = {
  children: JSX.Element;
};

export default function ToastProvider({ children }: props){
	const [
		toasts,
		setToasts,
	] = useState<string[]>([]);
	const state = useMemo(() => ({ toasts, setToasts }), [toasts]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setToasts([]);
		}, 7000);
		return () => {
			clearTimeout(timer);
		};
	}, [toasts]);

	return (
    <toastContext.Provider value={state}>{children}</toastContext.Provider>
	);
}
