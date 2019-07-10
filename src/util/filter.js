const FILTERS = {};

export default (global) => {
    for (let filter in FILTERS) {
        global.filter(filter, FILTERS[filter]);
    }
};
