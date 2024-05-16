import Image from 'next/image';
import Link from 'next/link';


export default function Product() {
  return (
    <div className = "w-screen h-[475vh] md:h-[250vh] xl:h-[150vh] grid grid-cols-1 justify-items-center">
      <h1 className = "text-3xl my-">Products</h1>
      <div className = "w-5/6 h-[400vh] md:h-[200vh] xl:w-5/6 xl:h-[100vh] border-0 border-black border-t-2 grid grid-cols-1 justify-items-center xl:flex xl:justify-center">

        <div className = "w-[14rem] h-[14rem] mt-0  xl:mr-32 py-8 grid grid-cols-1 border-0 border-b-2 border-black">
          <h1 className = "ml-4 text-2xl">Search Filter</h1>
          <h1 className = "ml-4 text-sm py-4 font-bold">By Category</h1>
          <label className = "ml-4">
            <input type = "radio" className = "active:bg-blue-500" name = "category"></input>
            <span className = "checkmark"></span>
            Brownies  
          </label>
          <label className = "ml-4">
            <input type = "radio" className = "active:bg-blue-500" name = "category"></input>
            <span className = "checkmark"></span>
            Cookies
          </label>
        </div>


        <div className = "xl:my-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[2rem] md:gap-[8rem] xl:gap-[8rem] opacity-0 animate-fadeInAnimation animate-delay-100">
          <Link href= "/products/classic-brownies">
            <div className = "hover:bg-[#dfdcd8] active:bg-[#c6c4c0] -content-start shadow-2xl h-[24rem] w-[16rem]  bg-[#F8F5F0]">
              
              <img 
              className = "w-[16rem] h-[16rem] " 
              src = "/Classic Brownies.jpg" 
              alt = "Classic Brownies">
              </img>
              
              <h1 className = "text-bottom text-center py-4"> Classic Brownies </h1>
              <h1 className = "ml-4 mt-2 text-sm">₱100.00</h1>
            </div>
          </Link>

          <Link href= "/products/cream-cheese-brownies">
            <div className = "hover:bg-[#dfdcd8] active:bg-[#c6c4c0] content-start shadow-2xl h-[24rem] w-[16rem] bg-[#F8F5F0]">
              <img
              className ="w-[16rem] h-[16rem]"
              src = "Blue Berry.jpg"
              alt = "Cream Cheese Brownies">
              </img>
              <h1 className = "text-bottom text-center py-4">Cream Cheese Brownies</h1>
              <h1 className = "ml-4 mt-2 text-sm">₱120.00</h1>
            </div>
          </Link>

          <Link href= "/products/brownies-with-nuts">
            <div className = "hover:bg-[#dfdcd8] active:bg-[#c6c4c0] content-start shadow-2xl h-[24rem] w-[16rem] bg-[#F8F5F0]">
              <img
              className ="w-[16rem] h-[16rem]"
              src = "Brownies with nuts.jpg"
              alt = "Brownies With Nuts">
              </img>
              <h1 className = "text-bottom text-center py-4">Brownies With Nuts</h1>
              <h1 className = "ml-4 mt-2 text-sm">₱110.00</h1>
            </div>
          </Link >

          <Link href= "/products/red-velvet-brownies">
            <div className = "hover:bg-[#dfdcd8] active:bg-[#c6c4c0] content-start shadow-2xl h-[24rem] w-[16rem] bg-[#F8F5F0]">
              <img
              className ="w-[16rem] h-[16rem]"
              src = "Red Velvet.jpg"
              alt = "Red Velvet">
              </img>
              <h1 className = "text-bottom text-center py-4">Red Velvet</h1>
              <h1 className = "ml-4 mt-2 text-sm">₱120.00</h1>
            </div>
          </Link>

          <Link href= "/products/chocolate-chip-cookies">
          <div className = "hover:bg-[#dfdcd8] active:bg-[#c6c4c0] content-start shadow-2xl h-[24rem] w-[16rem] bg-[#F8F5F0]">
            <img
            className ="w-[16rem] h-[16rem]"
            src = "Chocolate Chip Cookie.png"
            alt = "Chocolate Chip Cookie">
            </img>
            <h1 className = "text-bottom text-center py-4">Chocolate Chip Cookie</h1>
            <h1 className = "ml-4 mt-2 text-sm">₱110.00</h1>
          </div>
          </Link>

          <Link href= "/products/cookies">
            <div className = "hover:bg-[#dfdcd8] active:bg-[#c6c4c0] content-start shadow-2xl h-[24rem] w-[16rem] bg-[#F8F5F0]">
              <img
              className ="w-[16rem] h-[16rem]"
              src = "Cookies.png"
              alt = "Cookies">
              </img>
              <h1 className = "text-bottom text-center py-4">Cookies</h1>
              <h1 className = "ml-4 mt-2 text-sm">₱100.00</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
