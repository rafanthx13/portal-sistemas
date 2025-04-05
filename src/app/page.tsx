import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Portal de Sistemas
          </h1>

          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 mb-4">
              Bem-vindo ao Portal de Sistemas, seu hub central para gerenciamento de acessos e sistemas.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h2 className="text-2xl font-semibold text-blue-800 mb-4">
                Objetivo do Projeto
              </h2>
              <p className="text-gray-700">
                O Portal de Sistemas foi desenvolvido para centralizar e simplificar o gerenciamento de acessos e sistemas em sua organização.
                Através desta plataforma, você poderá:
              </p>
              <ul className="list-disc pl-6 mt-4 text-gray-700">
                <li>Gerenciar permissões de usuários de forma centralizada</li>
                <li>Acessar diferentes sistemas através de um único ponto de entrada</li>
                <li>Monitorar e controlar acessos em tempo real</li>
                <li>Simplificar a administração de múltiplos sistemas</li>
              </ul>
            </div>

            <div className="text-center mt-8 space-y-4">
              <a
                href="/login"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Acessar o Portal
              </a>
              <div>
                <a
                  href="/register"
                  className="text-primary-600 hover:text-primary-500"
                >
                  Criar uma nova conta
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
