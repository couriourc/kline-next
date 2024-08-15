import Link from "next/link";
import Loading from "@components/base/loading";
import { NEXT_PUBLIC_CHART_WEBSITE_NAME } from "@/config";
export const metadata = {
  title: NEXT_PUBLIC_CHART_WEBSITE_NAME
};

const Home = async () => {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Loading type="area" />
        <div className="mt-10 text-center">
          <Link href="/home">🚀</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
