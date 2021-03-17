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
        description: 'Welcome To Your First Tasker Board',
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
                _id: 'u101', 
                fullname: 'Shraga Puk',
                imgUrl: 'https://randomuser.me/api/portraits/men/21.jpg',
            },
            {
                _id: 'u102', 
                fullname: 'Datia Puk',
                imgUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
            },
            {
                _id: 'u103', 
                fullname: 'Tuki Norma',
                imgUrl: 'https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg',
            },
            {
                _id: 'u104', 
                fullname: 'Muki Abu Ja',
                imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPGD2nRVqluXRYoJdMRuczqzyorOJThR8Dg&usqp=CAU',
            },
            {
                _id: 'u105', 
                fullname: 'JSON De Parse',
                imgUrl: 'https://randomuser.me/api/portraits/men/25.jpg',
            },
        ],
        groups: [
            {
                id: 'g101',
                title: 'Product Definition',
                tasks: [
                    {
                        id: 't101',
                        title: 'Understanding the basic flow',
                        members: [
                            {
                                _id: 'u101', 
                                fullname: 'Shraga Puk',
                                imgUrl: 'https://randomuser.me/api/portraits/men/21.jpg',
                            },
                            {
                                _id: 'u102', 
                                fullname: 'Datia Puk',
                                imgUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
                            },
                        ],
                        byMember: {
                            _id: 'u101',
                            fullname: 'Shraga Puk',
                            imgUrl:
                                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        comments: [
                            {
                                id: 'c101',
                                update: 'Added the basic pages to the presentation',
                                file: 'http://some-img',
                                createdAt: 154514,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Shraga Puk',
                                     imgUrl:
                                   'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                            {
                                id: 'c102',
                                update: 'Fixed the layout of the current Highlights page',
                                file: 'http://some-img',
                                createdAt: 154574,
                                byMember: {
                                    _id: 'u102', 
                                    fullname: 'Datia Puk',
                                    imgUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
                                },
                            },
                        ],
                        statusId: 's101',
                        priorityId: 'p102',
                        createdAt: 1590999730348,
                        dueDate: 16756215211,
                    },
                    {
                        id: 't102',
                        title: 'Preparation for collaboration between programmers',
                        members: [
                            {
                                _id: 'u103', 
                                fullname: 'Tuki Norma',
                                imgUrl: 'https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg',
                            },
                            {
                                _id: 'u105', 
                                fullname: 'JSON De Parse',
                                imgUrl: 'https://randomuser.me/api/portraits/men/25.jpg',
                            },
                        ],
                        byMember: {
                            _id: 'u103', 
                            fullname: 'Tuki Norma',
                            imgUrl: 'https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg'
                        },
                        comments: [
                            {
                                id: 'c103',
                                update: 'Created a git depository and sent invitation',
                                file: 'http://some-img',
                                createdAt: 154514,
                                byMember: {
                                    _id: 'u103', 
                                    fullname: 'Tuki Norma',
                                    imgUrl: 'https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg'
                                },
                            },
                            {
                                id: 'c105',
                                update: 'Uploaded the first commit with the folders structure',
                                file: 'http://some-img',
                                createdAt: 154574,
                                byMember: {
                                    _id: 'u105', 
                                    fullname: 'JSON De Parse',
                                    imgUrl: 'https://randomuser.me/api/portraits/men/25.jpg',
                                },
                            },
                            {
                                id: 'c105',
                                update: 'Finished the initial wire-connection, all looks in good working order',
                                file: 'http://some-img',
                                createdAt: 154574,
                                byMember: {
                                    _id: 'u105', 
                                     fullname: 'JSON De Parse',
                                   imgUrl: 'https://randomuser.me/api/portraits/men/25.jpg',
                                },
                            },
                        ],
                        statusId: 's101',
                        priorityId: 'p102',
                        createdAt: 1590999730348,
                        dueDate: 16756215211,
                    },
                ],
                color: '#8D0000',
            },
            {
                id: 'g101',
                title: 'UX/UI',
                tasks: [
                    {
                        id: 't101',
                        title: 'Understanding the basic flow',
                        members: [
                            {
                                _id: 'u101', 
                                fullname: 'Shraga Puk',
                                imgUrl: 'https://randomuser.me/api/portraits/men/21.jpg',
                            },
                            {
                                _id: 'u102', 
                                fullname: 'Datia Puk',
                                imgUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
                            },
                        ],
                        byMember: {
                            _id: 'u101',
                            fullname: 'Shraga Puk',
                            imgUrl:
                                'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                        },
                        comments: [
                            {
                                id: 'c101',
                                update: 'Added the basic pages to the presentation',
                                file: 'http://some-img',
                                createdAt: 154514,
                                byMember: {
                                    _id: 'u101',
                                    fullname: 'Shraga Puk',
                                     imgUrl:
                                   'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
                                },
                            },
                            {
                                id: 'c102',
                                update: 'Fixed the layout of the current Highlights page',
                                file: 'http://some-img',
                                createdAt: 154574,
                                byMember: {
                                    _id: 'u102', 
                                    fullname: 'Datia Puk',
                                    imgUrl: 'https://randomuser.me/api/portraits/women/14.jpg',
                                },
                            },
                        ],
                        statusId: 's101',
                        priorityId: 'p102',
                        createdAt: 1590999730348,
                        dueDate: 16756215211,
                    },
                    {
                        id: 't102',
                        title: 'Determination of layout',
                        members: [
                            {
                                _id: 'u103', 
                                fullname: 'Tuki Norma',
                                imgUrl: 'https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg',
                            },
                            {
                                _id: 'u105', 
                                fullname: 'JSON De Parse',
                                imgUrl: 'https://randomuser.me/api/portraits/men/25.jpg',
                            },
                        ],
                        byMember: {
                            _id: 'u103', 
                            fullname: 'Tuki Norma',
                            imgUrl: 'https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg'
                        },
                        comments: [
                            {
                                id: 'c103',
                                update: 'Created a git depository and sent invitation',
                                file: 'http://some-img',
                                createdAt: 154514,
                                byMember: {
                                    _id: 'u103', 
                                    fullname: 'Tuki Norma',
                                    imgUrl: 'https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg'
                                },
                            },
                            {
                                id: 'c105',
                                update: 'Uploaded the first commit with the folders structure',
                                file: 'http://some-img',
                                createdAt: 154574,
                                byMember: {
                                    _id: 'u105', 
                                    fullname: 'JSON De Parse',
                                    imgUrl: 'https://randomuser.me/api/portraits/men/25.jpg',
                                },
                            },
                            {
                                id: 'c105',
                                update: 'Finished the initial wire-connection, all looks in good working order',
                                file: 'http://some-img',
                                createdAt: 154574,
                                byMember: {
                                    _id: 'u105', 
                                     fullname: 'JSON De Parse',
                                   imgUrl: 'https://randomuser.me/api/portraits/men/25.jpg',
                                },
                            },
                        ],
                        statusId: 's101',
                        priorityId: 'p102',
                        createdAt: 1590999730348,
                        dueDate: 16756215211,
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

