// app/news/page.tsx

import { createServerSupabaseClient } from "@/lib/supabase/server";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { NewsArticle } from "@/types/database";
import { PageHeader } from "@/components/layout/page-header";
import { CallToActionSection } from "@/components/layout/call-to-action";

export const dynamic = "force-dynamic";

async function getPublishedNews(): Promise<NewsArticle[]> {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase
		.from("news")
		.select("*, author:profiles(first_name, last_name)")
		.eq("is_published", true)
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching published news:", error);
		return [];
	}
	return data as NewsArticle[];
}

export default async function NewsPage() {
	const articles = await getPublishedNews();

	return (
		<div className="bg-white">
			<PageHeader
				title="Neuigkeiten & Ankündigungen"
				subtitle="Bleiben Sie auf dem Laufenden über das Leben und die Veranstaltungen in unserer Verbindung."
			/>

			<section className="py-16">
				<div className="container mx-auto px-4">
					{articles.length > 0 ? (
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
							{articles.map(article => (
								<Link
									key={article.id}
									href={`/news/${article.id}`}
									className="flex"
								>
									<Card className="flex w-full flex-col overflow-hidden p-0 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
										{article.featured_image && (
											<div className="relative aspect-video">
												<Image
													src={article.featured_image}
													alt={`Titelbild für ${article.title}`}
													fill
													className="object-cover"
												/>
											</div>
										)}
										<div className="flex flex-grow flex-col p-6">
											<CardHeader className="p-0">
												<CardTitle className="text-xl">
													{article.title}
												</CardTitle>
												<CardDescription className="pt-2">
													Veröffentlicht am{" "}
													{new Date(
														article.created_at,
													).toLocaleDateString("de-DE")}
												</CardDescription>
											</CardHeader>
											<CardContent className="flex-grow p-0 pt-4">
												<p className="line-clamp-4 text-gray-700">
													{article.content}
												</p>
											</CardContent>
										</div>
									</Card>
								</Link>
							))}
						</div>
					) : (
						<div className="py-12 text-center">
							<p className="text-gray-500">
								Zurzeit gibt es keine neuen Artikel.
							</p>
						</div>
					)}
				</div>
			</section>

			<CallToActionSection
				title="Werde Teil unserer Gemeinschaft"
				subtitle="Erlebe mehr als nur dein Studium. Knüpfe Freundschaften fürs Leben und engagiere dich in unserer Verbindung."
				buttonText="Mehr über uns erfahren"
				buttonLink="/about"
			/>
		</div>
	);
}