import React, { useState } from "react";
import { getPosts, getCommentsByPostId } from '../API';
import { useNavigate } from "react-router-dom";

const limit = 10;
const totalLimit = 100;
function ProcessOne(props) {
    const [currPage, setCurrPage] = useState(0);
    const [postArr, setPostArr] = useState([]);
    const navigate = useNavigate();

    function handelClickOnGetPost() {
        getPostList(0, limit);
    }

    function getPostList(page, limit) {
        setCurrPage(page);
        getPosts(page, limit, (err, resp) => {
            if (resp) {
                if (page === 0) {
                    setPostArr(resp);
                } else {
                    setPostArr([...postArr, ...resp]);
                }
            }
        })
    }

    function hadelClickOnLoadMorePost() {
        const arrLength = postArr.length;
        if (arrLength < totalLimit) {
            const cPage = arrLength === 0 ? 0 : (currPage + 1);
            getPostList(cPage, limit);
        }
    }

    function handelClickOnShowHideBody(key, action) {
        const postObj = [...postArr];
        postObj[key].isShow = action;
        setPostArr(postObj);
    }

    function handelClickOnFavourite(key, action) {
        const postObj = [...postArr];
        postObj[key].isFav = action;
        setPostArr(postObj);
    }

    function handelClickOnGetComment(key) {
        const postObj = [...postArr];
        const postId = postObj[key].id;
        if (!postObj[key].hasOwnProperty("comment")) {
            getCommentsByPostId(postId, (err, resp) => {
                if (resp) {
                    postObj[key].comment = resp;
                    setPostArr(postObj);
                }
            })
        }
    }

    return (<>
        <button className="btn btn-primary m-2" onClick={()=>{
            navigate('/')
        }}>Go Back</button>
        <button className="btn btn-primary m-2" onClick={handelClickOnGetPost}>Get post</button>
        <button className="btn btn-primary m-2" onClick={hadelClickOnLoadMorePost}>Load more post</button>
        <p>Favourited ({postArr.filter(x => x.isFav).length})</p>
        {postArr.length>0 && postArr.map((postItem, pKey) => {
            return (
                <div className="card" key={pKey}>
                    <div className="card-body" key={`post${pKey}`}>
                        <h5 className="card-title">{postItem?.title}</h5>
                        {postItem?.isShow ? <p className="card-text">Body- {postItem.body}</p> : ''}
                        {postItem.isShow ? <button className="btn btn-primary mx-2" onClick={() => {
                            handelClickOnShowHideBody(pKey
                                , false)
                        }}>Hide</button> : <button className="btn btn-primary mx-2" onClick={() => { handelClickOnShowHideBody(pKey, true) }}>Show</button>}
                        {postItem?.isFav ? <button className="btn btn-primary mx-2" onClick={() => handelClickOnFavourite(pKey, false)}>Remove Favourite</button> :
                            <button className="btn btn-primary mx-2" onClick={() => handelClickOnFavourite(pKey, true)}>Add Favourite</button>}
                        <button className="btn btn-primary mx-2" onClick={() => { handelClickOnGetComment(pKey) }}>Read Comments</button>
                       {postItem.comment && postItem.comment.map((pComment,cKey)=>{
                        return (<div className="card mt-2" key={`comment${cKey}`}>
                        <div className="card-body">
                            <h6>Email:- {pComment.email}</h6>
                            <p className="card-text">{pComment.body}</p>
                        </div>
                    </div>)
                       })} 
                    </div>
                </div>
            )
        })}
    </>)

}
export default React.memo(ProcessOne)