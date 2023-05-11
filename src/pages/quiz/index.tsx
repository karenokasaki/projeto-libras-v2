import Link from "next/link";

export default function Questions() {
  const content = (
    <section className="bg-[#E4CFB4] pt-24 flex flex-col items-center h-auto pb-8 lg:h-[100vh] ">
      <div className="">
        <h1 className="text-7xl font-semibold text-gray-800 lg:text-6xl mb-16">
          categorias
        </h1>
      </div>
      <div className="flex flex-row gap-20 flex-wrap h-auto justify-center sm:gap-60">
        <div className="rounded-full">
          <Link
            className="text-3xl font-semibold text-gray-800 hover:text-gray-500 transition-all duration-200 flex flex-col items-center justify-center"
            href={`/quiz/terrestre`}
          >
            <div className="bg-[#81B2D9] rounded-2xl h-80 mb-10 pr-3 w-80 flex items-center justify-center">
              <img
                className="h-48 "
                src="/assets/images/bicicleta.png"
                alt="transporte"
              />
            </div>
            transportes terrestres
          </Link>
        </div>

        <div className="">
          <div className="flex">
            <Link
              href={`/quiz/aereo-e-maritimo`}
              className="text-3xl font-semibold text-gray-800 hover:text-gray-500 transition-all duration-200 flex flex-col items-center"
            >
              <div className="bg-[#81B2D9] rounded-2xl mb-10 w-80 h-80 flex items-center justify-center">
                <img
                  className="h-40  "
                  src="/assets/images/barco-aviao.png"
                  alt="transporte"
                />
              </div>
              transportes marítimos e aéreos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );

  return content;
}
