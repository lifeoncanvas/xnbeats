import {
    AUTH_USER,
    LOGOUT_USER,
    ADD_REVIEW,
    CLEAR_REVIEW,
    GET_REVIEWS,
    GET_REVIEW_BY_ID,
    FETCH_POSTS
} from '../types';

import * as api from '../../api';

export const registerUser = (userData) => ({
    type:AUTH_USER,
    payload: api.registerUser(userData)
});

export const loginUser = (userData) => ({
    type:AUTH_USER,
    payload: api.loginUser(userData)
});

export const autoSignIn = () => ({
    type:AUTH_USER,
    payload: api.autoSignIn()
})

export const logoutUser = () => ({
    type:LOGOUT_USER,
    payload: api.logoutUser()
})


export const updateProfile = (formdata,isEmailChanged) => ({
    type:LOGOUT_USER,
    payload: api.updateProfile(formdata,isEmailChanged)
})


//==================reviews

export const fetchPosts = (id,cond) => ({
    type:FETCH_POSTS,
    payload: api.fetchPosts(id,cond)
})

export const addReview = (data,user) => ({
    type:ADD_REVIEW,
    payload: api.addReview(data,user)
})

export const clearReview = () => ({
    type:CLEAR_REVIEW,
    payload: null
})

export const getReviews = (limit) => ({
    type:GET_REVIEWS,
    payload: api.getReviews(limit)
})

export const loadMoreReviews = (limit, reviews) => ({
    type:GET_REVIEWS,
    payload: api.loadMoreReviews(limit, reviews)
})

export const getReviewById = (id) => ({
    type:GET_REVIEW_BY_ID,
    payload: api.getReviewById(id)
})

export const editReview = (data,id) => ({
    type:GET_REVIEW_BY_ID,
    payload: api.editReview(data,id)
})