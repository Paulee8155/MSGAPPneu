export default {
	// Gespeicherte Aufträge
	auftraege: [
		// Beispiel-Auftrag (kann gelöscht werden)
		{
			id: "A001",
			datum: "2026-01-14",
			fahrerId: 1,
			fahrerName: "Max Schmidt",
			templateId: "T001",
			templateName: "Brückenbau Standard",
			materialienIds: ["M002", "M007", "M012", "M016", "M020", "M023", "M024", "M006", "M011", "M022"],
			status: "offen"
		}
	],
	
	// Neuen Auftrag erstellen
	createAuftrag(datum, fahrerId, fahrerName, templateId, templateName, materialienIds) {
		// Nächste Auftragsnummer
		const nextNum = this.auftraege.length + 1;
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
		
		this.auftraege.push(auftrag);
		showAlert("✓ Auftrag " + id + " für " + fahrerName + " erstellt!", "success");
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