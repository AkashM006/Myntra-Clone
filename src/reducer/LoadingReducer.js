const loadingStatus = (state, action) => {
    switch (action.type) {
        case "loading":
            return {
                isLoading: true,
            }
        case "success":
            return {
                isLoading: false,
            }
        case "error":
            return {
                isLoading: false,
            }
    }
}

export const initialState = {
    isLoading: false,
}

export default loadingStatus