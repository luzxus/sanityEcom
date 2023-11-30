import { urlForImage } from "sanity/lib/image"

export const parseImage = (imageSrc: string) => {
  return urlForImage(imageSrc).toString()
}
