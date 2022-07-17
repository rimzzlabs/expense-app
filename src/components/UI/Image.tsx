import { createElement } from 'react'

type ImageProps = {
  src: string
  alt: string
} & React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

const Image: React.FunctionComponent<ImageProps> = ({ src, alt, ...props }) =>
  createElement('img', { ...props, loading: 'lazy', src, alt })

export default Image
