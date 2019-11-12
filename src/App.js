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

class App extends Component {
  state = {
    modalOpen: false,
    myPokemons: [
      {
        id: "jaaaa",
        name: "Cubone",
        hp: 110,
        attacks: [
          { name: "attack A", damage: "20+" },
          { name: "attack B", damage: "40x" }
        ],
        weaknesses: [{ name: "weakness A" }],
        imageUrl: "https://images.pokemontcg.io/xy0/18.png"
      }
    ],
    pokemons: [],
    searchText: ""
  };

  toggleListHandler = () => {
    this.setState(prevState => {
      return { modalOpen: !prevState.modalOpen };
    });
  };

  searchHandler = txt => {
    this.setState({ searchText: txt });
    axios
      .get("http://localhost:3030/api/cards?limit=30&name=" + txt)
      .then(response => {
        this.setState({ pokemons: response.data.cards });
      });
  };

  deletePokemonHandler = index => {
    const myPokemons = [...this.state.myPokemons];
    myPokemons.splice(index, 1);
    this.setState({ myPokemons: myPokemons });
  };

  addPokemonHandler = poke => {
    const myNewPokemons = [...this.state.myPokemons];
    myNewPokemons.push(poke);
    this.setState({ myPokemons: myNewPokemons });
  };

  componentDidMount() {
    axios.get("http://localhost:3030/api/cards?limit=30").then(response => {
      this.setState({ pokemons: response.data.cards });
    });
  }

  render() {
    const dex = this.state.pokemons
      .filter(poke => {
        let result = true;
        for (let i = 0; i < this.state.myPokemons.length; i++) {
          if (this.state.myPokemons[i].name === poke.name) {
            result = false;
            break;
          }
        }
        return result;
      })
      .map((poke, index) => {
        return (
          <Card
            cardType="dexPoke"
            key={poke.id}
            name={poke.name}
            hp={poke.hp}
            atks={poke.attacks}
            weak={poke.weaknesses}
            pic={poke.imageUrl}
            btnTxt="Add"
            clicked={() => this.addPokemonHandler(poke)}
          />
        );
      });

    const myPoke = this.state.myPokemons.map((poke, index) => {
      return (
        <Card
          cardType="myPoke"
          key={poke.id}
          name={poke.name}
          hp={poke.hp}
          atks={poke.attacks}
          weak={poke.weaknesses}
          pic={poke.imageUrl}
          btnTxt="X"
          clicked={() => this.deletePokemonHandler(index)}
        />
      );
    });

    const modal = this.state.modalOpen ? (
      <div>
        <div className="backdrop" onClick={this.toggleListHandler} />
        <div className="modal">
          <input
            placeholder="Find Pokemon"
            type="text"
            value={this.state.searchText}
            onChange={event => {
              this.searchHandler(event.target.value);
            }}
          />
          <div className="dexPokes">{dex}</div>
        </div>
      </div>
    ) : null;

    return (
      <div className="App">
        {modal}
        <div className="header">
          <h1>My Pokedex</h1>
        </div>
        <div className="content">{myPoke}</div>
        <div className="footer">
          <button onClick={this.toggleListHandler}>+</button>
        </div>
      </div>
    );
  }
}

export default App;
