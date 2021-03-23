import { asyncStorageService } from './async-storage.service.js'
import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'
import {httpService} from './http.service.js'

const KEY = 'boardsDB';

export const boardService = {
    query,
    getById,
    remove,
    save,
    getEmptyBoard,
    getEmptyTask,
    getEmptyGroup
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
    //     return httpService.post(`board/`, board)
    // }
    const savedBoard = (board._id) ? asyncStorageService.put(KEY, board) : asyncStorageService.post(KEY, board)
    return savedBoard;
}

function getEmptyBoard() {
    return {
        title: 'New board',
        description: 'Add description',
        createdAt: Date.now(),
        imgUrl: null,
        createdBy: {},
        statuses: [],
        priorities: [],
        members: [],
        groups: [],
        activities: []
    }
}

function getEmptyTask() {
    return {
        id: utilService.makeId(),
        title: null,
        members: [],
        byMember: {},
        comments: [],
        statusId: 'sNew',
        priorityId: 'pNew',
        createdAt: Date.now(),
        dueDate: Date.now(),
        secondsWorkedOn: 0,
    }
}

function getEmptyGroup() {
    return {
        id: utilService.makeId(),
        title: 'Empty Group',
        tasks: [],
        color: '#8D0000',
    }

}

function _createBoards() {
    let boards = storageService.load(KEY)
    if (!boards || !boards.length) {
        boards = [
            _createBoard1(),
            _createBoard2()
        ]
        storageService.store(KEY, boards)
    }
    return boards;
}

