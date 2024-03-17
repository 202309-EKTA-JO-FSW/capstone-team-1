import Image from "next/image";
import placeholderImage from "../../../../public/Avatar-Profile-Image.png";
import Btn from "./Btn";
import Link from "next/link";

const User = ({ user }) => {
  return (
    <div>
      {user && (
        <Link href={"/profile"}>
          <div className="flex flex-wrap items-center justify-between ">
            {/* conditional rendering of avatar */}
            <Image
              src={user.avatar || placeholderImage}
              alt="User Avatar"
              width={35}
              height={35}
              className="rounded-full object-cover w-[35px] h-[35px]"
              priority="true"
            />
            <p className="hover:text-main-green pr-2 pl-2">
              Hello, {user.firstName}
            </p>
          </div>
        </Link>
      )}
      {!user && (
        <Link href="/login">
          <Btn text={"LOGIN"} />
        </Link>
      )}
    </div>
  );
};

export default User;
