// app/(auth)/ahv/news/page.tsx

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { NewsCardActions } from "@/components/ahv/news-card-actions";
import type { NewsArticle } from "@/types/database";

export const dynamic = "force-dynamic";

async function getNews(): Promise<NewsArticle[]> {
	// ... (Funktion bleibt unverändert)
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase
		.from("news")
		.select("*, author:profiles(first_name, last_name)")
		.order("created_at", { ascending: false });

	if (error) {
		console.error("Error fetching news:", error);
		return [];
	}
	return data as NewsArticle[];
}

export default async function ManageNewsPage() {
	const newsArticles = await getNews();

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-8">
				<Link
					href="/ahv"
					className="text-sm text-violet-600 hover:underline"
				>
					&larr; Zurück zum AHV-Bereich
				</Link>
				<div className="mt-2 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold">News verwalten</h1>
						<p className="text-gray-600">
							Übersicht aller veröffentlichten und nicht veröffentlichten
							Artikel.
						</p>
					</div>
					<Link href="/ahv/news/create">
						<Button>+ Neuer Artikel</Button>
					</Link>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{newsArticles.map(article => (
					// === HIER IST DIE FINALE KORREKTUR ===
					<Card
						key={article.id}
						className="flex flex-col overflow-hidden p-0 shadow-md"
					>
						{article.featured_image && (
							<div className="relative aspect-video">
								<Image
									src={article.featured_image}
									alt={article.title}
									fill
									className="object-cover"
								/>
							</div>
						)}
						<div className="flex flex-grow flex-col p-6">
							<CardHeader className="p-0">
								<CardTitle>{article.title}</CardTitle>
								<CardDescription className="pt-2">
									Veröffentlicht am{" "}
									{new Date(article.created_at).toLocaleDateString(
										"de-DE",
									)}
								</CardDescription>
							</CardHeader>
							<CardContent className="flex-grow p-0 pt-4">
								<p className="line-clamp-3 text-sm text-gray-700">
									{article.content}
								</p>
							</CardContent>
						</div>
						<CardFooter className="p-6 pt-0">
							<NewsCardActions
								articleId={article.id}
								featuredImage={article.featured_image}
							/>
						</CardFooter>
					</Card>
				))}
				{newsArticles.length === 0 && <p>Noch keine Artikel vorhanden.</p>}
			</div>
		</div>
	);
}