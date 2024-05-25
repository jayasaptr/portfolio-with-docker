import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="shadow-md shadow-t border-t border-gray-300 flex flex-col md:flex-row justify-between px-10 py-5">
      <div className="gap-4 flex flex-col">
        <h1 className="text-2xl font-bold font-sans">Itechdev</h1>
        <div className="font-sans text-sm">
          <p>Profesionalisme Tanpa Batas, Kualitas Tanpa Kompromi.</p>
          <p>Saya siap membantu mewujudkan ide-ide Anda menjadi kenyataan</p>
        </div>
        <p className="text-xs">Copyright © 2024 Itechdev. made with love ❤</p>
      </div>
      <Button className="mt-4 self-end md:self-auto">
        <Link to="https://wa.me/6285651923925">Contact Me</Link>
      </Button>
    </footer>
  );
};
