import { CategoryService } from "@/services/CategoryService";
import { create } from "zustand";

interface State {
	category: any[];
}

interface Action {
	fetchData: () => Promise<void>;
}

const INITIAL_STATE: State = {
	category: []
};
export const useCategoryStore = create<State & Action>((set, get) => ({
	...INITIAL_STATE,
	fetchData: async () => {
		try {
			const data = await CategoryService.getCategoryAll();

			set({ category: data });
		} catch (error) {
			console.error("Error fetching data: ", error);
		}
	}
}));
