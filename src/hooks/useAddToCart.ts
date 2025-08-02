import { useAuth } from "@/contexts/AuthContextProvider";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useAddToCart() {
	const { accessToken, user } = useAuth();
	const navigate = useNavigate();
	const { addToCart } = useCartStore();
	const onAddToCart = async (productId: number) => {
		if (!accessToken && !user) {
			navigate("/login");
			return;
		} else {
			try {
				await addToCart(productId, 1);
				toast.success("Đã thêm sản phẩm vào giỏ hàng");
			} catch (error) {
				toast.error("Không thể thêm sản phẩm vào giỏ hàng");
			}
		}
	};

	return { onAddToCart };
}
