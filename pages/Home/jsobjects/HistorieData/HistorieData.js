export default {
	// Scan-Historie speichern
	scanHistory: [],

	// Historie-Eintrag hinzufügen
	addScanEntry(materialId, materialName, fahrerId, fahrerName, auftragId, vonStandort, zuStandort) {
		const entry = {
			materialId: materialId,
			materialName: materialName,
			fahrerId: fahrerId,
			fahrerName: fahrerName,
			auftragId: auftragId || null,
			timestamp: new Date().toISOString(),
			aktion: "gescannt",
			vonStandort: vonStandort,
			zuStandort: zuStandort
		};

		this.scanHistory.unshift(entry); // Neueste zuerst

		// Limit auf 500 Einträge
		if (this.scanHistory.length > 500) {
			this.scanHistory = this.scanHistory.slice(0, 500);
		}

		return entry;
	},

	// Historie für ein bestimmtes Material
	getMaterialHistorie(materialId, limit = 10) {
		return this.scanHistory
			.filter(entry => entry.materialId === materialId)
			.slice(0, limit);
	},

	// Letzte N Scans global
	getRecentScans(limit = 20) {
		return this.scanHistory.slice(0, limit);
	},

	// Fahrer-Aktivität: Wer hat heute wie viel gescannt?
	getFahrerAktivitaetHeute() {
		const heute = new Date().toISOString().split('T')[0];

		const heuteScans = this.scanHistory.filter(entry =>
			entry.timestamp.startsWith(heute)
		);

		const fahrerStats = {};
		heuteScans.forEach(entry => {
			if (!fahrerStats[entry.fahrerId]) {
				fahrerStats[entry.fahrerId] = {
					fahrerId: entry.fahrerId,
					fahrerName: entry.fahrerName,
					anzahl: 0
				};
			}
			fahrerStats[entry.fahrerId].anzahl++;
		});

		return Object.values(fahrerStats)
			.sort((a, b) => b.anzahl - a.anzahl);
	},

	// Aktivität für einen bestimmten Fahrer
	getFahrerHistorie(fahrerId, limit = 20) {
		return this.scanHistory
			.filter(entry => entry.fahrerId === fahrerId)
			.slice(0, limit);
	},

	// Aktivität für einen bestimmten Auftrag
	getAuftragHistorie(auftragId, limit = 50) {
		return this.scanHistory
			.filter(entry => entry.auftragId === auftragId)
			.slice(0, limit);
	},

	// Statistiken
	getStatistiken() {
		const gesamt = this.scanHistory.length;
		const heute = new Date().toISOString().split('T')[0];
		const heuteScans = this.scanHistory.filter(entry =>
			entry.timestamp.startsWith(heute)
		).length;

		const uniqueFahrer = [...new Set(this.scanHistory.map(e => e.fahrerId))].length;
		const uniqueMaterialien = [...new Set(this.scanHistory.map(e => e.materialId))].length;

		return {
			gesamt,
			heuteScans,
			uniqueFahrer,
			uniqueMaterialien
		};
	},

	// Historie löschen (Admin-Funktion)
	clearHistory() {
		this.scanHistory = [];
		showAlert("✓ Historie gelöscht", "success");
		return true;
	},

	// Formatiere Timestamp für Anzeige
	formatTimestamp(isoString) {
		const date = new Date(isoString);
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');

		return day + "." + month + "." + year + " " + hours + ":" + minutes;
	}
}
