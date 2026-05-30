import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const CartSkeleton: React.FC = () => {
	return (
		<div className="w-full max-w-5xl mx-auto px-4 py-8">
			<div className="flex flex-col lg:flex-row gap-8">
				{/* Left */}
				<div className="flex-1 min-w-0">
					<Skeleton className="h-7 w-32 mb-6" />
					<div className="space-y-0">
						{[1, 2, 3].map((i) => (
							<div key={i} className="flex gap-4 py-5 border-b border-border">
								<Skeleton className="w-[72px] h-24 rounded-md flex-shrink-0" />
								<div className="flex-1 flex flex-col gap-3">
									<Skeleton className="h-4 w-3/4" />
									<Skeleton className="h-3 w-1/2" />
									<div className="flex items-center justify-between mt-auto">
										<Skeleton className="h-4 w-24" />
										<Skeleton className="h-8 w-28 rounded-md" />
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="mt-6">
						<Skeleton className="h-4 w-28 mb-2" />
						<Skeleton className="h-24 w-full rounded-md" />
					</div>
				</div>
				{/* Right */}
				<div className="w-full lg:w-80 flex-shrink-0">
					<div className="rounded-xl border border-border p-6 space-y-4">
						<Skeleton className="h-5 w-32" />
						<div className="space-y-2">
							<div className="flex justify-between">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-4 w-20" />
							</div>
							<div className="flex justify-between">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-4 w-16" />
							</div>
						</div>
						<Skeleton className="h-px w-full" />
						<div className="flex justify-between">
							<Skeleton className="h-5 w-24" />
							<Skeleton className="h-5 w-24" />
						</div>
						<Skeleton className="h-11 w-full rounded-md" />
					</div>
				</div>
			</div>
		</div>
	);
};
