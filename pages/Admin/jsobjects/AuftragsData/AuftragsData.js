export default {
	// Initialisierung der Aufträge beim ersten Laden
	initAuftraege: () => {
		const stored = appsmith.store.auftraege;
		if (!stored || stored.length === 0) {
			// Beispiel-Auftrag für Max Schmidt
			const initialAuftraege = [
				{
					id: "A001",
					datum: "2026-01-14",
					fahrerId: 1,
					fahrerName: "Max Schmidt",
					templateId: "T001",
					templateName: "Brückenbau Standard",
					materialienIds: ["M005", "M006", "M012", "M022", "M029", "M034", "M036", "M037", "M041", "M045", "M046", "M049"],
					status: "offen"
				}
			];
			storeValue("auftraege", initialAuftraege, false);
		}
	},

	// Alle Aufträge abrufen
	auftraege: appsmith.store.auftraege || [],

	// Neuen Auftrag erstellen
	createAuftrag: async (datum, fahrerId, fahrerName, templateId, templateName, materialienIds) => {
		// Hole aktuelle Aufträge aus dem Store
		const currentAuftraege = appsmith.store.auftraege || [];

		// Nächste Auftragsnummer
		const existingIds = currentAuftraege.map(a => parseInt(a.id.substring(1)));
		const nextNum = existingIds.length > 0 ? Math.max(...existingIds) + 1 : 1;
		const id = "A" + String(nextNum).padStart(3, "0");

		const auftrag = {
			id: id,
			datum: datum,
			fahrerId: fahrerId,
			fahrerName: fahrerName,
			templateId: templateId,
			templateName: templateName,
			materialienIds: materialienIds,
			status: "offen"
		};

		// Neuen Auftrag zum Store hinzufügen
		const updatedAuftraege = [...currentAuftraege, auftrag];
		await storeValue("auftraege", updatedAuftraege, false);

		showAlert("✓ Auftrag " + id + " für " + fahrerName + " erstellt!", "success");
		console.log("Neuer Auftrag erstellt:", auftrag);
		console.log("Alle Aufträge:", appsmith.store.auftraege);

		return auftrag;
	},

	// Auftrag für bestimmten Fahrer holen
	getAuftragFuerFahrer(fahrerId) {
		const auftraege = appsmith.store.auftraege || [];
		return auftraege.find(a => a.fahrerId === fahrerId && a.status === "offen");
	},

	// Auftrag abschließen
	closeAuftrag: async (auftragId) => {
		const auftraege = appsmith.store.auftraege || [];
		const auftrag = auftraege.find(a => a.id === auftragId);
		if (auftrag) {
			auftrag.status = "abgeschlossen";
			await storeValue("auftraege", auftraege, false);
			showAlert("✓ Auftrag " + auftragId + " abgeschlossen!", "success");
			return true;
		}
		return false;
	}
}