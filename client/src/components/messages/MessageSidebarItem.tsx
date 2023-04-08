import React from 'react';
import { ListItem, ListItemAvatar, Avatar, ListItemText, Typography } from '@pankod/refine-mui';
import { IUser } from 'interfaces/user';
import { IMessage } from 'interfaces/message';

type Props = {
    user: IUser;
    message: IMessage;
};

const MessageSidebarItem = ({ user, message }: Props) => (
    <ListItem alignItems="flex-start">
        <ListItemAvatar>
            <Avatar alt={user.name} src={user.avatar} />
        </ListItemAvatar>
        <ListItemText
            primary={
                <React.Fragment>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        align="left"
                    >
                        {user.name}
                    </Typography>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        align="right"
                    >
                        {new Date(message.createdAt).toLocaleTimeString('en-US', {
                            timeZone: 'UTC',
                            hour12: true,
                            hour: 'numeric',
                            minute: 'numeric',
                        })}
                    </Typography>
                </React.Fragment>
            }
            secondary={<Typography fontSize={14}>{message.text.slice(0, 18) + '...'}</Typography>}
        />
    </ListItem>
);

export default MessageSidebarItem;
