import React from 'react';
import {
  BlackCat,
  RedCat,
  WhiteCat,
  CowBrown,
  CowWhite,
  Pig,
  Cigarette,
  PackOfCigarettes,
  Champange,
  Corkscrew,
  Grapes,
  Modem,
  Money,
  MoneyBag,
  Scooter
} from './components/items';
import { GENERATE_ROULETTE, ROULETTE_SCOLLED } from './actions';
const items = [
  { component: <BlackCat />, name: 'Чёрная кошка', id: 1 },
  { component: <WhiteCat />, name: 'Белая кошка', id: 2 },
  { component: <RedCat />, name: 'Красная кошка', id: 3 },
  { component: <CowBrown />, name: 'Коричневая корова', id: 4 },
  { component: <CowWhite />, name: 'Белая корова', id: 5 },
  { component: <Pig />, name: 'Свинья', id: 6 },
  { component: <Cigarette />, name: 'Сигарета', id: 7 },
  { component: <PackOfCigarettes />, name: 'Пачка сигарет', id: 8 },
  { component: <Champange />, name: 'Шампанское', id: 9 },
  { component: <Corkscrew />, name: 'Штопор', id: 10 },
  { component: <Grapes />, name: 'Виноград', id: 11 },
  { component: <Modem />, name: 'Модем', id: 12 },
  { component: <Money />, name: 'Купюра 100$', id: 13 },
  { component: <MoneyBag />, name: 'Мешок с 100.000$', id: 14 },
  { component: <Scooter />, name: 'Скутер', id: 15 }
];

const generateRoulette = count => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    const item = items[Math.floor(Math.random() * items.length)];
    arr.push(item);
  }
  return arr;
};

const findNameItem = (inv, itemName) => {
  let find = false;
  inv.forEach(({ name }, key) => {
    if (name === itemName) {
      find = key;
    }
  });
  return find;
};

const initialState = {
  items: [...generateRoulette(3)],
  spin: false,
  inventory: [],
  wonItem: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GENERATE_ROULETTE:
      const arr = [...state.items, ...generateRoulette(15)];
      let wonItem = arr[arr.length - 2];
      const findName = findNameItem(state.inventory, wonItem.name);
      const wonItemIndex =
        findName !== false ? findName : state.inventory.length;
      if (findName !== false) {
        wonItem = state.inventory[wonItemIndex];
        wonItem.amount += 1;
      } else {
        wonItem.amount = 1;
      }
      if (state.spin === false) {
        return {
          ...state,
          items: arr,
          spin: !state.spin,
          inventory: [
            wonItem,
            ...state.inventory.slice(0, wonItemIndex),
            ...state.inventory.slice(wonItemIndex + 1)
          ],
          wonItem
        };
      } else {
        return {
          ...state,
          items: arr,
          inventory: [
            wonItem,
            ...state.inventory.slice(0, wonItemIndex),
            ...state.inventory.slice(wonItemIndex + 1)
          ],
          wonItem
        };
      }
    case ROULETTE_SCOLLED:
      return {
        ...state,
        spin: false,
        items: [...state.items.slice(state.items.length - 3)],
        wonItem: null
      };
    default:
      return state;
  }
};
