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
      <div>
        <h5>{this.props.post.username}</h5>
        <img src={this.props.post.url}/>
        {
          this.props.loggedUser.id == this.props.post.user_id ?
            <button className="button is-info" onClick={() => this.props.changePage("postEdit")}>EDIT</button>
          : ''
        }
        {
          this.props.loggedUser.id == this.props.post.user_id ?
            <button className="button is-dark" onClick={() => this.props.deletePost(this.props.post)}>DELETE</button>
          : ''
        }

      </div>
    )
  }
}
