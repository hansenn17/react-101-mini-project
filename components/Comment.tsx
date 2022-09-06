import { ListItem, ListItemAvatar, Typography, Avatar, ListItemText } from "@mui/material"

export interface IComment {
    comment: string;
    id: string
}

export type CommentProps<Type> = {
    comments: Type[]
}

function Comment(props: CommentProps<IComment>) {
    return (
        <>  
            {
                props.comments.map(comment => {
                    return (
                        <ListItem alignItems='flex-start' sx={{p: 0}} key={comment.id}>
                            <ListItemAvatar sx={{minWidth: '35px'}}>
                                <Avatar alt="no-profile-pic" src={typeof localStorage !== "undefined" ? localStorage.getItem('avatar')?.toString() : 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/890.jpg'} sx={{ height: '25px', width: '25px' }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="caption">
                                        dummy_username
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="body2">
                                        {comment.comment}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    )
                })
            }
        </>
    );
}

export default Comment;