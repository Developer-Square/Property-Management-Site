import api from '../../app/api';
import { IMessage, IMessageFilterFields } from 'interfaces/message';
import { IPaginationOptions } from 'interfaces/query';

const apiWithMessageTags = api.enhanceEndpoints({ addTagTypes: ['Message'] });

const messageApi = apiWithMessageTags.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<IMessage[], Partial<IMessageFilterFields> & IPaginationOptions>({
      query: (params) => ({
        url: 'messages',
        method: 'GET',
        params,
      }),
      providesTags: (data) =>
        data
          ? [...data.map(({ id }) => ({ type: 'Message' as const, id })), { type: 'Message', id: 'PARTIAL-MESSAGE-LIST' }]
          : [{ type: 'Message', id: 'PARTIAL-MESSAGE-LIST' }],
    }),
    getSingleMessage: builder.query<IMessage, Pick<IMessage, 'id'>>({
      query: ({ id }) => ({
        url: `messages/${id}`,
        method: 'GET',
      }),
      providesTags: (result) => (result ? [{ type: 'Message', id: result.id }] : ['Message']),
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useGetSingleMessageQuery,
} = messageApi;
export default messageApi;
