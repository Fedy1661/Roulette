import React, { Component, Fragment } from 'react';
import {
  BlackCat,
  RedCat,
  WhiteCat,
  Pencils,
  CowBrown,
  CowWhite,
  Pig
} from '../items';
const cats = [
  { component: <BlackCat />, name: 'Чёрная кошка' },
  { component: <WhiteCat />, name: 'Белая кошка' },
  { component: <RedCat />, name: 'Красная кошка' },
  { component: <Pencils />, name: 'Принадлежности' },
  { component: <CowBrown />, name: 'Коричневая корова' },
  { component: <CowWhite />, name: 'Белая корова' },
  { component: <Pig />, name: 'Свинья' }
];

class App extends Component {
  state = {
    items: [],
    spin: false
  };
  rouletteScrollWidth = React.createRef();
  generateRoullete = spin => {
    let items = [...this.state.items];
    const count = spin ? 15 : 3;
    for (let i = 0; i < count; i++) {
      const item = cats[Math.floor(Math.random() * cats.length)];
      items.push(item);
    }
    this.setState({ items, spin });
  };
  componentDidMount() {
    this.generateRoullete(false);
  }

  render() {
    const { items, spin } = this.state;
    console.log(items);
    const roulette = items
      ? items.map(({ component }, key) => {
          return <Fragment key={key}>{component}</Fragment>;
        })
      : null;
    return (
      <div className="container">
        <div className="roulette">
          <div
            ref={this.rouletteScrollWidth}
            className={`items ${spin ? 'items_active' : ''}`}
          >
            {roulette}
          </div>
        </div>
        <button
          onClick={() => {
            this.generateRoullete(true);
          }}
          className="btn"
        >
          Крутить
        </button>
        {spin === true && (
          <h2 className="prise">
            Вы выиграли "{items[items.length - 2].name}"
          </h2>
        )}
      </div>
    );
  }
}
export default App;
