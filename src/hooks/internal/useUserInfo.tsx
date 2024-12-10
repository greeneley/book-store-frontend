import { useAuth } from "@/contexts/AuthContextProvider";
import { User, isUser } from "@/model/internal/user";

export function useUserInfo(): User | null {
	const { user } = useAuth();
	return isUser(user) ? user : null;
}
