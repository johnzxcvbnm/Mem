class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

  }

  handleSubmit(event){
    event.preventDefault();

    const new_user = {
      username: this.refs.username.value.replace(/'/g, ""),
      password: this.refs.password.value.replace(/'/g, "")
    }

    this.props.functionExecute(new_user);
  }
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <form onSubmit={this.handleSubmit}>
          <label className="label" for="username">User Name</label>
          <div className="control">
            <input className="input" type="text" id="username" ref="username" required />
          </div>
          <label className="label" for="password">User Password</label>
          <div className="control">
            <input className="input" type="password" id="password" ref="password" required />
          </div>
          <div className="submit">
            <input className="button is-info" type="submit" />
          </div>
        </form>
      </div>
    )
  }
}
