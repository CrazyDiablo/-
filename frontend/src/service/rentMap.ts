import createAPI from '@u/createAPI'

export default createAPI('rentMap', {
    'getRentList': {
        method: 'GET',
        path: 'rentMap/rentList',
    },
})