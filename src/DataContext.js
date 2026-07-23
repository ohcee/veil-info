import { createContext } from 'react';

// Shared data context — a single provider (DataProvider) polls each upstream
// once per interval and feeds every panel, replacing the per-component fetches
// that used to request GetBlockchainInfo four times over.
const DataContext = createContext(null);

export default DataContext;
