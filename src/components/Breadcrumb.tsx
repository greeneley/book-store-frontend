import {
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	Breadcrumb as BreadcrumbMain,
	BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import React from "react";
import { useLocation } from "react-router-dom";

export const Breadcrumb: React.FC = () => {
	const location = useLocation();
	const paths = location.pathname.split("/").filter(Boolean);
	return (
		<BreadcrumbMain>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{paths.map((path, index) => {
					const isLast = index === paths.length - 1;

					return (
						<>
							<BreadcrumbItem key={path}>
								<BreadcrumbLink href={path}>{path}</BreadcrumbLink>
							</BreadcrumbItem>
							{!isLast && <BreadcrumbSeparator />}
						</>
					);
				})}
			</BreadcrumbList>
		</BreadcrumbMain>
	);
};
