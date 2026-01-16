export default {
	getMaterialStatusUebersicht() {
		const materialien = getMaterialien.data || [];
		const standorte = getStandorte.data || [];

		let inLager = 0;
		let aufAuflieger = 0;
		let aufKran = 0;
		let defekt = 0;

		materialien.forEach(m => {
			const standort = standorte.find(s => s.id === m.currentLocationId);
			const typ = standort ? standort.typ : "Unbekannt";

			if (m.status === "Defekt") {
				defekt++;
			} else if (typ === "Lager" || typ === "Werkstatt") {
				inLager++;
			} else if (typ === "Auflieger") {
				aufAuflieger++;
			} else if (typ === "Kran") {
				aufKran++;
			}
		});

		return { inLager, aufAuflieger, aufKran, defekt, gesamt: materialien.length };
	},

	getStandortVerteilung() {
		const materialien = getMaterialien.data || [];
		const standorte = getStandorte.data || [];
		const verteilung = {};

		materialien.forEach(m => {
            if (!m.currentLocationId) return;

			const standort = standorte.find(s => s.id === m.currentLocationId);
			const standortName = standort ? standort.bezeichnung : `Unbekannt (${m.currentLocationId})`;

			if (!verteilung[standortName]) verteilung[standortName] = 0;
			verteilung[standortName]++;
		});

		return Object.entries(verteilung)
			.map(([standort, anzahl]) => ({ standort, anzahl }))
			.sort((a, b) => b.anzahl - a.anzahl);
	},

    findeMaterial(suchbegriff) {
		if (!suchbegriff || suchbegriff.trim() === '') return [];
		const begriff = suchbegriff.toLowerCase();
		return (getMaterialien.data || []).filter(m => 
			m.id.toLowerCase().includes(begriff) || m.name.toLowerCase().includes(begriff)
		);
	}
}