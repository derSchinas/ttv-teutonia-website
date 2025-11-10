// components/ahv/common-area-manager.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, XCircle } from "lucide-react";
import {
	addCommonAreaImage,
	removeCommonAreaImage,
	updateCommonAreaDescription,
} from "@/lib/actions/common-area-actions";

export type CommonAreaImage = {
	id: string;
	image_url: string;
	alt_text: string | null;
	position: number;
};

export type CommonArea = {
	id: string;
	name: string;
	description: string | null;
	common_area_images: CommonAreaImage[]; 
};

interface CommonAreaManagerProps {
	commonArea: CommonArea;
}

function SubmitButton({ isUploading = false }: { isUploading?: boolean }) {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" disabled={pending || isUploading}>
			{isUploading ? "Hochladen..." : pending ? "Speichern..." : "Speichern"}
		</Button>
	);
}

export function CommonAreaManager({ commonArea }: CommonAreaManagerProps) {
	const [descriptionState, dispatchDescription] = useActionState(
		updateCommonAreaDescription,
		{ message: null },
	);
	const [imageAddState, dispatchImageAdd] = useActionState(addCommonAreaImage, {
		message: null,
	});
	const [imageRemoveState, dispatchImageRemove] = useActionState(
		removeCommonAreaImage,
		{ message: null },
	);

	const [file, setFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	useEffect(() => {
		if (descriptionState?.message) {
			toast(descriptionState.message, {
				duration: 3000,
				position: "top-center",
			});
		}
	}, [descriptionState]);

	useEffect(() => {
		if (imageAddState?.message) {
			toast(imageAddState.message, {
				duration: 3000,
				position: "top-center",
			});
			if (imageAddState.success) {
				setFile(null); 
				setIsUploading(false);
			}
		}
	}, [imageAddState]);

	useEffect(() => {
		if (imageRemoveState?.message) {
			toast(imageRemoveState.message, {
				duration: 3000,
				position: "top-center",
			});
		}
	}, [imageRemoveState]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	const handleImageSubmit = async (formData: FormData) => {
		if (!file) {
			toast.error("Bitte wählen Sie ein Bild zum Hochladen aus.");
			return;
		}
		setIsUploading(true);
		const newFormData = new FormData();
		newFormData.append("commonAreaId", commonArea.id);
		newFormData.append("file", file);
		dispatchImageAdd(newFormData);
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Gemeinschaftsbereich verwalten</CardTitle>
				<CardDescription>
					Verwalten Sie die Beschreibung und Bilder des Hauptgemeinschaftsbereichs.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-6">
				{/* edit description */}
				<form action={dispatchDescription} className="space-y-4">
					<input type="hidden" name="id" value={commonArea.id} />
					<div>
						<Label htmlFor="description">Beschreibung</Label>
						<Textarea
							id="description"
							name="description"
							defaultValue={commonArea.description || ""}
							rows={5}
						/>
					</div>
					<SubmitButton />
				</form>

				{/* manage pictures */}
				<h3 className="text-xl font-semibold pt-4 border-t">Bilder</h3>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
					{commonArea.common_area_images.map(image => (
						<div key={image.id} className="relative aspect-video rounded-md overflow-hidden">
							<Image
								src={image.image_url}
								alt={image.alt_text || "Gemeinschaftsbereich Bild"}
								fill
								className="object-cover"
							/>
							<form action={dispatchImageRemove} className="absolute top-1 right-1">
								<input type="hidden" name="imageId" value={image.id} />
								<input type="hidden" name="commonAreaId" value={commonArea.id} />
								<input type="hidden" name="imageUrl" value={image.image_url} />
								<Button
									type="submit"
									variant="destructive"
									size="icon"
									className="h-6 w-6 rounded-full"
								>
									<XCircle className="h-4 w-4" />
									<span className="sr-only">Bild entfernen</span>
								</Button>
							</form>
						</div>
					))}
				</div>

				<form action={handleImageSubmit} className="space-y-4 border-t pt-4">
					<div>
						<Label htmlFor="imageFile">Neues Bild hinzufügen</Label>
						<Input
							id="imageFile"
							name="file"
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							required
						/>
					</div>
					<SubmitButton isUploading={isUploading} />
				</form>
			</CardContent>
			<CardFooter>
				{descriptionState?.message && (
					<p className="text-sm">
						{descriptionState.message}
					</p>
				)}
				{imageAddState?.message && (
					<p className="text-sm">
						{imageAddState.message}
					</p>
				)}
				{imageRemoveState?.message && (
					<p className="text-sm">
						{imageRemoveState.message}
					</p>
				)}
			</CardFooter>
		</Card>
	);
}