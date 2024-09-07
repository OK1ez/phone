const createAccount = async (username, email, passwordHash) => {
  const { data, error } = await supabase
    .from('bleeter_accounts')
    .insert([{ username, email, password_hash: passwordHash }]);

  if (error) {
    console.error('Error creating account:', error);
  } else {
    console.log('Account created:', data);
  }
};



const createPost = async (accountId, content) => {
  const { data, error } = await supabase
    .from('bleeter_posts')
    .insert([{ account_id: accountId, content }]);

  if (error) {
    console.error('Error creating post:', error);
  } else {
    console.log('Post created:', data);
  }
};


const giveLike = async (tweetId, accountId) => {
  const { data, error } = await supabase
    .from('bleeter_likes')
    .insert([{ tweet_id: tweetId, account_id: accountId }]);

  if (error) {
    console.error('Error giving like:', error);
  } else {
    console.log('Like given:', data);
  }
};


const followAccount = async (followerId, followedId) => {
  const { data, error } = await supabase
    .from('bleeter_followers')
    .insert([{ follower_id: followerId, followed_id: followedId }]);

  if (error) {
    console.error('Error following account:', error);
  } else {
    console.log('Account followed:', data);
  }
};

const commentOnPost = async (tweetId, accountId, content) => {
  const { data, error } = await supabase
    .from('bleeter_comments')
    .insert([{ tweet_id: tweetId, account_id: accountId, content }]);

  if (error) {
    console.error('Error commenting on post:', error);
  } else {
    console.log('Comment added:', data);
  }
};


const viewPosts = async () => {
  const { data, error } = await supabase
    .from('bleeter_posts')
    .select('*');

  if (error) {
    console.error('Error fetching posts:', error);
  } else {
    console.log('Posts:', data);
  }
};


