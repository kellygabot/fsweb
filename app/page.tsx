import FacebookFeed from "@/components/feed/FacebookFeed";
import Header from "@/components/header/page"
import Footer from "@/components/footer/page"

export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="flex flex-row ">
        <FacebookFeed />

        {/* Right Panel */}
        <div className="w-100 h-100 ">
          <h1>hi</h1>

        </div>

      </div>
      <Footer />
    </main>
  );
}
