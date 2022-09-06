import Message from "./Message";
import Comment, { IComment } from "./Comment";
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import CommentInputField from "./CommentInputField";

type User = {
    user: {
        avatar: string;
        displayName: string;
    };
    message: string;
    id: string;
    comments: IComment[]
}

interface IPost<Type> {
    messages: Type[];
    getMessage: () => Promise<void>
}

function Post(props: IPost<User>) {
    return (
        <>
            <Divider variant="middle" sx={{ borderColor: '#cecece' }} />
            <List sx={{ width: '100%' }}>
                {
                    props.messages.map((item, index) => {
                        return (
                            <>
                                <ListItem alignItems='flex-start'>
                                    <ListItemAvatar>
                                        <Avatar alt="no-profile-pic" src={item.user.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText disableTypography={true}
                                        primary={
                                            <>
                                                <Typography variant="caption">
                                                    {item.user.displayName}
                                                </Typography>
                                                <Message message={item.message} key={item.id} />
                                                <CommentInputField messageId={item.id} key={index} fetchMessage={props.getMessage} />
                                            </>
                                        }
                                        secondary={
                                            item.comments.length > 0
                                            &&
                                            <>
                                                <List>
                                                    <Comment comments={item.comments} />
                                                </List>
                                            </>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="middle" component='li' sx={{ borderColor: '#cecece' }} />
                            </>
                        )
                    })
                }
            </List>
        </>
    );
}

export default Post;