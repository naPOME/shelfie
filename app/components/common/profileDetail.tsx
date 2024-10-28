import React from 'react'

export const ProfileDetail = () => {
  return (


<div
    className="max-w-xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900 absolute  top-5  right-5">
    <div className="rounded-t-lg h-32 overflow-hidden">
        <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain'/>
    </div>
    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <img className="object-cover object-center h-32" src='data:image/jpeg;base64,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' alt='Woman looking front'/>
    </div>
    <div className="text-center mt-2 flex flex-col align-middle justify-center">
        <h2 className="font-semibold ">Pom</h2>
       <p className="text-gray-500">Natnael@gmail.com</p>
    </div>
    <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li className="flex flex-col items-center justify-around">
            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <div>2k</div>
        </li>
        <li className="flex flex-col items-center justify-between">
            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
            <div>10k</div>
        </li>
        <li className="flex flex-col items-center justify-around">
            <svg className="w-4 fill-current text-blue-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                    d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
            </svg>
            <div>15</div>
        </li>
    </ul>
   
</div>
  )
}
