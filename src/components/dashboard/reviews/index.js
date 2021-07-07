import React, { useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DashLayout from '../../../utils/dash_layout';
import { Link } from 'react-router-dom';
import { getReviews , loadMoreReviews } from '../../../store/actions';

const ReviewsMain = (props) => {
    const reviews = useSelector(state => state.reviews);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!reviews.adminReviews){
            dispatch(getReviews(2))
        }
        
    },[dispatch])

    const loadMore = () => {
        dispatch(loadMoreReviews(1,reviews.adminReviews))
    }


    const renderReviews = () => (
        reviews.adminReviews ?
            reviews.adminReviews.posts.map((post,i)=>(
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{post.title}</td>
                    <td>{post.rating}</td>
                    <td>{post.ownerData.name}</td>
                    <td>{post.public === 1 ? 'Public':'Draft' }</td>
                    <td>
                        <div className="table-link-red">Delete</div>
                    </td>
                    <td>
                        <Link className="table-link" to={`reviews/edit/${post.id}`}>Edit</Link>
                    </td>
                </tr>
            ))
        :null
    )

    return (
        <DashLayout
            auth={props.auth}
            title="Reviews main"
        >
            <div>
                <Link className="btn btn-outline-primary btn-sm" to="reviews/add">Add new review</Link>
            </div>
            <hr/>
            <div className="table-responsive-md">
                <table className="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Title</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { renderReviews() }
                    </tbody>
                </table>
            </div>

            <div className="btn btn-primary" onClick={loadMore}>
                Get more
            </div>

        </DashLayout>
    )
}

export default ReviewsMain;