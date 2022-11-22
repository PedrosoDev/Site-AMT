import { GetStaticPaths, GetStaticProps } from "next";
import { SwiperSlide } from "swiper/react";
import Carousel from "../../components/Carousel";
import {
  NewsDetailsDocument,
  useNewsDetailsQuery,
} from "../../graphql/generated/graphql";
import { client, ssrCache } from "../../lib/urql";

export default function NewsDetails({ slug }: { slug: string }) {
  const [{ data }] = useNewsDetailsQuery({
    variables: {
      slug,
    },
  });

  return (
    <main className="relative pb-16 bg-white overflow-hidden">
      <Carousel className="w-full h-96 ">
        {data?.aNews?.images.map((image) => (
          <SwiperSlide key={image.id}>
            <img src={image.url} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Carousel>

      <div className="relative px-4 pt-16 sm:px-6 lg:px-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1 className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {data?.aNews?.title}
          </h1>
          <h2 className="mt-2 block text-xl text-center font-extrabold text-orange-300 sm:text-2xl">
            {new Date(data?.aNews?.date).toLocaleDateString("pt-BR")}
          </h2>
        </div>

        <div
          className="mt-6 prose prose-lg mx-auto"
          dangerouslySetInnerHTML={{ __html: data?.aNews?.content.html || "" }}
        />
      </div>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await client.query(NewsDetailsDocument, { slug: params?.slug }).toPromise();

  return {
    props: {
      urql: ssrCache.extractData(),
      slug: params?.slug,
    },
    revalidate: false,
  };
};
