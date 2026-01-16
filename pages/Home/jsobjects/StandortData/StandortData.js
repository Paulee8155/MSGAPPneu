export default {
	// Standorte aus Google Sheets Query
	standorte: getStandorte.data || [],

	// Standort nach ID finden
	getStandortById(id) {
		return this.standorte.find(s => s.id === id);
	},

	// Lesbare Bezeichnung holen
	getStandortName(id) {
		const s = this.getStandortById(id);
		return s ? s.bezeichnung : id;
	},

	// Nur Auflieger zurückgeben
	getAuflieger() {
		return this.standorte.filter(s => s.typ === "Auflieger");
	},

	// Nur Kräne zurückgeben
	getKraene() {
		return this.standorte.filter(s => s.typ === "Kran");
	},

	// Nur Lager zurückgeben
	getLager() {
		return this.standorte.filter(s => s.typ === "Lager" || s.typ === "Werkstatt");
	},

	// Daten neu laden
	refresh: async () => {
		await getStandorte.run();
	}
}
