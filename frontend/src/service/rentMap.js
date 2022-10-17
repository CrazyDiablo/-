import createAPI from '@Utils/createAPI'

export default createAPI('rentMap', {
    'all': {
        method: 'GET',
        path: 'todo/all',
    },
    'add': {
        method: 'POST',
        path: 'todo/add',
    },
    'delete': {
        method: 'GET',
        path: 'todo/delete',
    },
    'update': {
        method: 'POST',
        path: 'todo/update',
    },
})