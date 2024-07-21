import NodeCache from 'node-cache';
const cache = new NodeCache({
    stdTTL: 60,
    checkperiod: 60,
    useClones: false,
    deleteOnExpireValue: true,
    maxKeys: 1000,
    async: true,
}
);

export default cache