import React from "react";
import { Link } from "react-router-dom";

export default function ProcessRoute(props) {
    return (
        <ul>
            <li>
                <Link to="/processzero">P0</Link>
            </li>
            <li>
                <Link to="/processone">P1/P2</Link>
            </li>
            {/* <li>
                <Link to="/processtwo">P2</Link>
            </li> */}
        </ul>
   )

}