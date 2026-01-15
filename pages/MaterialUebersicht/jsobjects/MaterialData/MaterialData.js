export default {
	// Umfangreiche Material-Datenbank (50 Materialien mit Gewichten)
	materialien: [
		// ========== GEWICHTE / BALLAST (8 Stück) ==========
		{id: "M001", name: "Ballast 250kg", standort: "Lager Halle 1", kategorie: "Gewicht", gescannt: false, gewicht: 250},
		{id: "M002", name: "Ballast 500kg", standort: "LKW-3", kategorie: "Gewicht", gescannt: false, gewicht: 500},
		{id: "M003", name: "Ballast 750kg", standort: "Lager Halle 1", kategorie: "Gewicht", gescannt: false, gewicht: 750},
		{id: "M004", name: "Ballast 1000kg", standort: "LKW-5", kategorie: "Gewicht", gescannt: false, gewicht: 1000},
		{id: "M005", name: "Ballast 1500kg", standort: "Lager Halle 1", kategorie: "Gewicht", gescannt: false, gewicht: 1500},
		{id: "M006", name: "Ballast 2000kg", standort: "Außenlager", kategorie: "Gewicht", gescannt: false, gewicht: 2000},
		{id: "M007", name: "Ballast 2500kg", standort: "Lager Halle 1", kategorie: "Gewicht", gescannt: false, gewicht: 2500},
		{id: "M008", name: "Ballast 3000kg", standort: "Außenlager", kategorie: "Gewicht", gescannt: false, gewicht: 3000},

		// ========== HAKENFLASCHE / ANBAUTEILE (10 Stück) ==========
		{id: "M009", name: "Hakenflasche 3t", standort: "LKW-1", kategorie: "Anbauteil", gescannt: false, gewicht: 35},
		{id: "M010", name: "Hakenflasche 5t", standort: "Lager Halle 2", kategorie: "Anbauteil", gescannt: false, gewicht: 45},
		{id: "M011", name: "Hakenflasche 8t", standort: "Kran-2", kategorie: "Anbauteil", gescannt: false, gewicht: 60},
		{id: "M012", name: "Hakenflasche 10t", standort: "LKW-2", kategorie: "Anbauteil", gescannt: false, gewicht: 75},
		{id: "M013", name: "Hakenflasche 12t", standort: "Lager Halle 2", kategorie: "Anbauteil", gescannt: false, gewicht: 85},
		{id: "M014", name: "Hakenflasche 15t", standort: "Kran-3", kategorie: "Anbauteil", gescannt: false, gewicht: 95},
		{id: "M015", name: "Hakenflasche 20t", standort: "Lager Halle 2", kategorie: "Anbauteil", gescannt: false, gewicht: 120},
		{id: "M016", name: "Hakenflasche 25t", standort: "Kran-1", kategorie: "Anbauteil", gescannt: false, gewicht: 145},
		{id: "M017", name: "Hakenflasche 30t", standort: "Lager Halle 2", kategorie: "Anbauteil", gescannt: false, gewicht: 170},
		{id: "M018", name: "Spezialflasche variabel", standort: "Werkstatt", kategorie: "Anbauteil", gescannt: false, gewicht: 90},

		// ========== VERLÄNGERUNGEN / GESTÄNGE (8 Stück) ==========
		{id: "M019", name: "Verlängerung 2m", standort: "LKW-1", kategorie: "Gestänge", gescannt: false, gewicht: 35},
		{id: "M020", name: "Verlängerung 3m", standort: "LKW-3", kategorie: "Gestänge", gescannt: false, gewicht: 45},
		{id: "M021", name: "Verlängerung 4m", standort: "Lager Halle 2", kategorie: "Gestänge", gescannt: false, gewicht: 55},
		{id: "M022", name: "Verlängerung 5m", standort: "LKW-4", kategorie: "Gestänge", gescannt: false, gewicht: 65},
		{id: "M023", name: "Verlängerung 6m", standort: "Lager Halle 2", kategorie: "Gestänge", gescannt: false, gewicht: 75},
		{id: "M024", name: "Verlängerung 8m", standort: "Lager Halle 2", kategorie: "Gestänge", gescannt: false, gewicht: 95},
		{id: "M025", name: "Verlängerung 10m", standort: "Außenlager", kategorie: "Gestänge", gescannt: false, gewicht: 115},
		{id: "M026", name: "Teleskopausleger 12m", standort: "Kran-2", kategorie: "Gestänge", gescannt: false, gewicht: 180},

		// ========== ABSTÜTZPLATTEN (6 Stück) ==========
		{id: "M027", name: "Abstützplatten Set A", standort: "Lager Halle 1", kategorie: "Zubehör", gescannt: false, gewicht: 120},
		{id: "M028", name: "Abstützplatten Set B", standort: "LKW-5", kategorie: "Zubehör", gescannt: false, gewicht: 130},
		{id: "M029", name: "Abstützplatten Set C (groß)", standort: "Lager Halle 1", kategorie: "Zubehör", gescannt: false, gewicht: 180},
		{id: "M030", name: "Abstützplatten Set D", standort: "Außenlager", kategorie: "Zubehör", gescannt: false, gewicht: 140},
		{id: "M031", name: "Abstützplatten Set E", standort: "Lager Halle 1", kategorie: "Zubehör", gescannt: false, gewicht: 135},
		{id: "M032", name: "Abstützplatten Holz", standort: "Lager Halle 1", kategorie: "Zubehör", gescannt: false, gewicht: 90},

		// ========== SICHERHEIT (8 Stück) ==========
		{id: "M033", name: "Sicherungsketten 3t", standort: "LKW-3", kategorie: "Sicherheit", gescannt: false, gewicht: 25},
		{id: "M034", name: "Sicherungsketten 5t", standort: "LKW-2", kategorie: "Sicherheit", gescannt: false, gewicht: 35},
		{id: "M035", name: "Sicherungsketten 10t", standort: "Lager Halle 2", kategorie: "Sicherheit", gescannt: false, gewicht: 55},
		{id: "M036", name: "Zurrgurte Set", standort: "LKW-1", kategorie: "Sicherheit", gescannt: false, gewicht: 18},
		{id: "M037", name: "Anschlagmittel Set", standort: "Lager Halle 2", kategorie: "Sicherheit", gescannt: false, gewicht: 42},
		{id: "M038", name: "Absperrband & Warnschilder", standort: "LKW-5", kategorie: "Sicherheit", gescannt: false, gewicht: 8},
		{id: "M039", name: "Warnleuchten Set", standort: "LKW-6", kategorie: "Sicherheit", gescannt: false, gewicht: 12},
		{id: "M040", name: "Funkfernsteuerung Reserve", standort: "Werkstatt", kategorie: "Sicherheit", gescannt: false, gewicht: 3},

		// ========== TRAVERSE / SPEZIAL (5 Stück) ==========
		{id: "M041", name: "Traverse 5m", standort: "Lager Halle 1", kategorie: "Anbauteil", gescannt: false, gewicht: 85},
		{id: "M042", name: "Traverse 8m", standort: "Lager Halle 2", kategorie: "Anbauteil", gescannt: false, gewicht: 125},
		{id: "M043", name: "Traverse 10m", standort: "Außenlager", kategorie: "Anbauteil", gescannt: false, gewicht: 155},
		{id: "M044", name: "Hydraulikzylinder 20t", standort: "Lager Halle 2", kategorie: "Anbauteil", gescannt: false, gewicht: 95},
		{id: "M045", name: "Kranwaage 10t", standort: "Kran-2", kategorie: "Zubehör", gescannt: false, gewicht: 25},

		// ========== ZUBEHÖR (5 Stück) ==========
		{id: "M046", name: "Windenmontage-Set", standort: "Werkstatt", kategorie: "Zubehör", gescannt: false, gewicht: 45},
		{id: "M047", name: "Werkzeugkiste Kran", standort: "Kran-1", kategorie: "Zubehör", gescannt: false, gewicht: 28},
		{id: "M048", name: "Ersatzteile-Set Standard", standort: "Werkstatt", kategorie: "Zubehör", gescannt: false, gewicht: 35},
		{id: "M049", name: "Schmierung & Wartung Set", standort: "Lager Halle 1", kategorie: "Zubehör", gescannt: false, gewicht: 22},
		{id: "M050", name: "Notfall-Reparatur Kit", standort: "LKW-6", kategorie: "Zubehör", gescannt: false, gewicht: 18}
	],
	
	scanMaterial(materialId, neuerStandort) {
		const index = this.materialien.findIndex(m => m.id === materialId);
		if (index !== -1) {
			this.materialien[index].gescannt = true;
			if (neuerStandort) {
				this.materialien[index].standort = neuerStandort;
			}
		}
		return this.materialien;
	},
	
	reset() {
		this.materialien.forEach(m => m.gescannt = false);
		return this.materialien;
	},
	
	getProgress() {
		const gescannt = this.materialien.filter(m => m.gescannt).length;
		const gesamt = this.materialien.length;
		return { gescannt, gesamt, prozent: Math.round((gescannt/gesamt)*100) };
	},
	
	addMaterial(id, name, kategorie, standort) {
		const exists = this.materialien.find(m => m.id === id);
		if (exists) {
			showAlert("⚠️ Material-ID " + id + " existiert bereits!", "error");
			return false;
		}
		
		this.materialien.push({
			id: id,
			name: name,
			standort: standort,
			kategorie: kategorie,
			gescannt: false
		});
		
		showAlert("✓ Material " + id + " hinzugefügt!", "success");
		return true;
	},
	
	editMaterial(id, name, kategorie, standort) {
		const index = this.materialien.findIndex(m => m.id === id);
		if (index !== -1) {
			this.materialien[index].name = name;
			this.materialien[index].kategorie = kategorie;
			this.materialien[index].standort = standort;
			showAlert("✓ Material " + id + " aktualisiert!", "success");
			return true;
		}
		return false;
	},
	
	deleteMaterial(id) {
		const index = this.materialien.findIndex(m => m.id === id);
		if (index !== -1) {
			this.materialien.splice(index, 1);
			showAlert("✓ Material " + id + " gelöscht!", "success");
			return true;
		}
		return false;
	},
	
	getNextId() {
		const numbers = this.materialien
			.filter(m => m && m.id)
			.map(m => parseInt(m.id.replace('M', '')))
			.filter(n => !isNaN(n));
		
		const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
		const nextNumber = maxNumber + 1;
		
		return 'M' + String(nextNumber).padStart(3, '0');
	}
}