export default {
	// Button-Scan
	scanItem: async (materialId) => {
		// Prüfen ob Fahrer ausgewählt
		if (!FahrerData.aktuellerFahrer) {
			showAlert("⚠️ Bitte erst Fahrer auswählen!", "warning");
			return;
		}
		
		const geraet = FahrerData.getAktuellesGeraet();
		MaterialData1.scanMaterial(materialId, geraet);
		showAlert("✓ " + materialId + " → " + geraet, "success");
	},
	
	// QR-Scan
	scanQRCode: async () => {
		// Prüfen ob Fahrer ausgewählt
		if (!FahrerData.aktuellerFahrer) {
			showAlert("⚠️ Bitte erst Fahrer auswählen!", "warning");
			return;
		}
		
		const scannedCode = Camera1.value;
		const geraet = FahrerData.getAktuellesGeraet();
		
		if (scannedCode) {
			MaterialData1.scanMaterial(scannedCode, geraet);
			showAlert("✓ " + scannedCode + " → " + geraet, "success");
		} else {
			showAlert("⚠️ Kein Code erkannt", "warning");
		}
	}
}