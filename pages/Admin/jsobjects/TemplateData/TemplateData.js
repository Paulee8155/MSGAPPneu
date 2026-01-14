export default {
	// Template-Definitionen
	templates: [
		{
			id: "T001",
			name: "Brückenbau Standard",
			beschreibung: "Standard-Equipment für Brückenbau-Einsätze",
			materialien: ["M002", "M007", "M012", "M016", "M020", "M023", "M024", "M006", "M011", "M022"]
		},
		{
			id: "T002",
			name: "Turmdrehkran",
			beschreibung: "Equipment für Turmdrehkran-Montage",
			materialien: ["M004", "M009", "M014", "M017", "M021", "M023", "M026", "M027", "M030"]
		},
		{
			id: "T003",
			name: "Schwertransport",
			beschreibung: "Standard-Set für Schwertransporte",
			materialien: ["M005", "M010", "M015", "M018", "M021", "M024", "M028", "M029"]
		},
		{
			id: "T004",
			name: "Leichter Einsatz",
			beschreibung: "Basis-Equipment für kleinere Einsätze",
			materialien: ["M001", "M006", "M011", "M016", "M020", "M022"]
		}
	],
	
	// Template-Materialien auflösen (IDs → vollständige Material-Objekte)
	getMaterialienFuerTemplate(templateId) {
		const template = this.templates.find(t => t.id === templateId);
		if (!template) return [];
		
		// Hole die Material-Objekte aus MaterialData
		return template.materialien
			.map(matId => MaterialData.materialien.find(m => m.id === matId))
			.filter(m => m !== undefined);
	},
	
	// Alle Templates für Dropdown
	getTemplateOptions() {
		return this.templates.map(t => ({
			label: t.name + " (" + t.materialien.length + " Teile)",
			value: t.id
		}));
	}
}