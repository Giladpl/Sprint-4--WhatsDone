import {asyncStorageService} from './async-storage.service.js'
import {storageService} from './storage.service.js'
import {utilService} from './util.service.js'
// import {httpService} from './http.service.js'

const KEY = 'boardsDB';

export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy: getEmptyBoard
}

// _createBoards() 

function query(filter) {
    // return httpService.get(`board/`)
    // return httpService.get(`board?${filter}`)
    return asyncStorageService.query(KEY)
}

function getById(id) {
    // return httpService.get(`board/${id}`)
    return asyncStorageService.get(KEY, id);
}

function remove(id) {
    // return httpService.delete(`board/${id}`)
    return asyncStorageService.remove(KEY, id);
}

function save(board) {
    // if (board._id) {
    //     return httpService.put(`board/${board._id}`, board)
    // } else {
    //     return httpService.post(`toy/`, board)
    // }
    const savedBoard = (board._id) ? asyncStorageService.put(KEY, board) : asyncStorageService.post(KEY, board)
    return savedBoard;
}

function getEmptyBoard() {
    return {
        name,
        price,
        type,
        createdAt: Date.now(),
        inStock: true
    }
}

function _createBoards() {
    let boards = storageService.load(KEY)
    if (!boards || !boards.length) {
        boards = [
            _createBoard('toy1'),
            _createBoard('toy2'),
            _createBoard('toy3'),
        ]
        storageService.store(KEY, boards)
    }
    return boards;
}

function _createBoard(name) {
    let board = getEmptyToy(name);
    board._id = utilService.makeId();
    return board;
}

