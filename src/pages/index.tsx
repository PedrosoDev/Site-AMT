import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SwiperSlide } from "swiper/react";
import Carousel from "../components/Carousel";
import Input from "../components/Input";
import {
  CreateNewsLetterSubscriberDocument,
  HomePageDocument,
  PublishNewsLetterSubscriberDocument,
  useHomePageQuery,
} from "../graphql/generated/graphql";
import { client, ssrCache } from "../lib/urql";

type Inputs = {
  email: string;
};

export default function Home() {
  const [{ data }] = useHomePageQuery();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  async function onSubmit({ email }: Inputs) {
    const {
      data: { createSubscriber: createSubscriber },
    } = await client
      .mutation(CreateNewsLetterSubscriberDocument, { email })
      .toPromise();

    const {
      data: { publishSubscriber },
    } = await client
      .mutation(PublishNewsLetterSubscriberDocument, {
        id: createSubscriber.id,
      })
      .toPromise();

    localStorage.setItem("news-letter", publishSubscriber.id);
  }

  return (
    <main className="flex flex-col items-center">
      <div className="w-full md:px-6 lg:px-8">
        <Carousel className="w-full h-full object-contain">
          {data?.ads.map((ad) => (
            <SwiperSlide key={ad.id} className="">
              <img src={ad.image?.url} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Carousel>
      </div>

      <section className="md:px-36 flex flex-col">
        <h1 className="mt-8 text-4xl font-medium text-center">
          Últimas Notícias
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {data?.news.map((aNews) => (
            <a
              key={aNews.id}
              href={`/news/${aNews.slug}`}
              className="flex flex-col items-center justify-start bg-white border drop-shadow-md rounded-lg p-4 m-3"
            >
              <img
                src={aNews.images[0].url}
                className=" object-contain rounded-md"
              />
              <span className="text-md text-center text-orange-400">
                {new Date(aNews.date).toLocaleDateString("pt-BR")}
              </span>
              <h1 className="text-3xl text-center overflow-hidden max-h-[calc(2*2.30rem)] text-ellipsis w-10/12 h-20">
                {aNews.title}
              </h1>
            </a>
          ))}
        </div>
        <a
          href="/news"
          className="mx-auto border border-green-800 text-green-500 hover:border-green-300 hover:bg-green-600 hover:text-white transition-all rounded-md py-2 px-4"
        >
          Ver mais
        </a>
      </section>
      <section className="md:px-36 flex flex-col">
        <h1 className="mt-8 text-4xl font-medium text-center">Associados</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data?.associates.map((associate) => (
            <div
              key={associate.id}
              className="flex flex-col items-center justify-start m-3"
            >
              <img src={associate.image.url} className="h-32 rounded-full" />
              <h1 className="text-3xl text-center text-ellipsis w-10/12">
                {associate.name}
              </h1>
            </div>
          ))}
        </div>
      </section>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="-mb-8 mt-24 py-24 w-full flex flex-col items-center justify-center shadow-inner bg-[#C8FFBF]"
      >
        <h1 className="text-4xl text-center mx-3">
          Receba nossas notícias no seu email!
        </h1>

        <Input
          {...register("email", { required: true })}
          rightIcon={<EnvelopeIcon className="h-5 text-[#72796F]" />}
          placeholder="Seu email"
          className="my-8 bg-white rounded-md border-2 border-[#72796F] text-[#72796F] "
        />

        <button
          type="submit"
          className="bg-white shadow-md rounded-md font-semibold text-green-600 py-3 px-4  hover:bg-slate-50"
        >
          Cadastrar
        </button>
      </form>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await client.query(HomePageDocument, {}).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
