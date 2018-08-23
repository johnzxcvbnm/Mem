class PostList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  render() {
    return (
      <div>
        <h1>POST LIST PAGE</h1>
        {
          this.props.posts.map((post, index) => {
            return(
              <div>
                <h5>{post.username}</h5>
                <img src={post.url} />
                <hr />
              </div>
            )
          })
        }
      </div>
    )
  }
}
