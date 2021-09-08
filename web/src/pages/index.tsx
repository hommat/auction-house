import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <Link href="/account/create">account</Link>
    </div>
  );
};

export default Home;
