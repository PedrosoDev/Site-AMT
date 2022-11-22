import Link from "next/link";

const infos = [
  {
    title: "Mapa do Site",
    items: [
      { name: "Início", href: "/" },
      { name: "História", href: "/historia" },
    ],
  },
  {
    title: "Onde Estamos",
    items: [
      { name: "Rua São João, 4265, Quadra 6, São José", href: "" },
      { name: "Balneário Camboriú - SC", href: "" },
      { name: "CEP 88380-000", href: "" },
    ],
  },
  {
    title: "Conecte-se Conosco",
    items: [
      { name: "(48) 98594-9250", href: "" },
      { name: "thuhang.nute@gmail.com", href: "" },
      { name: "Rede Sociais", href: "" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-8 bottom-0 flex flex-col bg-[#2F312D] p-6">
      <div className="w-full flex flex-col md:flex-row justify-around">
        {infos.map((info) => (
          <section key={info.title} className="flex flex-col mt-6 md:mt-0">
            <h1 className="text-white text-xl font-semibold pb-1 border-b-2 border-white">
              {info.title}
            </h1>
            {info.items.map((item) =>
              item.href ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white mt-1 hover:text-green-200"
                >
                  {item.name}
                </Link>
              ) : (
                <span key={item.name} className="text-white mt-1">
                  {item.name}
                </span>
              )
            )}
          </section>
        ))}
      </div>
      <div className="mt-32 flex flex-col jus">
        <span className="text-white text-center ">
          Associação de Moradores do Taboleiro © {new Date().getFullYear()} -
          Todos os Direitos Reservados | Criado por LabMat(i)², Instituto
          Federal Catarinense - Campus Camboriú
        </span>
      </div>
    </footer>
  );
}
