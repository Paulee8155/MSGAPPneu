export default {
	// Gespeicherte Aufträge (synchronisiert mit Admin-Seite)
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

	// Auftrag für bestimmten Fahrer holen
	getAuftragFuerFahrer(fahrerId) {
		return this.auftraege.find(a => a.fahrerId === fahrerId && a.status === "offen");
	},

	// Materialien für Auftrag holen (mit vollständigen Daten)
	getAuftragspositionenMitDetails(auftragId) {
		const auftrag = this.auftraege.find(a => a.id === auftragId);
		if (!auftrag) return [];

		// Hole die Material-Objekte aus MaterialData
		return auftrag.materialienIds
			.map(matId => MaterialData.materialien.find(m => m.id === matId))
			.filter(m => m !== undefined);
	},

	// Fortschritt für Auftrag berechnen
	getAuftragProgress(auftragId) {
		const materialien = this.getAuftragspositionenMitDetails(auftragId);
		const gescannt = materialien.filter(m => m.gescannt).length;
		const gesamt = materialien.length;
		return {
			gescannt: gescannt,
			gesamt: gesamt,
			prozent: gesamt > 0 ? Math.round((gescannt / gesamt) * 100) : 0
		};
	},

	// Auftrag als gestartet markieren
	startAuftrag(auftragId) {
		const auftrag = this.auftraege.find(a => a.id === auftragId);
		if (auftrag) {
			auftrag.status = "gestartet";
			return true;
		}
		return false;
	},

	// Auftrag abschließen
	closeAuftrag(auftragId) {
		const auftrag = this.auftraege.find(a => a.id === auftragId);
		if (auftrag) {
			auftrag.status = "abgeschlossen";
			showAlert("✓ Auftrag " + auftragId + " abgeschlossen!", "success");
			return true;
		}
		return false;
	}
}
