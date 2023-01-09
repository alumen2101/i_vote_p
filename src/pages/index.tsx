import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "@/utils/trpc";
import Image from "next/image";

const Home: NextPage = () => {
  const {
    data: profPair,
    refetch,
    isLoading,
  } = trpc.professor.getProfPair.useQuery(undefined, {
    refetchInterval: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const voteMutation = trpc.vote.castVote.useMutation();

  const voteForBetter = (selected: number) => {
    //if (!profPair) return;  // this alone doesnt cut it
    if (!profPair?.firstProf?.id) return; // early esacope just to make TS happy!
    if (!profPair?.secondProf?.id) return; // early esacope just to make TS happy!

    if (selected === profPair.firstProf.id) {
      voteMutation.mutate({
        votedFor: profPair.firstProf.id,
        votedAgainst: profPair.secondProf.id,
      });
    } else {
      voteMutation.mutate({
        votedFor: profPair.secondProf.id,
        votedAgainst: profPair.firstProf.id,
      });
    }

    refetch();
  };

  const fetchingNext = voteMutation.isLoading || isLoading;

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-between overflow-hidden bg-gray-900 text-white">
      <Head>
        <title>Most Hated Professor</title>
      </Head>
      <div className="pt-8 text-center text-2xl">
        Who is <span className="underline">Better</span>?
      </div>
      <div className="animate-fade-in flex max-w-2xl flex-col items-center justify-between p-8 md:flex-row">
        <div className="p-2">
          <div className="h-60 w-60 overflow-hidden">
            {profPair?.firstProf?.name}
            {profPair?.firstProf?.imageUrl ? (
              <Image
                src={profPair?.firstProf?.imageUrl}
                width={300}
                height={300}
                alt="image"
              />
            ) : (
              <div>LOADING</div>
            )}
          </div>
          <button onClick={() => {voteForBetter(profPair!.firstProf!.id)}} className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Better</button>
        </div>
        <div className="p-8 text-xl italic">{"or"}</div>
        <div className="p-2">
          <div className="h-60 w-60 overflow-hidden">
            {profPair?.secondProf?.name}
            {profPair?.secondProf?.imageUrl ? (
              <Image
                src={profPair?.secondProf?.imageUrl}
                width={300}
                height={300}
                alt="image"
              />
            ) : (
              <div>LOADING</div>
            )}
          </div>
          <button onClick={() => {voteForBetter(profPair!.secondProf!.id)}} className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Better</button>
        </div>
        <button onClick={() => refetch()} className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">IDK</button>
      </div>
      <div className="w-full pb-2 text-center text-xl">
        {/* <a href="alireza.keshavarz.d@gmail.com">Email</a> */}
        <span className="p-4">{"-"}</span>
        <Link href="/result">Results</Link>
        <span className="p-4">{"-"}</span>
      </div>
    </div>
  );
};

export default Home;
