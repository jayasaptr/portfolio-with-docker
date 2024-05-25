import { useParams } from "react-router-dom";
import SharpImage from "../assets/images/sharp.png";
import { FiClock } from "react-icons/fi";
import { ScrollToTop } from "@/components/ScropToTop";

const DetailPortfolio = () => {
  const { id } = useParams();
  return (
    <>
      <div className="py-10 mx-8">
        <div className="flex items-center gap-4">
          <h1 className="text-base font-serif uppercase">
            PT. Tekonologi Kawasan Bahagia
          </h1>
          <hr className="w-10 bg-black border-0 h-px" />
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-0">
          <h2 className="font-mono font-bold text-4xl">Sharp Diamond</h2>
          <p className="font-serif">
            Sharp Diamond adalah aplikasi perusahaan sharp indonesia untuk para
            promotor melakukan input data penjualan product sharp.
          </p>
        </div>
        <div className="flex gap-2 items-center mt-6">
          <FiClock />
          <p>April 2022</p>
        </div>
        <div className="shadow-lg rounded-lg overflow-hidden mt-10">
          <img src={SharpImage} alt="sharp" className="w-full scale-105" />
        </div>
        {/* Content */}

        <div className="font-serif mt-10 mx-auto lg:w-2/3 md:w-3/4 sm:w-full">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl">
            Hai, Sharp Diamond adalah sebuah aplikasi mobile yang digunakan oleh
            para promotor Sharp untuk menginputkan data penjualan dan mencatat
            absensi karyawan.
            <br />
            <br />
            Dalam tim pengembang, saya bertugas sebagai Frontend Mobile App
            Developer. Peran dan tanggung jawab saya pada project kali ini
            adalah memastikan aplikasi cepat dan responsif dengan mengoptimalkan
            kode dan menggunakan praktik terbaik dalam pengembangan mobile,
            serta melakukan pengujian secara berkala untuk mendeteksi dan
            memperbaiki bug atau masalah performa.
            <br />
            <br />
            Selain itu saya juga berkoordinasi dengan tim backend untuk
            memastikan data yang diinputkan oleh promotor disimpan dengan aman
            dan dapat diakses dengan cepat dan mengimplementasikan API yang
            dibutuhkan untuk fitur fitur yang tersedia.
            <br />
            <br />
            Sebagai Frontend Mobile App Developer, saya bangga bisa menjadi
            bagian dari tim yang membantu menciptakan alat yang berguna dan
            berdampak positif bagi para promotor Sharp. Aplikasi Sharp Diamond
            adalah contoh bagaimana teknologi dapat digunakan untuk meningkatkan
            efisiensi dan produktivitas dalam dunia bisnis.
          </p>
        </div>
      </div>
      <ScrollToTop />
    </>
  );
};

export default DetailPortfolio;
