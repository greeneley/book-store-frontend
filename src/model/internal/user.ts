export interface User {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	_id: number;
}

export function isUser(value: unknown): value is User {
	return (
		typeof value === "object" &&
		value !== null &&
		"username" in value &&
		"email" in value &&
		"firstName" in value &&
		"lastName" in value &&
		"_id" in value
	);
}
