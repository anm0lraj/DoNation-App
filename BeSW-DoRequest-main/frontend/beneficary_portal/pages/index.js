import Head from 'next/head'
import Request from './components/Request'
import Admin from './components/Admin'
import Header from './components/Header'
import Status from './components/Status'
import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";

export default function Home() {
  const address = useAddress();

  const { contract, isLoading } = useContract(process.env.NEXT_PUBLIC_CONTRACT);
  const { data: admin } = useContractRead(contract, "admin");
  console.log(admin);
  return (
    <div className="" >
      <Head>
        <title>DoNation - Request Portal</title>
        <meta name="description" content="BeSW - DoNation Request App" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      {admin !== address && (
        <Request />
      )}
      <Status />
      {admin === address && (
        <Admin />
      )}
    </div>
  )
}
