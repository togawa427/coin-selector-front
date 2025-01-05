export const countCoin = async (
  imageFile: File
): Promise<Blob> => {

  // 送信データの準備
  // const formData = new FormData();
  // // ファイル内容を詰める
  // formData.append("file", imageFile);
  // const formData = new FormData();
  // formData.append("file", imageFile); // 画像データをFormDataに追加

  console.log(imageFile.type)
  // console.log(await imageFile.arrayBuffer())
  // let buffer = await imageFile.arrayBuffer()

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch(`http://localhost:1235/image`, {
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