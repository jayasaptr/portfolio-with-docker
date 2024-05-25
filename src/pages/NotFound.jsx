import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-screen h-screen">
      <h3>Opps...</h3>
      <p>Halaman yang anda tuju, tidak ditemukan</p>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default NotFound;
