import { Button, Checkbox, Divider, FormControlLabel } from "@mui/material";
import React from "react";

export default function ServicesManagementCheckbox() {
    return(
        <React.Fragment>
            <div className="mt-5 p-4 w-10%">
                <Divider variant="middle" className="mt-10"></Divider>
            </div>

            <div className="flex mx-8 p-3 pb-32 justify-end">
                <div className="flex-1">
                    <FormControlLabel control={<Checkbox defaultChecked style={{ color: "#EFA25D" }} />} label="Should include transport fee" />
                </div>
                <div className="flex mx-4">
                    <div className="mx-7">
                        <Button style={{
                            borderRadius: 4,
                            backgroundColor: "#EFA25D",
                            color: "midnightblue"
                        }}variant="contained">Reset</Button>
                    </div>
                    <div>
                        <Button style={{
                            borderRadius: 4,
                            backgroundColor: "midnightblue",
                            color: "#EFA25D"
                        }}variant="contained">Apply</Button>               
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}