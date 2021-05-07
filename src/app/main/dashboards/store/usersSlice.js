import firebase from 'app/services/firebaseService';
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';

export const getUsers = createAsyncThunk('floraXpressApp/users/getUsers', async (params, { dispatch }) => {

    var all_users = [];
    var allUsersRef = firebase.firestore.collection("users");
    allUsersRef = (params.role !== 0) ? allUsersRef.where('role', "==", params.role) : allUsersRef;
    allUsersRef = (params.status !== 0) ? ((params.status == 1) ? allUsersRef.where('status', "==", true) : allUsersRef.where('status', "==", false)) : allUsersRef;
    await allUsersRef.get().then(function (usersSnapshot) {
        usersSnapshot.forEach(function (doc) {
            var temp_data = doc.data();
            temp_data.id = doc.id;
            all_users.push(temp_data);
        });
    });

    return { all_users, params };
});

export const updateUsers = createAsyncThunk('floraXpressApp/users/updateUsers', async (params, { dispatch, getState }) => {
//     const data = response.data;
//     if (data.status) {
//         await dispatch(showMessage({
//             message: "Successfully updated!",//text or html
//             autoHideDuration: 3000,//ms
//             anchorOrigin: {
//                 vertical: 'top',//top bottom
//                 horizontal: 'right'//left center right
//             },
//             variant: 'success'//success error info warning null
//         }));
//         await dispatch(getUsers(getState().backendApp.users.last_param));
//     }
});

const usersAdapter = createEntityAdapter({});

export const { selectAll: selectUsers, selectById: selectUsersById } = usersAdapter.getSelectors(
    state => {
        return state.floraXpressApp.users;
    }
);

const usersSlice = createSlice({
    name: 'floraXpressApp/users',
    initialState: usersAdapter.getInitialState({
        last_param: [],
        searchText: '',
        usersLoadFlag: false,
    }),
    reducers: {
        setUsersSearchText: {
            reducer: (state, action) => {
                state.searchText = action.payload;
            },
            prepare: event => ({ payload: event.target.value || '' })
        },
        setUsersLoadFlag: (state, action) => {
            state.usersLoadFlag = false;
        },
    },
    extraReducers: {
        [getUsers.fulfilled]: (state, action) => {
            const { all_users, params } = action.payload;
            usersAdapter.setAll(state, all_users);
            state.last_param = params;
            state.usersLoadFlag = true;
        },
    }
});

export const {
    setUsersSearchText,
    setUsersLoadFlag,
} = usersSlice.actions;

export default usersSlice.reducer;
