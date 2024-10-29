import { getConcertItemQuality, getNewItemQuality, isItemExpired } from '@/utils';

describe('Function isItemExpired', () => {
  it('should return true for items with sellIn value of 0 or less', () => {
    const isExpired1 = isItemExpired(0);
    const isExpired2 = isItemExpired(-1);

    expect(isExpired1).toBeTruthy();
    expect(isExpired2).toBeTruthy();
  });

  it('should return false for items with sellIn value more than 0', () => {
    const isExpired1 = isItemExpired(1);
    const isExpired2 = isItemExpired(12);

    expect(isExpired1).toBeFalsy();
    expect(isExpired2).toBeFalsy();
  });
});

describe('Function getNewItemQuality', () => {
  it('should cap quality at 0 for its lower bound', () => {
    const newQuality1 = getNewItemQuality(0);
    const newQuality2 = getNewItemQuality(-2);

    expect(newQuality1).toBe(0);
    expect(newQuality2).toBe(0);
  });

  it('should cap quality at 50 for its upper bound', () => {
    const newQuality1 = getNewItemQuality(50);
    const newQuality2 = getNewItemQuality(52);

    expect(newQuality1).toBe(50);
    expect(newQuality2).toBe(50);
  });

  it('should return the new quality value if it falls within the boundaries', () => {
    const newQuality1 = getNewItemQuality(7);
    const newQuality2 = getNewItemQuality(38);

    expect(newQuality1).toBe(7);
    expect(newQuality2).toBe(38);
  });
});

describe('Function getConcertItemQuality', () => {
  it('should return quality amount 1 for sellIn values 11 or higher', () => {
    const qualityAmount1 = getConcertItemQuality(11);
    const qualityAmount2 = getConcertItemQuality(22);
    const qualityAmount3 = getConcertItemQuality(10);

    expect(qualityAmount1).toBe(1);
    expect(qualityAmount2).toBe(1);
    expect(qualityAmount3).not.toBe(1);
  });

  it('should return quality amount 2 for sellIn values between 10 and 6', () => {
    const qualityAmount1 = getConcertItemQuality(6);
    const qualityAmount2 = getConcertItemQuality(10);

    expect(qualityAmount1).toBe(2);
    expect(qualityAmount2).toBe(2);
  });

  it('should return quality amount 3 for sellIn values between 5 and 1', () => {
    const qualityAmount1 = getConcertItemQuality(5);
    const qualityAmount2 = getConcertItemQuality(1);

    expect(qualityAmount1).toBe(3);
    expect(qualityAmount2).toBe(3);
  });
});