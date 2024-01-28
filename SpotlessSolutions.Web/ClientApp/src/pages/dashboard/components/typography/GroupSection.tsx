import React from "react";

import "./GroupSection.style.scss";

export default function GroupSection(props: {children: string | React.ReactElement[]}) {
    return (
        <h2 className="group-section">
            {props.children}
        </h2>
    )
}