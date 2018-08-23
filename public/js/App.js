class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: {
        userLogin: false,
        userRegister: false,
        postList: true
      },
      loggedUser: null,
      posts: []
    }
    this.changePage = this.changePage.bind(this);
    this.createUser = this.createUser.bind(this);
    this.setUser = this.setUser.bind(this);
    this.logOut = this.logOut.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
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


  render() {
    return (
      <div class="container">
        <NavBar
          changePage={this.changePage}
          loggedUser={this.state.loggedUser}/>
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
            <PostList />
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
