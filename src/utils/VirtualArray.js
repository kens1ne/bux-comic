export const virtualArray = (itemsLength) =>
  Array.from({ length: itemsLength }, (_, index) => ({
    id: index + 1,
    name: `Item ${index + 1}`,
    description: `Mô tả của item ${index + 1}`,
  }));
