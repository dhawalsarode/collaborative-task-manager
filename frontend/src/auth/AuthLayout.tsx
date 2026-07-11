import { ReactNode } from "react";
import authBackground from "../assets/authBackground.png";
import logo from "../assets/logo.png";


interface Props {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center px-6 py-10"
      style={{
        backgroundImage: `url(${authBackground})`,
      }}
    >
      <div className="absolute inset-0 bg-white/15 backdrop-blur-[1px]" />

      <div
        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/40
          bg-white/65
          backdrop-blur-xl
          shadow-[0_25px_80px_rgba(91,78,245,0.18)]
          p-8
        "
      >
        <div className="mb-10 flex flex-col items-center">
          <img
              src={logo}
              alt="Syncora"
              className="
                mx-auto
                mb-6
                w-44
                sm:w-48
                lg:w-52
                object-contain
                select-none
              "
            />

          <div className="mt-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">
              {title}
            </h2>

            <p className="mt-3 text-base text-slate-500">
              {subtitle}
            </p>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}