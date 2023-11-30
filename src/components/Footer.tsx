'use client'
import { fetchContactData } from '@/pages/api'
import React, { useEffect, useState } from 'react'
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai'
interface IContact {
  company: string
  adress: { street: String; zipcode: String; city: string }
  email: String
  phone: string
}
const Footer = () => {
  const [contactData, setContactData] = useState<IContact>({} as IContact)

  useEffect(() => {
    fetchContactData().then((res) => {
      setContactData(res.data)
    })
  }, [])
  return (
    <div className="footer-container">
      <p>Created by Stellar Solutions for drömföretaget</p>
      <p className="icons">
        <AiFillInstagram />
        <AiOutlineTwitter />
      </p>

      <div className="contact-container">
        <p> {contactData.company}</p>
        <div className="adress-container">
          <p>{contactData.adress?.city}</p>
          <p>{contactData.adress?.zipcode}</p>
          <p>{contactData.adress?.street}</p>
        </div>
        <p> {contactData.email}</p>
        <p> {contactData.phone}</p>
      </div>
    </div>
  )
}

export default Footer
