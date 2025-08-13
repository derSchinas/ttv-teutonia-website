// app/rooms/page.tsx

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { RoomCard } from "@/components/rooms/room-card";
import { PageHeader } from "@/components/layout/page-header";
import { CallToActionSection } from "@/components/layout/call-to-action";
// === NEU: Import für die neuen Komponenten ===
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

// Typen bleiben unverändert
export type RoomImage = {
	id: string;
	image_url: string;
	alt_text: string | null;
};

export type Room = {
	id: string;
	room_number: string;
	is_available: boolean;
	size_sqm: number | null;
	price_per_month: number | null;
	room_images: RoomImage[];
};

// Datenlade-Funktion bleibt unverändert
async function getRooms(): Promise<Room[]> {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase
		.from("rooms")
		.select("*, room_images(*)")
		.order("room_number");

	if (error) {
		console.error("Error fetching rooms:", error);
		return [];
	}
	return data as Room[];
}

// === NEU: Daten für die Gemeinschaftsräume (vorerst hartcodiert) ===
const gemeinschaftsraeume = {
	images: [
		{
			src: "/gemeinschaft/bar.jpg",
			alt: "Unsere gut ausgestattete Bar im Keller",
		},
		{
			src: "/gemeinschaft/wohnzimmer.jpg",
			alt: "Gemütliches Wohnzimmer mit Fernseher und Sofas",
		},
		{
			src: "/gemeinschaft/garten.jpg",
			alt: "Garten mit Grillplatz für gemeinsame Abende",
		},
	],
	description:
		"Neben den privaten Zimmern bieten wir eine Vielzahl an Gemeinschaftsräumen, die allen Mitgliedern zur Verfügung stehen. Unsere große Bar im Keller ist der Mittelpunkt vieler gemeinsamer Abende. Das gemütliche Wohnzimmer lädt zum Entspannen und gemeinsamen Fernsehen ein. Im Sommer ist unser Garten mit Grillplatz der perfekte Ort, um das Wetter zu genießen und zusammenzukommen. Diese Räume fördern den Zusammenhalt und bieten Platz für Studium, Freizeit und Feste.",
};

export default async function RoomsPage() {
	const rooms = await getRooms();

	return (
		<div className="bg-white">
			<PageHeader
				title="Unsere Zimmer & Räumlichkeiten"
				subtitle="Finde dein neues Zuhause in unserer Gemeinschaft."
			/>

			<section className="py-16">
				<div className="container mx-auto px-4">
					<h2 className="mb-8 text-center text-3xl font-bold">
						Private Studentenzimmer
					</h2>
					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
						{rooms.map(room => (
							<RoomCard key={room.id} room={room} />
						))}
					</div>
				</div>
			</section>

			{/* === NEU: Sektion für Gemeinschaftsräume === */}
			<section className="bg-gray-50 py-16">
				<div className="container mx-auto px-4">
					<h2 className="mb-8 text-center text-3xl font-bold">
						Unsere Gemeinschaftsbereiche
					</h2>
					<div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
						<Carousel className="w-full">
							<CarouselContent>
								{gemeinschaftsraeume.images.map((image, index) => (
									<CarouselItem key={index}>
										<Card className="overflow-hidden">
											<CardContent className="p-0">
												<div className="relative aspect-video">
													<Image
														src={image.src}
														alt={image.alt}
														fill
														className="object-cover"
													/>
												</div>
											</CardContent>
										</Card>
									</CarouselItem>
								))}
							</CarouselContent>
							<CarouselPrevious className="left-4" />
							<CarouselNext className="right-4" />
						</Carousel>
						<div className="text-gray-700">
							<p>{gemeinschaftsraeume.description}</p>
						</div>
					</div>
				</div>
			</section>

			<CallToActionSection
				title="Interesse an einem Zimmer?"
				subtitle="Wenn du ein günstiges Zimmer in zentraler Lage suchst und Teil einer starken Gemeinschaft werden möchtest, bist du bei uns genau richtig."
				buttonText="Jetzt bewerben"
				buttonLink="/contact"
			/>
		</div>
	);
}