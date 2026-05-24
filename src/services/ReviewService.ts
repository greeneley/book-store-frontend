import { ReviewRequest, ReviewResponse } from "@/model/internal/product";
import ApiService from "./ApiService";

export class ReviewService {
	static async createReview(request: ReviewRequest): Promise<ReviewResponse> {
		const response = await ApiService.post<ReviewResponse>("/api/v1/reviews", request);
		return response.data;
	}

	static async deleteReview(reviewId: number): Promise<void> {
		await ApiService.delete(`/api/v1/reviews/${reviewId}`);
	}
}
