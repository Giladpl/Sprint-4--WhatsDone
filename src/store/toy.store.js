import { toyService } from "../services/toy.service.js";

export const toyStore = {
    state: {
        toys: [],
        filterBy: {
            name: '',
            type: 'All',
            stock: 'All'
        }
    },
    getters: {
        toys(state){ return state.toys},
    },
    mutations: {
        setToys(state, payload){
            state.toys = payload.toys;
        },  
        addToy(state, { toy }) {
            state.toys.push(toy);
        },
        removeToy(state, { toy }) {
            const idx = state.toys.findIndex(t => t._id === toy._id);
            state.toys.splice(idx, 1);
        },
        editToy(state, {toy}) {
            const idx = state.toys.findIndex(t => t._id === toy._id);            
            state.toys.splice(idx, 1, toy);
        },
        // setFilter(state, payload) {
        //     state.filterBy = payload.filterBy;
        // }
    },
    actions: {
        async loadToys({commit}, {filterBy}) {
            try {
                const toys = await toyService.query(filterBy)
                commit({type: 'setToys', toys});
            } catch (err) {
                console.log('Store: Cannot load toys', err);
                throw new Error('Cannot load toys');
            }
        },
        async saveToy({ commit }, { toy }) {
            const type = (toy._id) ? 'editToy' : 'addToy';
            try {
                const savedToy = await toyService.save(toy)
                console.log(savedToy);
                commit({type, toy: savedToy})
            } catch (err) {
                console.log('Store: Cannot save toy', err);
                throw new Error('Cannot save toy');
            }
        },
        async removeToy({ commit }, payload) {
            try {
                await toyService.remove(payload.toy._id)
                commit(payload);
            } catch (err) {
                console.log('Store: Cannot remove toy', err);
                    throw new Error('Cannot remove toy');
            }
        }
    }
}
