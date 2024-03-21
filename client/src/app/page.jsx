import Image from 'next/image';
import Delivery from '../../public/image/delivery.png';
import Costumer from '../../public/image/costumer.png';
import Girl from '../../public/image/girl.png';
import Fast from '../../public/image/fast.png';
import Cart from '../../public/image/cart.png';

export default function Home() {
  return (
    <div>
      <div>
      <div className="flex justify-center items-center">
  <div className="p-6 flex">
    <div className="mr-40 mt-40">
      <h2 className="text-4xl font-extrabold mb-4">
        Savor Every <span className="text-main-green">Bite</span>,<br />
        Anywhere
      </h2>
      <p className="mb-6">
        Experience the joy of culinary excellence as we<br />
        deliver delight to your fingertips, one order at a time.
      </p>
      <a href="/restaurant">
      <button className="bg-main-green hover:bg-green-500 text-white font-regular py-2 px-5 rounded-full mt-6">
        Order Now
      </button>
      </a>
    </div>
    <div>
      <Image src={Delivery} alt="Delivery" width={600} height={600} />
    </div>
  </div>
</div>
<div className="flex justify-center items-center">
  <div className="p-6 flex">
    <div className="mr-40 -ml-20">
      <Image src={Costumer} alt="Costumer" width={600} height={600} />
    </div>
    <div className="mt-40">
    <p className='mb-12 text-red-500 text-xs tracking-widest'>JOIN OUR COMMUNITY</p>
      <h2 className="text-4xl font-extrabold mb-4">
        Join Fresh<span className="text-main-green">Fix</span> Now
      </h2>
      <p className="mb-6">
      "Ordering was a breeze with the intuitive interface<br />
      and quick checkout process. A seamless experience <br />
      I'll definitely use again."
      </p>
      <a href="/signup">
      <button className="bg-main-green hover:bg-green-500 text-white font-regular py-2 px-5 rounded-full mt-6">
        Join Now
      </button>
      </a>
    </div>
  </div>
</div>
<div className="flex justify-center items-center">
  <div className="p-6 flex">
    <div className="mr-40 mt-40">
      <h2 className="text-4xl font-extrabold mb-4">
      Add Your Restaurant
      </h2>
      <p className="mb-6">
      "The website makes it easy for diners to explore our<br />
      menu and place orders effortlessly. It's been a <br />
      pleasure partnering with this platform to enhance <br />
      our online presence."
      </p>
      <a href="/signup">
      <button className="bg-main-green hover:bg-green-500 text-white font-regular py-2 px-5 rounded-full mt-6">
        Join Now
      </button>
      </a>
    </div>
    <div>
      <Image src={Girl} alt="Girl" width={600} height={600} />
    </div>
  </div>
</div>
<div className="flex justify-center items-center">
  <div className="mt-40 mr-80 mb-28">
    <p className='mb-12 text-red-500 text-xs tracking-widest'>Our Story & Services</p>
    <h2 className="text-4xl font-extrabold mb-4">
      Our Services
    </h2>
    <p className="mb-6">
      Rooted in passion, we curate unforgettable dining<br />
      experiences and offer exceptional services,<br />
      blending culinary artistry with warm hospitality.
    </p>
  </div>
  <div className="flex space-x-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-50 h-50 flex flex-col items-center justify-center">
      <div className="mb-4">
        <Image src={Cart} alt="Cart" width={40} height={40} />
      </div>
      <h2 className="text-lg font-semibold mb-2 text-main-green text-center">ONLINE ORDERING</h2>
      <p className="text-gray-700 text-center">
        Explore menu & order<br />
        with ease using our<br />
        Online Ordering
      </p>
    </div>
    <div className="bg-white rounded-2xl shadow-xl p-8 w-50 h-50 flex flex-col items-center justify-center">
      <div className="mb-4">
        <Image src={Fast} alt="Fast" width={40} height={40} />
      </div>
      <h2 className="text-lg font-semibold mb-2 text-main-green text-center">FAST DELIVERY</h2>
      <p className="text-gray-700 text-center">
        We deliver your order<br />
        promptly to your door<br />
        with FreshFix
      </p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
}
