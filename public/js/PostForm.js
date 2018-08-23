class PostForm extends React.Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.post){
      this.refs.url.value = this.props.post.url;
    }
  }

  handleSubmit(event){
    event.preventDefault();

    const new_post = {
      url: this.refs.url.value,
      user_id: this.props.loggedUser.id
    }

    if(this.props.post){
      new_post["id"] = this.props.post.id;
    }

    this.props.functionExecute(new_post);
    this.props.changePage("postList");
  }

  render() {
    return (
      <div className="field custom_postWrapper">
        <h1 className="formTitle">{this.props.title}</h1>
        <form className="post_form" onSubmit={this.handleSubmit}>
          <label className="label" for="url">Image URL</label>
          <div className="control">
            <input className="input custom_input" type="text" id="url" ref="url" />
          </div>
          <div className="submit">
            <div className="buttons button_wrapper">
              <input id="submit" className="button is-info" type="submit" />
              <button className="button is-info" onClick={() => this.props.changePage("postList")}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
