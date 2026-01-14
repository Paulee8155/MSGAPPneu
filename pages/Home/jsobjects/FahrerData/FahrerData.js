export default {
	// Fahrer-Liste mit Standard-Fahrzeug
	fahrer: [
		{ id: 1, name: "Max Schmidt", geraet: "LKW-7" },
		{ id: 2, name: "Andreas Müller", geraet: "LKW-3" },
		{ id: 3, name: "Mehmet Yilmaz", geraet: "LKW-5" },
		{ id: 4, name: "Hans Weber", geraet: "Kran-2" },
		{ id: 5, name: "Thomas Klein", geraet: "LKW-1" }
	],
	
	// Aktuell ausgewählter Fahrer
	aktuellerFahrer: null,
	
	// Aktuell ausgewählter Standort für Scan
	aktuellerStandort: null,
	
	// Fahrer auswählen
	setFahrer(fahrerId) {
		const fahrer = this.fahrer.find(f => f.id === fahrerId);
		if (fahrer) {
			this.aktuellerFahrer = fahrer;
			showAlert("✓ Willkommen " + fahrer.name + "!", "success");
			return fahrer;
		}
		return null;
	},
	
	// Aktuelles Gerät holen
	getAktuellesGeraet() {
		if (this.aktuellerFahrer) {
			return this.aktuellerFahrer.geraet;
		}
		return null;
	},
	
	// Standort setzen für Beladen/Entladen
	setStandort(standortCode) {
		this.aktuellerStandort = standortCode;
		showAlert("📍 Standort: " + standortCode, "info");
	}
}