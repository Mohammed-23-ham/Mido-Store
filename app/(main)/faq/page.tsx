import Accordion from '@/components/shadcn-space/accordion/accordion-07'

export default function page() {
  return (
    <div className='text-center px-4 py-16'>
      <h1 className='font-display text-5xl'>Questions, answered.</h1>
      <div className="text-start">
      <Accordion />
      </div>
    </div>
  )
}
