import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

function Logo() {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Image
        src={"/e-logo.svg"}
        className="dark:hidden"
        height={40}
        width={40}
        alt="logo"
      />
      <Image
        src={"/dark-logo.svg"}
        className="hidden dark:block"
        height={40}
        width={40}
        alt="logo"
      />
      <p className={cn(font.className, "font-semibold")}>HS{"'"}s notion</p>
    </div>
  );
}

export default Logo;
