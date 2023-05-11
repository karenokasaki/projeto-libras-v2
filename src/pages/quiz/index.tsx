import Link from "next/link";

export default function Questions() {
  const content = (
    <section className="bg-[#E4CFB4] pt-36 flex flex-col items-center h-auto pb-8 lg:h-[100vh] ">
      <div className="">
        <h1 className="text-5xl font-semibold text-gray-800 lg:text-6xl mb-16">
          categorias
        </h1>
      </div>
      <div className="flex flex-row gap-20 flex-wrap h-auto justify-center sm:gap-42">
        <div className="rounded-full">
          <Link
            className="text-3xl font-semibold text-gray-800 hover:text-gray-500 transition-all duration-200 flex flex-col items-center justify-center text-center"
            href={`/quiz/terrestre`}
          >
            <div className="bg-[#81B2D9] rounded-2xl h-60 mb-10 pr-3 w-60 flex items-center justify-center">
              <img
                className="h-48 "
                src="/assets/images/bicicleta.png"
                alt="transporte"
              />
            </div>
            <p> transportes terrestres </p>
          </Link>
        </div>

        <div className="">
          <div className="flex">
            <Link
              href={`/quiz/aereo-e-maritimo`}
              className="text-3xl font-semibold text-gray-800 hover:text-gray-500 transition-all duration-200 flex flex-col items-center text-center"
            >
              <div className="bg-[#81B2D9] rounded-2xl mb-10 w-60 h-60 flex items-center justify-center ">
                <img
                  className="h-40  "
                  src="/assets/images/barco-aviao.png"
                  alt="transporte"
                />
              </div>
              <p>transportes marítimos e aéreos </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );

  return content;
}
