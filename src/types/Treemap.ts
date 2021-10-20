interface TreemapItem {
  id: string;
  name: string;
  marketCap: number;
}

export interface TreemapStock extends TreemapItem {
  /** 섹터 id */
  sectorId: string;
  /** 현재가 */
  price: number;
  /** 등락율 */
  gains: number;
  /** 썸네일 이미지 */
  thumbnailSrc: string;
}

export interface TreemapSector extends TreemapItem {
  stocks: TreemapStock[];
}

export interface TreemapMarket {
  /** kospi, kosdaq, dow30, nasdaq */
  name: string;
  sectors: TreemapSector[];
}
