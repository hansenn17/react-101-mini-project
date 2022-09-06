import { Container, TextField, Card, CardHeader, CardContent, Toolbar, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { IProfileProps } from '../pages/profile/[id]'

function Profile(props: IProfileProps) {

    const router = useRouter()

    const id = router.query.id

    return (
        <>  
            <Toolbar />
            <Container>
                <Card sx={{ m: 2, justifyContent: 'center', px: '25%', pb: 2}}>
                    <CardHeader
                        avatar={
                            <Avatar src={props.avatar} sx={{width: 150, height: 150, mr: 2}} />
                        }
                        title={
                            <TextField label='display name' defaultValue={props.displayName} variant='standard' required sx={{ width: '100%' }} disabled={id !== 'me' && true} />
                        }
                        subheader={
                            <TextField label='username' defaultValue={props.username} variant='standard' required sx={{ width: '100%' }} disabled={id !== 'me' && true} />
                        }
                    >
                    </CardHeader>
                    <CardContent>
                        {/* <Button variant="outlined" size="small" sx={{ float: 'right' }} onClick={handleSubmit} disabled={id !== 'me' && true}>Submit</Button> */}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

export default Profile;