export default {
	// Unsere Materialien - 30 Stück!
	materialien: [
		// GEWICHTE / BALLAST
		{id: "M001", name: "Ballast 500kg", standort: "Lager Halle 1", kategorie: "Gewicht", gescannt: false},
		{id: "M002", name: "Ballast 1000kg", standort: "LKW-3", kategorie: "Gewicht", gescannt: false},
		{id: "M003", name: "Ballast 1500kg", standort: "Lager Halle 1", kategorie: "Gewicht", gescannt: false},
		{id: "M004", name: "Ballast 2000kg", standort: "LKW-5", kategorie: "Gewicht", gescannt: false},
		{id: "M005", name: "Ballast 3000kg", standort: "Lager Halle 1", kategorie: "Gewicht", gescannt: false},
		
		// HAKENFLASCHE / ANBAUTEILE
		{id: "M006", name: "Hakenflasche 3t", standort: "LKW-1", kategorie: "Anbauteil", gescannt: false},
		{id: "M007", name: "Hakenflasche 5t", standort: "Lager Halle 2", kategorie: "Anbauteil", gescannt: false},
		{id: "M008", name: "Hakenflasche 10t", standort: "LKW-7", kategorie: "Anbauteil", gescannt: false},
		{id: "M009", name: "Hakenflasche 15t", standort: "Lager Halle 2", kategorie: "Anbauteil", gescannt: false},
		{id: "M010", name: "Hakenflasche 20t", standort: "Kran-2", kategorie: "Anbauteil", gescannt: false},
		
		// VERLÄNGERUNGEN / GESTÄNGE
		{id: "M011", name: "Verlängerung 2m", standort: "LKW-1", kategorie: "Gestänge", gescannt: false},
		{id: "M012", name: "Verlängerung 3m", standort: "LKW-3", kategorie: "Gestänge", gescannt: false},
		{id: "M013", name: "Verlängerung 5m", standort: "Lager Halle 2", kategorie: "Gestänge", gescannt: false},
		{id: "M014", name: "Verlängerung 8m", standort: "LKW-7", kategorie: "Gestänge", gescannt: false},
		{id: "M015", name: "Teleskopausleger 12m", standort: "Kran-2", kategorie: "Gestänge", gescannt: false},
		
		// ABSTÜTZPLATTEN
		{id: "M016", name: "Abstützplatten Set A", standort: "Lager Halle 1", kategorie: "Zubehör", gescannt: false},
		{id: "M017", name: "Abstützplatten Set B", standort: "LKW-5", kategorie: "Zubehör", gescannt: false},
		{id: "M018", name: "Abstützplatten Set C (groß)", standort: "Lager Halle 1", kategorie: "Zubehör", gescannt: false},
		{id: "M019", name: "Abstützplatten Holz", standort: "Lager Halle 1", kategorie: "Zubehör", gescannt: false},
		
		// SICHERHEIT
		{id: "M020", name: "Sicherungsketten 3t", standort: "LKW-3", kategorie: "Sicherheit", gescannt: false},
		{id: "M021", name: "Sicherungsketten 5t", standort: "LKW-7", kategorie: "Sicherheit", gescannt: false},
		{id: "M022", name: "Zurrgurte Set", standort: "LKW-1", kategorie: "Sicherheit", gescannt: false},
		{id: "M023", name: "Anschlagmittel Set", standort: "Lager Halle 2", kategorie: "Sicherheit", gescannt: false},
		{id: "M024", name: "Absperrband & Warnschilder", standort: "LKW-5", kategorie: "Sicherheit", gescannt: false},
		
		// ZUSÄTZLICHES EQUIPMENT
		{id: "M025", name: "Windenmontage-Set", standort: "Werkstatt", kategorie: "Zubehör", gescannt: false},
		{id: "M026", name: "Hydraulikzylinder 20t", standort: "Lager Halle 2", kategorie: "Anbauteil", gescannt: false},
		{id: "M027", name: "Traverse 5m", standort: "Lager Halle 1", kategorie: "Anbauteil", gescannt: false},
		{id: "M028", name: "Traverse 8m", standort: "Lager Halle 2", kategorie: "Anbauteil", gescannt: false},
		{id: "M029", name: "Funkfernsteuerung Reserve", standort: "Werkstatt", kategorie: "Zubehör", gescannt: false},
		{id: "M030", name: "Kranwaage 10t", standort: "Kran-2", kategorie: "Zubehör", gescannt: false}
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