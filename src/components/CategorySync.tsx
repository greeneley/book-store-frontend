import React from "react";
import { useCategorySync } from "../hooks/useCategorySync";

export const CategorySync: React.FC = () => {
	try {
		useCategorySync();
	} catch (error) {
		console.error("Error in CartSync component:", error);
	}
	return null; // This component doesn't render anything
};
