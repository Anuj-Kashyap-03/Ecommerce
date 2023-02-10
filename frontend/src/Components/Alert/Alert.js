import React from 'react'
import Alert from "@mui/material/Alert";
import "./Alert.scss"
import { useSelector } from 'react-redux';


export default function MyAlert() {
    const { alert } = useSelector((state) => state);

    return (
        <>
            {alert.msg && (
                <div className="alert_">
                    <Alert
                        severity={alert.success ? "success" : "error"}
                        sx={{ width: "100%" }}
                    >
                        {alert.msg}
                    </Alert>
                </div>
            )}
        </>
    )
}
