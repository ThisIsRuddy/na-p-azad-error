import type {NextPage} from 'next';
import {useSession, signIn, signOut} from "next-auth/react";

const Home: NextPage = () => {
  const session = useSession();

  return (
    <main className="p-5">
      <section className="">
        <h1 className="text-2xl font-bold">Welcome home {session?.data?.user?.name}!</h1>
      </section>

      {session?.data && <section>
        Signed in as {session?.data?.user?.email} <br/>
        <button onClick={() => signOut()}>Sign out</button>
      </section>}

      {!session?.data && <section>
        Not signed in <br/>
        <button onClick={() => signIn()}>Sign in</button>
      </section>}

      <pre>
        {JSON.stringify(session ? session : {}, null, 2)}
      </pre>
    </main>
  );
}

export default Home;
