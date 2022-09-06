import { Toolbar, Container, Card, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography, Divider, Pagination } from "@mui/material"
import { useState } from 'react';
import axios from 'axios';
import Link from "next/link";

type User = {
    avatar: string;
    displayName: string;
    username: string;
    id: string;
}

interface IUserProps<Type> {
    users: Type[];
    count: number;
}

function Users(props: IUserProps<User>) {
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)

    // useEffect(() => {
    //     getUsers()
    // }, [page])

    const getUsers = async (page: number) => {
        const response = await axios.get(`/users?page=${page}&limit=5`)
        setUsers(response.data.items)
        setCount(response.data.count)
    }

    const handleChangePage = (e: React.ChangeEvent<unknown>, value: number) => {
        getUsers(value)
    }

    return (
        <>
            <Toolbar />
            <Container>
                <Card sx={{ m: 2, justifyContent: 'center', px: '25%', pb: 2}}>
                    <List sx={{ width: '100%' }}>
                        {
                            props.users.map(user => {
                                return (
                                    <>
                                        <ListItem alignItems='flex-start'>
                                            <ListItemAvatar>
                                                <Avatar alt="no-profile-pic" src={user.avatar} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Link href={`/home/user/${user.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                                        <Typography variant='body1'>
                                                            {user.username}
                                                        </Typography>
                                                    </Link>
                                                }
                                                secondary={
                                                    <Typography sx={{display: 'inline'}} variant="body2">
                                                        {user.displayName}
                                                    </Typography>
                                                }
                                            >
                                            </ListItemText>
                                        </ListItem>
                                        <Divider variant='middle' component='li' sx={{ borderColor: '#cecece' }} />
                                    </>
                                )
                            })
                        }
                    </List>
                    <Pagination variant='outlined' color='primary' count={props.count} onChange={handleChangePage} />
                </Card>
            </Container>
        </>
    );
}

export default Users;