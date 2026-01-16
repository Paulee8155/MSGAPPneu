export default {
	// Auftraege aus Google Sheets Query
	auftraege: getAuftraege.data || [],

	// Auftrag nach ID finden
	getAuftragById(id) {
		return this.auftraege.find(a => a.id === id);
	},

	// Aktiven Auftrag fuer einen bestimmten Auflieger finden
	getAktivAuftragFuerAuflieger(aufliegerId) {
		return this.auftraege.find(a =>
			a.zugewiesenerAuflieger === aufliegerId &&
			a.status === "Aktiv"
		);
	},

	// KERNFUNKTION: Auflieger-Beladung pruefen (Soll-Ist-Vergleich)
	checkAufliegerBeladung(auftragId, aufliegerId) {
		const auftrag = this.getAuftragById(auftragId);
		if (!auftrag) return [];

		// Benoetigte Material-IDs aus String parsen
		const benoetigtIds = auftrag.benoetigteMaterialien.split(",").map(s => s.trim());

		// Fuer jedes Material pruefen: Ist es auf dem Auflieger?
		return benoetigtIds.map(matId => {
			const material = MaterialData.getMaterialById(matId);
			if (!material) {
				return {
					id: matId,
					name: "UNBEKANNT",
					status: "FEHLT",
					bildUrl: null,
					aktuellerStandort: null,
					aktuellerStandortName: "Unbekannt"
				};
			}

			const istAufAuflieger = material.currentLocationId === aufliegerId;

			return {
				id: material.id,
				name: material.name,
				bildUrl: material.bildUrl,
				aktuellerStandort: material.currentLocationId,
				aktuellerStandortName: StandortData.getStandortName(material.currentLocationId),
				status: istAufAuflieger ? "GELADEN" : "FEHLT"
			};
		});
	},

	// Materialien die noch fehlen (fuer Liste "Noch zu laden")
	getFehlendeMaterialien(auftragId, aufliegerId) {
		const beladung = this.checkAufliegerBeladung(auftragId, aufliegerId);
		return beladung.filter(m => m.status === "FEHLT");
	},

	// Materialien die geladen sind (fuer Liste "Bereits geladen")
	getGeladeneMaterialien(auftragId, aufliegerId) {
		const beladung = this.checkAufliegerBeladung(auftragId, aufliegerId);
		return beladung.filter(m => m.status === "GELADEN");
	},

	// Fortschritt berechnen
	getProgress(auftragId, aufliegerId) {
		const beladung = this.checkAufliegerBeladung(auftragId, aufliegerId);
		const geladen = beladung.filter(m => m.status === "GELADEN").length;
		const gesamt = beladung.length;
		return {
			geladen: geladen,
			gesamt: gesamt,
			prozent: gesamt > 0 ? Math.round((geladen / gesamt) * 100) : 0
		};
	},

	// Pruefen ob Auftrag am Ziel-Kran abgeschlossen werden kann
	checkAuftragAbschluss: async (auftragId) => {
		const auftrag = AuftragsData.getAuftragById(auftragId);
		if (!auftrag || !auftrag.zielKranId) return false;

		const benoetigtIds = auftrag.benoetigteMaterialien.split(",").map(s => s.trim());

		// Alle Materialien am Ziel-Kran?
		const alleAmZiel = benoetigtIds.every(matId => {
			const mat = MaterialData.getMaterialById(matId);
			return mat && mat.currentLocationId === auftrag.zielKranId;
		});

		if (alleAmZiel) {
			// RowIndex berechnen
			const data = getAuftraege.data || [];
			const index = data.findIndex(a => a.id === auftragId);
			if (index === -1) return false;

			const rowIndex = index + 2;

			await updateAuftragStatus.run({
				rowIndex: rowIndex,
				status: "Abgeschlossen"
			});
			await getAuftraege.run();
			showAlert("Auftrag " + auftrag.name + " abgeschlossen!", "success");
			return true;
		}

		return false;
	},

	// Daten neu laden
	refresh: async () => {
		await getAuftraege.run();
	}
}
