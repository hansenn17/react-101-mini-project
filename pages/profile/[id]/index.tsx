import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import Navbar from "../../../components/Navbar";
import Profile from "../../../components/Profile";
import axios from 'axios'
import { ParsedUrlQuery } from "querystring";

export interface IProfileProps {
    avatar: string;
    username: string;
    displayName: string
}

function Home(props: IProfileProps) {
    return (
        <>
            <Navbar />
            <Profile avatar={props.avatar} username={props.username} displayName={props.displayName} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
    let userId = context.params?.id

    const response = await axios.get(`/users/${userId}`)
    return {
        props: {
            avatar: response.data.avatar,
            username: response.data.username,
            displayName: response.data.displayName
        },
        revalidate: 1
    }
}

export const getStaticPaths: GetStaticPaths<ParsedUrlQuery> = async () => {
    const response = await axios.get(`/users`)
    return {
        paths: response.data.items.map((item: { id: string; }) => ({
            params: { id: item.id }
        })),
        fallback: 'blocking'
    }
}

export default Home;