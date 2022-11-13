import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Disclosure, Transition } from "@headlessui/react";

const navigation = [
  { name: "Início", href: "/", current: true },
  { name: "História", href: "/historia", current: false },
  { name: "Associação", href: "/associacao", current: false },
  { name: "Documentos", href: "/documentos", current: false },
  { name: "Contato", href: "/contato", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  return (
    <Disclosure
      as="header"
      className=" bg-white my-4 mx-3 p-3 rounded-lg drop-shadow-md transition-transform"
    >
      {({ open }) => (
        <div
          className={classNames(
            open ? "flex-col md:flex-row" : "flex-row",
            "flex items-center md:justify-between"
          )}
        >
          <div className="flex w-full md:w-fit items-center justify-between">
            <Link href="/" className="flex items-center">
              <img src="./Logo.png" alt="Logo" className="h-16" />
              <h1 className="lg:hidden font-medium text-black text-xl px-2">
                AMT
              </h1>
              <h1 className="hidden lg:inline font-medium text-black text-xl px-2">
                Associação de Moradores <br /> do Taboleiro
              </h1>
            </Link>

            <Disclosure.Button className="md:hidden w-fit h-fit">
              {open ? (
                <XMarkIcon className="text-black h-12" />
              ) : (
                <Bars3Icon className="text-black  h-12" />
              )}
            </Disclosure.Button>
          </div>

          <Disclosure.Panel className="md:hidden w-full mt-3">
            <nav className=" flex flex-col items-start">
              {navigation.map((item) => (
                <Disclosure.Button key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "text-orange-400 font-medium"
                        : "text-black",
                      "text-xl text-md hover:text-orange-600 my-1"
                    )}
                  >
                    {item.name}
                  </Link>
                </Disclosure.Button>
              ))}
            </nav>
          </Disclosure.Panel>

          <nav className="hidden md:flex ml-32 max-w-xl w-full lg: items-center justify-around ">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current ? "text-orange-400 font-medium" : "text-black",
                  "text-xl text-md hover:text-orange-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </Disclosure>
  );
}
