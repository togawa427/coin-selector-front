"use client"
import { countCoin } from '@/app/api/coin';
import { Button, FileInput } from '@mantine/core'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function Base() {
  const [value, setValue] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); // 画像URLのステートを追加

  const router = useRouter();

  const handleSubmit = async () => {
    if(!value){
      return
    }
    const imageBlob = await countCoin(value); // 画像Blobを取得
    const imageUrl = URL.createObjectURL(imageBlob); // BlobをURLに変換
    setImageUrl(imageUrl); // 画像URLをステートに保存
    router.push("/")
    router.refresh()
  }

  return (
    <div>
      Base
      <FileInput
        size="xl"
        radius="xl"
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
        value={value}
        onChange={setValue}
      />
      <Button onClick={handleSubmit}>
        すbみt
      </Button>

      {imageUrl && (
        <div>
          <h2>Processed Image:</h2>
          <Image src={imageUrl} alt="Processed Coin Image" width={100} height={100}/>
        </div>
      )}
    </div>
  )
}

export default Base