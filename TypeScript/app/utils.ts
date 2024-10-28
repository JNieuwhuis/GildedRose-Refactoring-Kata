import type { Item } from './gilded-rose';

const _EXPIRATIONLIMIT: number = 0;
const _LOWERQUALITYLIMIT: number = 0;
const _UPPERQUALITYLIMIT: number = 50;

function setItemQualityLowerLimit() { return _LOWERQUALITYLIMIT };
function setItemQualityUpperLimit() { return _UPPERQUALITYLIMIT };

const isItemQualityOverLowerLimit = (quality: Item["quality"]): boolean => {
  return quality > _LOWERQUALITYLIMIT;
};

const isItemQualityUnderUpperLimit = (quality: Item["quality"]): boolean => {
  return quality < _UPPERQUALITYLIMIT;
};

export const isItemExpired = (sellIn: Item["sellIn"]): boolean => {
  return sellIn <= _EXPIRATIONLIMIT;
};

export const getNewItemQuality = (quality: Item["quality"]): Item["quality"] => {
  let newQuality = quality;

  isItemQualityOverLowerLimit(newQuality) ? newQuality : newQuality = setItemQualityLowerLimit();
  isItemQualityUnderUpperLimit(newQuality) ? newQuality : newQuality = setItemQualityUpperLimit();

  return newQuality;
};

export const getConcertItemQuality = (sellIn: Item["sellIn"]): Item["quality"] => {
  return sellIn < 6
    ? 3
    : sellIn < 11
      ? 2
      : 1;
}