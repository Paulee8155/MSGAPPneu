export default {
	// Material-Status-Übersicht
	getMaterialStatusUebersicht() {
		const materialien = MaterialData.materialien;

		const verfuegbar = materialien.filter(m =>
			!m.gescannt &&
			(m.standort.includes('Lager') || m.standort.includes('Außenlager') || m.standort.includes('Werkstatt'))
		).length;

		const aufFahrzeugen = materialien.filter(m =>
			m.standort.includes('LKW') ||
			m.standort.includes('Auflieger') ||
			m.standort.includes('Kran')
		).length;

		const imEinsatz = materialien.filter(m => m.gescannt).length;

		const nichtGefunden = materialien.filter(m =>
			!m.standort ||
			m.standort === 'Unbekannt' ||
			m.standort === ''
		).length;

		return {
			verfuegbar,
			aufFahrzeugen,
			imEinsatz,
			nichtGefunden,
			gesamt: materialien.length
		};
	},

	// Standort-Verteilung: Wo ist wie viel Material?
	getStandortVerteilung() {
		const materialien = MaterialData.materialien;
		const verteilung = {};

		materialien.forEach(m => {
			const standort = m.standort || 'Unbekannt';
			if (!verteilung[standort]) {
				verteilung[standort] = 0;
			}
			verteilung[standort]++;
		});

		// Sortiere nach Anzahl (absteigend)
		return Object.entries(verteilung)
			.map(([standort, anzahl]) => ({ standort, anzahl }))
			.sort((a, b) => b.anzahl - a.anzahl);
	},

	// Material suchen
	findeMaterial(suchbegriff) {
		if (!suchbegriff || suchbegriff.trim() === '') {
			return [];
		}

		const materialien = MaterialData.materialien;
		const begriff = suchbegriff.toLowerCase();

		return materialien.filter(m =>
			m.id.toLowerCase().includes(begriff) ||
			m.name.toLowerCase().includes(begriff) ||
			m.kategorie.toLowerCase().includes(begriff) ||
			m.standort.toLowerCase().includes(begriff)
		);
	},

	// Kategorie-Breakdown
	getKategorieUebersicht() {
		const materialien = MaterialData.materialien;
		const kategorien = {};

		materialien.forEach(m => {
			const kat = m.kategorie || 'Sonstiges';
			if (!kategorien[kat]) {
				kategorien[kat] = { gesamt: 0, verfuegbar: 0, imEinsatz: 0 };
			}
			kategorien[kat].gesamt++;
			if (m.gescannt) {
				kategorien[kat].imEinsatz++;
			} else {
				kategorien[kat].verfuegbar++;
			}
		});

		return Object.entries(kategorien)
			.map(([kategorie, stats]) => ({ kategorie, ...stats }))
			.sort((a, b) => b.gesamt - a.gesamt);
	},

	// Gesamtgewicht berechnen
	getGesamtGewicht() {
		const materialien = MaterialData.materialien;
		const gesamt = materialien.reduce((sum, m) => sum + (m.gewicht || 0), 0);
		const imEinsatz = materialien
			.filter(m => m.gescannt)
			.reduce((sum, m) => sum + (m.gewicht || 0), 0);
		const verfuegbar = gesamt - imEinsatz;

		return {
			gesamt,
			imEinsatz,
			verfuegbar
		};
	},

	// Lager-Status: Was ist wo im Lager?
	getLagerStatus() {
		const materialien = MaterialData.materialien;

		const halle1 = materialien.filter(m => m.standort === 'Lager Halle 1');
		const halle2 = materialien.filter(m => m.standort === 'Lager Halle 2');
		const aussenlager = materialien.filter(m => m.standort === 'Außenlager');
		const werkstatt = materialien.filter(m => m.standort === 'Werkstatt');

		return {
			halle1: { anzahl: halle1.length, materialien: halle1 },
			halle2: { anzahl: halle2.length, materialien: halle2 },
			aussenlager: { anzahl: aussenlager.length, materialien: aussenlager },
			werkstatt: { anzahl: werkstatt.length, materialien: werkstatt }
		};
	},

	// Fahrzeug-Status: Was ist auf welchem Fahrzeug?
	getFahrzeugStatus() {
		const materialien = MaterialData.materialien;
		const fahrzeuge = {};

		materialien.forEach(m => {
			const standort = m.standort;
			// Nur Fahrzeuge (LKW, Auflieger, Kran)
			if (standort.includes('LKW') || standort.includes('Auflieger') || standort.includes('Kran')) {
				if (!fahrzeuge[standort]) {
					fahrzeuge[standort] = [];
				}
				fahrzeuge[standort].push(m);
			}
		});

		return Object.entries(fahrzeuge)
			.map(([fahrzeug, materialien]) => ({
				fahrzeug,
				anzahl: materialien.length,
				gesamtGewicht: materialien.reduce((sum, m) => sum + (m.gewicht || 0), 0),
				materialien
			}))
			.sort((a, b) => a.fahrzeug.localeCompare(b.fahrzeug));
	}
}

