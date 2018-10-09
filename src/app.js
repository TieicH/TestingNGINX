import React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import { Provider as TestProvider } from "./TestContext";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds,
      handlePruebaChange: this.handlePruebaChange,
      prueba: "soy una prueba"
    };
  }

  handlePruebaChange = evt => {
    this.setState({
      prueba: evt.target.value
    });
  };

  handleLocationChange = evt => {
    this.setState({
      location: evt.target.value
    });
  };

  handleAnimalChange = evt => {
    this.setState(
      {
        animal: evt.target.value,
        breed: ""
      },
      this.getBreed
    );
  };

  handleBreedChange = evt => {
    this.setState({
      breed: evt.target.value
    });
  };

  getBreed() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({ breeds: data.petfinder.breeds.breed });
        } else {
          this.setState({ breeds: [] });
        }
      });
    } else {
      this.setState({ breeds: [] });
    }
  }

  render() {
    return (
      <div>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Provider value={this.state}>
          <TestProvider value={this.state}>
            <Router>
              <Results path="/" />
              <Details path="/details/:id" />
              <SearchParams path="/search-params" />
            </Router>
          </TestProvider>
        </Provider>
      </div>
    );
  }
}

render(<App />, document.querySelector(".root"));
