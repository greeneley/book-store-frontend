import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const PasswordUpdated: React.FC = () => {
	return (
		<div className="w-full flex items-center justify-center bg-gray-50">
			<Card className="w-[350px]">
				<CardHeader className="text-center">
					<div className="flex justify-center mb-4">
						<CheckCircle className="h-12 w-12 text-green-500" />
					</div>
					<CardTitle>Password Updated</CardTitle>
					<CardDescription className="text-center">Your password has been successfully changed.</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-center text-gray-600 mb-4">
						Your account is now secured with your new password. You can use it to log in to your account.
					</p>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<Button asChild className="w-full">
						<Link to="/login" className="hover:text-primary-foreground">
							Go to Login
						</Link>
					</Button>
					<Button asChild variant="outline" className="w-full">
						<Link to="/">Return to Homepage</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};
