import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    await dispatch(fetchPosts());

// Option no 1
// const userIds = _.uniq( _.map(getState().posts, 'userId'));
// userIds.forEach(id => dispatch( fetchUser(id)));

// Option no 2
_.chain(getState().posts)
    .map('userId')
    .uniq()
    .forEach(id => dispatch( fetchUser(id)))
    .value()
};


export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts');
    
    dispatch( { type: 'FETCH_POSTS', payload: response.data  });
};

// WIth this solution we can fetch each user one time inside our application
// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize( async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch( { type: 'FETCH_USER', payload: response.data  });
// });

export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);

    dispatch( { type: 'FETCH_USER', payload: response.data  });
};
