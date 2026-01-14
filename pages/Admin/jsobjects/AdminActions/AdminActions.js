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
		
		const success = MaterialData.addMaterial(id, name, kategorie, standort);
		
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
		
		MaterialData.editMaterial(id, name, kategorie, standort);
		closeModal('ModalBearbeiten');
	},
	
	// Material löschen
	deleteMaterial: async () => {
		const id = Table1.triggeredRow.id;
		const name = Table1.triggeredRow.name;
		
		MaterialData.deleteMaterial(id);
		showAlert("✓ " + id + " - " + name + " gelöscht!", "success");
	}
}