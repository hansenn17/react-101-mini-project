import { Toolbar, Container, Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import InputField from "./InputField";
import Post from "./Post";
import { useRouter } from "next/router";
import { IHomeProps } from "../pages/home/user/[id]";
import type { Messages } from "../pages/home/user/[id]";

function MessageBoard(props: IHomeProps<Messages>) {
    const [messages, setMessages] = useState([])

    const router = useRouter()

    const id = router.query.id

    // useEffect(() => {
    //     getMessage()
    // }, [id])

    const getMessage = async () => {
        let userId
        if(id === 'me') {
            userId = localStorage.getItem('loggedInUser')
        } else {    
            userId = id
        }

        const messagesResponse = await axios.get(`/users/${userId}/posts`)
        setMessages(messagesResponse.data.items)
    }

    return (
        <>  
            <div>
                <Toolbar />
                <Container>
                    <Card sx={{ m: 2, justifyContent: 'center', px: '25%', pb: 2}}>
                        <InputField fetchMessage={getMessage} profileId={id} />
                        <Post messages={props.messages} getMessage={getMessage} />
                    </Card>
                </Container>
            </div>
        </>
    );
}

export default MessageBoard;