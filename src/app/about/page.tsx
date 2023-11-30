'use client'
import React, { useState, useEffect } from 'react'

import Image from 'next/image'
import { client } from 'sanity/lib/client'
import { fetchAboutData } from '@/pages/api'
import { Oval } from 'react-loader-spinner'
interface AboutData {
  title: string
  paragraph1: string
  imageUrl1: string
  paragraph2: string
  paragraph3: string
  imageUrl2: string
  paragraph4: string
  paragraph5: string
  imageUrl3: string
  paraTitle1: string
  paraTitle2: string
  paraTitle3: string
  paraTitle4: string
  paraTitle5: string
}
const Page = () => {
  const [aboutData, setAboutData] = useState<AboutData>({} as AboutData)

  useEffect(() => {
    fetchAboutData().then((res) => setAboutData(res.data))
  }, [])
  console.log('about data', aboutData)
  if (!aboutData) {
    return (
      <div>
        {' '}
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass="spinner-loader"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    )
  }

  const {
    title,
    paragraph1,
    imageUrl1,
    paragraph2,
    paragraph3,
    imageUrl2,
    paragraph4,
    paragraph5,
    imageUrl3,
    paraTitle1,
    paraTitle2,
    paraTitle3,
    paraTitle4,
    paraTitle5,
  } = aboutData

  return (
    <div className="aboutContainer">
      <h1>{title}</h1>
      <div className="paragraphWithImage">
        <h3>{paraTitle1}</h3>
        <p>{paragraph1}</p>
        {imageUrl1 && (
          <Image height={300} width={500} src={imageUrl1} alt="Image 1" />
        )}
      </div>
      <h3>{paraTitle2}</h3>

      <p>{paragraph2}</p>
      <div className="paragraphWithImage">
        <h3>{paraTitle3}</h3>

        <p>{paragraph3}</p>
        {imageUrl2 && (
          <Image width={500} height={300} src={imageUrl2} alt="Image 2" />
        )}
      </div>
      <h3>{paraTitle4}</h3>
      <p>{paragraph4}</p>
      <div className="paragraphWithImage">
        <h3>{paraTitle5}</h3>

        <p>{paragraph5}</p>
        {imageUrl3 && (
          <Image width={500} height={300} src={imageUrl3} alt="Image 3" />
        )}
      </div>
    </div>
  )
}

export default Page
