// app/semesterprogramm/page.tsx

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Download, CalendarPlus } from "lucide-react";
// === KORREKTUR: Neue Komponenten importieren ===
import { PageHeader } from "@/components/layout/page-header";
import { CallToActionSection } from "@/components/layout/call-to-action";

export default function SemesterprogrammPage() {
	const googleCalendarId = "ttv.teutonia.reutlingen@gmail.com";
	const embedUrl = `https://calendar.google.com/calendar/embed?src=${encodeURIComponent(
		googleCalendarId,
	)}&ctz=Europe%2FBerlin`;
	const icsUrl = `https://calendar.google.com/calendar/ical/${encodeURIComponent(
		googleCalendarId,
	)}/public/basic.ics`;

	return (
		// === KORREKTUR: Hintergrund auf weiß setzen ===
		<div className="bg-white">
			{/* === KORREKTUR: PageHeader verwenden === */}
			<PageHeader
				title="Semesterprogramm"
				subtitle="Alle Termine und Veranstaltungen auf einen Blick. Synchronisiere den Kalender mit deinem Gerät."
			/>

			{/* === KORREKTUR: Hauptinhalt in eine <section> packen === */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Download className="h-5 w-5" />
									Kalender herunterladen
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="mb-4 text-sm text-gray-600">
									Lade die Termine als ICS-Datei herunter, um sie in
									Outlook, Apple Kalender oder andere Apps zu
									importieren.
								</p>
								<a href={icsUrl} download>
									<Button className="w-full">
										ICS-Datei herunterladen
									</Button>
								</a>
							</CardContent>
						</Card>
						<Card className="md:col-span-2">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<CalendarPlus className="h-5 w-5" />
									Mit Google Kalender synchronisieren
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="mb-4 text-sm text-gray-600">
									Klicke unten rechts im Kalender auf das blaue
									"+"-Symbol, um alle Termine direkt mit deinem
									Google-Konto zu synchronisieren.
								</p>
							</CardContent>
						</Card>
					</div>

					<div className="aspect-video w-full rounded-lg bg-white p-2 shadow-lg">
						<iframe
							src={embedUrl}
							style={{ borderWidth: 0 }}
							width="100%"
							height="100%"
							frameBorder="0"
							scrolling="no"
						></iframe>
					</div>
				</div>
			</section>

			{/* === KORREKTUR: Call-to-Action hinzufügen === */}
			<CallToActionSection
				title="Komm vorbei!"
				subtitle="Besuche eine unserer öffentlichen Veranstaltungen und lerne uns persönlich kennen. Wir freuen uns auf dich."
				buttonText="Kontakt aufnehmen"
				buttonLink="/contact"
			/>
		</div>
	);
}