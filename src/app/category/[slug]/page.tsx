'use client'

import { useParams } from 'next/navigation'
import React from 'react'

const CategoryPage = () => {
  const slugParam = useParams()

  return <div>Category pag with id {slugParam.slug}</div>
}

export default CategoryPage
