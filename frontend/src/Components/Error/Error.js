import React from "react";
import Button from "@mui/material/Button";
import "./Error.scss"


export default function Error({ prev_state, setprev_state }) {
    return (
        <div className="error__">
            <span> Error comes while fetching the data </span>

            <Button
                variant="contained"
                onClick={() => {
                    setprev_state(!prev_state);
                }}
            >
                Reload
            </Button>
        </div>
    )
}