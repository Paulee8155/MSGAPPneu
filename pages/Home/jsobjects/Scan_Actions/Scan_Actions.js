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

		// Material scannen
		const geraet = FahrerData.getAktuellesGeraet();
		MaterialData.scanMaterial(materialId, geraet);

		// Material-Name holen für besseres Feedback
		const material = MaterialData.materialien.find(m => m.id === materialId);
		const materialName = material ? material.name : materialId;

		showAlert("✓ " + materialName + " → " + geraet, "success");
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

		// Material scannen
		const geraet = FahrerData.getAktuellesGeraet();
		MaterialData.scanMaterial(scannedCode, geraet);

		// Material-Name holen für besseres Feedback
		const material = MaterialData.materialien.find(m => m.id === scannedCode);
		const materialName = material ? material.name : scannedCode;

		showAlert("✓ " + materialName + " → " + geraet, "success");
	}
}