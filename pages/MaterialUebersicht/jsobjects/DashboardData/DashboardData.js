export default {
	// Material-Status-Uebersicht basierend auf Location is Truth
	getMaterialStatusUebersicht() {
		const materialien = getMaterialien.data || [];
		const standorte = getStandorte.data || [];

		// Gruppieren nach Standort-Typ
		let inLager = 0;
		let aufAuflieger = 0;
		let aufKran = 0;
		let defekt = 0;

		materialien.forEach(m => {
			const standort = standorte.find(s => s.id === m.currentLocationId);
			if (!standort) return;

			if (m.status === "Defekt") {
				defekt++;
			} else if (standort.typ === "Lager" || standort.typ === "Werkstatt") {
				inLager++;
			} else if (standort.typ === "Auflieger") {
				aufAuflieger++;
			} else if (standort.typ === "Kran") {
				aufKran++;
			}
		});

		return {
			inLager,
			aufAuflieger,
			aufKran,
			defekt,
			gesamt: materialien.length
		};
	},

	// Standort-Verteilung: Wo ist wie viel Material?
	getStandortVerteilung() {
		const materialien = getMaterialien.data || [];
		const standorte = getStandorte.data || [];
		const verteilung = {};

		materialien.forEach(m => {
			const standort = standorte.find(s => s.id === m.currentLocationId);
			const standortName = standort ? standort.bezeichnung : m.currentLocationId;

			if (!verteilung[standortName]) {
				verteilung[standortName] = 0;
			}
			verteilung[standortName]++;
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

		const materialien = getMaterialien.data || [];
		const standorte = getStandorte.data || [];
		const begriff = suchbegriff.toLowerCase();

		return materialien.filter(m => {
			const standort = standorte.find(s => s.id === m.currentLocationId);
			const standortName = standort ? standort.bezeichnung : m.currentLocationId;

			return m.id.toLowerCase().includes(begriff) ||
				m.name.toLowerCase().includes(begriff) ||
				m.kategorie.toLowerCase().includes(begriff) ||
				standortName.toLowerCase().includes(begriff);
		}).map(m => {
			const standort = standorte.find(s => s.id === m.currentLocationId);
			return {
				...m,
				standortName: standort ? standort.bezeichnung : m.currentLocationId
			};
		});
	},

	// Kategorie-Breakdown
	getKategorieUebersicht() {
		const materialien = getMaterialien.data || [];
		const kategorien = {};

		materialien.forEach(m => {
			const kat = m.kategorie || 'Sonstiges';
			if (!kategorien[kat]) {
				kategorien[kat] = { gesamt: 0, ok: 0, defekt: 0 };
			}
			kategorien[kat].gesamt++;
			if (m.status === "Defekt") {
				kategorien[kat].defekt++;
			} else {
				kategorien[kat].ok++;
			}
		});

		return Object.entries(kategorien)
			.map(([kategorie, stats]) => ({ kategorie, ...stats }))
			.sort((a, b) => b.gesamt - a.gesamt);
	},

	// Auflieger-Status: Was ist auf welchem Auflieger?
	getAufliegerStatus() {
		const materialien = getMaterialien.data || [];
		const standorte = getStandorte.data || [];
		const auflieger = standorte.filter(s => s.typ === "Auflieger");

		return auflieger.map(a => {
			const aufliegerMaterialien = materialien.filter(m => m.currentLocationId === a.id);
			return {
				id: a.id,
				bezeichnung: a.bezeichnung,
				anzahl: aufliegerMaterialien.length,
				gesamtGewicht: aufliegerMaterialien.reduce((sum, m) => sum + (parseInt(m.gewicht) || 0), 0),
				materialien: aufliegerMaterialien
			};
		}).sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung));
	},

	// Kran-Status: Was ist auf welchem Kran?
	getKranStatus() {
		const materialien = getMaterialien.data || [];
		const standorte = getStandorte.data || [];
		const kraene = standorte.filter(s => s.typ === "Kran");

		return kraene.map(k => {
			const kranMaterialien = materialien.filter(m => m.currentLocationId === k.id);
			return {
				id: k.id,
				bezeichnung: k.bezeichnung,
				anzahl: kranMaterialien.length,
				materialien: kranMaterialien
			};
		}).sort((a, b) => a.bezeichnung.localeCompare(b.bezeichnung));
	},

	// Letzte Historie-Eintraege
	getRecentHistorie(limit = 10) {
		const historie = getHistorie.data || [];
		return historie.slice(0, limit);
	}
}
