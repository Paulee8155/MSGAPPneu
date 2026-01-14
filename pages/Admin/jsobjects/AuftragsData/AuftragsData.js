export default {
	// Gespeicherte Aufträge
	auftraege: [
		// Beispiel-Auftrag für Max Schmidt
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
	],
	
	// Neuen Auftrag erstellen
	createAuftrag: async (datum, fahrerId, fahrerName, templateId, templateName, materialienIds) => {
		// Nächste Auftragsnummer basierend auf bestehenden IDs
		const existingIds = AuftragsData.auftraege.map(a => parseInt(a.id.substring(1)));
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

		// WICHTIG: In Appsmith muss das Array neu zugewiesen werden
		AuftragsData.auftraege = [...AuftragsData.auftraege, auftrag];

		showAlert("✓ Auftrag " + id + " für " + fahrerName + " erstellt!", "success");
		console.log("Neuer Auftrag erstellt:", auftrag);
		console.log("Alle Aufträge:", AuftragsData.auftraege);

		return auftrag;
	},
	
	// Auftrag für bestimmten Fahrer holen
	getAuftragFuerFahrer(fahrerId) {
		return this.auftraege.find(a => a.fahrerId === fahrerId && a.status === "offen");
	},
	
	// Auftrag abschließen
	closeAuftrag(auftragId) {
		const auftrag = this.auftraege.find(a => a.id === auftragId);
		if (auftrag) {
			auftrag.status = "abgeschlossen";
			showAlert("✓ Auftrag " + auftragId + " abgeschlossen!", "success");
		}
	}
}