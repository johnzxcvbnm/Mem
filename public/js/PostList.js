class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div className="custom_postWrapper">
        {
          this.props.posts.map((post, index) => {
            return(
              <div className="custom_post">
                <h5>{post.username}</h5>
                <img
                   className="postList_Image"
                   src={post.url}
                   onClick={() => this.props.selectPost(post, index)}/>
              </div>
            )
          })
        }
      </div>
    )
  }
}
