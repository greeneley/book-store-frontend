import { useCartSync } from "@/hooks/useCartSync";
import React from "react";

export const CartSync: React.FC = () => {
	try {
		useCartSync();
	} catch (error) {
		console.error("Error in CartSync component:", error);
	}
	return null; // This component doesn't render anything
};
