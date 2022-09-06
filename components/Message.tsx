import { Grid, Typography } from "@mui/material"

interface IMessage {
    message: string | undefined;
}

function Message(props: IMessage) {
    return (
        <>
            <Grid container sx={{pb: 1}}>
                <Grid item>
                    <Typography variant="body1">
                        {props.message}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default Message;