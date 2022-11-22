import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment } from "react";
import {
  DocumentListDocument,
  useDocumentListQuery,
} from "../graphql/generated/graphql";
import { GetStaticPaths, GetStaticProps } from "next";
import { client, ssrCache } from "../lib/urql";

const navigation = [
  { name: "Início", href: "/" },
  { name: "História", href: "/history" },
  { name: "Documentos", href: "/docs" },
  { name: "Sobre nós", href: "/about-us" },
  { name: "Contato", href: "/contact" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const router = useRouter();
  const [{ data }] = useDocumentListQuery();

  return (
    <Disclosure
      as="header"
      className=" bg-white mt-4 mb-8 mx-3 p-3 rounded-lg drop-shadow-md transition-transform"
    >
      {({ open, close }) => (
        <div className="flex flex-col md:flex-row items-center md:justify-between">
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
          <Disclosure.Panel
            as="nav"
            className="overflow-hidden md:hidden w-full mt-3 flex flex-col items-start"
          >
            {navigation.map((item) => {
              if (item.href == "/docs") {
                return (
                  <div key={item.name} className="flex flex-col">
                    <span
                      className={classNames(
                        item.href == `/${router.asPath.split("/")[1]}`
                          ? "text-orange-400 font-medium"
                          : "text-black",
                        "text-xl text-md hover:text-orange-600 my-1"
                      )}
                    >
                      {item.name}
                    </span>
                    {data?.documents.map((document) => (
                      <Link
                        key={document.id}
                        onClick={close}
                        href={`/docs/${document.slug}`}
                        className={classNames(
                          document.slug == router.asPath.split("/")[2]
                            ? "text-orange-400 font-medium"
                            : "text-black",
                          "ml-6 text-xl text-md hover:text-orange-600 py-1"
                        )}
                      >
                        {document.title}
                      </Link>
                    ))}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={close}
                  className={classNames(
                    item.href == `/${router.asPath.split("/")[1]}`
                      ? "text-orange-400 font-medium"
                      : "text-black",
                    "text-xl text-md hover:text-orange-600 my-1"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </Disclosure.Panel>

          <nav className="hidden md:flex ml-32 max-w-xl w-full lg: items-center justify-around ">
            {navigation.map((item) => {
              if (item.href == "/docs") {
                return (
                  <Menu
                    key={item.name}
                    as="div"
                    className="relative inline-block text-left"
                  >
                    <div>
                      <Menu.Button
                        className={classNames(
                          item.href == `/${router.asPath.split("/")[1]}`
                            ? "text-orange-400 font-medium"
                            : "text-black",
                          "text-xl text-md hover:text-orange-600"
                        )}
                      >
                        {item.name}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute bg-white border mt-2 rounded-tr-none rounded-md w-64 right-0">
                        <div className="px-3 py-2 flex flex-col">
                          {data?.documents.map((document) => (
                            <Link
                              key={document.id}
                              href={`/docs/${document.slug}`}
                              className={classNames(
                                document.slug == router.asPath.split("/")[2]
                                  ? "text-orange-400 font-medium"
                                  : "text-black",
                                "text-xl text-md hover:text-orange-600 py-1"
                              )}
                            >
                              {document.title}
                            </Link>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.href == `/${router.asPath.split("/")[1]}`
                      ? "text-orange-400 font-medium"
                      : "text-black",
                    "text-xl text-md hover:text-orange-600"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </Disclosure>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async () => {
  await client.query(DocumentListDocument, {}).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
