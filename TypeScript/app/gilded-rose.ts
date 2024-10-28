import { updateNormalItems, updateAgedItems, updateConcertItems, updateLegendaryItems } from './item-update-handlers';

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const updatedItems = this.items.map((item: Item) => {
      switch (item.name) {
        case 'Sulfuras, Hand of Ragnaros':
          return updateLegendaryItems(item);
        case 'Backstage passes to a TAFKAL80ETC concert':
          return updateConcertItems(item);
        case 'Aged Brie':
          return updateAgedItems(item);
        default:
          return updateNormalItems(item);
      }
    })

    return updatedItems;
  }
}
