export default {
	// Fahrer-Liste (hardcoded fuer Pilot, spaeter auch aus Sheets)
	fahrer: [
		{ id: 1, name: "Max Schmidt" },
		{ id: 2, name: "Andreas Mueller" },
		{ id: 3, name: "Thomas Klein" },
		{ id: 4, name: "Mehmet Yilmaz" },
		{ id: 5, name: "Stefan Wagner" },
		{ id: 6, name: "Marco Bauer" },
		{ id: 7, name: "Peter Koch" },
		{ id: 8, name: "Klaus Fischer" }
	],

	// Session-Daten aus Store
	aktuellerFahrer: appsmith.store.aktuellerFahrer || null,
	aktuellerAuflieger: appsmith.store.aktuellerAuflieger || null,

	// Fahrer auswaehlen und in Store speichern
	setFahrer: async (fahrerId) => {
		const fahrer = FahrerData.fahrer.find(f => f.id === fahrerId);
		if (fahrer) {
			await storeValue("aktuellerFahrer", fahrer, false);
			return fahrer;
		}
		return null;
	},

	// Auflieger fuer heute setzen (nach Scan oder Dropdown)
	setAuflieger: async (aufliegerId) => {
		const auflieger = StandortData.getStandortById(aufliegerId);
		if (auflieger && auflieger.typ === "Auflieger") {
			await storeValue("aktuellerAuflieger", auflieger, false);
			showAlert("Auflieger " + auflieger.bezeichnung + " ausgewaehlt!", "success");
			return auflieger;
		}
		showAlert("Ungueltiger Auflieger!", "error");
		return null;
	},

	// Aktuellen Auflieger aus Store holen
	getAktuellerAuflieger() {
		return appsmith.store.aktuellerAuflieger || null;
	},

	// Aktuellen Fahrer aus Store holen
	getAktuellerFahrer() {
		return appsmith.store.aktuellerFahrer || null;
	},

	// Login durchfuehren (Fahrer + Auflieger)
	login: async (fahrerId, aufliegerId) => {
		const fahrer = await FahrerData.setFahrer(fahrerId);
		if (!fahrer) {
			showAlert("Bitte Fahrer auswaehlen!", "error");
			return false;
		}

		const auflieger = await FahrerData.setAuflieger(aufliegerId);
		if (!auflieger) {
			return false;
		}

		showAlert("Willkommen " + fahrer.name + "! Auflieger: " + auflieger.bezeichnung, "success");
		return true;
	},

	// Logout - Session beenden
	logout: async () => {
		await storeValue("aktuellerFahrer", null, false);
		await storeValue("aktuellerAuflieger", null, false);
		await storeValue("scannedMaterial", null, false);
		showAlert("Abgemeldet!", "info");
	}
}
