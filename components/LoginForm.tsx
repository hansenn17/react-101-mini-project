import { useState } from "react";
import Link from "next/link";
import { Button, Box, Grid, TextField, Checkbox, Card, FormGroup, FormControlLabel, Typography } from "@mui/material";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { useAuth, AuthProviderProps } from '../context/AuthContext'
import axios from 'axios'
import { useRouter } from 'next/router';
import styles from '../styles/LoginForm.module.css'

function LoginForm() {
    const { setAuth } = useAuth() as AuthProviderProps

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const router = useRouter()

    const login = async (username: string, password: string) => {
        const response = await axios.get(`/users?search=${username}`)
        if (response.data.items.length !== 0 && response.data.items[0].password === password) {
            if(typeof setAuth !== "undefined") {
                setAuth(true)
                localStorage.setItem('loggedInUser', response.data.items[0].id) //BAD PRACTICE, SHOULD USE REFRESH TOKEN AND SESSION
                localStorage.setItem('displayName', response.data.items[0].displayName)
                localStorage.setItem('username', response.data.items[0].username)
                localStorage.setItem('avatar', response.data.items[0].avatar)
                router.push('/home/user/me')
            }
        }
    }

    return (
        <Card sx={{ mx: 20, mt: 2 }}>
            <Box component='form'>
                <Grid container spacing={2}>
                    <Grid item xs={6} className={styles.bgImage} sx={{ height: '90vh' }}>
                    </Grid>
                    <Grid item xs={6} sx={{ pr: 2 }}>
                        <Grid container sx={{ justifyContent: 'center', py: 4 }}>
                            <Grid item>
                                <Typography variant="h5" align="center"><LockPersonIcon sx={{fontSize: 40}} /></Typography>
                                <Typography variant="h5">React 101</Typography>
                            </Grid>
                        </Grid>
                        <Grid container sx={{pb: 4}}>
                            <Grid item xs={12}>
                                {/* <input type="text" ref={username} /> */}
                                <TextField variant="standard" label="Username" required sx={{width: '100%'}} onChange={handleUsername}></TextField>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                {/* <input type="password" ref={password} /> */}
                                <TextField variant="standard" label="Password" type="password" required sx={{width: '100%'}} onChange={handlePassword} />
                            </Grid>
                        </Grid>
                        <Grid container sx={{pb: 2}}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Remember Me" />
                            </FormGroup>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Button type="button" variant="outlined" color="primary" sx={{width: '100%'}} onClick={() => login(username, password)}>Sign In</Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6}>
                                <Link href={"#"} style={{textDecoration: 'none'}}><Typography variant="body2">Forgot Password?</Typography></Link>
                            </Grid>
                            <Grid item xs={6}>
                                <Link href={"#"} style={{textDecoration: 'none'}}><Typography variant="body2" sx={{ float: 'right' }}>Sign Up</Typography></Link>
                            </Grid>
                        </Grid>
                        {/* <Grid container sx={{height: 'inherit', bgcolor: 'red'}}>
                            <Grid item xs={12}>
                                <Typography variant="body1">Copyright</Typography>
                            </Grid>
                        </Grid>  */}
                    </Grid>
                </Grid>
            </Box>
        </Card>
    );
}

export default LoginForm;