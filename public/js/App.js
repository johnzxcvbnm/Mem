class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        userLogin: false,
        userRegister: false,
        postList: true,
        postCreate: false,
        postShow: false,
        postEdit: false
      },
      loggedUser: null,
      posts: [],
      selectedPost: {},
      selectedPostIndex: 0
    }
    this.changePage = this.changePage.bind(this);
    this.createUser = this.createUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logOut = this.logOut.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
    this.createPost = this.createPost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.selectPost = this.selectPost.bind(this);
    this.editPost = this.editPost.bind(this);
  }

  componentDidMount() {
    this.loadPosts();
  }

  changePage(newPage){

    let toUpdate = {};
    for(let key in this.state.page){
      toUpdate[key] = false;
    }
    toUpdate[newPage] = true;
    this.setState({page: toUpdate});
  }

  loadPosts(){
    fetch("/posts")
    .then(response => response.json())
    .then(all_posts => {
      // console.log(all_posts);
      if(all_posts[0] == null){
        const new_post = {
          "url": "https://sweetytextmessages.com/wp-content/uploads/2018/01/8-Cats-Saying-Funny-Things.jpg",
          "user_id": 1
        }
      } else {
        this.setState({posts: all_posts})
      }
    }).catch(error => console.log(error));
  }

  createUser(new_user){
    // console.log("Creating new User");
    // console.log(new_user);
    fetch("/users", {
      body: JSON.stringify(new_user),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdUser => {
      return createdUser.json()
    })
    .then(jsonedUser => {
      this.loginUser(jsonedUser);
    })
    .catch(error => console.log(error));
  }

  setUser(new_user){
    if(new_user != null){
      new_user["password"] = "Nice Try";
    }
    this.setState({loggedUser: new_user});
  }

  logOut() {
    this.setUser(null);
  }

  loginUser(new_user){
    // console.log("Loggin In User");
    // console.log(new_user);
    fetch("/users/find/'" + new_user.username + "'")
    .then(response => response.json())
    .then(logged_user => {
      if(new_user.password === logged_user.password){
        this.setUser(logged_user);
        this.changePage("postList");
        // console.log("Logged In");
      }
    }).catch(error => {
        console.log(error);
    });
  }

  createPost(new_post){
    // console.log("New Post");
    // console.log(new_post);
    fetch("/posts", {
      body: JSON.stringify(new_post),
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(createdPost => {
      return createdPost.json()
    })
    .then(jsonedPost => {
      const copy_array = this.state.posts;
      jsonedPost["username"] = this.state.loggedUser.username;
      // // console.log([jsonedPost, ...this.state.posts]);
      // //New posts are pushed to the top automatically
      copy_array.unshift(jsonedPost);
      this.setState({posts: copy_array});
    })
    .catch(error => console.log(error))
  }

  deletePost(old_post){
    // console.log("DELETE POST");
    // console.log(old_post);
    const index = this.state.selectedPostIndex;
    fetch("/posts/" + old_post.id, {
      method: "DELETE"
    })
    .then(data => {
      this.setState({
        posts: [
          ...this.state.posts.slice(0, index),
          ...this.state.posts.slice(index + 1)
        ]
      })
      this.changePage("postList");
    }).catch(error => console.log(error))
  }

  selectPost(post, index){
    console.log("SELETING POST");
    if(post.id != 0){
      fetch("/posts/" + post.id)
      .then(response => response.json())
      .then(my_post => {
        console.log(my_post);
        this.setState({selectedPost: my_post,
                       selectedPostIndex: index});
        this.changePage("postShow");
      }).catch(error => console.log(error));
    }
  }

  editPost(new_post){
    // console.log("EDIT POST");
    // console.log(new_post);
    fetch("/posts/" + new_post.id, {
      body: JSON.stringify(new_post),
      method: "PUT",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
    .then(updatedPost => {
      return updatedPost.json()
    })
    .then(jsonedPost => {
      this.loadPosts();
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="custom_container">
        <NavBar
          changePage={this.changePage}
          loggedUser={this.state.loggedUser}
          logOut={this.logOut}/>
        {
          this.state.page.userRegister ?
            <UserForm
              functionExecute={this.createUser}
              title="Register User"/>
          : ''
        }
        {
          this.state.page.userLogin ?
            <UserForm
            functionExecute={this.loginUser}
            title="User Login"/>
          : ''
        }

        {
          this.state.page.postList ?
            <PostList
              posts={this.state.posts}
              selectPost={this.selectPost}/>
          : ''
        }
        {
          this.state.page.postCreate ?
            <PostForm
              loggedUser={this.state.loggedUser}
              functionExecute={this.createPost}
              changePage={this.changePage}/>
          : ''
        }
        {
          this.state.page.postEdit ?
            <PostForm
              loggedUser={this.state.loggedUser}
              functionExecute={this.editPost}
              changePage={this.changePage}
              post={this.state.selectedPost}/>
          : ''
        }
        {
          this.state.page.postShow && this.state.loggedUser ?
            <PostShow
              changePage={this.changePage}
              loggedUser={this.state.loggedUser}
              post={this.state.selectedPost}
              deletePost={this.deletePost}
              />
          : ''
        }
        {
          this.state.page.postShow && !(this.state.loggedUser) ?
          <PostShow
            changePage={this.changePage}
            loggedUser={ {id: -1} }
            post={this.state.selectedPost}
            deletePost={this.deletePost}
            />
          : ''
        }

        <Footer />
      </div>
    )
  }
}


//Send to index.html
ReactDOM.render(
  <App />,
  document.querySelector("main")
);
