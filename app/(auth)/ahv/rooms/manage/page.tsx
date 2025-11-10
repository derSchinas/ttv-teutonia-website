// app/(auth)/ahv/rooms/manage/page.tsx

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { RoomImageManager } from "@/components/ahv/room-image-manager";
import { SettingsForm } from "@/components/ahv/settings-form";
import type { Room } from "@/app/rooms/page";
import Link from "next/link";
// === NEU: Importe für CommonAreaManager ===
import { CommonAreaManager, CommonArea } from "@/components/ahv/common-area-manager";

// force reload for newest data
export const dynamic = "force-dynamic";

// Vorhandene Funktionen bleiben gleich
async function getRoomsWithImages(): Promise<Room[]> {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase
		.from("rooms")
		.select("*, room_images(*)")
		.order("room_number");

	if (error) {
		console.error("Error fetching rooms for management:", error);
		return [];
	}
	return data as Room[];
}

async function getApplicationEmail(): Promise<string> {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase
		.from("settings")
		.select("value")
		.eq("key", "application_email")
		.single();

	if (error) {
		console.error("Could not fetch application email setting:", error.message);
		return "";
	}
	return data?.value || "";
}

// === NEU: Funktion zum Holen des Gemeinschaftsbereichs ===
async function getCommonArea(): Promise<CommonArea | null> {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase
		.from("common_areas")
		.select("*, common_area_images(*)") // Bilder mitladen
		.eq("name", "Hauptgemeinschaftsbereich") // Wir holen den vordefinierten Bereich
		.single();

	if (error) {
		console.error("Error fetching common area:", error);
		return null;
	}
	return data as CommonArea;
}

export default async function ManageRoomsPage() {
	const rooms = await getRoomsWithImages();
	const applicationEmail = await getApplicationEmail();
	const commonArea = await getCommonArea(); // NEU: Daten für Gemeinschaftsbereich laden

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<Link href="/ahv" className="text-sm text-violet-600 hover:underline">
					&larr; Zurück zum AHV-Bereich
				</Link>
				<h1 className="text-3xl font-bold mt-2">Räumlichkeiten verwalten</h1>
				<p className="text-gray-600">
					Ändern Sie den Zimmerstatus, verwalten Sie Bilder, konfigurieren Sie
					Bewerbungs-E-Mails und pflegen Sie Informationen zu den
					Gemeinschaftsbereichen.
				</p>
			</div>

			{/* Formular zum Ändern der E-Mail-Adresse */}
			<div className="mb-12">
				<SettingsForm currentEmail={applicationEmail} />
			</div>

			{/* === NEU: Gemeinschaftsbereich-Verwaltung === */}
			{commonArea && (
				<div className="mb-12">
					<CommonAreaManager commonArea={commonArea} />
				</div>
			)}
			{!commonArea && (
				<div className="mb-12 p-6 rounded-md bg-red-50 border border-red-200 text-red-700">
					Fehler: Gemeinschaftsbereich konnte nicht geladen werden oder existiert nicht.
					Bitte stellen Sie sicher, dass der initiale Eintrag in der 'common_areas'-Tabelle vorhanden ist.
				</div>
			)}


			{/* Titel für den unteren Bereich (Zimmerverwaltung) */}
			<h2 className="text-2xl font-bold mb-4">Private Zimmer</h2>

			{/* Liste der Zimmer-Manager */}
			<div className="space-y-8">
				{rooms.map(room => (
					<RoomImageManager key={room.id} room={room} />
				))}
			</div>
		</div>
	);
}