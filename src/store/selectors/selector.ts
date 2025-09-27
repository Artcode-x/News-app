import { AppState } from '../../interface/interface';

export const openMenuSelector = (store: { store: AppState }) =>
  store.store.sidebarOpen;

export const errorSelector = (store: { store: AppState }) => store.store.error;
