import Link from 'next/link';
import Image from 'next/image';
import { useHover } from '@mantine/hooks';
export default function Header({ name }) {
  const {ref,hovered} = useHover()
  return (
    <header className="pt-20 pb-12">
      {/* <div className="w-12 h-12 rounded-full block mx-auto mb-4 bg-gradient-conic from-gradient-3 to-gradient-4" /> */}
      <Link  href={`/`} >
        <a ref={ref} className='flex opacity-70 gap-1 animate-pulse ease-in-out'>
        <Image src={`https://user-images.githubusercontent.com/70070951/236350667-43598a8c-8cfc-4cf0-a1d6-9cb089269301.svg`} className={` ${hovered? '-rotate-45':'' } ease-in-out duration-300 transform -scale-x-100`} width={75} height={75} alt='jordan_flag'/>
        <Image src={`https://user-images.githubusercontent.com/70070951/236350669-45585a84-e574-418d-937b-0cd357192d1a.svg`} className={` ${hovered? 'rotate-45':'' } ease-in-out duration-300 transform`} width={75} height={75} alt='lebanon_flag'/>
        </a>
      </Link>
      <p className="text-2xl dark:text-white text-center">
        <Link href="/">
          <a>{name}</a>
        </Link>
      </p>
    </header>
  );
}
