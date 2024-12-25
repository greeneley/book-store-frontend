import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAuth } from "@/contexts/AuthContextProvider";
import { cn } from "@/lib/utils";
import { ProfileUser } from "@/model/internal/profile-user";
import { UserService } from "@/services/UserService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { format, parse } from "date-fns";
import { CalendarIcon, Camera, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const profileFormSchema = z
	.object({
		firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
		lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
		email: z.string().email({ message: "Invalid email address." }),
		phone: z.string().min(10, { message: "Phone number must be at least 10 characters." }),
		address: z.string().min(10, { message: "Address must be at least 10 characters." }),
		birthday: z.date({
			required_error: "A date of birth is required."
		}),
		currentPassword: z.string().optional(),
		newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }).optional(),
		confirmPassword: z.string().optional()
	})
	.refine(
		(data) => {
			return !(data.newPassword && !data.currentPassword);
		},
		{
			message: "Current password is required to set a new password",
			path: ["currentPassword"]
		}
	)
	.refine(
		(data) => {
			if (data.newPassword !== data.confirmPassword) {
				return false;
			}
			return true;
		},
		{
			message: "Passwords don't match",
			path: ["confirmPassword"]
		}
	);

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export const ProfilePage: React.FC = () => {
	const [loading, setLoading] = useState(true);

	const [isLoading, setIsLoading] = useState(false);
	const [avatarFile, setAvatarFile] = useState<File | null>(null);
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
	const [imageUpload, setImageUpload] = useState<File | null>(null);

	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [profile, setProfile] = useState<ProfileUser | null>(null);
	const { user } = useAuth();
	const form = useForm<ProfileFormValues>({
		resolver: zodResolver(profileFormSchema)
	});
	useEffect(() => {
		async function fetchData() {
			return await UserService.getProfileUser();
		}
		fetchData().then((response) => {
			setProfile(response);
			setLoading(false);
			form.setValue("firstName", response.firstName);
			form.setValue("lastName", response.lastName);
			form.setValue("email", response.email);
			form.setValue("phone", response.phone);
			form.setValue("birthday", parse(response.birthday, "yyyyMMdd", new Date()));
			// form.setValue("photos", response.photos);
			setAvatarPreview(response.photos);
		});
	}, [form]);

	const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setAvatarFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarPreview(reader.result as string);
			};
			reader.readAsDataURL(file);

			setImageUpload(file);
		}
	};
	const birthday = useWatch({ control: form.control, name: "birthday" });
	const onSubmit = async (data: ProfileFormValues) => {};

	if (loading) return <div>Loading...</div>;

	return (
		<>
			{profile && (
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<Card>
						<CardHeader>
							<CardTitle>Edit Your Profile</CardTitle>
							<CardDescription>Make changes to your profile information here.</CardDescription>
						</CardHeader>
						<CardContent className="space-y-6">
							<div className="flex justify-center">
								<div className="relative">
									<Avatar className="w-32 h-32">
										<AvatarImage src={avatarPreview || "/placeholder.svg"} />
									</Avatar>
									<div className="absolute bottom-0 right-0 bg-primary rounded-full p-2 cursor-pointer">
										<Label htmlFor="avatar" className="cursor-pointer">
											<Camera className="h-4 w-4 text-primary-foreground" />
											<Input
												id="avatar"
												type="file"
												accept="image/*"
												className="hidden"
												onChange={handleAvatarChange}
											/>
										</Label>
									</div>
								</div>
							</div>
							<div className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="firstName">First Name</Label>
									<Input id="firstName" {...form.register("firstName")} />
									{form.formState.errors.firstName && (
										<p className="text-sm text-red-500">{form.formState.errors.firstName.message}</p>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="lastName">Last Name</Label>
									<Input id="lastName" {...form.register("lastName")} />
									{form.formState.errors.lastName && (
										<p className="text-sm text-red-500">{form.formState.errors.lastName.message}</p>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="email">Email</Label>
									<Input id="email" {...form.register("email")} />
									{form.formState.errors.email && (
										<p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
									)}
								</div>
								<div className="space-y-2">
									<Label htmlFor="phone">Phone</Label>
									<Input id="phone" {...form.register("phone")} />
									{form.formState.errors.phone && (
										<p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
									)}
								</div>
								<div className="space-y-2">
									<Label>Birthday</Label>
									<Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												className={cn(
													"w-full justify-start text-left font-normal",
													!birthday && "text-muted-foreground"
												)}>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{birthday ? format(birthday, "PPP") : format(new Date(), "PPP")}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0" align="start">
											<Calendar
												mode="single"
												selected={form.getValues("birthday")}
												onSelect={(date) => {
													form.setValue("birthday", date as Date);
													setIsCalendarOpen(false);
												}}
												disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
											/>
										</PopoverContent>
									</Popover>
								</div>
								<Separator />

								<div className="space-y-4">
									<h3 className="text-lg font-medium">Password Changes</h3>
									<div className="space-y-4">
										<div className="space-y-2">
											<Label htmlFor="currentPassword">Current Password</Label>
											<Input id="currentPassword" type="password" {...form.register("currentPassword")} />
											{form.formState.errors.currentPassword && (
												<p className="text-sm text-destructive">{form.formState.errors.currentPassword.message}</p>
											)}
										</div>
										<div className="space-y-2">
											<Label htmlFor="newPassword">New Password</Label>
											<Input id="newPassword" type="password" {...form.register("newPassword")} />
											{form.formState.errors.newPassword && (
												<p className="text-sm text-destructive">{form.formState.errors.newPassword.message}</p>
											)}
										</div>

										<div className="space-y-2">
											<Label htmlFor="confirmPassword">Confirm New Password</Label>
											<Input id="confirmPassword" type="password" {...form.register("confirmPassword")} />
											{form.formState.errors.confirmPassword && (
												<p className="text-sm text-destructive">{form.formState.errors.confirmPassword.message}</p>
											)}
										</div>
									</div>
								</div>
							</div>
						</CardContent>
						<div className="flex justify-end space-x-4 p-6 pt-0">
							<Button variant="outline" type="button">
								Cancel
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
									</>
								) : (
									"Save Changes"
								)}
							</Button>
						</div>
					</Card>
				</form>
			)}
		</>
	);
};
