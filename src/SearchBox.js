import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

class SearchBox extends React.Component {
  handleFormSubmit = evt => {
    evt.preventDefault();
    this.props.search();
  };

  render() {
    return (
      <Consumer>
        {context => {
          return (
            <div className="search-params">
              <form onSubmit={this.handleFormSubmit}>
                <label htmlFor="location">
                  Location
                  <input
                    onChange={context.handleLocationChange}
                    id="location"
                    value={context.location}
                    placeholder="Location"
                  />
                </label>
                <label htmlFor="animal">
                  Animal
                  <select
                    id="animal"
                    value={context.animal}
                    onChange={context.handleAnimalChange}
                    onBlur={context.handleAnimalChange}
                  >
                    <option value="" disabled>
                      Select your animal
                    </option>
                    {ANIMALS.map(animal => (
                      <option key={animal} value={animal}>
                        {animal}
                      </option>
                    ))}
                  </select>
                </label>
                <label htmlFor="breed">
                  Breed
                  <select
                    id="breed"
                    value={context.breed}
                    onChange={context.handleBreedChange}
                    onBlur={context.handleBreedChange}
                    disabled={!context.breeds.length}
                  >
                    <option value="" disabled>
                      Select your breed
                    </option>
                    {context.breeds.map(breed => (
                      <option key={breed} value={breed}>
                        {breed}
                      </option>
                    ))}
                  </select>
                </label>
                <button onClick={this.props.search}>Submit</button>
              </form>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default SearchBox;
