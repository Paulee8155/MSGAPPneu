export default {
  materialien: getMaterialien.data || [],

  getMaterialById(id) {
    return this.materialien.find(m => m.id === id);
  },

  getMaterialienAnStandort(locationId) {
    return this.materialien.filter(m => m.currentLocationId === locationId);
  },

  updateLocation: async (materialId, newLocationId, benutzer) => {
    const data = getMaterialien.data;
    const index = data.findIndex(m => m.id === materialId);
    if (index === -1) return false;

    const rowIndex = index + 2;
    const material = data[index];

    await updateMaterialStandort.run({
      rowIndex: rowIndex,
      newLocationId: newLocationId
    });

    await insertHistorie.run({
      timestamp: new Date().toISOString(),
      benutzer: benutzer,
      materialId: materialId,
      vonStandort: material.currentLocationId,
      zuStandort: newLocationId,
      aktion: "umgelagert"
    });

    await getMaterialien.run();
    return true;
  }
}
