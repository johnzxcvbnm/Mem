class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1>CYOLO!</h1>
    )
  }
}


//Send to index.html
ReactDOM.render(
  <App />,
  document.querySelector("main")
);
