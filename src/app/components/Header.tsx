import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <Link href="/">
      <div className="bg-custom-main text-gray-50 px-1 py-2 text-xl text-center font-bold">
        かけラク
      </div>
    </Link>
  )
}

export default Header