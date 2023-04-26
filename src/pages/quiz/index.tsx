import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Questions() {
  const content = (
    <div className="flex items-center flex-col justify-center">
      <div>
        <Link href={`/quiz/terrestre`}>
          <h2>Transportes terrestres</h2>
        </Link>
      </div>
      <div>
        <Link href={`/quiz/aereo-e-maritimo`}>
          <h2>Transportes marítimos e aéreos</h2>
        </Link>
      </div>
    </div>
  );

  return content;
}
