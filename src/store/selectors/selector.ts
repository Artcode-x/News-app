const mainSelector = (store: { store: any }) => store.store;

export default mainSelector;

export const flagSelector = (store: { store: any }) => mainSelector(store).flag;
