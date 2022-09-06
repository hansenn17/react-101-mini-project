import { GetStaticProps, NextPage } from "next";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import axios from 'axios'

type User = {
    avatar: string;
    displayName: string;
    username: string;
    id: string
}

interface ILandingPageProps<Type> {
    users: Type[]
    count: number
}

function LandingPage (props: ILandingPageProps<User>) {
    return (
        <>
            <Navbar />
            <Users users={props.users} count={props.count} />
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const data = await axios.get(`/users?page=1&limit=5`)
    return {
        props: {
            users: data.data.items,
            count: data.data.count
        },
        revalidate: 1
    }
}

export default LandingPage;