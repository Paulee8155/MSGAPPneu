export default {
	// Fahrer-Liste mit Standard-Fahrzeug (15 Geräte: 6 LKWs, 4 Auflieger, 5 Kräne)
	fahrer: [
		// LKWs (6 Stück)
		{ id: 1, name: "Max Schmidt", geraet: "LKW-1", typ: "LKW", maxZuladung: 12000 },
		{ id: 2, name: "Andreas Müller", geraet: "LKW-2", typ: "LKW", maxZuladung: 12000 },
		{ id: 3, name: "Thomas Klein", geraet: "LKW-3", typ: "LKW", maxZuladung: 12000 },
		{ id: 4, name: "Mehmet Yilmaz", geraet: "LKW-4", typ: "LKW", maxZuladung: 12000 },
		{ id: 5, name: "Stefan Wagner", geraet: "LKW-5", typ: "LKW", maxZuladung: 12000 },
		{ id: 6, name: "Marco Bauer", geraet: "LKW-6", typ: "LKW", maxZuladung: 12000 },

		// Auflieger (4 Stück)
		{ id: 7, name: "Peter Koch", geraet: "Auflieger-A1", typ: "Auflieger", maxZuladung: 24000 },
		{ id: 8, name: "Klaus Fischer", geraet: "Auflieger-A2", typ: "Auflieger", maxZuladung: 24000 },
		{ id: 9, name: "Jürgen Meyer", geraet: "Auflieger-A3", typ: "Auflieger", maxZuladung: 24000 },
		{ id: 10, name: "Ralf Schmitt", geraet: "Auflieger-A4", typ: "Auflieger", maxZuladung: 24000 },

		// Kräne (5 Stück)
		{ id: 11, name: "Hans Weber", geraet: "Kran-1", typ: "Kran", maxZuladung: 5000 },
		{ id: 12, name: "Bernd Hoffmann", geraet: "Kran-2", typ: "Kran", maxZuladung: 5000 },
		{ id: 13, name: "Martin Schulz", geraet: "Kran-3", typ: "Kran", maxZuladung: 5000 },
		{ id: 14, name: "Oliver Richter", geraet: "Kran-4", typ: "Kran", maxZuladung: 5000 },
		{ id: 15, name: "Frank Neumann", geraet: "Kran-5", typ: "Kran", maxZuladung: 5000 }
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