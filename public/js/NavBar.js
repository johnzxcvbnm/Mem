class NavBar extends React.Component {
  render() {
    return (
      <div className="custom_nav">
        <h2 className="column navBar_Link navBar_Title is-8"
          onClick={() => this.props.changePage("postList")}>
            MEM
        </h2>
        {
          this.props.loggedUser ?
            <h2 className="column navBar_Link" onClick={() => this.props.changePage("postCreate")}>New Post</h2>
          :
            <h2 className="column navBar_Link" onClick={() => this.props.changePage("userRegister")}>Guest</h2>
        }
        {
          this.props.loggedUser ?
            <h2 className="column navBar_Link">{this.props.loggedUser.username}</h2>
          :
            <h2 className="column navBar_Link" onClick={() => this.props.changePage("userRegister")}>Register</h2>
        }
        {
          this.props.loggedUser ?
            <h2 className="column navBar_Link" onClick={() => this.props.logOut()}>Log Off</h2>
          :
            <h2 className="column navBar_Link" onClick={() => this.props.changePage("userLogin")}>Log In</h2>
        }
      </div>
    )
  }
}
