export default {
	// Material hinzufügen
	addMaterial: async () => {
		const success = await MaterialData.addMaterial(
			InputMaterialID.text, 
			InputName.text, 
			SelectKategorie.selectedOptionValue, 
			InputStandort.text
		);
		if (success) {
			closeModal('ModalNeuesMaterial');
			showAlert("✅ Material angelegt", "success");
		}
	},

	// Material bearbeiten - Nutzt jetzt triggeredRow wie von dir korrigiert
	editMaterial: async () => {
		const id = Table1.triggeredRow.id;
		const name = InputNameCopy.text;
		const kategorie = SelectKategorieCopy.selectedOptionValue;
		const standort = SelectStandortCopy.selectedOptionValue; // Falls du auf Select umgestellt hast

		await MaterialData.editMaterial(id, name, kategorie, standort);
		closeModal('ModalBearbeiten');
		showAlert("✅ Änderungen an " + id + " gespeichert", "success");
	},

	// Material löschen
	deleteMaterial: async () => {
		const id = Table1.triggeredRow.id;
		await MaterialData.deleteMaterial(id);
		showAlert("🗑️ Material gelöscht", "success");
	},

	// Auftrag erstellen (nutzt bestehende Aufträge als Vorlage)
	createAuftrag: async () => {
		const fahrerId = SelectFahrer.selectedOptionValue;
		const templateAuftragId = SelectTemplate.selectedOptionValue;
		const newId = "A" + Math.floor(Math.random() * 10000); 
		
		if (!fahrerId || !templateAuftragId) {
			showAlert("⚠️ Bitte Fahrer und Vorlage-Auftrag auswählen!", "warning");
			return;
		}

		// Holt die Materialliste aus dem gewählten Auftrag im Sheet (über die Query getAuftraege)
		const vorlage = (getAuftraege.data || []).find(a => a.id === templateAuftragId);
		const materialienString = vorlage ? vorlage.benoetigteMaterialien : "";

		await insertAuftrag.run({
			id: newId,
			name: vorlage ? "Kopie von " + vorlage.name : "Neuer Auftrag",
			status: "Aktiv",
			benoetigteMaterialien: materialienString,
			zielKranId: "LOC_KRAN_K1",
			zugewiesenerAuflieger: "LOC_AUFL_A1" 
		});

		await getAuftraege.run();
		closeModal('ModalNeuerAuftrag');
		showAlert("✅ Auftrag " + newId + " erstellt!", "success");
	}
}