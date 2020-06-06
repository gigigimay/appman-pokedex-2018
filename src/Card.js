import React from "react";
import Bar from "./Bar";

const getNumber = (n) => {
  const parsed = Number.parseInt(n, 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

const calculateStatus = (pokemon) => {
  const { hp: health, attacks = [], weaknesses = [] } = pokemon
  const hp = Math.min(getNumber(health), 100)
  const str = Math.min(attacks.length * 50, 100)
  const weak = Math.min(weaknesses.length * 50, 100)
  const damage = Math.min(attacks.reduce((total, atk) => getNumber(atk.damage) + total, 0), 100)
  const happy = Math.floor((hp + damage + 1 - weak) / 50);
  return { hp, str, weak, happy }
}

const card = props => {
  const { data, cardType, onClick, btnTxt = 'btn' } = props
  const { name, imageUrl, id } = data
  const { hp, str, weak, happy } = calculateStatus(data)

  const cute = Array(happy).fill().map(
    (e, i) => <img src={require("./cute.png")} key={`${id}.${i}`} alt="cute" />)

  return (
    <div className={cardType}>
      <div className="card">
        <button onClick={() => onClick(data)}>
          {btnTxt}
        </button>
        <div className="cardLeft">
          <img src={imageUrl} alt="card" />
        </div>
        <div className="cardRight">
          <div className="pokeName">{name}</div>
          <div className="statusBars">
            <div>
              <div>HP</div>
              <div>STR</div>
              <div>WEAK</div>
            </div>
            <div>
              <Bar width={hp} />
              <Bar width={str} />
              <Bar width={weak} />
            </div>
          </div>
          <div className="cutie">{cute}</div>
        </div>
      </div>
    </div>
  );
};

export default card;
