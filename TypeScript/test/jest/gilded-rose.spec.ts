import { Item, GildedRose } from '@/gilded-rose';

describe('Normal items', () => {
  it('should correctly decrease in sellIn and quality', () => {
    const gildedRose = new GildedRose([new Item('foo', 3, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual({ name: 'foo', sellIn: 2, quality: 2 });
  });

  it('should doubly decrease in quality when degraded', () => {
    const gildedRose = new GildedRose([new Item('foo', -1, 8)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(6);
  });
});

describe('Legendary items', () => {
  it('should not be updated', () => {
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 3, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).toEqual({ name: 'Sulfuras, Hand of Ragnaros', sellIn: 3, quality: 80 });
  });

  // it('should always have a quality of 80');
  // the requirements stipulate this, but the current accepted code does not enforce this
  // also see NOTE @/item-update-handlers.ts/L25
});

describe('Aged items', () => {
  it('should increase in quality', () => {
    const gildedRose = new GildedRose([new Item('Aged Brie', 3, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });
});

describe('Concert items', () => {
  it('should increase in quality', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 20, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });

  it('should increase in quality by 2 when there are 10 days or less untill the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(24);
  });

  it('should increase in quality by 3 when there are 5 days or less untill the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 5, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(25);
  });

  it('should drop to quality 0 after the concert', () => {
    const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 0, 22)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});

describe('Conjured items', () => {
  it('should degrade twice as fast as normal items', () => {
    const gildedRose = new GildedRose([new Item("Conjured Mana Cake", 3, 6)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });
});