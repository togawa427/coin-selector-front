import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <Link href="/">
      <div className="bg-gray-600 text-white px-1 py-2 text-xl">
        コイン識別
      </div>
    </Link>
  )
}

export default Header