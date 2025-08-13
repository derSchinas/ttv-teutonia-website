// app/(auth)/ahv/members/page.tsx

import { MembersList } from "@/components/ahv/members-list";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export type Profile = {
	id: string;
	first_name: string | null;
	last_name: string | null;
	email: string | null;
	role: "member" | "ahv" | "admin" | null;
};

async function getMembers(): Promise<Profile[]> {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase
		.from("profiles")
		.select("id, first_name, last_name, email, role")
		.order("last_name", { ascending: true });

	if (error) {
		console.error("Error fetching members:", error);
		return [];
	}
	return data as Profile[];
}

export default async function MembersPage() {
	const members = await getMembers();

	return (
		<div className="container mx-auto px-4 py-8">
			{/* === HIER IST DIE KORREKTUR === */}
			<div className="mb-8">
				<Link
					href="/ahv"
					className="text-sm text-violet-600 hover:underline"
				>
					&larr; Zurück zum AHV-Bereich
				</Link>
				<div className="mt-2 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold">Mitgliederverwaltung</h1>
						<p className="text-gray-600">
							Übersicht aller Mitglieder der TTV Teutonia.
						</p>
					</div>
					<Link href="/ahv/members/create">
						<Button>+ Neues Mitglied anlegen</Button>
					</Link>
				</div>
			</div>

			<MembersList members={members} />
		</div>
	);
}