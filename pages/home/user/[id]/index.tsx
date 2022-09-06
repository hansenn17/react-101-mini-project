import { GetServerSideProps, GetServerSidePropsContext, GetStaticPropsContext, NextPage } from "next";
import MessageBoard from "../../../../components/MessageBoard";
import Navbar from "../../../../components/Navbar";
import { GetStaticProps } from "next";
import axios from 'axios'
import { IComment } from "../../../../components/Comment";

export type Messages = {
    user: {
        avatar: string;
        displayName: string;
    };
    message: string;
    id: string;
    comments: IComment[]
}

export interface IHomeProps<Type> {
    messages: Type[]
}

function Home(props: IHomeProps<Messages>) {
    return (
        <>
            <Navbar />
            <MessageBoard messages={props.messages} />
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    let userId = context.params?.id

    const messagesResponse = await axios.get(`/users/${userId}/posts`)

    return {
        props: {
            messages: messagesResponse.data.items
        }
    }
}

export default Home;