import React, { Component, Fragment } from 'react';
import { generateRoulette, rouletteScrolled } from '../../actions';
import { connect } from 'react-redux';

class App extends Component {
  state = {
    openModalWithPrize: false,
    openModalInventory: false
  };
  modal = (title, info, stateModal) => {
    return (
      <>
        <div className="overlay">
          <div className="modal">
            <div className="modal__title">{title}</div>
            <div className="modal__info">{info}</div>
            <button
              onClick={() => this.setState({ [stateModal]: false })}
              className="modal__btn btn"
            >
              Закрыть
            </button>
          </div>
        </div>
      </>
    );
  };
  render() {
    const {
      items,
      spin,
      generateRoulette,
      rouletteScrolled,
      inventory
    } = this.props;
    const { openModalWithPrize, openModalInventory } = this.state;
    const roulette = items
      ? items.map(({ component }, key) => {
          return <Fragment key={key}>{component}</Fragment>;
        })
      : null;
    const prize =
      openModalWithPrize &&
      this.modal(
        `Вы выиграли "${inventory[inventory.length - 1].name}"`,
        inventory[inventory.length - 1].component,
        'openModalWithPrize'
      );
    if (spin) {
      setTimeout(() => {
        rouletteScrolled();
        this.setState({ openModalWithPrize: true });
      }, 4000);
    }
    return (
      <div className="container">
        <div className="roulette">
          <div className={`items ${spin ? 'items_active' : ''}`}>
            {roulette}
          </div>
        </div>
        <div className="roulette__buttons">
          <button
            onClick={spin ? null : generateRoulette}
            className={`btn ${spin ? 'btn_disabled' : ''}`}
          >
            Крутить
          </button>
          <button
            onClick={
              inventory.length !== 0
                ? () => this.setState({ openModalInventory: true })
                : null
            }
            className={`btn ${inventory.length === 0 ? 'btn_disabled' : ''}`}
          >
            Инвентарь
          </button>
        </div>
        {prize}
        {openModalInventory &&
          this.modal(
            `Инвентарь`,
            <div className="modal__components">
              {inventory.map(value => {
                return (
                  <div className="modal__block">
                    <div className="modal__component">{value.component}</div>
                    <div className="modal__descr">{value.name}</div>
                  </div>
                );
              })}
            </div>,
            'openModalInventory'
          )}
      </div>
    );
  }
}
const mapStateToProps = ({ spin, items, wonItem, inventory }) => {
  return { spin, items, wonItem, inventory };
};
const mapDispatchToProps = {
  generateRoulette,
  rouletteScrolled
};

export default connect(mapStateToProps, mapDispatchToProps)(App);