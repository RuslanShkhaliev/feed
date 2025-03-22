export const formatRoute = <Params extends Record<string, string | number>>(
	route: string,
	params: Params,
): string => {
	return Object.entries(params).reduce(
		(path, [key, value]) => path.replaceAll(`:${key}`, String(value)),
		route,
	);
};
