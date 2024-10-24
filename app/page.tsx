import React from 'react';
import '../styles/globals.css'


 const Hero = () => {
  return (
    <section className="bg-gray-50 font-sans py-8 min-h-[90vh]">
      <div className="grid max-w-screen-xl px-4 py-5 mx-auto lg:gap-8 xl:gap-0 lg:py-24 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7 pt-10">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-black">
            Find Your Next Book
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-800 lg:mb-8 md:text-lg lg:text-xl">
            Our most popular and trending <span className="text-black font-bold">SHELF.ie</span> perfect not sure what to read now next reading mood perfect
          </p>
          <a 
            href="bookSection" // Link to BookSection
            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-black rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
          >
            Get started
            <svg 
              className="w-5 h-5 ml-2 -mr-1" 
              fill="currentColor" 
              viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                fillRule="evenodd" 
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>

        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-around gap-5 pb-20">
          <div className="flex flex-col items-center h-48">
            <img 
              src="https://imgs.search.brave.com/dyyrSJucH0LG3bsMXX8RR_4OJgje1opM6W2o9rAqzzc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWRhemluZy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MTIvSGFycnktUG90/dGVyLUJvb2stQ292/ZXJzLVByaXNvbmVy/cy1vZi1BemthYmFu/LXVzLmpwZw" 
              alt="Mockup 1" 
              className="h-72 w-60 object-cover rounded-t-full"
            />
            <p className='text-black text-sm font-bold'>The Half Blood</p>
            <span className="mt-2 text-gray-800">Harry Potter</span>
          </div>

          <div className="flex flex-col items-center h-48">
            <p className='text-black text-sm font-bold'>Prison of Azkban</p>
            <span className="mt-2 text-gray-800">Frank Kafka</span>
            <img 
              src="https://imgs.search.brave.com/O-niKVRrfx0FfkSJnO3F-OxUo_RBxVloWKKqowj8HZQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWRhemluZy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MTIvSGFycnktUG90/dGVyLUJvb2stQ292/ZXJzLVBoaWxvc29w/aGVycy1TdG9uZS11/cy0yLmpwZw" 
              alt="Mockup 2" 
              className="h-72 w-60 object-cover rounded-b-full"
            />
          </div>

          <div className="flex flex-col items-center h-48">
            <img 
              src="https://imgs.search.brave.com/oFjgc_DjV2z1cmdEJhK-mMLkk5P3Za1CHm5QWJ_DMOo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/YWRhemluZy5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjIv/MTIvSGFycnktUG90/dGVyLUJvb2stQ292/ZXJzLVBoaWxvc29w/aGVycy1TdG9uZS11/ay0yLTY2N3gxMDI0/LmpwZw" 
              alt="Mockup 3" 
              className="rounded-t-full h-72 w-60 object-cover"
            />
            <p className='text-black text-md font-bold'>Prison of Azkban</p>
            <span className="mt-2 text-gray-800">JK Rowling</span>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Hero