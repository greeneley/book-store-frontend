import { useQueryKeys } from "@/hooks/useQueryKeys";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useQuery } from "@tanstack/react-query";

export function useCategory() {
	const { fetchCategory } = useCategoryStore();

	return useQuery({
		queryKey: useQueryKeys.categories,
		queryFn: fetchCategory
	});
}
