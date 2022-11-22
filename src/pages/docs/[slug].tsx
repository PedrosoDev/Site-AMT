import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import {
  DocumentDetailsDocument,
  useDocumentDetailsQuery,
} from "../../graphql/generated/graphql";
import { client, ssrCache } from "../../lib/urql";

export default function DocumentDetails({ slug }: { slug: string }) {
  const [{ data }] = useDocumentDetailsQuery({ variables: { slug } });

  return (
    <main className="md:px-6 lg:px-8">
      <h1 className="text-black text-3xl font-semibold">
        {data?.document?.title}
      </h1>
      <dl className="w-fit">
        {data?.document?.categories.map((category) => (
          <>
            <dt
              key={category.id}
              className=" text-orange-400 text-2xl my-2 ml-6 font-medium"
            >
              ● {category.name}
            </dt>
            {category.files.map((file) => (
              <dd
                key={file.id}
                className="flex flex-row items-center justify-between w-full mb-3"
              >
                <span className="text-black font- ml-12 text-xl">
                  {file.name}
                </span>

                <Link
                  href={file.file.url}
                  target="_blank"
                  className="ml-6 flex flex-row items-start py-1 px-3 rounded-md text-black hover:shadow-md hover:text-white hover:bg-green-400"
                >
                  <ArrowDownTrayIcon className="h-6" />
                  <span className="hidden sm:block text-lg font-medium ml-3">
                    Downlobad
                  </span>
                </Link>
              </dd>
            ))}
          </>
        ))}
      </dl>
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
  await client
    .query(DocumentDetailsDocument, { slug: params?.slug })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      slug: params?.slug,
    },
  };
};
