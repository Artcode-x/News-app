const mainSelector = (store: { store: any }) => store.store;

export default mainSelector;

export const openMenuSelector = (store: { store: any }) =>
  mainSelector(store).sidebarOpen;
