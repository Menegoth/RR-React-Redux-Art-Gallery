import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    objectId: 450000,
    apiData: ""
}

export const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setData: (state, action) => {
            return {...state, apiData: action.payload}
        },
        clearData: () => {
            return initialState
        },
        inputId: (state, action) => {
            return {...state, objectId: action.payload}
        },
        incrementId: (state) => {
            return {objectId: state.objectId + 1}
        },
        decrementId: (state) => {
            return {objectId: state.objectId - 1}
        }
    }
});

export const { setData, clearData, inputId, incrementId, decrementId } = dataSlice.actions;

export function fetchData() {
    async function fetchDataThunk(dispatch, getState) {
        let state = getState();
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`);
        const data = await response.json();
        dispatch(setData(data));
    }
    return fetchDataThunk;
}

export default dataSlice.reducer;