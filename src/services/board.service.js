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

_createBoards() 

function query() {
    // return httpService.get(`board/`)
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
            _createBoard('b101', 'board1'),
            _createBoard('b102', 'board2'),
            _createBoard('b103', 'board3'),
        ]
        storageService.store(KEY, boards)
    }
    return boards;
}

function _createBoard(_id, title) {
    return {
        _id,
        title,
        createdAt: 1589983468418,
        createdBy: {
            _id: 'u101',
            fullname: 'Shraga Puk',
            imgUrl: 'https://randomuser.me/api/portraits/men/21.jpg',
        },
        statuses: [
            {
                id: 's101',
                title: 'Done',
                color: '#61bd4f',
            },
            {
                id: 's102',
                title: 'Stuck',
                color: 'red',
            },
            {
                id: 's103',
                title: 'Working on it',
                color: 'yellow',
            },
        ],
        priorities: [
            {
                id: 'p101',
                title: 'High',
                color: '#61bd4f',
            },
        ],
        members: [
            {
                _id: 'u101', // Each is mini-user, ID from Backend
                fullname: 'Shraga Puk',
                imgUrl: 'https://randomuser.me/api/portraits/men/21.jpg',
            },
            {
                _id: 'u102', // Each is mini-user, ID from Backend
                fullname: 'Tal Tarablus',
                imgUrl: 'https://www.google.com',
            },
        ],
        groups: [
            {
                id: 'g101',
                title: 'Group 1',
                tasks: [
                    {
                        id: 't104',
                        title: 'Help me',
                        members: [
                            {
                                _id: 'u101',
                                fullname: 'Tal Tarablus',
                                imgUrl:
                                    'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                            },
                        ],
                        byMember: {
                            _id: 'u102',
                            fullname: 'Shraga Puk',
                            imgUrl:
                                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        comments: [
                            {
                                id: 'u101',
                                update: 'changed font size',
                                file: 'http://some-img',
                                createdAt: 154514,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Abi Abambi',
                                    imgUrl: 'http://some-img',
                                },
                            },
                        ],
                        statusId: 's101',
                        priorityId: 'p102',
                        createdAt: 1590999730348,
                        dueDate: 16156215211,
                    },
                ],
                color: '#8D0000',
            },
        ],
        activities: [
            {
                id: 'a101',
                action: 'Changed Color',
                createdAt: 154514,
                byMember: {
                    _id: 'u101',
                    fullname: 'Abi Abambi',
                    imgUrl: 'http://some-img',
                },
                task: {
                    id: 't101',
                    title: 'Replace Logo',
                },
            },
        ],
    };
}

