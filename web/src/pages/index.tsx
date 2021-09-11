import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/account/create">register</Link>
      <Link href="/security/login">login</Link>
    </div>
  );
};

export default Home;
