const deferredActionReducer = (state, action) => {
    const callback = action.callback
    switch (action.type) {
        case 'add':
            return {
                callback,
            }
        case 'done': 
            return {
                callback: null
            }
        default:
            return state
    }
}

export const initialState = {
    callback: null
}

export default deferredActionReducer