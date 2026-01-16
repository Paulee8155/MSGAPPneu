export default {
	addMaterial: async () => {
		const success = await MaterialData.addMaterial(InputMaterialID.text, InputName.text, SelectKategorie.selectedOptionValue, InputStandort.text);
		if (success) closeModal('ModalNeuesMaterial');
	},

	editMaterial: async () => {
		await MaterialData.editMaterial(Table1.selectedRow.id, InputNameCopy.text, SelectKategorieCopy.selectedOptionValue, InputStandortCopy.text);
		closeModal('ModalBearbeiten');
	},

	deleteMaterial: async () => {
		await MaterialData.deleteMaterial(Table1.selectedRow.id);
	},

	createAuftrag: async () => {
		const fahrerId = SelectFahrer.selectedOptionValue;
		const templateAuftragId = SelectTemplate.selectedOptionValue;
		const newId = "A" + Math.floor(Math.random() * 10000); 
		
		if (!fahrerId || !templateAuftragId) {
			showAlert("⚠️ Bitte Fahrer und Vorlage-Auftrag auswählen!", "warning");
			return;
		}

		// Hole die Materialliste aus dem als "Template" gewählten Auftrag im Sheet
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