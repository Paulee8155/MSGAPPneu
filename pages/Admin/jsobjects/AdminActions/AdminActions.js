export default {
	// Material hinzufügen
	addMaterial: async () => {
		const id = InputMaterialID.text;
		const name = InputName.text;
		const kategorie = SelectKategorie.selectedOptionValue;
		const standort = InputStandort.text;

		if (!name || name.trim() === "") {
			showAlert("⚠️ Bitte Name eingeben!", "warning");
			return;
		}

		if (!kategorie) {
			showAlert("⚠️ Bitte Kategorie auswählen!", "warning");
			return;
		}

		const success = await MaterialData.addMaterial(id, name, kategorie, standort);

		if (success) {
			closeModal('ModalNeuesMaterial');
			resetWidget('InputName');
			resetWidget('InputStandort');
			resetWidget('SelectKategorie');
		}
	},

	// Material bearbeiten - MIT RICHTIGEN NAMEN!
	editMaterial: async () => {
		const id = Table1.triggeredRow.id;
		const name = InputNameCopy.text;
		const kategorie = SelectKategorieCopy.selectedOptionValue;
		const standort = InputStandortCopy.text;

		if (!name || name.trim() === "") {
			showAlert("⚠️ Bitte Name eingeben!", "warning");
			return;
		}

		if (!kategorie) {
			showAlert("⚠️ Bitte Kategorie auswählen!", "warning");
			return;
		}

		await MaterialData.editMaterial(id, name, kategorie, standort);
		closeModal('ModalBearbeiten');
	},

	// Material löschen
	deleteMaterial: async () => {
		const id = Table1.triggeredRow.id;
		const name = Table1.triggeredRow.name;

		await MaterialData.deleteMaterial(id);
		showAlert("✓ " + id + " - " + name + " gelöscht!", "success");
	},

	// Auftrag erstellen
	createAuftrag: async () => {
		const fahrerId = SelectFahrer.selectedOptionValue;
		const templateId = SelectTemplate.selectedOptionValue;
		const datum = InputDatum.text || new Date().toISOString().split('T')[0];

		if (!fahrerId) {
			showAlert("⚠️ Bitte Fahrer auswählen!", "warning");
			return;
		}

		if (!templateId) {
			showAlert("⚠️ Bitte Template auswählen!", "warning");
			return;
		}

		// Fahrer-Name holen
		const fahrer = FahrerData.fahrer.find(f => f.id === fahrerId);
		const fahrerName = fahrer ? fahrer.name : "Unbekannt";

		// Template-Daten holen
		const template = TemplateData.templates.find(t => t.id === templateId);
		const templateName = template ? template.name : "Unbekannt";
		const materialienIds = template ? template.materialien : [];

		// Auftrag erstellen (ASYNC)
		const auftrag = await AuftragsData.createAuftrag(datum, fahrerId, fahrerName, templateId, templateName, materialienIds);

		if (auftrag) {
			closeModal('ModalNeuerAuftrag');
			resetWidget('SelectFahrer');
			resetWidget('SelectTemplate');
			resetWidget('InputDatum');
		}
	}
}
