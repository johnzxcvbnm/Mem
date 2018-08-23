class NavBar extends React.Component {
  render() {
    return (
      <div class="columns">
        <h2 class="column is-two-thirds"
          onClick={() => this.props.changePage("postList")}>
            MEM
        </h2>
        {
          this.props.loggedUser ?
            <h2 class="column" onClick={() => this.props.changePage("postCreate")}>New Post</h2>
          :
            <h2 class="column" onClick={() => this.props.changePage("userRegister")}>Guest</h2>
        }
        {
          this.props.loggedUser ?
            <h2 class="column">{this.props.loggedUser.username}</h2>
          :
            <h2 class="column" onClick={() => this.props.changePage("userRegister")}>Register</h2>
        }
        {
          this.props.loggedUser ?
            <h2 class="column" onClick={() => this.props.logOut()}>Log Off</h2>
          :
            <h2 class="column" onClick={() => this.props.changePage("userLogin")}>Log In</h2>
        }

      </div>
    )
  }
}
