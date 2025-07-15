import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const CartSkeleton: React.FC = () => {
	return (
		<>
			<div className="w-[1000px] mx-auto my-5 p-6 bg-white">
				<div className="grid grid-cols-3 gap-8">
					{/* Left Column */}
					<div className="col-span-2">
						<Skeleton className="h-8 w-32 mb-6" />
						{/* Skeleton for Cart Items */}
						<div className="space-y-6">
							{[1, 2, 3].map((_, index) => (
								<div key={index} className="flex items-center gap-5 p-7 border-b">
									<Skeleton className="w-4 h-4" />
									<Skeleton className="w-16 h-20 rounded" />
									<div className="flex-1">
										<Skeleton className="h-5 w-3/4 mb-2" />
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<Skeleton className="h-4 w-20" />
												<Skeleton className="h-4 w-16" />
											</div>
											<div className="flex items-center gap-3">
												<Skeleton className="w-8 h-8 rounded" />
												<Skeleton className="w-8 h-4" />
												<Skeleton className="w-8 h-8 rounded" />
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
						{/* Skeleton for Order Notes */}
						<div className="mt-8">
							<Skeleton className="h-5 w-32 mb-3" />
							<Skeleton className="h-[100px] w-full" />
						</div>
					</div>
					{/* Right Column */}
					<div className="col-span-1">
						<div className="bg-gray-50 p-6 rounded-lg sticky top-6">
							<div className="pt-4 mb-6">
								<div className="flex justify-between items-center mb-2">
									<Skeleton className="h-5 w-24" />
									<Skeleton className="h-6 w-20" />
								</div>
								<Skeleton className="h-4 w-32" />
							</div>
							<Skeleton className="h-12 w-full rounded" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
