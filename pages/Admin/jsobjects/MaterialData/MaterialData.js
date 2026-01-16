export default {
	// Materialien aus Google Sheets Query
	materialien: getMaterialien.data || [],

	// Material nach ID finden
	getMaterialById(id) {
		return this.materialien.find(m => m.id === id);
	},

	// Materialien an einem bestimmten Standort
	getMaterialienAnStandort(locationId) {
		return this.materialien.filter(m => m.currentLocationId === locationId);
	},

	// Material umbuchen (UPDATE in Google Sheets + Historie)
	updateLocation: async (materialId, newLocationId, benutzer) => {
		// RowIndex berechnen (Array-Index + 2 weil Header = Zeile 1)
		const data = getMaterialien.data || [];
		const index = data.findIndex(m => m.id === materialId);
		if (index === -1) {
			showAlert("Material " + materialId + " nicht gefunden!", "error");
			return false;
		}

		const rowIndex = index + 2;
		const material = data[index];
		const vonStandort = material.currentLocationId;

		// 1. Update in Google Sheets
		await updateMaterialStandort.run({
			rowIndex: rowIndex,
			newLocationId: newLocationId
		});

		// 2. Historie-Eintrag erstellen
		await insertHistorie.run({
			timestamp: new Date().toISOString(),
			benutzer: benutzer,
			materialId: materialId,
			vonStandort: vonStandort,
			zuStandort: newLocationId,
			aktion: "umgelagert"
		});

		// 3. Daten neu laden
		await getMaterialien.run();

		return true;
	},

	// Daten neu laden
	refresh: async () => {
		await getMaterialien.run();
	}
}
