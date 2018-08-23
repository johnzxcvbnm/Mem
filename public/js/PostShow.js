class PostShow extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    // console.log(this.props);
  }

  render(){
    return (
      <div className="custom_postWrapper">
        <div className="custom_post">
          <h5>{this.props.post.username}</h5>
          <img className="postShow_Image" src={this.props.post.url}/>
        </div>
        <div className="button_wrapper">
          {
            this.props.loggedUser.id == this.props.post.user_id ?
              <button className="button is-info custom_button" onClick={() => this.props.changePage("postEdit")}>EDIT</button>
            : ''
          }
          {
            this.props.loggedUser.id == this.props.post.user_id ?
              <button className="button is-dark custom_button" onClick={() => this.props.deletePost(this.props.post)}>DELETE</button>
            : ''
          }
        </div>
      </div>
    )
  }
}
