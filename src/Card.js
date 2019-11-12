import React from "react";
import Bar from "./Bar";

const card = props => {
  let hp = 0,
    str = 0,
    weak = 0,
    damage = 0,
    happy = 0;

  if (props.hp > 0) {
    hp = props.hp > 100 ? 100 : props.hp;
  }

  if (props.atks) {
    str = props.atks.length * 50;
    if (str > 100) str = 100;

    let dmg = props.atks.map(d => {
      return parseInt(d.damage, 10);
    });
    const sumDmg = dmg.reduce((a, b) => a + b, 0);
    if (sumDmg) {
      damage = sumDmg;
    }
  }

  if (props.weak) {
    weak = props.weak.length >= 1 ? 100 : 0;
  }

  happy = Number((hp / 10 + damage / 10 + 10 - weak / 10) / 5).toFixed(0);

  const cute = [...Array(parseInt(happy, 10))]
    .slice()
    .map((e, i) => <img src={require("./cute.png")} key={i} alt="cute" />);

  return (
    <div className={props.cardType}>
      <div className="card">
        <button onClick={props.clicked}>
          {props.btnTxt ? props.btnTxt : "btn"}
        </button>
        <div className="cardLeft">
          <img src={props.pic} alt="card" />
        </div>
        <div className="cardRight">
          <div className="pokeName">{props.name}</div>
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
