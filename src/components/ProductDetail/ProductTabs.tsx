import { ReviewSection } from "@/components/ProductDetail/ReviewSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/model/internal/product";
import React from "react";

interface ProductTabsProps {
	product: Product;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({ product }) => {
	return (
		<Tabs defaultValue="description" className="w-full">
			<TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto pb-0 gap-1">
				<TabsTrigger
					value="description"
					className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent bg-transparent text-gray-600 pb-3 px-4">
					Mô tả
				</TabsTrigger>
				<TabsTrigger
					value="specifications"
					className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent bg-transparent text-gray-600 pb-3 px-4">
					Thông số
				</TabsTrigger>
				<TabsTrigger
					value="reviews"
					className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent bg-transparent text-gray-600 pb-3 px-4">
					Đánh giá
				</TabsTrigger>
				<TabsTrigger
					value="qa"
					className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-700 data-[state=active]:bg-transparent bg-transparent text-gray-600 pb-3 px-4">
					Hỏi & Đáp
				</TabsTrigger>
			</TabsList>

			{/* Description Tab */}
			<TabsContent value="description" className="mt-6">
				{product.description ? (
					<div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
						{product.description}
					</div>
				) : (
					<p className="text-gray-500 text-sm">Chưa có mô tả cho sản phẩm này.</p>
				)}
			</TabsContent>

			{/* Specifications Tab */}
			<TabsContent value="specifications" className="mt-6">
				<SpecificationsTable product={product} />
			</TabsContent>

			{/* Reviews Tab */}
			<TabsContent value="reviews" className="mt-6">
				<ReviewSection productId={product.id} />
			</TabsContent>

			{/* Q&A Tab */}
			<TabsContent value="qa" className="mt-6">
				<div className="text-center py-10 text-gray-500">
					<p className="text-sm">Chức năng hỏi & đáp sẽ sớm ra mắt.</p>
				</div>
			</TabsContent>
		</Tabs>
	);
};

// ─── Specifications Table ─────────────────────────────────────────

const SpecificationsTable: React.FC<{ product: Product }> = ({ product }) => {
	// Map ProductAttribute list into displayable key-value pairs
	const attributeRows = product.productAttributes.map((pa) => ({
		label: pa.attribute?.name ?? "Thuộc tính",
		value: pa.attribute?.name ?? "—"
	}));

	const baseRows = [
		{ label: "Tác giả", value: product.author || "—" },
		{ label: "Tồn kho", value: product.stock != null ? `${product.stock} cuốn` : "—" },
		{
			label: "Danh mục",
			value:
				product.productCategories.length > 0
					? product.productCategories
							.map((pc) => pc.cat?.name)
							.filter(Boolean)
							.join(", ")
					: "—"
		}
	];

	const allRows = [...baseRows, ...attributeRows];

	return (
		<div className="overflow-hidden rounded-xl border border-gray-200">
			<table className="w-full text-sm">
				<tbody>
					{allRows.map((row, idx) => (
						<tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
							<td className="px-4 py-3 font-medium text-gray-600 w-1/3 border-r border-gray-100">{row.label}</td>
							<td className="px-4 py-3 text-gray-800">{row.value}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
