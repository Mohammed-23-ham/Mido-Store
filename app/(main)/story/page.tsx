import Image from 'next/image'
import storyImg from '@/public/imgs/drop.jpg'

export default function page() {
  return (
    <div className='flex flex-col gap-8 px-4 py-16 text-center md:text-start md:flex-row md:items-center'>
      <div className="flex flex-col gap-4">
        <h1 className='font-display text-5xl'>Rooted in the grove.</h1>
        <p className='mt-6 text-lg text-muted-foreground'>Aura Botanica began on a family olive farm. We press our squalane from sustainably harvested olives and blend it in small batches with zero synthetic fragrance.

Every bottle is vegan, cruelty-free and shipped carbon-neutral.</p>
      </div>
      <Image
      src={storyImg}
      alt='A drop of olive-derived oil falling onto an olive leaf'
      className='aspect-square w-full rounded-[2rem] object-cover'
      >

      </Image>
    </div>
  )
}
