import { StarRating } from "@/components/StarRating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContextProvider";
import { useQueryKeys } from "@/hooks/useQueryKeys";
import { ReviewRequest, ReviewResponse } from "@/model/internal/product";
import { ProductService } from "@/services/ProductService";
import { ReviewService } from "@/services/ReviewService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface ReviewSectionProps {
	productId: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
	const { user, accessToken } = useAuth();
	const queryClient = useQueryClient();
	const [showForm, setShowForm] = useState(false);
	const [formRating, setFormRating] = useState(0);
	const [formTitle, setFormTitle] = useState("");
	const [formBody, setFormBody] = useState("");
	const [page, setPage] = useState(0);

	const { data, isLoading } = useQuery({
		queryKey: useQueryKeys.productReviews(productId),
		queryFn: () => ProductService.getProductReviews(productId, page, 10).then((r) => r.data),
		enabled: !!productId
	});

	const createMutation = useMutation({
		mutationFn: (req: ReviewRequest) => ReviewService.createReview(req),
		onSuccess: () => {
			toast.success("Đánh giá của bạn đã được gửi!");
			queryClient.invalidateQueries({ queryKey: useQueryKeys.productReviews(productId) });
			setShowForm(false);
			setFormRating(0);
			setFormTitle("");
			setFormBody("");
		},
		onError: () => {
			toast.error("Không thể gửi đánh giá. Vui lòng thử lại.");
		}
	});

	const deleteMutation = useMutation({
		mutationFn: (reviewId: number) => ReviewService.deleteReview(reviewId),
		onSuccess: () => {
			toast.success("Đã xóa đánh giá");
			queryClient.invalidateQueries({ queryKey: useQueryKeys.productReviews(productId) });
		},
		onError: () => toast.error("Không thể xóa đánh giá")
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (formRating === 0) {
			toast.error("Vui lòng chọn số sao đánh giá");
			return;
		}
		if (formBody.trim().length < 10) {
			toast.error("Nội dung đánh giá phải có ít nhất 10 ký tự");
			return;
		}
		createMutation.mutate({ productId, rating: formRating, title: formTitle || undefined, body: formBody });
	};

	const reviews: ReviewResponse[] = data?.content ?? [];
	const totalElements = data?.totalElements ?? 0;

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-semibold text-gray-900">
					Đánh giá từ khách hàng
					{totalElements > 0 && (
						<span className="ml-2 text-sm font-normal text-gray-500">({totalElements} đánh giá)</span>
					)}
				</h3>
				{accessToken && user && (
					<Button variant="outline" size="sm" onClick={() => setShowForm((v) => !v)}>
						{showForm ? "Hủy" : "Viết đánh giá"}
					</Button>
				)}
			</div>

			{/* Write Review Form */}
			{showForm && (
				<form onSubmit={handleSubmit} className="border border-gray-200 rounded-xl p-5 space-y-4 bg-gray-50">
					<div>
						<p className="text-sm font-medium text-gray-700 mb-2">Đánh giá của bạn *</p>
						<StarRating rating={formRating} size="lg" interactive onRatingChange={setFormRating} />
					</div>
					<div>
						<label className="text-sm font-medium text-gray-700 block mb-1">Tiêu đề (tuỳ chọn)</label>
						<input
							type="text"
							maxLength={100}
							value={formTitle}
							onChange={(e) => setFormTitle(e.target.value)}
							placeholder="Tóm tắt đánh giá..."
							className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="text-sm font-medium text-gray-700 block mb-1">Nội dung *</label>
						<Textarea
							value={formBody}
							onChange={(e) => setFormBody(e.target.value)}
							placeholder="Chia sẻ trải nghiệm của bạn về cuốn sách này... (tối thiểu 10 ký tự)"
							rows={4}
							maxLength={2000}
						/>
						<p className="text-xs text-gray-400 mt-1 text-right">{formBody.length}/2000</p>
					</div>
					<div className="flex gap-2 justify-end">
						<Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
							Hủy
						</Button>
						<Button type="submit" size="sm" disabled={createMutation.isPending}>
							{createMutation.isPending ? "Đang gửi..." : "Gửi đánh giá"}
						</Button>
					</div>
				</form>
			)}

			{/* Review List */}
			{isLoading ? (
				<div className="space-y-4">
					{[1, 2, 3].map((i) => (
						<div key={i} className="flex gap-3">
							<Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
							<div className="flex-1 space-y-2">
								<Skeleton className="h-4 w-1/4" />
								<Skeleton className="h-3 w-1/3" />
								<Skeleton className="h-4 w-full" />
								<Skeleton className="h-4 w-5/6" />
							</div>
						</div>
					))}
				</div>
			) : reviews.length === 0 ? (
				<div className="text-center py-10 text-gray-500">
					<p className="text-sm">Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá cuốn sách này!</p>
				</div>
			) : (
				<div className="divide-y divide-gray-100">
					{reviews.map((review) => (
						<ReviewCard
							key={review.id}
							review={review}
							currentUserId={user?._id}
							onDelete={(id) => deleteMutation.mutate(id)}
							isDeleting={deleteMutation.isPending}
						/>
					))}
				</div>
			)}

			{/* Load More */}
			{data && data.totalPages > page + 1 && (
				<div className="text-center pt-2">
					<Button variant="ghost" size="sm" onClick={() => setPage((p) => p + 1)}>
						<ChevronDown className="w-4 h-4 mr-1" />
						Xem thêm đánh giá
					</Button>
				</div>
			)}
		</div>
	);
};

// ─── ReviewCard ───────────────────────────────────────────────────

interface ReviewCardProps {
	review: ReviewResponse;
	currentUserId?: number;
	onDelete: (id: number) => void;
	isDeleting: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, currentUserId, onDelete, isDeleting }) => {
	const initials = `${review.user.firstName?.[0] ?? ""}${review.user.lastName?.[0] ?? ""}`.toUpperCase();
	const isOwner = currentUserId != null && review.user.id === currentUserId;

	return (
		<div className="py-5 flex gap-4">
			<Avatar className="w-10 h-10 flex-shrink-0">
				{review.user.photos && <AvatarImage src={review.user.photos} alt={review.user.username} />}
				<AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-medium">{initials || "U"}</AvatarFallback>
			</Avatar>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<div>
						<p className="text-sm font-medium text-gray-900">
							{review.user.firstName} {review.user.lastName}
						</p>
						<div className="flex items-center gap-2 mt-0.5">
							<StarRating rating={review.rating} size="sm" />
							{review.verifiedPurchase && (
								<Badge variant="outline" className="text-xs text-green-600 border-green-200 py-0 px-1.5">
									<CheckCircle className="w-3 h-3 mr-1" />
									Đã mua hàng
								</Badge>
							)}
						</div>
					</div>
					<div className="flex items-center gap-2 flex-shrink-0">
						<span className="text-xs text-gray-400">{new Date(review.crtDt).toLocaleDateString("vi-VN")}</span>
						{isOwner && (
							<Button
								variant="ghost"
								size="sm"
								className="text-red-500 hover:text-red-700 h-6 px-2 text-xs"
								onClick={() => onDelete(review.id)}
								disabled={isDeleting}>
								Xóa
							</Button>
						)}
					</div>
				</div>
				{review.title && <p className="text-sm font-semibold text-gray-800 mt-2">{review.title}</p>}
				<p className="text-sm text-gray-700 mt-1 leading-relaxed">{review.body}</p>
			</div>
		</div>
	);
};
