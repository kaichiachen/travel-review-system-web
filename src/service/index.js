import fetch from '@/config/fetch';


// user
export const loginReq = (username, pwd) => fetch(`user/?User.username=${username}&User.pwd=${pwd}`,
  {}, 'GET',
);
export const userRegister = userInfo => fetch('user/',
  userInfo, 'POST',
);
export const deleteUserReq = userid => fetch(`user/${userid}`,
  {}, 'DELETE',
);

export const userListReq = () => fetch('user',
  {}, 'GET',
);

// post
export const addDraftPostReq = (postInfo, userid) => fetch('draftpost',
  {
    tile: postInfo.title,
    content: postInfo.content,
    posttime: postInfo.time,
    location: postInfo.location,
    userpostrelation: {
      id: userid,
      type: 'User',
    },
  }, 'POST',
);

export const updateDraftPostReq = (postInfo, userid) => fetch(`draftpost/${postInfo.id}`,
  {
    tile: postInfo.title,
    content: postInfo.content,
    posttime: postInfo.time,
    location: postInfo.location,
    userpostrelation: {
      id: userid,
      type: 'User',
    },
  }, 'PUT',
);

export const deleteDraftPostReq = postid => fetch(`draftpost/${postid}`,
  {}, 'DELETE',
);

export const reviewPostListReq = () => fetch('reviewpost',
  {}, 'GET',
);

export const addReviewPostReq = (postInfo, userid) => fetch('reviewpost',
  {
    tile: postInfo.title,
    content: postInfo.content,
    posttime: postInfo.time,
    status: postInfo.status,
    location: postInfo.location,
    userreviewpostrelation: {
      id: userid,
      type: 'User',
    },
  }, 'POST',
);

export const updateReviewPostReq = (postInfo, userid) => fetch(`reviewpost/${postInfo.id}`,
  {
    tile: postInfo.title,
    content: postInfo.content,
    posttime: postInfo.time,
    location: postInfo.location,
    status: postInfo.status,
    userreviewpostrelation: {
      id: userid,
      type: 'User',
    },
  }, 'PUT',
);

export const deleteReviewPostReq = postid => fetch(`reviewpost/${postid}`,
  {}, 'DELETE',
);

export const addPostReq = (postInfo, userid) => fetch('post',
  {
    tile: postInfo.title,
    content: postInfo.content,
    posttime: postInfo.time,
    location: postInfo.location,
    userpostrelation: {
      id: userid,
      type: 'User',
    },
  }, 'POST',
);

export const deletePostReq = postid => fetch(`post/${postid}`,
  {}, 'DELETE',
);

// review
export const reviewListReq = () => fetch('review',
  {}, 'GET',
);

export const addReviewReq = (reviewInfo, postid, userid) => fetch('review',
  {
    content: reviewInfo.content,
    submittime: reviewInfo.submittime,
    ispass: reviewInfo.ispass,
    userreviewrelation: {
      id: userid,
      type: 'User',
    },
    reviewpostreviewrelation: {
      id: postid,
      type: 'ReviewPost',
    },
  }, 'POST',
);

export const updateReviewReq = reviewInfo => fetch('review',
  reviewInfo, 'PUT',
);

export const deleteReviewReq = reviewid => fetch(`review/${reviewid}`,
  {}, 'DELETE',
);
