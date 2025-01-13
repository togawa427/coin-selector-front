export type Coin = {
  hundred_yen: number;
  fifty_yen: number;
  ten_yen: number;
  five_yen: number;
  one_yen: number;
}

export type CountPostResponse = Coin & {
  processedImage: Blob;
}