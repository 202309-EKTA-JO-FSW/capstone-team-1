import Image from "next/image";
import Fast from "../../../public/image/fast.png";
import Users from "../../../public/image/users.png";
import Manage from "../../../public/image/manage.png";
import Cart from "../../../public/image/cart.png";
import Leaf from "../../../public/image/leaf.png";
import Hala from "../../../public/image/hala.png";
import Gorgees from "../../../public/image/gorgees.png";
import Aya from "../../../public/image/aya.png";
import Nour from "../../../public/image/nour.png";

export default function Home() {
  return (
    <div>
      <div>
        {/* Section 1 */}
        <div className="flex flex-col md:flex-row justify-center items-center pt-48">
          <div className="p-12 flex flex-col md:flex-row items-center">
            <div className="mr-0 md:mr-48 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
                About Fresh<span className="text-main-green">Fix</span>
              </h2>
              <p className="text-lg md:text-xl mb-8">
                A food ordering website where you can experience
                <br /> the joy of culinary excellence as we deliver delight{" "}
                <br /> to your fingertips, one order at a time.
              </p>
            </div>
            <div className="mt-12 md:mt-0 md:ml-48">
              <Image src={Leaf} alt="Leaf" width={300} height={300} />
            </div>
          </div>
        </div>
        {/* Section 2 */}
        <div className="flex flex-col justify-center items-center pt-36">
          <div className="mb-8">
            <p className="text-2xl md:text-3xl font-bold">Our Services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center aspect-square">
              <div className="mb-4">
                <Image src={Cart} alt="Cart" width={40} height={40} />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2 text-main-green">
                  ORDER ONLINE
                </h2>
                <p className="text-base text-gray-700">
                  Explore menu & order online
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center aspect-square">
              <div className="mb-4">
                <Image src={Fast} alt="Fast" width={40} height={40} />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2 text-main-green">
                  FAST DELIVERY
                </h2>
                <p className="text-base text-gray-700">
                  Prompt delivery to you
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center aspect-square">
              <div className="mb-4">
                <Image src={Users} alt="Users" width={40} height={40} />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2 text-main-green">
                  REACH AUDIENCE
                </h2>
                <p className="text-base text-gray-700">
                  Expand online presence
                </p>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center justify-center aspect-square">
              <div className="mb-4">
                <Image src={Manage} alt="Manage" width={40} height={40} />
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold mb-2 text-main-green">
                  MANAGE ORDERS
                </h2>
                <p className="text-base text-gray-700">Track orders easily</p>
              </div>
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div className="flex flex-col justify-center items-center pt-36 pb-36">
          <div className="mb-8">
            <p className="text-2xl md:text-3xl font-bold">The Team</p>
          </div>
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-4">
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4">
                <Image src={Hala} alt="Hala" width={300} height={300} />
              </div>
              <div className="w-full border-b border-gray-300"></div>
              <div className="mt-4">
                <p className="text-lg font-semibold">Hala Qitouqa</p>
                <p className="text-gray-600">
                  Full-Stack web developer with
                  <br />
                  an engineering background,
                  <br />
                  committed to problem-solving and
                  <br />
                  delivering high-end UI designs.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4">
                <Image src={Gorgees} alt="Gorgees" width={300} height={300} />
              </div>
              <div className="w-full border-b border-gray-300"></div>
              <div className="mt-4">
                <p className="text-lg font-semibold">Gorgees Odisho</p>
                <p className="text-gray-600">
                  Full-stack web developer from
                  <br />
                  Iraq, crafting dynamic user
                  <br />
                  experiences with expert UI
                  <br />
                  design and database management.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4">
                <Image src={Aya} alt="Aya" width={300} height={300} />
              </div>
              <div className="w-full border-b border-gray-300"></div>
              <div className="mt-4">
                <p className="text-lg font-semibold">Aya Ahmad</p>
                <p className="text-gray-600">
                  Passionate UX\UI Designer
                  <br />
                  Visual communication graduate
                  <br />
                  Full-Stack Web developer.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center mb-8">
              <div className="mb-4">
                <Image src={Nour} alt="Nour" width={300} height={300} />
              </div>
              <div className="w-full border-b border-gray-300"></div>
              <div className="mt-4">
                <p className="text-lg font-semibold">Nour Kayyali</p>
                <p className="text-gray-600">
                  Passionate Full-Stack Developer
                  <br />
                  CIS Grad | 2 Yrs Exp
                  <br />
                  Recoded Bootcamp Grad
                  <br />
                  Continuous Learner.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
