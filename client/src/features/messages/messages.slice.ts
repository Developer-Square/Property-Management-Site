import { 
    createSlice, 
    createEntityAdapter, 
    createAsyncThunk,
} from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { IMessage } from 'interfaces/message';
import Api from 'utils/api';

const api = new Api();

const messagesAdapter = createEntityAdapter<IMessage>();

const initialState = messagesAdapter.getInitialState({ loading: false, loaded: false });

export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
    const res = await api.Message()?.getAllMessages();
    if (res) return res.data;
})

const messageSlice = createSlice({
    name:'messages',
    initialState,
    reducers: {
        messageAdded: messagesAdapter.addOne,
        messageDeleted: messagesAdapter.removeOne,
        messageUpdated: messagesAdapter.updateOne,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchMessages.pending, (state, action) => {
                state.loading = true;
                state.loaded = false;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                messagesAdapter.setAll(state, action.payload)
                state.loading = false;
                state.loaded = true;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
            })
    }
})

export const {
    messageAdded,
    messageDeleted,
    messageUpdated
} = messageSlice.actions;

export default messageSlice.reducer;

export const { selectAll: selectMessages, selectById: selectMessageById } = messagesAdapter.getSelectors((state: RootState )=> state.messages)

export const selectMessageLoading = (state: RootState ) => state.messages.loading;
export const selectMessagesLoaded = (state: RootState ) => state.messages.loaded;