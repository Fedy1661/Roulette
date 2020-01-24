import React from 'react';
import {
  BlackCat,
  RedCat,
  WhiteCat,
  Pencils,
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
  { component: <BlackCat />, name: 'Чёрная кошка' },
  { component: <WhiteCat />, name: 'Белая кошка' },
  { component: <RedCat />, name: 'Красная кошка' },
  { component: <Pencils />, name: 'Принадлежности' },
  { component: <CowBrown />, name: 'Коричневая корова' },
  { component: <CowWhite />, name: 'Белая корова' },
  { component: <Pig />, name: 'Свинья' },
  { component: <Cigarette />, name: 'Сигарета' },
  { component: <PackOfCigarettes />, name: 'Пачка сигарет' },
  { component: <Champange />, name: 'Шампанское' },
  { component: <Corkscrew />, name: 'Штопор' },
  { component: <Grapes />, name: 'Виноград' },
  { component: <Modem />, name: 'Модем' },
  { component: <Money />, name: 'Купюра 100$' },
  { component: <MoneyBag />, name: 'Мешок с 100.000$' },
  { component: <Scooter />, name: 'Скутер' }
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
