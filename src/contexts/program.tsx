import {
	keyBy,
} from "lodash/fp";
import {
	useState, createContext, useEffect, useMemo,
} from "react";

export const programContext = createContext({
} as unknown as {
    isLoading: boolean;
    isError: boolean;
    program: hydratedProgram | null;
    setProgram: (program: hydratedProgram) => void;
    postsBySlug: Record<string, hydratedPost>;
  });

type props = { children: JSX.Element };
export function ProgramProvider({
	children,
}: props){
	const [
		isError,
		setIsError,
	] = useState(false);
	const [
		isLoading,
		setIsLoading,
	] = useState(false);
	const [
		program,
		setProgram,
	] = useState<hydratedProgram>({
		id: 0,
		label: "",
		root: {
			type: "root",
			label: {
				full: "",
			},
			slug: "",
			children: [],
			path: "",
			content: "",
		},
		posts: [],
	});
	const id = 1; // Hard-coded
	const posts = [
		program.root,
		...program.posts,
	];
	const postsBySlug = keyBy<hydratedPost>("slug")(posts);
	useEffect(
		() => {
			const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
			setIsLoading(true);
			fetch(`${apiBaseUrl}/programs/${id}`)
				.then((response) => response.json())
				.then((response) => {
					setIsError(false);
					setProgram(response.program);
				})
				.catch((error) => {
					setIsError(true);
					// eslint-disable-next-line
				console.error(error.message);
				})
				.finally(() => {
					setIsLoading(false);
				});

			return () => {
				setIsLoading(false);
				setIsError(false);
			};
		},
		[
			id,
		],
	);

	const providerValue = useMemo(
		() => ({
			program,
			setProgram,
			postsBySlug,
			isError,
			isLoading,
		}),
		[
			isError,
			isLoading,
			program,
			postsBySlug,
		],
	);

	return (
    <programContext.Provider value={providerValue}>
      {children}
    </programContext.Provider>
	);
}
