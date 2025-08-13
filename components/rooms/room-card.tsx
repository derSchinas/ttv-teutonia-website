// components/rooms/room-card.tsx
"use client";

import type { Room } from "@/app/rooms/page";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Dialog,
	DialogContent,
	DialogDescription, // Hinzugefügt
	DialogTitle, // Hinzugefügt
} from "@/components/ui/dialog";

interface RoomCardProps {
	room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState(0);

	const hasMultipleImages = room.room_images && room.room_images.length > 1;

	const handleImageClick = (index: number) => {
		setSelectedImageIndex(index);
		setDialogOpen(true);
	};

	return (
		<>
			<Card className="flex flex-col overflow-hidden p-0 shadow-md">
				{room.room_images && room.room_images.length > 0 ? (
					<Carousel className="group relative w-full">
						<CarouselContent>
							{room.room_images.map((image, index) => (
								<CarouselItem
									key={image.id}
									onClick={() => handleImageClick(index)}
									className="cursor-pointer"
								>
									<div className="relative aspect-video">
										<Image
											src={image.image_url}
											alt={
												image.alt_text || `Bild von ${room.room_number}`
											}
											fill
											className="object-cover"
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						{hasMultipleImages && (
							<>
								<CarouselPrevious className="absolute left-2 opacity-0 transition-opacity group-hover:opacity-100" />
								<CarouselNext className="absolute right-2 opacity-0 transition-opacity group-hover:opacity-100" />
							</>
						)}
					</Carousel>
				) : (
					<div className="flex aspect-video items-center justify-center bg-gray-100 text-sm text-gray-400">
						Kein Bild verfügbar
					</div>
				)}

				<div className="flex flex-grow flex-col p-6">
					<CardHeader className="p-0">
						<CardTitle>{room.room_number}</CardTitle>
					</CardHeader>
					<CardContent className="flex-grow p-0 pt-4">
						<div className="mb-4 text-sm text-gray-600">
							{room.size_sqm && <span>{room.size_sqm}m²</span>}
							{room.size_sqm && room.price_per_month && (
								<span className="mx-2">|</span>
							)}
							{room.price_per_month && (
								<span>{room.price_per_month} €/Monat</span>
							)}
						</div>
						<Badge
							variant={room.is_available ? "success" : "destructive"}
						>
							{room.is_available ? "Frei" : "Besetzt"}
						</Badge>
					</CardContent>
				</div>
			</Card>

			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogContent className="max-h-[90vh] max-w-[90vw] p-2">
					{/* === HIER IST DIE KORREKTUR === */}
					<DialogTitle className="sr-only">
						Bilder von {room.room_number}
					</DialogTitle>
					<DialogDescription className="sr-only">
						Blättern Sie durch die Bilder des Zimmers.
					</DialogDescription>

					<Carousel
						opts={{ startIndex: selectedImageIndex, loop: true }}
						className="h-full w-full"
					>
						<CarouselContent>
							{room.room_images.map(image => (
								<CarouselItem key={image.id} className="h-full">
									<div className="relative flex h-full max-h-[85vh] w-full items-center justify-center">
										<Image
											src={image.image_url}
											alt={
												image.alt_text || `Bild von ${room.room_number}`
											}
											width={1920}
											height={1080}
											className="h-full w-full object-contain"
										/>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						{hasMultipleImages && (
							<>
								<CarouselPrevious className="absolute left-4" />
								<CarouselNext className="absolute right-4" />
							</>
						)}
					</Carousel>
				</DialogContent>
			</Dialog>
		</>
	);
}