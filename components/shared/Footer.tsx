import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
        <Link href='/'>
          <Image 
            src="/assets/images/logo-3.png"
            alt="logo"
            width={460}
            height={60}
          />
        </Link>

        <p>2024 Posh IT. All Rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer