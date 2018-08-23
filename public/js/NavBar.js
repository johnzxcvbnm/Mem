class NavBar extends React.Component {
  render() {
    return (
      <div class="columns">
        <h2 class="column is-three-quarters"
          onClick={() => this.props.changePage("postList")}>
            MEM
        </h2>
        {
          this.props.loggedUser ?
            <h2 class="column">New Post</h2>
          : ''
        }
        {
          this.props.loggedUser ?
            ''
          :
            <h2 class="column" onClick={() => this.props.changePage("userRegister")}>Register</h2>
        }
        {
          this.props.loggedUser ?
            ''
          :
            <h2 class="column" onClick={() => this.props.changePage("userLogin")}>Log In</h2>
        }

      </div>
    )
  }
}
