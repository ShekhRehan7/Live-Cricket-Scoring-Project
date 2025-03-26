


import { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  
  const [toggleButton,setToggleButton]=useState(false)
  const handleToogle= ()=>{
    setToggleButton(!toggleButton)
    console.log("first")
  }
  const handleRemove = ()=>{
    setToggleButton(false)
  }

  return (

    <>
     <header className="flex bg-black text-white border-b py-3 sm:px-6 px-4 font-[sans-serif] min-h-[75px] tracking-wide relative z-50 w-full  ">
  <div className="flex max-w-screen-xl mx-auto w-full ">
    <div className="flex flex-wrap items-center lg:gap-y-2 gap-4 w-full">
      <a to={"/"} className="w-28 lg:w-36 md:36"><img src="logo.png" alt="logo" className=" h-15" />
      </a>
      <div id="collapseMenu" className={`lg:ml-6 ${toggleButton=== true? "max-lg:block": "max-lg:hidden"} lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}>
        <button id="toggleClose" onClick={handleRemove}  className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" data-original="#000000" />
            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" data-original="#000000" />
          </svg>
        </button>
        <ul className="lg:flex lg:gap-x-3 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0  max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
          <li className="mb-6 hidden max-lg:block bg-black w-screen  ">
            <div className="flex items-center justify-between gap-4 px-4 ">
              <a to={"/"}><img src="logo.png" alt="logo" className="w-36" />
              </a>
            </div>
          </li>
          <li className="max-lg:border-b max-lg:py-3 px-5"><Link to={"/"} className="   hover:text-white text-[20px]  text-green-400 block font-semibold">Home</Link></li>
          <li className="max-lg:border-b max-lg:py-3 px-5"><Link to={"/tournament"} className=" hover:text-green-400 text-black lg:text-white text-[19px] block font-semibold">Tournament</Link></li>
          <li className="max-lg:border-b max-lg:py-3 px-5"><Link to={"/about"} className=" hover:text-green-400   text-black lg:text-white text-[19px] block font-semibold">Payment</Link></li>
          <li className="max-lg:border-b max-lg:py-3 px-5"><Link to={"/about"} className=" hover:text-green-400 text-[19px]  text-black lg:text-white block font-semibold">Contact</Link></li>
          <li className="max-lg:border-b max-lg:py-3 px-5"><Link to={"/livescoring"} className=" hover:text-green-400  text-black lg:text-white text-[19px] block font-semibold">Live</Link></li>
          <li className="max-lg:border-b max-lg:py-3 px-5 "><Link to={"/scorecard"} className=" hover:text-green-400 text-black lg:text-white text-[19px] block font-semibold">Score</Link></li>
          
          <div className='flex flex-col gap-2 px-4 mt-10'>
          {<button  className=" lg:hidden   px-4 py-2 text-sm rounded-full text-white border-2 bg-green-600 border-green-600  w-full"><a to={"/register"}>Sign Up</a> </button>}
          { <button  className="lg:hidden px-4 py-2 text-sm rounded-full text-white border-2 border-green-600 bg-green-600 w-full"><a to={"/login"}>Login</a> </button>}
         {/* {  <li className="lg:hidden max-lg:border-b max-lg:py-3 px-3"><h1  className="text-[#333] hover:text-[#ff523b] text-[19px] block font-semibold">User Email:- <span className='text-[#ff523b]'>62</span></h1></li>} */}
         { <button  className=" lg:hidden px-4 py-2 text-sm rounded-full text-white border-2 border-green-600 bg-green-600  w-full">Logout</button>}
          </div>
        </ul>
      </div>
      <div className="flex items-center gap-x-6 gap-y-4 ml-auto">
        <div className="flex items-center sm:space-x-8 space-x-6">
        
          {/* */}

        { <a to={"/register"} className="max-lg:hidden px-4 py-2 text-sm rounded-full text-center text-white border-2 border-green-600 bg-green-600 hover:bg-white hover:text-black hover:border-white cursor-pointer ">Sign
          Up</a>}
       {  <a to={"/login"} className="max-lg:hidden px-4 py-2 text-sm rounded-full text-white text-center border-2 border-green-600 bg-green-600 hover:bg-white hover:text-black hover:border-white cursor-pointer w-20">Login
            </a>}
           {/*    */}
        {  <button  className="max-lg:hidden px-4 py-2 text-sm rounded-full text-white border-2 border-green-600 bg-green-600 hover:bg-white hover:text-black hover:border-white cursor-pointer w-20">Logout 
          </button>
          }
          <button id="toggleOpen" onClick={handleToogle} className="lg:hidden">
            <svg className="w-7 h-7" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>


    </>
  )
}

export default Navbar