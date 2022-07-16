import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const twclsx = (...args: ClassValue[]) => twMerge(clsx(...args))

export default twclsx
