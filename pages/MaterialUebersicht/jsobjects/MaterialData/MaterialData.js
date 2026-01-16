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

	// Daten neu laden
	refresh: async () => {
		await getMaterialien.run();
	}
}
