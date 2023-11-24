import { fetchData } from '@/api'
import { FooterBanner, HeroBanner, Product } from '../components/index'
//eftersom denna är skapad i root dir så blir detta våran / route sida

async function HomePage() {
  const {
    props: { bannerData, images, products },
  } = await fetchData()
  return (
    <div>
      <HeroBanner
        heroBanner={
          bannerData && bannerData?.length > 0 ? bannerData[0] : ({} as any)
        }
      />
      <div className="products-heading">
        <h2>Bäst säljande produkter</h2>
        <p>Talare av många variationer</p>
        <div className="products-container">
          {products?.map((product: any) => (
            <Product product={product} key={product._id} />
          ))}
        </div>
      </div>
      <FooterBanner
        footerBanner={bannerData && bannerData.length >= 1 && bannerData[1]}
      />
    </div>
  )
}

export default HomePage
