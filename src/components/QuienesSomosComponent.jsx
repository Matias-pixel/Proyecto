

export const QuienesSomosComponent = () => {
    return (
        <div className="p-8 flex flex-col gap-8 bg-gray-100">
            <h1 className="text-3xl text-center font-extrabold text-gray-900">
                ¿Quiénes Somos?
            </h1>
            <div className="flex justify-center gap-4 items-center">

                <p className="max-w-2xl text-center text-2xl text-gray-700 font-semibold leading-relaxed">
                    Somos una plataforma innovadora dedicada a la compra y venta de artículos excedentes, facilitando a las empresas la gestión eficiente de sus recursos y promoviendo un modelo sostenible.
                </p>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="flex flex-col items-center text-center p-4 bg-white shadow-lg rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>


                    <h2 className="text-2xl font-bold text-cyan-900 mb-4">Misión</h2>
                    <p className="text-gray-600 leading-relaxed text-3xl">
                        Nuestra misión es ayudar a las empresas a optimizar sus procesos productivos, ofreciéndoles una solución confiable para gestionar sus excedentes, promoviendo la eficiencia y sostenibilidad en sus operaciones.
                    </p>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-white shadow-lg rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>

                    <h2 className="text-2xl font-bold text-cyan-900 mb-4">Visión</h2>
                    <p className="text-gray-600 leading-relaxed text-3xl">
                        Aspiramos a ser la plataforma líder en la gestión de artículos excedentes, reconocida por nuestra calidad, compromiso y excelencia, consolidándonos como el aliado estratégico de las empresas en su camino hacia la sostenibilidad y eficiencia.
                    </p>
                </div>
            </div>
        </div>
    );
};
