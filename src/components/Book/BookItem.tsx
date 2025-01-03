import { CartItemService } from "@/services/CartItemService";
import { CartService } from "@/services/CartService";
import { convertToCurrency } from "@/utils/helpers/convertToCurrency";
import { Button, Image } from "antd";
import Title from "antd/es/typography/Title";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AppContext } from "../../contexts/AppContextProvider";

interface BookItemProps {
	url: string;
	title: string;
	price: number;
	bookId: number;
}
export const BookItem: React.FC<BookItemProps> = (props) => {
	const { url, title, price, bookId } = props;

	const { setCountBadge } = useContext(AppContext);

	const onAddToCart = () => {
		CartItemService.addCartItem(1, bookId).then(() => {
			CartService.getCart().then((res) => {
				setCountBadge(res.data.cart_items.length);
				toast.success("Đã thêm sản phẩm vào giỏ hàng");
			});
		});
	};

	return (
		<>
			<div className="grid grid-cols-2 p-4 border-2 border-[#ebebf0] rounded-2xl mx-1 bg-white">
				<div>
					<Image src={url} />
				</div>
				<div className="flex">
					<div className="content justify-content-center p-2 flex flex-col">
						<Title level={3} className="text-base font-normal">
							{title}
						</Title>
						<div className="price flex gap-3">
							<p className="font-medium">{convertToCurrency(price * 0.8)}</p>
							<p className="font-light text-decoration-line-through">{convertToCurrency(price)}</p>
						</div>
						<Button className="mt-auto" onClick={onAddToCart}>
							<div className="flex align-items-center gap-2">Thêm vào giỏ hàng</div>
						</Button>
						<Link to={`/book/${bookId}`}>Xem chi tiết</Link>
					</div>
				</div>
			</div>
		</>
	);
};
