"use client"
import { countCoin } from '@/app/api/coin';
import { Coin } from '@/app/type';
import { Button, FileInput, Image, Table } from '@mantine/core'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Base() {
  const [value, setValue] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 画像URLのステートを追加
  const [coinData, setCoinData] = useState<Coin | null>(null);

  const router = useRouter();

  const handleSubmit = async () => {
    if(!value){
      return
    }
    // POST通信
    const result = await countCoin(value); // 画像Blobを取得
    // 加工済み画像をセット
    setImageUrl(`data:image/jpeg;base64,${result.processedImageBase64}`);
    console.log(result.processedImageBase64)
    // コインの枚数データをセット
    // setCoinData(result.coin);
    // console.log(result.coin)
    router.push("/")
    router.refresh()
  }

  return (
    <div className="px-5 mt-5 text-center min-w-96 max-w-[32rem] mx-auto">
      <FileInput
        size="xl"
        radius="xl"
        placeholder="カメラを起動"
        value={value}
        onChange={setValue}
      />
      {value && (
        <Button onClick={handleSubmit} size='md' className='bg-custom-main mt-2 mb-5' color='#896859'>
          硬貨を計算する!!
        </Button>
      )}

      {imageUrl && (
        <div className='bg-gray-100 rounded-md text-xl px-2 py-5'>
          {/* <div className='text-xl text-gray-400 my-1'>計算結果</div> */}
          <div className='text-3xl font-bold mb-3'>合計金額：718円</div>
          <div className='my-1'>＜内訳＞</div>
          <div className='my-1'>100円玉：{coinData?.hundred_yen}枚(500円)</div>
          <div className='my-1'>50円玉：{coinData?.fifty_yen}枚(250円)</div>
          <div className='my-1'>10円玉：{coinData?.ten_yen}枚(50円)</div>
          <div className='my-1'>5円玉：{coinData?.five_yen}枚(25円)</div>
          <div className='my-1'>1円玉：{coinData?.one_yen}枚(5円)</div>
          <div className='w-56 mx-auto'>
            <Image src={imageUrl} alt="Processed Coin Image"/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Base