import useSWR from 'swr';

import { getKey } from 'utils';
import { IMessage } from 'interfaces/message';

export const useMessages = (
    query?: string | string[][] | Record<string, string> | URLSearchParams
) => useSWR<IMessage[]>(getKey('messages', query));

export const useMessageById = (id: string) => useSWR<IMessage>(`messages/${id}`);
