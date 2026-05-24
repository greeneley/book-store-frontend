import React from "react";

interface StarRatingProps {
	rating: number; // 1-5, supports decimals
	maxStars?: number;
	size?: "sm" | "md" | "lg";
	interactive?: boolean;
	onRatingChange?: (rating: number) => void;
}

const SIZE_MAP = {
	sm: "w-3 h-3",
	md: "w-4 h-4",
	lg: "w-6 h-6"
};

export const StarRating: React.FC<StarRatingProps> = ({
	rating,
	maxStars = 5,
	size = "md",
	interactive = false,
	onRatingChange
}) => {
	const [hovered, setHovered] = React.useState<number | null>(null);
	const starSize = SIZE_MAP[size];

	const getStarFill = (starIndex: number): "full" | "half" | "empty" => {
		const displayRating = hovered !== null ? hovered : rating;
		if (displayRating >= starIndex) return "full";
		if (displayRating >= starIndex - 0.5) return "half";
		return "empty";
	};

	return (
		<div className="flex items-center gap-0.5" role="img" aria-label={`Rating: ${rating} out of ${maxStars}`}>
			{Array.from({ length: maxStars }, (_, i) => i + 1).map((star) => {
				const fill = getStarFill(star);
				return (
					<button
						key={star}
						type={interactive ? "button" : undefined}
						className={`${
							interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default pointer-events-none"
						} p-0 bg-transparent border-none`}
						onClick={() => interactive && onRatingChange?.(star)}
						onMouseEnter={() => interactive && setHovered(star)}
						onMouseLeave={() => interactive && setHovered(null)}
						tabIndex={interactive ? 0 : -1}
						aria-label={interactive ? `Rate ${star} stars` : undefined}>
						<svg
							className={starSize}
							viewBox="0 0 24 24"
							fill={fill === "full" ? "#f59e0b" : "none"}
							stroke="#f59e0b"
							strokeWidth="1.5">
							{fill === "half" ? (
								<>
									<defs>
										<linearGradient id={`half-${star}`}>
											<stop offset="50%" stopColor="#f59e0b" />
											<stop offset="50%" stopColor="transparent" />
										</linearGradient>
									</defs>
									<polygon
										fill={`url(#half-${star})`}
										points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
									/>
								</>
							) : (
								<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
							)}
						</svg>
					</button>
				);
			})}
		</div>
	);
};
