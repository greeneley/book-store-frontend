import { useEffect, useState } from "react";
import { User } from "../../model/internal/user";

export const useUserInfo = (): User | undefined => {
	const [user, setUser] = useState<User>();

	useEffect(() => {
		if (!user) {
			setUser(JSON.parse(localStorage.getItem("user")));
		}
	}, [user]);

	return user;
};
