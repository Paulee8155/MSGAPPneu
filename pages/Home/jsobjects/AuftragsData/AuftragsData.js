export default {
	// Alle Aufträge aus Global Store abrufen (synchronisiert mit Admin-Seite!)
	auftraege: appsmith.store.auftraege || [],

	// Auftrag für bestimmten Fahrer holen
	getAuftragFuerFahrer(fahrerId) {
		const auftraege = appsmith.store.auftraege || [];
		return auftraege.find(a => a.fahrerId === fahrerId && a.status === "offen");
	},

	// Materialien für Auftrag holen (mit vollständigen Daten)
	getAuftragspositionenMitDetails(auftragId) {
		const auftraege = appsmith.store.auftraege || [];
		const auftrag = auftraege.find(a => a.id === auftragId);
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
	startAuftrag: async (auftragId) => {
		const auftraege = appsmith.store.auftraege || [];
		const auftrag = auftraege.find(a => a.id === auftragId);
		if (auftrag) {
			auftrag.status = "gestartet";
			await storeValue("auftraege", auftraege, false);
			return true;
		}
		return false;
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
