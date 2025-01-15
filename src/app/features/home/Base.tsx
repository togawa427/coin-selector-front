"use client"
import { countCoin } from '@/app/api/coin';
import Loading from '@/app/components/Loading';
import { Coin } from '@/app/type';
import { Button, FileInput, Image, Table } from '@mantine/core'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Base() {
  const [value, setValue] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 画像URLのステートを追加
  const [coinData, setCoinData] = useState<Coin | null>(null);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const router = useRouter();

  const handleSubmit = async () => {
    if(!value){
      return
    }
    setIsLoading(true)
    // POST通信
    const result = await countCoin(value); // 画像Blobを取得
    // 加工済み画像をセット
    setImageUrl(`data:image/jpeg;base64,${result.processedImageBase64}`);
    console.log(result.processedImageBase64)
    setCoinData(result.coin)
    setIsLoading(false)
    // console.log(result.coin)
    // コインの枚数データをセット
    // setCoinData(result.coin);
    // console.log(result.coin)
    router.push("/")
    router.refresh()
  }

  // if(isLoading){
  //   return(
  //     <Loading message='計算中'/>
  //   )
  // }

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
        <div>
          {!isLoading ? (
              <Button onClick={handleSubmit} size='md' className='bg-custom-main mt-2 mb-5' color='#896859'>
                硬貨を計算する!!
              </Button>
            ) : (
              <Button loading loaderProps={{ type: 'dots' }} size='md' className='bg-custom-main mt-2 mb-5' color='#896859'>
                硬貨を計算する!!
              </Button>
            )
          }
        </div>
        // <Button onClick={handleSubmit} size='md' className='bg-custom-main mt-2 mb-5' color='#896859'>
        //   硬貨を計算する!!
        // </Button>
      )}

      {isLoading && (
        <Loading message='計算中' />
      )}

      {imageUrl && coinData && (
        <div className='bg-gray-100 rounded-md text-xl px-2 py-5'>
          {/* <div className='text-xl text-gray-400 my-1'>計算結果</div> */}
          <div className='text-3xl font-bold mb-3'>合計金額：{(100*coinData.hundred_yen)+(50*coinData.fifty_yen)+(10*coinData.ten_yen)+(5*coinData.five_yen)+(1*coinData.one_yen)}円</div>
          <div className='my-1'>＜内訳＞</div>
          <div className='my-1'>100円玉：{coinData.hundred_yen}枚({100*coinData.hundred_yen}円)</div>
          <div className='my-1'>50円玉：{coinData.fifty_yen}枚({50*coinData.fifty_yen}円)</div>
          <div className='my-1'>10円玉：{coinData.ten_yen}枚({10*coinData.ten_yen}円)</div>
          <div className='my-1'>5円玉：{coinData.five_yen}枚({5*coinData.five_yen}円)</div>
          <div className='my-1'>1円玉：{coinData.one_yen}枚({1*coinData.one_yen}円)</div>
          <div className='w-56 mx-auto'>
            <Image src={imageUrl} alt="Processed Coin Image"/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Base