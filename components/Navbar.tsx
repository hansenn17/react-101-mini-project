import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar, Divider } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth, AuthProviderProps } from '../context/AuthContext'
import Link from 'next/link';

function Navbar() {
    const { setAuth } = useAuth() as AuthProviderProps
    const router = useRouter()

    const [anchorEl, setAnchorEl] = useState(null)

    const handleMenu = (e: any) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const logout = () => {
        if(typeof setAuth !== "undefined") {
            setAuth(false)
            localStorage.clear()
            router.push('/')
        }
    }

    return (
        <>
            <AppBar component='nav'>
                <Toolbar>
                    {/* <IconButton size='large' edge='start'>
                        <MenuIcon sx={{color: 'white'}} />
                    </IconButton> */}
                    <Typography variant='h6' sx={{ flexGrow: 1 }}><Link href={`/home/user/${typeof localStorage !== "undefined" ? localStorage.getItem("loggedInUser")?.toString() : '1'}`} style={{ textDecoration: 'none', color: 'white' }}>React 101</Link></Typography>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}><Link href={`/landing-page`} style={{ textDecoration: 'none', color: 'white' }}>Landing Page</Link></Typography>
                    <IconButton size='large' onClick={handleMenu}>
                        <Avatar alt='me' src={typeof localStorage !== "undefined" ? localStorage.getItem('avatar')?.toString() : 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/890.jpg'} />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem><Link href={`/profile/${typeof localStorage !== "undefined" ? localStorage.getItem("loggedInUser")?.toString() : '1'}`} style={{ textDecoration: 'none', color: 'black' }}>Profile</Link></MenuItem>
                        <MenuItem onClick={ logout }>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Navbar;