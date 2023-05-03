import Link from "next/link";

export default function Questions() {
  const content = (
    <section className="bg-white flex flex-col justify-center items-center">
      <div className="container px-6 py-10 mx-auto flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold text-gray-800 lg:text-7xl ">
          Categorias
        </h1>

        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 items-center">
          <div className="lg:flex">
            <div className="flex flex-col py-6 lg:mx-6 items-center text-center">
              <Link
                className="text-xl font-semibold text-gray-800 hover:text-gray-500 transition-all "
                href={`/quiz/terrestre`}
              >
                Transportes terrestres
                <img
                  className="object-contain w-full h-56 rounded-lg lg:w-64"
                  src="/assets/images/meios-de-transporte.png"
                  alt="transporte"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 ">
          <div className="lg:flex">
            <div className="flex flex-col py-6 lg:mx-6 items-center text-center">
              <Link
                href={`/quiz/aereo-e-maritimo`}
                className="text-xl font-semibold text-gray-800 hover:text-gray-500 transition-all "
              >
                Transportes marítimos e aéreos
                <img
                  className="object-contain w-full h-56 rounded-lg lg:w-64"
                  src="/assets/images/barco-aviao.png"
                  alt="transporte"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return content;
}
