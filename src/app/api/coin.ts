import { Coin, CountPostResponse } from "../type";

export const countCoinOld = async (
  imageFile: File
): Promise<Blob> => {

  // 送信データの準備
  // const formData = new FormData();
  // const apiUrl = "http://coinselector-backend:3000"
  // // ファイル内容を詰める
  // formData.append("file", imageFile);
  // const formData = new FormData();
  // formData.append("file", imageFile); // 画像データをFormDataに追加

  console.log(imageFile.type)
  // console.log(await imageFile.arrayBuffer())
  // let buffer = await imageFile.arrayBuffer()

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch(`http://coinselector-backend/image`, {
      method: "POST",
      headers: {
          "Content-Type": imageFile.type,
      },
      body: await imageFile.arrayBuffer(),
  });

  console.log("保存できたよ")

  if (!res.ok){
      throw new Error("エラーが発生しました");
  }

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const responseData = await res.blob();
  return await responseData; // 画像データをBlobとして返す
}

// export const countCoin = async (
//   imageFile: File
// ): Promise<Blob> => {

//   // 送信データの準備
//   // const formData = new FormData();
//   // // ファイル内容を詰める
//   // formData.append("file", imageFile);
//   // const formData = new FormData();
//   // formData.append("file", imageFile); // 画像データをFormDataに追加

//   console.log(imageFile.type)
//   console.log("APIたたくよ")
//   // console.log(await imageFile.arrayBuffer())
//   // let buffer = await imageFile.arrayBuffer()

//   // await new Promise((resolve) => setTimeout(resolve, 1000));

//   const res = await fetch(`http://localhost:1235/imagePlus`, {
//       method: "POST",
//       headers: {
//           "Content-Type": imageFile.type,
//       },
//       body: await imageFile.arrayBuffer(),
//   });

//   console.log("保存できたよ")
//   console.log(res)
//   const product = await res.json()
//   console.log(product)

//   if (!res.ok){
//       throw new Error("エラーが発生しました");
//   }

//   // await new Promise((resolve) => setTimeout(resolve, 1000));

//   const responseData = await res.blob();
//   return await responseData; // 画像データをBlobとして返す
// }

export const countCoin = async (
  imageFile: File
): Promise<{ processedImageBase64: Blob; coin: Coin }> => {
  console.log(imageFile.type); // 画像のタイプをログ出力
  console.log("APIを叩きます");

  // const res = await fetch(`https://coinselector-backend.kajilab.dev/imagePlus`, {
  const res = await fetch(`http://localhost:3102/imagePlus`, {
    method: "POST",
    headers: {
      "Content-Type": imageFile.type,
    },
    body: await imageFile.arrayBuffer(), // FileをArrayBufferに変換して送信
  });

  if (!res.ok) {
    console.error(await res.text());
    throw new Error("エラーが発生しました");
  }

  console.log("API呼び出し成功");

  // JSONとして解析
  const jsonResponse: CountPostResponse = await res.json();
  console.log("request:aaaaa")
  console.log(jsonResponse)
  console.log(jsonResponse.processedImage)
  console.log(jsonResponse.fifty_yen)

  const coin: Coin = {
    hundred_yen: jsonResponse.hundred_yen,
    fifty_yen: jsonResponse.fifty_yen,
    ten_yen: jsonResponse.ten_yen,
    five_yen: jsonResponse.five_yen,
    one_yen: jsonResponse.one_yen
  }

  console.log(coin)

  // Base64エンコードされた画像とコイン情報を返す
  return {
    processedImageBase64: jsonResponse.processedImage, // Base64エンコード画像
    coin: coin,        // コインの枚数データ
  };
};