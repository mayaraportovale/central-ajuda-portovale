import HelpCenter from '@/components/HelpCenter';

/**
 * Central de Ajuda Porto Vale - Demo Page
 * Exibe um exemplo de como o botão flutuante de ajuda funciona
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <HelpCenter />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 text-center">
            Central de Ajuda Porto Vale
          </h1>
          
          <p className="text-xl text-gray-600 text-center mb-12">
            Clique no botão azul no canto inferior direito para acessar a Central de Ajuda com temas em cascata e suporte via chatbot.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">🎯 Funcionalidades</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Botão flutuante arrastável</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Temas em cascata (8 categorias)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>40 perguntas e respostas pré-configuradas</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Busca por palavras-chave</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Chat interativo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Integração com WhatsApp</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span>Abertura de tickets</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border border-blue-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 Temas Disponíveis</h2>
              <ul className="space-y-2 text-gray-700">
                <li>🎫 Gestão de Tickets</li>
                <li>👥 Gestão de Clientes</li>
                <li>💰 Comissões e Pagamentos</li>
                <li>📊 Relatórios e Análises</li>
                <li>🔐 Configurações da Conta</li>
                <li>🛠️ Problemas Técnicos</li>
                <li>🔗 Integração e APIs</li>
                <li>💳 Faturamento</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">💡 Como Usar</h2>
            <ol className="space-y-4 text-gray-700">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <span>Clique no botão azul no canto da tela</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <span>Selecione um tema ou use a busca para encontrar respostas rápidas</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <span>Escolha uma pergunta ou digite a sua</span>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                <span>Se precisar, abra um ticket ou fale via WhatsApp</span>
              </li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
