import Typography, { TypographyProps } from "@mui/material/Typography";

export default function NoData(props:TypographyProps) {
    return <Typography variant="h5" {...props}>
        No data to display
    </Typography>
}