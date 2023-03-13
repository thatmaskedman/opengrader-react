import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
    ChartPieIcon,
    PencilSquareIcon,
    KeyIcon,
    FolderIcon,
} from '@heroicons/react/24/outline'
import { Link } from '@tanstack/react-router'

const Navbar = () => {
    return (
        // <Disclosure as='nav' classNameName="bg-gray-800 text-white">
        //     <ul>
        //         <li><Link to='/examgroupwiz' >Exam Group</Link></li>
        //         <li><Link to='/key' >Keys</Link></li>
        //         <li><Link to='/examwizard' >Exam Capture</Link></li>
        //         <li><Link to='/stats' >Stats</Link></li>
        //     </ul>
        // </Disclosure>

        <section
            id='bottom-navigation'
            className='block fixed inset-x-0 bottom-0 z-10 bg-white shadow'
        >
            <div id='tabs' className='flex justify-between'>
                <Link
                    to='/examgroupwiz'
                    className='w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1'
                >
                    <FolderIcon className='h-6 w-6 inline-block mb-1' />
                    <span className='tab tab-home block text-xs'>Groups</span>
                </Link>

                <Link
                    to='/examwizard'
                    className='w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1'
                >
                    <PencilSquareIcon className='h-6 w-6 inline-block mb-1' />
                    <span className='tab tab-home block text-xs'>Exam</span>
                </Link>

                <Link
                    to='/key'
                    className='w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1'
                >
                    <KeyIcon className='h-6 w-6 inline-block mb-1' />
                    <span className='tab tab-home block text-xs'>Keys</span>
                </Link>

                <Link
                    to='/stats'
                    className='w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1'
                >
                    <ChartPieIcon className='h-6 w-6 inline-block mb-1' />
                    <span className='tab tab-home block text-xs'>Stats</span>
                </Link>
            </div>
        </section>
    )
}

export default Navbar
