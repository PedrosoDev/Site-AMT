import { GetServerSideProps } from "next";
import {
  HomePageDocument,
  useHomePageQuery,
} from "../graphql/generated/graphql";
import { client, ssrCache } from "../lib/urql";

export default function Home() {
  // const [{ data }] = useHomePageQuery();
  return <h1>Home</h1>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  await client.query(HomePageDocument, {}).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};
