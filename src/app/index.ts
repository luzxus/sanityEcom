import { client } from "../../sanity/lib/client";

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]'; //grab all products from sanity
  const products = await client.fetch(query);

  const banner = '*[_type == "banner"]'; //grab all products from sanity
  const bannerData = await client.fetch(banner);

  return { products, bannerData };
};
