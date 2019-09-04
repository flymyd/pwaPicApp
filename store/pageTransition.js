/**
 * @file pageTransition module
 * @author lavas
 */

export const state = () => {
    return {
        enable: true,
        type: 'none',
        effect: 'none',
        pagesNum: 1
    };
};

export const mutations = {
    setType(state, type) {
        state.type = type;
    },
    setEffect(state, effect) {
        state.effect = effect;
    },
    setPagesNum(state, pagesNum) {
        state.pagesNum = pagesNum;
    }
};
