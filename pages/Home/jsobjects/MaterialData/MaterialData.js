export default {
	// Unsere Materialien
	materialien: [
		{
			id: "M001",
			name: "Ballast 500kg",
			standort: "LKW-3",
			kategorie: "Gewicht",
			gescannt: false
		},
		{
			id: "M002",
			name: "Hakenflasche 5t",
			standort: "Lager Halle 2",
			kategorie: "Anbauteil",
			gescannt: false
		},
		{
			id: "M003",
			name: "Verlängerung 3m",
			standort: "LKW-1",
			kategorie: "Gestänge",
			gescannt: false
		},
		{
			id: "M004",
			name: "Abstützplatten Set",
			standort: "Lager Halle 1",
			kategorie: "Zubehör",
			gescannt: false
		},
		{
			id: "M005",
			name: "Sicherungsketten",
			standort: "LKW-3",
			kategorie: "Sicherheit",
			gescannt: false
		}
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
			.map(m => parseInt(m.id.replace('M', '')))
			.filter(n => !isNaN(n));
		
		const maxNumber = numbers.length > 0 ? Math.max(...numbers) : 0;
		const nextNumber = maxNumber + 1;
		
		return 'M' + String(nextNumber).padStart(3, '0');
	}
}