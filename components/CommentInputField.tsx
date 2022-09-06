import { TextField, Grid, Box, IconButton } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import axios from 'axios'
import { useState } from 'react'

interface ICommentInputField {
    fetchMessage: () => Promise<void>;
    messageId: string | undefined;
}

function CommentInputField(props: ICommentInputField) {
    const [comment, setComment] = useState('')

    let getMessage = props.fetchMessage

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(comment !== '') {
            await axios.post(`/users/${localStorage.getItem('loggedInUser')}/posts/${props.messageId}/comments`, { comment: comment })
            .then(() => {
                setComment('')
                getMessage()
            })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value)
    }

    return (
        <>
            <Box component='form' onSubmit={handleSubmit}>
                <Grid container sx={{pb: 1}}>
                    <Grid item xs={12}>
                        <TextField label="comment" sx={{width: '90%'}} onChange={handleChange} className='commentInput' />
                        <IconButton type='submit' size='small' sx={{verticalAlign: 'bottom'}} color="primary"><SendIcon fontSize='inherit' /></IconButton>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default CommentInputField;