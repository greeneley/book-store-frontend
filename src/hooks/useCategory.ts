import { useQueryKeys } from "@/hooks/useQueryKeys";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useQuery } from "@tanstack/react-query";

// Categories are public — no auth required
export function useCategory() {
	const { fetchCategory } = useCategoryStore();

	return useQuery({
		queryKey: useQueryKeys.categories,
		queryFn: fetchCategory,
		staleTime: 5 * 60 * 1000
	});
}
