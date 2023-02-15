import React, { useEffect, useState } from "react";
import { getUsers } from '../API';
import { useNavigate } from "react-router-dom";

function ProcessZero(props) {

    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getUsers((err, resp) => {
            if (resp) {
                setUsers(resp);
            }
        })
    }, [])

    return (<>{console.log("users:-",users)}
        <button className="btn btn-primary m-2" onClick={() => {
            navigate('/')
        }}>Go Back</button>
        Welcome {users && users[0]?.name}
    </>)

}
export default React.memo(ProcessZero);