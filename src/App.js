import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Card from "./Card";

// const COLORS = {
//   Psychic: "#f8a5c2",
//   Fighting: "#f0932b",
//   Fairy: "#c44569",
//   Normal: "#f6e58d",
//   Grass: "#badc58",
//   Metal: "#95afc0",
//   Water: "#3dc1d3",
//   Lightning: "#f9ca24",
//   Darkness: "#574b90",
//   Colorless: "#FFF",
//   Fire: "#eb4d4b"
// };

const api = axios.create({
  baseURL: 'http://localhost:3030/api'
})

const mapPokemons = props => poke => (
  <Card
    key={poke.id}
    data={poke}
    name={poke.name}
    hp={poke.hp}
    atks={poke.attacks}
    weak={poke.weaknesses}
    pic={poke.imageUrl}
    {...props}
  />
)

class App extends Component {
  state = {
    modalOpen: false,
    myPokemons: [],
    pokemons: [],
    searchText: ''
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { modalOpen: !prevState.modalOpen };
    });
  };

  searchHandler = txt => {
    this.setState({ searchText: txt });
    api
      .get(txt 
        ? "/cards?limit=30&name=" + txt
        : "/cards?limit=30")
      .then(response => {
        this.setState({ pokemons: response.data.cards });
      });
  };

  deletePokemonHandler = poke => {
    const myNewPokemons = this.state.myPokemons.filter(myPoke => myPoke.id !== poke.id);
    this.setState({ myPokemons: myNewPokemons });
  };

  addPokemonHandler = poke => {
    const myNewPokemons = [...this.state.myPokemons, poke];
    this.setState({ myPokemons: myNewPokemons });
  };

  componentDidMount() {
    api.get("/cards?limit=30").then(response => {
      this.setState({ pokemons: response.data.cards });
    });
  }

  renderDexPokemons = () => this.state.pokemons
    .filter(poke => this.state.myPokemons.every(myPoke => myPoke.id !== poke.id))
    .map(mapPokemons({
      cardType: 'dexPoke',
      btnTxt: 'Add',
      onClick: this.addPokemonHandler,
    }))

  renderMyPokemons = () => this.state.myPokemons
    .map(mapPokemons({
      cardType: 'myPoke',
      btnTxt: 'X',
      onClick: this.deletePokemonHandler,
    }))

  render() {
    const modal = (
      <div>
        <div className="backdrop" onClick={this.toggleModal} />
        <div className="modal">
          <div className="inputWrapper">
            <input
              placeholder="Find Pokemon"
              type="text"
              value={this.state.searchText}
              onChange={event => {
                this.searchHandler(event.target.value);
              }}
            />
            <img src={require('./search.png')} />
          </div>
          <div className="dexPokes">{this.renderDexPokemons()}</div>
        </div>
      </div>
    );

    return (
      <div className="App">
        {this.state.modalOpen && modal}
        <div className="header">My Pokedex</div>
        <div className="content">{this.renderMyPokemons()}</div>
        <div className="footer">
          <button onClick={this.toggleModal}>+</button>
        </div>
      </div>
    );
  }
}

export default App;
