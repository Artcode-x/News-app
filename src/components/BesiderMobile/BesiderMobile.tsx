import "./BesiderMobile.css";
import Footer from "../Footer/Footer";
import Loader from "../Loader/Loader";
import Header from "../Header/Header";
import DateSection from "../News/DateSection";


const sampleData = [
  {
    date: "News for 16.06.2023",
    items: new Array(3).fill(0).map((_, i) => ({
      id: `n-16-${i}`,
      source: "CNN",
      title:
        "Why TikTok is taking months to delete personal US user data from servers outside its Project Texas firewalls, even as its political standing sours",
      date: "Feb 26, 2023, 16.32 PM",
      thumb: "https://Img",
    })),
  },
  {
    date: "News for 15.06.2023",
    items: new Array(2).fill(0).map((_, i) => ({
      id: `n-15-${i}`,
      source: "CNN",
      title:
        "Why TikTok is taking months to delete personal US user data from servers outside its Project Texas firewalls, even as its political standing sours",
      date: "Feb 26, 2023, 16.32 PM",
      thumb: "https://Img",
    })),
  },
];

function BesiderMobile() {


return (
<div className="page">
<Header/>

<main className="content" role="main">

   {sampleData.map((section) => (
          <DateSection key={section.date} section={section} />
        ))}
<Loader />
<Footer />
</main>
</div>
);
}

export default BesiderMobile