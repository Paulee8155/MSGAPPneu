export default {
	materialien: getMaterialien.data || [],

	getMaterialById(id) {
		return this.materialien.find(m => m.id === id);
	},

	// Generiert die nächste M-ID (z.B. M031) basierend auf den Sheets-Daten
	getNextId() {
		const data = getMaterialien.data || [];
		const ids = data.map(m => {
			const num = parseInt(m.id.replace("M", ""));
			return isNaN(num) ? 0 : num;
		});
		const maxId = ids.length > 0 ? Math.max(...ids) : 0;
		const nextId = maxId + 1;
		return "M" + nextId.toString().padStart(3, '0');
	},

	addMaterial: async (id, name, kategorie, standort) => {
		await insertMaterial.run({
			id: id,
			name: name,
			bildUrl: "https://placehold.co/400x300/003366/white?text=" + name.replace(/ /g, "+"),
			currentLocationId: standort,
			status: "OK",
			kategorie: kategorie,
			gewicht: 0
		});
		await getMaterialien.run();
		return true;
	},

	editMaterial: async (id, name, kategorie, standort) => {
		const data = getMaterialien.data || [];
		const index = data.findIndex(m => m.id === id);
		if (index === -1) return false;
		const rowIndex = index + 2;
		await updateMaterial.run({
			rowIndex: rowIndex,
			name: name,
			kategorie: kategorie,
			currentLocationId: standort
		});
		await getMaterialien.run();
		return true;
	},

	deleteMaterial: async (id) => {
		const data = getMaterialien.data || [];
		const index = data.findIndex(m => m.id === id);
		if (index === -1) return false;
		const rowIndex = index + 2;
		await deleteMaterial.run({ rowIndex: rowIndex });
		await getMaterialien.run();
		return true;
	}
}