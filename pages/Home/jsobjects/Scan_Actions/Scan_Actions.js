export default {
	// Intelligenter Scan-Verteiler: Material vs Standort
	onScan: async (code) => {
		if (!code) return null;

		// Material-Code startet mit M
		if (code.startsWith("M")) {
			return await Scan_Actions.handleMaterialScan(code);
		}
		// Standort-Code startet mit LOC_
		else if (code.startsWith("LOC_")) {
			return await Scan_Actions.handleLocationScan(code);
		}
		else {
			showAlert("Unbekannter QR-Code: " + code, "error");
			return null;
		}
	},

	// Material gescannt -> Modal mit Bild oeffnen
	handleMaterialScan: async (materialId) => {
		const material = MaterialData.getMaterialById(materialId);

		if (!material) {
			showAlert("Material " + materialId + " nicht gefunden!", "error");
			return null;
		}

		// Material merken fuer naechsten Ziel-Scan
		await storeValue("scannedMaterial", material, false);

		// Modal oeffnen (zeigt Bild, Name, aktueller Standort)
		showModal("ModalMaterialDetail");

		return material;
	},

	// Ziel-Standort gescannt -> Material umbuchen
	handleLocationScan: async (targetLocationId) => {
		const material = appsmith.store.scannedMaterial;
		const fahrer = appsmith.store.aktuellerFahrer;

		// Kein Material vorher gescannt?
		if (!material) {
			// Vielleicht will Fahrer seinen Auflieger wechseln?
			const standort = StandortData.getStandortById(targetLocationId);
			if (standort && standort.typ === "Auflieger") {
				await FahrerData.setAuflieger(targetLocationId);
				return standort;
			}
			showAlert("Bitte zuerst Material scannen!", "warning");
			return null;
		}

		// Material umbuchen
		await MaterialData.updateLocation(
			material.id,
			targetLocationId,
			fahrer ? fahrer.name : "Unbekannt"
		);

		// Reset
		await storeValue("scannedMaterial", null, false);
		closeModal("ModalMaterialDetail");

		const zielName = StandortData.getStandortName(targetLocationId);
		showAlert(material.name + " -> " + zielName, "success");

		return material;
	},

	// Shortcut: Material auf aktuellen Auflieger buchen (Button im Modal)
	bucheAufAuflieger: async () => {
		const auflieger = appsmith.store.aktuellerAuflieger;
		if (!auflieger) {
			showAlert("Kein Auflieger ausgewaehlt!", "error");
			return null;
		}
		return await Scan_Actions.handleLocationScan(auflieger.id);
	},

	// Modal schliessen ohne Aktion
	abbrechen: async () => {
		await storeValue("scannedMaterial", null, false);
		closeModal("ModalMaterialDetail");
	}
}
