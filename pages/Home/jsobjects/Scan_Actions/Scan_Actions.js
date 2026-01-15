export default {
	// Button-Scan
	scanItem: async (materialId) => {
		// Prüfen ob Fahrer ausgewählt
		if (!FahrerData.aktuellerFahrer) {
			showAlert("⚠️ Bitte erst Fahrer auswählen!", "warning");
			return;
		}

		// Prüfen ob Auftrag vorhanden
		const auftrag = AuftragsData.getAuftragFuerFahrer(FahrerData.aktuellerFahrer.id);
		if (!auftrag) {
			showAlert("⚠️ Kein Auftrag für diesen Fahrer gefunden!", "error");
			return;
		}

		// Prüfen ob Material im Auftrag enthalten ist
		if (!auftrag.materialienIds.includes(materialId)) {
			showAlert("⚠️ Material " + materialId + " ist nicht in diesem Auftrag!", "warning");
			return;
		}

		// Material-Objekt holen
		const material = MaterialData.materialien.find(m => m.id === materialId);
		if (!material) {
			showAlert("⚠️ Material " + materialId + " nicht gefunden!", "error");
			return;
		}

		// Prüfen ob bereits gescannt
		if (material.gescannt) {
			showAlert("ℹ️ " + material.name + " wurde bereits gescannt", "info");
			return;
		}

		// Material scannen
		const geraet = FahrerData.getAktuellesGeraet();
		const vonStandort = material.standort;
		MaterialData.scanMaterial(materialId, geraet);

		// Historie-Eintrag (ASYNC - warten auf Store-Speicherung)
		await HistorieData.addScanEntry(
			materialId,
			material.name,
			FahrerData.aktuellerFahrer.id,
			FahrerData.aktuellerFahrer.name,
			auftrag.id,
			vonStandort,
			geraet
		);

		showAlert("✓ " + material.name + " → " + geraet, "success");
	},

	// QR-Scan
	scanQRCode: async () => {
		// Prüfen ob Fahrer ausgewählt
		if (!FahrerData.aktuellerFahrer) {
			showAlert("⚠️ Bitte erst Fahrer auswählen!", "warning");
			return;
		}

		// Prüfen ob Auftrag vorhanden
		const auftrag = AuftragsData.getAuftragFuerFahrer(FahrerData.aktuellerFahrer.id);
		if (!auftrag) {
			showAlert("⚠️ Kein Auftrag für diesen Fahrer gefunden!", "error");
			return;
		}

		const scannedCode = Camera1.value;

		if (!scannedCode) {
			showAlert("⚠️ Kein Code erkannt", "warning");
			return;
		}

		// Prüfen ob Material im Auftrag enthalten ist
		if (!auftrag.materialienIds.includes(scannedCode)) {
			showAlert("⚠️ Material " + scannedCode + " ist nicht in diesem Auftrag!", "warning");
			return;
		}

		// Material-Objekt holen
		const material = MaterialData.materialien.find(m => m.id === scannedCode);
		if (!material) {
			showAlert("⚠️ Material " + scannedCode + " nicht gefunden!", "error");
			return;
		}

		// Prüfen ob bereits gescannt
		if (material.gescannt) {
			showAlert("ℹ️ " + material.name + " wurde bereits gescannt", "info");
			return;
		}

		// Material scannen
		const geraet = FahrerData.getAktuellesGeraet();
		const vonStandort = material.standort;
		MaterialData.scanMaterial(scannedCode, geraet);

		// Historie-Eintrag (ASYNC - warten auf Store-Speicherung)
		await HistorieData.addScanEntry(
			scannedCode,
			material.name,
			FahrerData.aktuellerFahrer.id,
			FahrerData.aktuellerFahrer.name,
			auftrag.id,
			vonStandort,
			geraet
		);

		showAlert("✓ " + material.name + " → " + geraet, "success");
	}
}