function _createBoard1() {
  return {
    "_id": "6059efa4364773a1b1dba789",
    "title": "Software Development",
    "description": "Software Development Life Cycle",
    "createdAt": 1589983468418,
    "imgUrl": "https://media.giphy.com/media/dWesBcTLavkZuG35MI/giphy.gif",
    "createdBy": {
        "_id": "60589078b5499f32382121e3",
        "fullname": "Shraga Puk",
        "imgUrl": "https://randomuser.me/api/portraits/men/21.jpg"
    },
    "statuses": [
        {
            "id": "s101",
            "title": "Done",
            "color": "#00ca72"
        },
        {
            "id": "s102",
            "title": "Stuck",
            "color": "#e44258"
        },
        {
            "id": "s103",
            "title": "Working on it",
            "color": "#fdab3d"
        },
        {
            "id": "s104",
            "title": "Pending review",
            "color": "#0085ff"
        },
        {
            "id": "sNew",
            "title": "",
            "color": "#808080"
        }
    ],
    "priorities": [
        {
            "id": "p101",
            "title": "High",
            "color": "#e44258"
        },
        {
            "id": "p102",
            "title": "Medium",
            "color": "#a358df"
        },
        {
            "id": "p103",
            "title": "Low",
            "color": "#00ca72"
        },
        {
            "id": "pNew",
            "title": "",
            "color": "#808080"
        }
    ],
    "members": [
        {
            "_id": "60589078b5499f32382121e3",
            "fullname": "Shraga Puk",
            "imgUrl": "https://randomuser.me/api/portraits/men/21.jpg"
        },
        {
            "_id": "605890eab5499f32382121e4",
            "fullname": "Datia Puk",
            "imgUrl": "https://randomuser.me/api/portraits/women/14.jpg"
        },
        {
            "_id": "60589127b5499f32382121e5",
            "fullname": "Tuki Norma",
            "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
        },
        {
            "_id": "60589169b5499f32382121e6",
            "fullname": "Muki Abu Ja",
            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPGD2nRVqluXRYoJdMRuczqzyorOJThR8Dg&usqp=CAU"
        },
        {
            "_id": "60589198b5499f32382121e7",
            "fullname": "JSON De Parse",
            "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
        },
        {
            "_id": "60589234b5499f32382121e8",
            "fullname": "Nancy Williams",
            "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
        },
        {
            "_id": "6058927bb5499f32382121e9",
            "fullname": "Dan Willer",
            "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
        },
        {
            "_id": "605892a8b5499f32382121ea",
            "fullname": "Robert Wilford",
            "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
        },
        {
            "_id": "605892cfb5499f32382121eb",
            "fullname": "Stephanie White",
            "imgUrl": "https://randomuser.me/api/portraits/women/42.jpg"
        },
        {
            "_id": "605892efb5499f32382121ec",
            "fullname": "Dan Henderson",
            "imgUrl": "https://randomuser.me/api/portraits/men/32.jpg"
        }
    ],
    "groups": [
        {
            "id": "g101",
            "title": "Problem Definition and Planning",
            "tasks": [
                {
                    "id": "t101",
                    "title": "Identifying the scope and purpose of the prospect application  ",
                    "members": [
                        {
                            "_id": "60589078b5499f32382121e3",
                            "fullname": "Shraga Puk",
                            "imgUrl": "https://randomuser.me/api/portraits/men/21.jpg"
                        },
                        {
                            "_id": "605890eab5499f32382121e4",
                            "fullname": "Datia Puk",
                            "imgUrl": "https://randomuser.me/api/portraits/women/14.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589078b5499f32382121e3",
                        "fullname": "Shraga Puk",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "comments": [
                        {
                            "id": "c101",
                            "update": "Added the basic pages to the presentation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589078b5499f32382121e3",
                                "fullname": "Shraga Puk",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        },
                        {
                            "id": "c102",
                            "update": "Fixed the layout of the current Highlights page",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "605890eab5499f32382121e4",
                                "fullname": "Datia Puk",
                                "imgUrl": "https://randomuser.me/api/portraits/women/14.jpg"
                            }
                        }
                    ],
                    "statusId": "s103",
                    "priorityId": "p103",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-04-01T21:00:00.000Z",
                    "secondsWorkedOn": 987543
                },
                {
                    "id": "t102",
                    "title": "Calculation of labor and other possible future costs of project",
                    "members": [
                        {
                            "_id": "60589127b5499f32382121e5",
                            "fullname": "Tuki Norma",
                            "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                        },
                        {
                            "_id": "60589198b5499f32382121e7",
                            "fullname": "JSON De Parse",
                            "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                        },
                        {
                            "_id": "60589169b5499f32382121e6",
                            "fullname": "Muki Abu Ja",
                            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPGD2nRVqluXRYoJdMRuczqzyorOJThR8Dg&usqp=CAU"
                        }
                    ],
                    "byMember": {
                        "_id": "60589127b5499f32382121e5",
                        "fullname": "Tuki Norma",
                        "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s103",
                    "priorityId": "p101",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-03-05T22:00:00.000Z",
                    "secondsWorkedOn": 351465485

                },
                {
                    "id": "t103",
                    "title": "Creation of proposed timetable with target goals",
                    "members": [
                        {
                            "_id": "60589234b5499f32382121e8",
                            "fullname": "Nancy Williams",
                            "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
                        },
                        {
                            "_id": "6058927bb5499f32382121e9",
                            "fullname": "Dan Willer",
                            "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "605892a8b5499f32382121ea",
                        "fullname": "Robert Wilford",
                        "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s103",
                    "priorityId": "p102",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-04-11T21:00:00.000Z",
                    "secondsWorkedOn": 351435435
                },
                {
                    "id": "t104",
                    "title": "Assignment and preparation of the relevant project's working-teams",
                    "members": [
                        {
                            "_id": "60589127b5499f32382121e5",
                            "fullname": "Tuki Norma",
                            "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                        },
                        {
                            "_id": "60589198b5499f32382121e7",
                            "fullname": "JSON De Parse",
                            "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589127b5499f32382121e5",
                        "fullname": "Tuki Norma",
                        "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c102",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s102",
                    "priorityId": "p101",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-04-13T21:00:00.000Z",
                    "secondsWorkedOn": 23465324
                },
                {
                    "id": "t105",
                    "title": "Getting an initial feedback from client",
                    "members": [
                        {
                            "_id": "605892a8b5499f32382121ea",
                            "fullname": "Robert Wilford",
                            "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
                        },
                        {
                            "_id": "60589198b5499f32382121e7",
                            "fullname": "JSON De Parse",
                            "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                        },
                        {
                            "_id": "60589078b5499f32382121e3",
                            "fullname": "Shraga Puk",
                            "imgUrl": "https://randomuser.me/api/portraits/men/21.jpg"
                        },
                        {
                            "_id": "60589127b5499f32382121e5",
                            "fullname": "Tuki Norma",
                            "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589127b5499f32382121e5",
                        "fullname": "Tuki Norma",
                        "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c102",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s102",
                    "priorityId": "p102",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-04-01T21:00:00.000Z",
                    "secondsWorkedOn": 2342345
                }
            ],
            "color": "#8D0000"
        },
        {
            "id": "g102",
            "title": "Program Design",
            "tasks": [
                {
                    "id": "t106",
                    "title": "Deciding of the Architecture to be used",
                    "members": [
                        {
                            "_id": "605892cfb5499f32382121eb",
                            "fullname": "Stephanie White",
                            "imgUrl": "https://randomuser.me/api/portraits/women/42.jpg"
                        },
                        {
                            "_id": "605892efb5499f32382121ec",
                            "fullname": "Dan Henderson",
                            "imgUrl": "https://randomuser.me/api/portraits/men/32.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "605892a8b5499f32382121ea",
                        "fullname": "Robert Wilford",
                        "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
                    },
                    "comments": [
                        {
                            "id": "c101",
                            "update": "Added the basic pages to the presentation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589078b5499f32382121e3",
                                "fullname": "Shraga Puk",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        },
                        {
                            "id": "c102",
                            "update": "Fixed the layout of the current Highlights page",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "605890eab5499f32382121e4",
                                "fullname": "Datia Puk",
                                "imgUrl": "https://randomuser.me/api/portraits/women/14.jpg"
                            }
                        }
                    ],
                    "statusId": "s101",
                    "priorityId": "p101",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-05-04T21:00:00.000Z",
                    "secondsWorkedOn": 1234
                },
                {
                    "id": "t107",
                    "title": "Deciding of the relevant framework to be used",
                    "members": [
                        {
                            "_id": "605892cfb5499f32382121eb",
                            "fullname": "Stephanie White",
                            "imgUrl": "https://randomuser.me/api/portraits/women/42.jpg"
                        },
                        {
                            "_id": "60589234b5499f32382121e8",
                            "fullname": "Nancy Williams",
                            "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
                        },
                        {
                            "_id": "60589169b5499f32382121e6",
                            "fullname": "Muki Abu Ja",
                            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPGD2nRVqluXRYoJdMRuczqzyorOJThR8Dg&usqp=CAU"
                        },
                        {
                            "_id": "60589078b5499f32382121e3",
                            "fullname": "Shraga Puk",
                            "imgUrl": "https://randomuser.me/api/portraits/men/21.jpg"
                        },
                        {
                            "_id": "605890eab5499f32382121e4",
                            "fullname": "Datia Puk",
                            "imgUrl": "https://randomuser.me/api/portraits/women/14.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589127b5499f32382121e5",
                        "fullname": "Tuki Norma",
                        "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c102",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s102",
                    "priorityId": "p101",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-04-11T21:00:00.000Z",
                    "secondsWorkedOn": 1234
                },
                {
                    "id": "t108",
                    "title": "Initial planning of the desired user interface",
                    "members": [
                        {
                            "_id": "60589127b5499f32382121e5",
                            "fullname": "Tuki Norma",
                            "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589127b5499f32382121e5",
                        "fullname": "Tuki Norma",
                        "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c106",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s102",
                    "priorityId": "p102",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-04-03T21:00:00.000Z",
                    "secondsWorkedOn":124
                },
                {
                    "id": "t109",
                    "title": "Defining the platforms the software should run on",
                    "members": [
                        {
                            "_id": "60589234b5499f32382121e8",
                            "fullname": "Nancy Williams",
                            "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
                        },
                        {
                            "_id": "6058927bb5499f32382121e9",
                            "fullname": "Dan Willer",
                            "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
                        },
                        {
                            "_id": "605892a8b5499f32382121ea",
                            "fullname": "Robert Wilford",
                            "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589127b5499f32382121e5",
                        "fullname": "Tuki Norma",
                        "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s101",
                    "priorityId": "p102",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-04-01T21:00:00.000Z",
                    "secondsWorkedOn":154
                },
                {
                    "id": "t110",
                    "title": "Understanding the desired flow of the program",
                    "members": [
                        {
                            "_id": "60589169b5499f32382121e6",
                            "fullname": "Muki Abu Ja",
                            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPGD2nRVqluXRYoJdMRuczqzyorOJThR8Dg&usqp=CAU"
                        },
                        {
                            "_id": "60589198b5499f32382121e7",
                            "fullname": "JSON De Parse",
                            "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589127b5499f32382121e5",
                        "fullname": "Tuki Norma",
                        "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c107",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s102",
                    "priorityId": "p103",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-04-02T21:00:00.000Z",
                    "secondsWorkedOn":3546
                }
            ],
            "color": "#77dbed"
        },
        {
            "id": "g103",
            "title": "Software development",
            "tasks": [
                {
                    "id": "t111",
                    "title": "Creation of prototype and receiving an approval",
                    "members": [
                        {
                            "_id": "6058927bb5499f32382121e9",
                            "fullname": "Dan Willer",
                            "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
                        },
                        {
                            "_id": "60589078b5499f32382121e3",
                            "fullname": "Shraga Puk",
                            "imgUrl": "https://randomuser.me/api/portraits/men/21.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589078b5499f32382121e3",
                        "fullname": "Shraga Puk",
                        "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                    },
                    "comments": [
                        {
                            "id": "c101",
                            "update": "Added the basic pages to the presentation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589078b5499f32382121e3",
                                "fullname": "Shraga Puk",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        },
                        {
                            "id": "c102",
                            "update": "Fixed the layout of the current Highlights page",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "605890eab5499f32382121e4",
                                "fullname": "Datia Puk",
                                "imgUrl": "https://randomuser.me/api/portraits/women/14.jpg"
                            }
                        }
                    ],
                    "statusId": "s101",
                    "priorityId": "p103",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-04-10T21:00:00.000Z",
                    "secondsWorkedOn":76
                },
                {
                    "id": "t112",
                    "title": "Working on Pages and CMPS structure",
                    "members": [
                        {
                            "_id": "60589169b5499f32382121e6",
                            "fullname": "Muki Abu Ja",
                            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPGD2nRVqluXRYoJdMRuczqzyorOJThR8Dg&usqp=CAU"
                        },
                        {
                            "_id": "60589198b5499f32382121e7",
                            "fullname": "JSON De Parse",
                            "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                        },
                        {
                            "_id": "6058927bb5499f32382121e9",
                            "fullname": "Dan Willer",
                            "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589127b5499f32382121e5",
                        "fullname": "Tuki Norma",
                        "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "605892a8b5499f32382121ea",
                                "fullname": "Robert Wilford",
                                "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c109",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s103",
                    "priorityId": "p103",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-03-26T21:00:00.000Z",
                    "secondsWorkedOn": 54335
                },
                {
                    "id": "t113",
                    "title": "Creation of the main css layout",
                    "members": [
                        {
                            "_id": "605892cfb5499f32382121eb",
                            "fullname": "Stephanie White",
                            "imgUrl": "https://randomuser.me/api/portraits/women/42.jpg"
                        },
                        {
                            "_id": "605892efb5499f32382121ec",
                            "fullname": "Dan Henderson",
                            "imgUrl": "https://randomuser.me/api/portraits/men/32.jpg"
                        },
                        {
                            "_id": "60589198b5499f32382121e7",
                            "fullname": "JSON De Parse",
                            "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                        },
                        {
                            "_id": "60589234b5499f32382121e8",
                            "fullname": "Nancy Williams",
                            "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589234b5499f32382121e8",
                        "fullname": "Nancy Williams",
                        "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c107",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s102",
                    "priorityId": "p102",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-03-24T22:00:00.000Z",
                    "secondsWorkedOn": 4356
                }
            ],
            "color": "#7cdb5c"
        },
        {
            "id": "g104",
            "title": "Testing and Debugging",
            "tasks": [
                {
                    "id": "t114",
                    "title": "Assigning QA team with Coding team to work together",
                    "members": [
                        {
                            "_id": "6058927bb5499f32382121e9",
                            "fullname": "Dan Willer",
                            "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
                        },
                        {
                            "_id": "60589078b5499f32382121e3",
                            "fullname": "Shraga Puk",
                            "imgUrl": "https://randomuser.me/api/portraits/men/21.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589078b5499f32382121e3",
                        "fullname": "Shraga Puk",
                        "imgUrl": "https://randomuser.me/api/portraits/men/21.jpg"
                    },
                    "comments": [
                        {
                            "id": "c101",
                            "update": "Added the basic pages to the presentation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589078b5499f32382121e3",
                                "fullname": "Shraga Puk",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        },
                        {
                            "id": "c102",
                            "update": "Fixed the layout of the current Highlights page",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "605890eab5499f32382121e4",
                                "fullname": "Datia Puk",
                                "imgUrl": "https://randomuser.me/api/portraits/women/14.jpg"
                            }
                        }
                    ],
                    "statusId": "s102",
                    "priorityId": "p101",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-03-30T21:00:00.000Z",
                    "secondsWorkedOn": 4786
                },
                {
                    "id": "t115",
                    "title": "Mapping of where to use automated vs manual testings",
                    "members": [
                        {
                            "_id": "605890eab5499f32382121e4",
                            "fullname": "Datia Puk",
                            "imgUrl": "https://randomuser.me/api/portraits/women/14.jpg"
                        },
                        {
                            "_id": "60589234b5499f32382121e8",
                            "fullname": "Nancy Williams",
                            "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589234b5499f32382121e8",
                        "fullname": "Nancy Williams",
                        "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c109",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s103",
                    "priorityId": "p103",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-03-29T21:00:00.000Z",
                    "secondsWorkedOn": 235
                },
                {
                    "id": "t116",
                    "title": "Commencing the testing/debugging cycle",
                    "members": [
                        {
                            "_id": "60589169b5499f32382121e6",
                            "fullname": "Muki Abu Ja",
                            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPGD2nRVqluXRYoJdMRuczqzyorOJThR8Dg&usqp=CAU"
                        },
                        {
                            "_id": "605892cfb5499f32382121eb",
                            "fullname": "Stephanie White",
                            "imgUrl": "https://randomuser.me/api/portraits/women/42.jpg"
                        },
                        {
                            "_id": "60589169b5499f32382121e6",
                            "fullname": "Muki Abu Ja",
                            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPGD2nRVqluXRYoJdMRuczqzyorOJThR8Dg&usqp=CAU"
                        }
                    ],
                    "byMember": {
                        "_id": "60589169b5499f32382121e6",
                        "fullname": "Muki Abu Ja",
                        "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPGD2nRVqluXRYoJdMRuczqzyorOJThR8Dg&usqp=CAU"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s101",
                    "priorityId": "p103",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-03-28T21:00:00.000Z",
                    "secondsWorkedOn": 3215
                }
            ],
            "color": "#d1be30"
        },
        {
            "id": "g105",
            "title": "Deployment, Operation and Maintenance",
            "tasks": [
                {
                    "id": "t117",
                    "title": "Initiating the deployment process, specifically to each relevant system",
                    "members": [
                        {
                            "_id": "6058927bb5499f32382121e9",
                            "fullname": "Dan Willer",
                            "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "6058927bb5499f32382121e9",
                        "fullname": "Dan Willer",
                        "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
                    },
                    "comments": [
                        {
                            "id": "c101",
                            "update": "Added the basic pages to the presentation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589078b5499f32382121e3",
                                "fullname": "Shraga Puk",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }
                        },
                        {
                            "id": "c102",
                            "update": "Fixed the layout of the current Highlights page",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "605890eab5499f32382121e4",
                                "fullname": "Datia Puk",
                                "imgUrl": "https://randomuser.me/api/portraits/women/14.jpg"
                            }
                        }
                    ],
                    "statusId": "s103",
                    "priorityId": "p102",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-04-22T21:00:00.000Z",
                    "secondsWorkedOn": 512
                },
                {
                    "id": "t118",
                    "title": "Constant attention to logged-in reported bugs",
                    "members": [
                        {
                            "_id": "605892efb5499f32382121ec",
                            "fullname": "Dan Henderson",
                            "imgUrl": "https://randomuser.me/api/portraits/men/32.jpg"
                        },
                        {
                            "_id": "60589198b5499f32382121e7",
                            "fullname": "JSON De Parse",
                            "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "60589127b5499f32382121e5",
                        "fullname": "Tuki Norma",
                        "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s102",
                    "priorityId": "p103",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-03-31T21:00:00.000Z",
                    "secondsWorkedOn": 765
                },
                {
                    "id": "t119",
                    "title": "Resolving newly discovered bugs- either on the spot or by initiating a new development phase",
                    "members": [
                        {
                            "_id": "60589234b5499f32382121e8",
                            "fullname": "Nancy Williams",
                            "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
                        },
                        {
                            "_id": "605892cfb5499f32382121eb",
                            "fullname": "Stephanie White",
                            "imgUrl": "https://randomuser.me/api/portraits/women/42.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "605892cfb5499f32382121eb",
                        "fullname": "Stephanie White",
                        "imgUrl": "https://randomuser.me/api/portraits/women/42.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c106",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s102",
                    "priorityId": "p103",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-03-28T21:00:00.000Z",
                    "secondsWorkedOn":462
                },
                {
                    "id": "t120",
                    "title": "Continued development of additional newly features for future releases",
                    "members": [
                        {
                            "_id": "60589169b5499f32382121e6",
                            "fullname": "Muki Abu Ja",
                            "imgUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBPGD2nRVqluXRYoJdMRuczqzyorOJThR8Dg&usqp=CAU"
                        },
                        {
                            "_id": "60589198b5499f32382121e7",
                            "fullname": "JSON De Parse",
                            "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                        },
                        {
                            "_id": "605892efb5499f32382121ec",
                            "fullname": "Dan Henderson",
                            "imgUrl": "https://randomuser.me/api/portraits/men/32.jpg"
                        }
                    ],
                    "byMember": {
                        "_id": "605892efb5499f32382121ec",
                        "fullname": "Dan Henderson",
                        "imgUrl": "https://randomuser.me/api/portraits/men/32.jpg"
                    },
                    "comments": [
                        {
                            "id": "c103",
                            "update": "Created a git depository and sent invitation",
                            "file": "http://some-img",
                            "createdAt": 154514,
                            "byMember": {
                                "_id": "60589127b5499f32382121e5",
                                "fullname": "Tuki Norma",
                                "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                            }
                        },
                        {
                            "id": "c105",
                            "update": "Uploaded the first commit with the folders structure",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        },
                        {
                            "id": "c107",
                            "update": "Finished the initial wire-connection, all looks in good working order",
                            "file": "http://some-img",
                            "createdAt": 154574,
                            "byMember": {
                                "_id": "60589198b5499f32382121e7",
                                "fullname": "JSON De Parse",
                                "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                            }
                        }
                    ],
                    "statusId": "s101",
                    "priorityId": "p102",
                    "createdAt": 1590999730348,
                    "dueDate": "2021-04-29T21:00:00.000Z",
                    "secondsWorkedOn":23
                }
            ],
            "color": "#845EC2"
        }
    ],
    "activities": [
        {
            "id": "a101",
            "action": "Changed Color",
            "createdAt": 1616440539741,
            "byMember": {
                "_id": "u101",
                "fullname": "Abi Abambi",
                "imgUrl": "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
            },
            "task": {
                "id": "t101",
                "title": "Replace Logo"
            }
        },
        {
            "id": "SjouA",
            "action": "Update task title",
            "createdAt": 1616324053163,
            "byMember": {
                "_id": "guest",
                "fullname": "Guest",
                "imgUrl": "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
            },
            "task": {
                "id": "t105",
                "title": "Getting an initial feedback from client"
            }
        },
        {
            "id": "sgvLm",
            "action": "Update task title",
            "createdAt": 1616410539741,
            "byMember": {
                "_id": "guest",
                "fullname": "Guest",
                "imgUrl": "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
            },
            "task": {
                "_id": "u108",
                "fullname": "Robert Wilford",
                "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
            }
        },
        {
            "id": "PWsgh",
            "action": "Update task title",
            "createdAt": 1816324061782,
            "byMember": {
                "_id": "guest",
                "fullname": "Guest",
                "imgUrl": "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
            },
            "task": {
                "id": "t105",
                "title": "Getting an initial feedback from client?"
            }
        },
        {
            "id": "4p6rF",
            "action": "Update task title",
            "createdAt": 1616324061838,
            "byMember": {
                "_id": "guest",
                "fullname": "Guest",
                "imgUrl": "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
            },
            "task": {
                "id": "t105",
                "title": "Getting an initial feedback from client"
            }
        }
    ]
}
}


function _createBoard2() {
    return {
        "_id": "6059efce364773a1b1dbadf5",
        "title": "Trip Planning",
        "description": "Start Planning Your Dream Vacation Now",
        "createdAt": 1589983468418,
        "imgUrl": "https://media.giphy.com/media/YkXNjAkG7CfEVx3gcy/giphy.gif",
        "createdBy": {
            "_id": "60589234b5499f32382121e8",
            "fullname": "Nancy Williams",
            "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
        },
        "statuses": [
            {
                "id": "s101",
                "title": "Done",
                "color": "#00ca72"
            },
            {
                "id": "s102",
                "title": "Stuck",
                "color": "#e44258"
            },
            {
                "id": "s103",
                "title": "Working on it",
                "color": "#fdab3d"
            },
            {
                "id": "s104",
                "title": "Waiting for review",
                "color": "#0085ff"
            },
            {
                "id": "sNew",
                "title": "",
                "color": "#808080"
            }
        ],
        "priorities": [
            {
                "id": "p101",
                "title": "High",
                "color": "#e44258"
            },
            {
                "id": "p102",
                "title": "Medium",
                "color": "#a358df"
            },
            {
                "id": "p103",
                "title": "Low",
                "color": "#00ca72"
            },
            {
                "id": "pNew",
                "title": "",
                "color": "#808080"
            }
        ],
        "members": [
            {
                "_id": "60589234b5499f32382121e8",
                "fullname": "Nancy Williams",
                "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
            },
            {
                "_id": "6058927bb5499f32382121e9",
                "fullname": "Dan Willer",
                "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
            },
            {
                "_id": "605892a8b5499f32382121ea",
                "fullname": "Robert Wilford",
                "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
            },
            {
                "_id": "605892cfb5499f32382121eb",
                "fullname": "Stephanie White",
                "imgUrl": "https://randomuser.me/api/portraits/women/42.jpg"
            },
        ],
        "groups": [
            {
                "id": "g102",
                "title": "Buidling the Trips's frame",
                "tasks": [
                    {
                        "id": "juVjr",
                        "title": "Finding out who's interested  ",
                        "members": [
                            {
                                "_id": "60589234b5499f32382121e8",
                                "fullname": "Nancy Williams",
                                "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
                            }
                        ],
                        "byMember": {},
                        "comments": [],
                        "statusId": "s101",
                        "priorityId": "p101",
                        "createdAt": 1616315457306,
                        "dueDate": 1616315457306,
                        "secondsWorkedOn": 6347
                    },
                    {
                        "id": "t121",
                        "title": "Decide on a few activities and attractions wanted by everyone",
                        "members": [
                            {
                                "_id": "6058927bb5499f32382121e9",
                                "fullname": "Dan Willer",
                                "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
                            },
                            {
                                "_id": "60589234b5499f32382121e8",
                                "fullname": "Nancy Williams",
                                "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
                            },
                            {
                                "_id": "605892a8b5499f32382121ea",
                                "fullname": "Robert Wilford",
                                "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
                            },
                            {
                                "_id": "605892cfb5499f32382121eb",
                                "fullname": "Stephanie White",
                                "imgUrl": "https://randomuser.me/api/portraits/women/42.jpg"
                            }
                        ],
                        "byMember": {
                            "_id": "60589078b5499f32382121e3",
                            "fullname": "Shraga Puk",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "comments": [
                            {
                                "id": "c101",
                                "update": "Added the basic pages to the presentation",
                                "file": "http://some-img",
                                "createdAt": 154514,
                                "byMember": {
                                    "_id": "60589078b5499f32382121e3",
                                    "fullname": "Shraga Puk",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            },
                            {
                                "id": "c102",
                                "update": "Fixed the layout of the current Highlights page",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "605890eab5499f32382121e4",
                                    "fullname": "Datia Puk",
                                    "imgUrl": "https://randomuser.me/api/portraits/women/14.jpg"
                                }
                            }
                        ],
                        "statusId": "s101",
                        "priorityId": "p102",
                        "createdAt": 1590999730348,
                        "dueDate": "2021-03-09T22:00:00.000Z",
                        "secondsWorkedOn": 64
                    },
                    {
                        "id": "t122",
                        "title": "Understanding what kind of accommodation fit's everyone",
                        "members": [
                            {
                                "_id": "605892a8b5499f32382121ea",
                                "fullname": "Robert Wilford",
                                "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
                            }
                        ],
                        "byMember": {
                            "_id": "60589127b5499f32382121e5",
                            "fullname": "Tuki Norma",
                            "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                        },
                        "comments": [
                            {
                                "id": "c103",
                                "update": "Created a git depository and sent invitation",
                                "file": "http://some-img",
                                "createdAt": 154514,
                                "byMember": {
                                    "_id": "60589127b5499f32382121e5",
                                    "fullname": "Tuki Norma",
                                    "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                                }
                            },
                            {
                                "id": "c105",
                                "update": "Uploaded the first commit with the folders structure",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "60589198b5499f32382121e7",
                                    "fullname": "JSON De Parse",
                                    "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                                }
                            },
                            {
                                "id": "c102",
                                "update": "Finished the initial wire-connection, all looks in good working order",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "60589198b5499f32382121e7",
                                    "fullname": "JSON De Parse",
                                    "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                                }
                            }
                        ],
                        "statusId": "s103",
                        "priorityId": "p101",
                        "createdAt": 1590999730348,
                        "dueDate": "2021-03-30T21:00:00.000Z",
                        "secondsWorkedOn": 65432
                    }
                ],
                "color": "rgb(232, 109, 248)"
            },
            {
                "id": "g101",
                "title": "Setting Dates and Booking Services",
                "tasks": [
                    {
                        "id": "t123",
                        "title": "Deciding on a  few dates possibilities",
                        "members": [
                            {
                                "_id": "6058927bb5499f32382121e9",
                                "fullname": "Dan Willer",
                                "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
                            },
                            {
                                "_id": "605892cfb5499f32382121eb",
                                "fullname": "Stephanie White",
                                "imgUrl": "https://randomuser.me/api/portraits/women/42.jpg"
                            }
                        ],
                        "byMember": {
                            "_id": "60589127b5499f32382121e5",
                            "fullname": "Tuki Norma",
                            "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                        },
                        "comments": [
                            {
                                "id": "c103",
                                "update": "Created a git depository and sent invitation",
                                "file": "http://some-img",
                                "createdAt": 154514,
                                "byMember": {
                                    "_id": "60589127b5499f32382121e5",
                                    "fullname": "Tuki Norma",
                                    "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                                }
                            },
                            {
                                "id": "c105",
                                "update": "Uploaded the first commit with the folders structure",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "60589198b5499f32382121e7",
                                    "fullname": "JSON De Parse",
                                    "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                                }
                            },
                            {
                                "id": "c102",
                                "update": "Finished the initial wire-connection, all looks in good working order",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "60589198b5499f32382121e7",
                                    "fullname": "JSON De Parse",
                                    "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                                }
                            }
                        ],
                        "statusId": "s104",
                        "priorityId": "p101",
                        "createdAt": 1590999730348,
                        "dueDate": "2021-04-03T21:00:00.000Z",
                        "secondsWorkedOn": 562
                    },
                    {
                        "id": "t124",
                        "title": "Understanding what is the most available date for everyone",
                        "members": [
                            {
                                "_id": "6058927bb5499f32382121e9",
                                "fullname": "Dan Willer",
                                "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
                            }
                        ],
                        "byMember": {
                            "_id": "60589127b5499f32382121e5",
                            "fullname": "Tuki Norma",
                            "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                        },
                        "comments": [
                            {
                                "id": "c103",
                                "update": "Created a git depository and sent invitation",
                                "file": "http://some-img",
                                "createdAt": 154514,
                                "byMember": {
                                    "_id": "60589127b5499f32382121e5",
                                    "fullname": "Tuki Norma",
                                    "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                                }
                            },
                            {
                                "id": "c105",
                                "update": "Uploaded the first commit with the folders structure",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "60589198b5499f32382121e7",
                                    "fullname": "JSON De Parse",
                                    "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                                }
                            },
                            {
                                "id": "c102",
                                "update": "Finished the initial wire-connection, all looks in good working order",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "60589198b5499f32382121e7",
                                    "fullname": "JSON De Parse",
                                    "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                                }
                            }
                        ],
                        "statusId": "s103",
                        "priorityId": "p101",
                        "createdAt": 1590999730348,
                        "dueDate": "2021-04-03T21:00:00.000Z",
                        "secondsWorkedOn":43
                    },
                    {
                        "id": "t125",
                        "title": "Setting a destination and a finale date",
                        "members": [
                            {
                                "_id": "60589234b5499f32382121e8",
                                "fullname": "Nancy Williams",
                                "imgUrl": "https://randomuser.me/api/portraits/women/50.jpg"
                            },
                            {
                                "_id": "605892a8b5499f32382121ea",
                                "fullname": "Robert Wilford",
                                "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
                            }
                        ],
                        "byMember": {
                            "_id": "60589078b5499f32382121e3",
                            "fullname": "Shraga Puk",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "comments": [
                            {
                                "id": "c101",
                                "update": "Added the basic pages to the presentation",
                                "file": "http://some-img",
                                "createdAt": 154514,
                                "byMember": {
                                    "_id": "60589078b5499f32382121e3",
                                    "fullname": "Shraga Puk",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            },
                            {
                                "id": "c102",
                                "update": "Fixed the layout of the current Highlights page",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "605890eab5499f32382121e4",
                                    "fullname": "Datia Puk",
                                    "imgUrl": "https://randomuser.me/api/portraits/women/14.jpg"
                                }
                            }
                        ],
                        "statusId": "s103",
                        "priorityId": "p101",
                        "createdAt": 1590999730348,
                        "dueDate": "2021-04-09T21:00:00.000Z",
                        "secondsWorkedOn": 65
                    },
                    {
                        "id": "cwsfE",
                        "title": "Booking all services, suppliers and accommodations ",
                        "members": [
                            {
                                "_id": "605892cfb5499f32382121eb",
                                "fullname": "Stephanie White",
                                "imgUrl": "https://randomuser.me/api/portraits/women/42.jpg"
                            }
                        ],
                        "byMember": {},
                        "comments": [],
                        "statusId": "s102",
                        "priorityId": "p102",
                        "createdAt": 1616312959423,
                        "dueDate": "2021-04-11T21:00:00.000Z",
                        "secondsWorkedOn": 676
                    }
                ],
                "color": "#8D0000"
            },
           
            {
                "id": "g103",
                "title": "Finale Arrangement Before We Go",
                "tasks": [
                    {
                        "id": "t126",
                        "title": "Finding baby sitters and dog walkers",
                        "members": [
                            {
                                "_id": "6058927bb5499f32382121e9",
                                "fullname": "Dan Willer",
                                "imgUrl": "https://randomuser.me/api/portraits/men/29.jpg"
                            }
                        ],
                        "byMember": {
                            "_id": "60589078b5499f32382121e3",
                            "fullname": "Shraga Puk",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "comments": [
                            {
                                "id": "c101",
                                "update": "Added the basic pages to the presentation",
                                "file": "http://some-img",
                                "createdAt": 154514,
                                "byMember": {
                                    "_id": "60589078b5499f32382121e3",
                                    "fullname": "Shraga Puk",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                }
                            },
                            {
                                "id": "c102",
                                "update": "Fixed the layout of the current Highlights page",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "605890eab5499f32382121e4",
                                    "fullname": "Datia Puk",
                                    "imgUrl": "https://randomuser.me/api/portraits/women/14.jpg"
                                }
                            }
                        ],
                        "statusId": "s103",
                        "priorityId": "p101",
                        "createdAt": 1590999730348,
                        "dueDate": "2021-05-09T21:00:00.000Z",
                        "secondsWorkedOn": 654
                    },
                    {
                        "id": "t127",
                        "title": "Talking to the gardeners",
                        "members": [
                            {
                                "_id": "605892a8b5499f32382121ea",
                                "fullname": "Robert Wilford",
                                "imgUrl": "https://randomuser.me/api/portraits/men/28.jpg"
                            }
                        ],
                        "byMember": {
                            "_id": "60589127b5499f32382121e5",
                            "fullname": "Tuki Norma",
                            "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                        },
                        "comments": [
                            {
                                "id": "c103",
                                "update": "Created a git depository and sent invitation",
                                "file": "http://some-img",
                                "createdAt": 154514,
                                "byMember": {
                                    "_id": "60589127b5499f32382121e5",
                                    "fullname": "Tuki Norma",
                                    "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                                }
                            },
                            {
                                "id": "c105",
                                "update": "Uploaded the first commit with the folders structure",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "60589198b5499f32382121e7",
                                    "fullname": "JSON De Parse",
                                    "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                                }
                            },
                            {
                                "id": "c109",
                                "update": "Finished the initial wire-connection, all looks in good working order",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "60589198b5499f32382121e7",
                                    "fullname": "JSON De Parse",
                                    "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                                }
                            }
                        ],
                        "statusId": "s102",
                        "priorityId": "p103",
                        "createdAt": 1590999730348,
                        "dueDate": "2021-05-19T21:00:00.000Z",
                        "secondsWorkedOn": 76543
                    },
                    {
                        "id": "t128",
                        "title": "Arranging transportation to the airport",
                        "members": [
                            {
                                "_id": "605892cfb5499f32382121eb",
                                "fullname": "Stephanie White",
                                "imgUrl": "https://randomuser.me/api/portraits/women/42.jpg"
                            }
                        ],
                        "byMember": {
                            "_id": "60589127b5499f32382121e5",
                            "fullname": "Tuki Norma",
                            "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                        },
                        "comments": [
                            {
                                "id": "c103",
                                "update": "Created a git depository and sent invitation",
                                "file": "http://some-img",
                                "createdAt": 154514,
                                "byMember": {
                                    "_id": "60589127b5499f32382121e5",
                                    "fullname": "Tuki Norma",
                                    "imgUrl": "https://i.pinimg.com/originals/3f/9a/4e/3f9a4edcb4e19d9c68516f16cf546624.jpg"
                                }
                            },
                            {
                                "id": "c105",
                                "update": "Uploaded the first commit with the folders structure",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "60589198b5499f32382121e7",
                                    "fullname": "JSON De Parse",
                                    "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                                }
                            },
                            {
                                "id": "c107",
                                "update": "Finished the initial wire-connection, all looks in good working order",
                                "file": "http://some-img",
                                "createdAt": 154574,
                                "byMember": {
                                    "_id": "60589198b5499f32382121e7",
                                    "fullname": "JSON De Parse",
                                    "imgUrl": "https://randomuser.me/api/portraits/men/25.jpg"
                                }
                            }
                        ],
                        "statusId": "s104",
                        "priorityId": "p102",
                        "createdAt": 1590999730348,
                        "dueDate": "2021-05-31T21:00:00.000Z",
                        "secondsWorkedOn":699
                    }
                ],
                "color": "rgb(78, 10, 167)"
            }
        ],
        "activities": [
            {
                "id": "a101",
                "action": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
                },
                "task": {
                    "id": "t101",
                    "title": "Replace Logo"
                }
            }
        ]
    }
}
