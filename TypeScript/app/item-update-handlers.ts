import { Item } from './gilded-rose';
import { getConcertItemQuality, getNewItemQuality, isItemExpired } from './utils'

function changeItemBy({ item, amount, date }: { item: Item, amount: number, date?: boolean }): Item {
  return {
    ...item,
    quality: getNewItemQuality(item.quality + amount),
    sellIn: date ? (item.sellIn - 1) : item.sellIn
  };
};

export const updateAgedItems = (item: Item): Item => {
  return changeItemBy({ item, amount: 1, date: true });
};

export const updateConcertItems = (item: Item): Item => {
  const amount = getConcertItemQuality(item.sellIn);

  return isItemExpired(item.sellIn)
    ? changeItemBy({ item, amount: (-item.quality), date: true })
    : changeItemBy({ item, amount, date: true });
};

export const updateConjuredItems = (item: Item): Item => {
  return isItemExpired(item.sellIn)
    ? changeItemBy({ item, amount: -4, date: true })
    : changeItemBy({ item, amount: -2, date: true });
};

export const updateLegendaryItems = (item: Item): Item => {
  // NOTE: 
  // Gave this item category it's own handler, even though it now only returns the item as-is
  // That's because I would've checked (with the team and/or the PO) whether we need to implement 
  // a code restraint for their requirement that legendary items always have a quality of 80
  // (to correct for possible manual entry mistakes or the like)
  // and it also increases code consistency by having all the handling logic in one place
  return item;
};

export const updateNormalItems = (item: Item): Item => {
  return isItemExpired(item.sellIn)
    ? changeItemBy({ item, amount: -2, date: true })
    : changeItemBy({ item, amount: -1, date: true });
};
