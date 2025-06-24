import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Share2, ZoomIn } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";

interface ImageData {
	id: number;
	src: string;
	title: string;
	description: string;
	category: string;
	photographer?: string;
	likes: number;
	isLiked?: boolean;
	slug: string;
}

const images: ImageData[] = [
	{
		id: 1,
		src: "/assets/img/placeholder/placeholder.svg?height=400&width=600",
		title: "Sunset Over Mountains",
		description: "Beautiful sunset view over mountain ranges with golden hour lighting",
		category: "Nature",
		photographer: "John Doe",
		likes: 245,
		slug: "sunset-over-mountains"
	},
	{
		id: 2,
		src: "/assets/img/placeholder/placeholder.svg?height=400&width=600",
		title: "City Skyline at Night",
		description: "Modern city skyline illuminated against the dark night sky",
		category: "Urban",
		photographer: "Jane Smith",
		likes: 189,
		slug: "city-skyline-at-nigh"
	},
	{
		id: 3,
		src: "/assets/img/placeholder/placeholder.svg?height=400&width=600",
		title: "Ocean Waves",
		description: "Powerful ocean waves crashing against rocky coastline",
		category: "Seascape",
		photographer: "Mike Johnson",
		likes: 312,
		slug: "ocean-waves"
	},
	{
		id: 4,
		src: "/assets/img/placeholder/placeholder.svg?height=400&width=600",
		title: "Forest Path",
		description: "Peaceful walking path through dense green forest",
		category: "Nature",
		photographer: "Sarah Wilson",
		likes: 156,
		slug: "forest-path"
	},
	{
		id: 5,
		src: "/assets/img/placeholder/placeholder.svg?height=400&width=600",
		title: "Desert Landscape",
		description: "Vast desert landscape with sand dunes under clear blue sky",
		category: "Landscape",
		photographer: "David Brown",
		likes: 203,
		slug: "desert-landscape"
	},
	{
		id: 6,
		src: "/assets/img/placeholder/placeholder.svg?height=400&width=600",
		title: "Mountain Lake",
		description: "Crystal clear mountain lake reflecting snow-capped peaks",
		category: "Nature",
		photographer: "Emma Davis",
		likes: 278,
		slug: "mountain-lake"
	}
];

export const ImageCarousel: React.FC = () => {
	return (
		<>
			<div className="w-full max-w-6xl mx-auto px-4 py-8">
				<div className="mb-8 text-center">
					<h2 className="text-3xl font-bold text-gray-900 mb-2">Gallery Showcase</h2>
					<p className="text-gray-600">Discover stunning photography from around the world</p>
				</div>
				<Carousel opts={{ align: "start", loop: true }} className="w-full">
					<CarouselContent className="-ml-2 md:-ml-4">
						{images.map((image) => {
							const slug = `${image.id}-${image.slug}`;
							return (
								<CarouselItem key={image.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
									<Card className="rounded-none group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
										<CardContent className="p-0">
											<div className="relative">
												{/* Main Image */}
												<div className="relative overflow-hidden">
													<img
														src={image.src || "/placeholder.svg"}
														alt={image.title}
														className="w-full h-64 md:h-72 object-cover group-hover:scale-110 transition-transform duration-500"
													/>

													{/* Overlay on hover */}
													<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
														<div className="flex gap-2">
															<Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
																<ZoomIn className="w-4 h-4" />
															</Button>
															<Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
																<Download className="w-4 h-4" />
															</Button>
															<Button size="icon" variant="secondary" className="bg-white/90 hover:bg-white">
																<Share2 className="w-4 h-4" />
															</Button>
														</div>
													</div>
												</div>

												{/* Image Info */}
												<div className="p-4">
													<h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
														<Link to={`/products/${slug}`} key={image.id}>
															{image.title}
														</Link>
													</h3>

													<p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>

													<div className="flex items-center justify-between">
														<div className="flex items-center gap-2">
															{image.photographer && (
																<span className="text-xs text-gray-500">by {image.photographer}</span>
															)}
														</div>
													</div>
												</div>
											</div>
										</CardContent>
									</Card>
								</CarouselItem>
							);
						})}
					</CarouselContent>
					<CarouselPrevious className="left-4" />
					<CarouselNext className="right-4" />
				</Carousel>
			</div>
		</>
	);
};
