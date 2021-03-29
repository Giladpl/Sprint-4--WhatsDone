import { boardService } from "../services/board.service.js";
import {socketService } from "../services/socket.service.js";

export const boardStore = {
    state: {
        boards: [],
        currBoard: null,
        filterBy: {
            txt: null
        }
    },
    getters: {
        boards(state) { return state.boards },
        currBoard(state) { return state.currBoard },
        boardToShow(state) {
            if (!state.filterBy.txt) return state.currBoard;
            const regex = new RegExp(state.filterBy.txt, 'i');
            const newBoard = state.currBoard.groups.filter(group => {
                return group.tasks.filter(task => { 
                    return regex.test(task.title)
                })
            })
            console.log(newBoard);
            return newBoard
        },
    },
    mutations: {
        setBoards(state, payload) {
            state.boards = payload.boards;
        },
        setBoard(state, payload) {
            state.currBoard = payload.board;
        },
        addBoard(state, { board }) {
            state.boards.push(board);
        },
        removeBoard(state, { board }) {
            const idx = state.boards.findIndex(t => t._id === board._id);
            state.boards.splice(idx, 1);
        },
        editBoard(state, { board }) {
            const idx = state.boards.findIndex(t => t._id === board._id);
            state.boards.splice(idx, 1, board);
            // state.currBoard = board;
        },
        setFilter(state, {filterBy}) {
            state.filterBy = filterBy;
        },
    },
    actions: {
        async loadBoards({ commit }, { filterBy }) {
            try {
                const boards = await boardService.query(filterBy)
                commit({ type: 'setBoards', boards });
            } catch (err) {
                console.log('Store: Cannot load boards', err);
                throw err;
            }
        },
        async loadBoard({ commit }, {boardId}) {
            try {
                const board = await boardService.getById(boardId);
                commit({ type: 'setBoard', board });
            } catch (err) {
                console.log('boardStore: Error in loadBoard', err);
                throw err;
            }
        },
        async saveBoard({ commit }, { board }) {
            const type = (board._id) ? 'editBoard' : 'addBoard';
            try {
                const savedBoard = await boardService.save(board)
                commit({ type, board: savedBoard })
            } catch (err) {
                console.log('Store: Cannot save board', err);
                throw err;
            }
        },
        async removeBoard({ commit }, payload) {
            try {
                await boardService.remove(payload.board._id)
                commit(payload);
            } catch (err) {
                console.log('Store: Cannot remove board', err);
                throw err;
            }
        }
    }
}
