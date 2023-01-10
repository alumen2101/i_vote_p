import React from "react";
import { prisma } from "@/server/db/client";
import Image from "next/image";
import Head from "next/head";
import type { AsyncReturnType } from "@/utils/result";
import type { GetServerSideProps } from "next";

const getProfInOrder = async () => {
  return await prisma.professor.findMany({
    orderBy: {
      VoteFor: { _count: "desc" },
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      _count: {
        select: {
          VoteFor: true,
          VoteAgainst: true,
        },
      },
    },
  });
};

type profQueryResult = AsyncReturnType<typeof getProfInOrder>;

const generateCountPercent = (prof: profQueryResult[number]) => {
  const { VoteFor, VoteAgainst } = prof._count;

  if (VoteAgainst + VoteFor === 0) return 0;

  return (VoteFor / (VoteFor + VoteAgainst)) * 100;
}

const ProfListing: React.FC<{ professor: profQueryResult[number], rank: number}> = ({
  professor,
  rank
}) => {
  return (
    <div className="relative flex border-b p-2 items-center justify-between">
      <div className="flex items-center">
        <div className="flex items-center pl-4">
          <Image
            className="w-16 h-16"
            src={professor.imageUrl}
            width={64}
            height={64}
            alt="image"
          />
          <div className="pl-2 capitalize">{professor.name}</div>
        </div>
      </div>
      <div className="pr-4">
        {generateCountPercent(professor).toFixed(2) + "%"}
      </div>
      <div className="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-br-md">
        {rank}
      </div>
    </div>
  )
}

const ResultsPage: React.FC<{
  professor: profQueryResult;
}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Results</title>
      </Head>
      <h2 className="text-2xl p-4">Results</h2>
      <div className="flex flex-col w-full max-w-2xl border">
        {props.professor
          .sort((a, b) => {
            const difference =
              generateCountPercent(b) - generateCountPercent(a);

            if (difference === 0) {
              return b._count.VoteFor - a._count.VoteFor;
            }

            return difference;
          })
          .map((currentProf, index: number) => {
            return <ProfListing professor={currentProf} key={index} rank={index + 1} />;
          })}
      </div>
    </div>
  );
};

export default ResultsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const profOrdered = await getProfInOrder();
  return { props: { professor: profOrdered } };
};