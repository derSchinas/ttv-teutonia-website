// lib/actions/common-area-actions.ts
"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const UpdateDescriptionSchema = z.object({
	id: z.string().uuid("Ungültige ID für Gemeinschaftsbereich."),
	description: z.string().optional(),
});

const AddImageSchema = z.object({
	commonAreaId: z.string().uuid("Ungültige Gemeinschaftsbereich-ID."),
	file: z.instanceof(File),
});

const RemoveImageSchema = z.object({
	imageId: z.string().uuid("Ungültige Bild-ID."),
	commonAreaId: z.string().uuid("Ungültige Gemeinschaftsbereich-ID."),
	imageUrl: z.string().url("Ungültige Bild-URL."),
});


type State = { message?: string | null; success?: boolean };

// description common area
export async function updateCommonAreaDescription(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const supabase = await createServerSupabaseClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { message: "Nicht authentifiziert.", success: false };

	const { data: profile } = await supabase
		.from("profiles")
		.select("role")
		.eq("id", user.id)
		.single();
	if (profile?.role !== "admin" && profile?.role !== "ahv") {
		return { message: "Keine Berechtigung.", success: false };
	}

	const validatedFields = UpdateDescriptionSchema.safeParse({
		id: formData.get("id"),
		description: formData.get("description"),
	});

	if (!validatedFields.success) {
		return { message: "Validierungsfehler.", success: false };
	}

	const { error } = await supabase
		.from("common_areas")
		.update({ description: validatedFields.data.description || null })
		.eq("id", validatedFields.data.id);

	if (error) {
		console.error("Error updating common area description:", error);
		return { message: "Fehler beim Speichern der Beschreibung.", success: false };
	}

	revalidatePath("/ahv/rooms/manage");
	revalidatePath("/rooms"); 
	return {
		message: "Beschreibung erfolgreich aktualisiert!",
		success: true,
	};
}

// add pic common area
export async function addCommonAreaImage(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const supabase = await createServerSupabaseClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { message: "Nicht authentifiziert.", success: false };

	const { data: profile } = await supabase
		.from("profiles")
		.select("role")
		.eq("id", user.id)
		.single();
	if (profile?.role !== "admin" && profile?.role !== "ahv") {
		return { message: "Keine Berechtigung.", success: false };
	}

	const validatedFields = AddImageSchema.safeParse({
		commonAreaId: formData.get("commonAreaId"),
		file: formData.get("file"),
	});

	if (!validatedFields.success) {
		return { message: "Validierungsfehler.", success: false };
	}

	const file = validatedFields.data.file;
	const commonAreaId = validatedFields.data.commonAreaId;
	const fileName = `${commonAreaId}/${crypto.randomUUID()}-${file.name.replace(
		/\s/g,
		"_",
	)}`;

	const { data: uploadData, error: uploadError } = await supabase.storage
		.from("common-area-images") 
		.upload(fileName, file, {
			cacheControl: "3600",
			upsert: false,
		});

	if (uploadError) {
		console.error("Error uploading image:", uploadError);
		return { message: "Fehler beim Hochladen des Bildes.", success: false };
	}

	const { data: publicUrlData } = supabase.storage
		.from("common-area-images")
		.getPublicUrl(fileName);

	const publicUrl = publicUrlData.publicUrl;

	const { error: insertError } = await supabase
		.from("common_area_images")
		.insert({ common_area_id: commonAreaId, image_url: publicUrl });

	if (insertError) {
		console.error("Error inserting image URL into DB:", insertError);
		await supabase.storage.from("common-area-images").remove([fileName]);
		return { message: "Fehler beim Speichern der Bild-Info.", success: false };
	}

	revalidatePath("/ahv/rooms/manage");
	revalidatePath("/rooms");
	return { message: "Bild erfolgreich hinzugefügt!", success: true };
}

// delete pic from common area
export async function removeCommonAreaImage(
	prevState: State,
	formData: FormData,
): Promise<State> {
	const supabase = await createServerSupabaseClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return { message: "Nicht authentifiziert.", success: false };

	const { data: profile } = await supabase
		.from("profiles")
		.select("role")
		.eq("id", user.id)
		.single();
	if (profile?.role !== "admin" && profile?.role !== "ahv") {
		return { message: "Keine Berechtigung.", success: false };
	}

	const validatedFields = RemoveImageSchema.safeParse({
		imageId: formData.get("imageId"),
		commonAreaId: formData.get("commonAreaId"),
		imageUrl: formData.get("imageUrl"),
	});

	if (!validatedFields.success) {
		return { message: "Validierungsfehler.", success: false };
	}

	const { imageId, imageUrl } = validatedFields.data;

	const filePath = imageUrl.split("common-area-images/")[1];
	if (!filePath) {
		return { message: "Fehler: Ungültiger Bildpfad.", success: false };
	}

	// delete from database
	const { error: deleteDbError } = await supabase
		.from("common_area_images")
		.delete()
		.eq("id", imageId);

	if (deleteDbError) {
		console.error("Error deleting image from DB:", deleteDbError);
		return { message: "Fehler beim Entfernen der Bild-Info.", success: false };
	}

	// delete from storage
	const { error: deleteStorageError } = await supabase.storage
		.from("common-area-images")
		.remove([filePath]);

	if (deleteStorageError) {
		console.error("Error deleting image from Storage:", deleteStorageError);
		return { message: "Bild aus DB entfernt, Fehler im Storage.", success: true };
	}

	revalidatePath("/ahv/rooms/manage");
	revalidatePath("/rooms");
	return { message: "Bild erfolgreich entfernt!", success: true };
}