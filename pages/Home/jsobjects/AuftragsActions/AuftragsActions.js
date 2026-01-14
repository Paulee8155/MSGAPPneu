export default {
	// Aktuellen Auftrag für ausgewählten Fahrer holen
	getAktuellerAuftrag() {
		const fahrer = FahrerData.aktuellerFahrer;
		if (!fahrer) return null;
		return AuftragsData.getAuftragFuerFahrer(fahrer.id);
	},

	// Materialien für aktuellen Auftrag holen
	getAuftragsMaterialien() {
		const auftrag = this.getAktuellerAuftrag();
		if (!auftrag) return [];
		return AuftragsData.getAuftragspositionenMitDetails(auftrag.id);
	},

	// Fortschritt für aktuellen Auftrag
	getProgress() {
		const auftrag = this.getAktuellerAuftrag();
		if (!auftrag) return { gescannt: 0, gesamt: 0, prozent: 0 };
		return AuftragsData.getAuftragProgress(auftrag.id);
	},

	// Losfahren-Funktion
	losfahren: async () => {
		const fahrer = FahrerData.aktuellerFahrer;
		const auftrag = AuftragsData.getAuftragFuerFahrer(fahrer?.id);

		if (!fahrer) {
			showAlert("⚠️ Bitte wähle zuerst einen Fahrer aus!", "warning");
			return false;
		}

		if (!auftrag) {
			showAlert("⚠️ Kein Auftrag für diesen Fahrer gefunden!", "error");
			return false;
		}

		// Prüfung: Alle Materialien gescannt?
		const progress = AuftragsData.getAuftragProgress(auftrag.id);
		if (progress.gescannt < progress.gesamt) {
			showAlert("⚠️ Bitte alle Materialien scannen! (" + progress.gescannt + "/" + progress.gesamt + ")", "warning");
			return false;
		}

		// Auftrag als "gestartet" markieren
		AuftragsData.startAuftrag(auftrag.id);

		showAlert("✅ Auftrag gestartet! Gute Fahrt, " + fahrer.name + "!", "success");
		return true;
	}
}