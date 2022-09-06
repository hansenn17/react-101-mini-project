import { TextField, Grid, Box, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useState } from 'react'
import axios from 'axios'

interface IInputField {
    fetchMessage: () => Promise<void>;
    profileId: string | undefined | string[];
}

function InputField(props: IInputField) {
    const [message, setMessage] = useState('')
    
    let getMessage = props.fetchMessage

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(message !== '') {
            await axios.post(`users/${localStorage.getItem('loggedInUser')}/posts`, { message: message }) //SHOULD GET USER DATA FROM SESSION
            .then(() => {
                setMessage('')
                getMessage()
            })
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value)
    }

    return (
        <>
            <Box component='form' onSubmit={handleSubmit} sx={{m: 2}}>
                <Grid container sx={{pb: 1}}>
                    <Grid item xs={12}>
                        <TextField
                            label="what's in your thought?"
                            sx={{width: '100%'}}
                            onChange={handleChange}
                            disabled={
                                typeof localStorage !== "undefined" ? props.profileId !== localStorage.getItem("loggedInUser")?.toString() && true : false
                            }
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <Button
                            type='submit'
                            variant='outlined'
                            size='small'
                            sx={{float: 'right'}}
                            endIcon={ <SendIcon /> }
                            disabled={
                                typeof localStorage !== "undefined" ? props.profileId !== localStorage.getItem("loggedInUser")?.toString() && true : false
                            }
                            >Send</Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default InputField;