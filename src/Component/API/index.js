import axios from 'axios';
import { BASE_URL, GET_USER, GET_POST, POST_COMMENT } from './APIEndPoints'

export function getUsers(callBack) {
    axios.get(`${BASE_URL}${GET_USER}`)
        .then(res => {
            callBack(null, res?.data || '');
            return
        }).catch((error) => {
            callBack(error, null);
            return
        });
}

export function getPosts(page=0,limit=10,callBack) {
    axios.get(`${BASE_URL}${GET_POST}?_page=${page}&_limit=${limit}`)
        .then(res => {
            callBack(null, res?.data || '');
            return
        }).catch((error) => {
            callBack(error, null);
            return
        });
}

export function getCommentsByPostId(postId, callBack) {
    axios.get(`${BASE_URL}${POST_COMMENT}?postId=${postId}`)
        .then(res => {
            callBack(null, res?.data || '');
            return
        }).catch((error) => {
            callBack(error, null);
            return
        });
}