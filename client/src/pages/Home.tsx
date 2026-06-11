import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, AlertCircle, Zap, Target, FileText, GitBranch } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Central de Ajuda</h1>
              <p className="text-xs text-slate-500">Documentação & Roadmap</p>
            </div>
          </div>
          <a
            href="https://github.com/mayaraportovale/central-ajuda-portovale"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors"
          >
            <GitBranch className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="mb-20">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Análise & Roadmap
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
                Central de Ajuda Porto Vale
              </span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Documentação completa do projeto, análise do estado atual e plano de melhorias para a Central de Ajuda interativa da Porto Vale.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 border-blue-200 bg-blue-50/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Temas Implementados</p>
                  <p className="text-3xl font-bold text-blue-700 mt-2">8</p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-blue-600" />
              </div>
            </Card>
            <Card className="p-6 border-emerald-200 bg-emerald-50/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Perguntas & Respostas</p>
                  <p className="text-3xl font-bold text-emerald-700 mt-2">40</p>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
            </Card>
            <Card className="p-6 border-amber-200 bg-amber-50/50">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">Melhorias Planejadas</p>
                  <p className="text-3xl font-bold text-amber-700 mt-2">9</p>
                </div>
                <Zap className="w-6 h-6 text-amber-600" />
              </div>
            </Card>
          </div>
        </section>

        {/* Main Content Tabs */}
        <Tabs defaultValue="status" className="mb-20">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="status">Estado Atual</TabsTrigger>
            <TabsTrigger value="issues">Problemas</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>

          {/* Status Tab */}
          <TabsContent value="status" className="space-y-6">
            <Card className="p-8 border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Funcionalidades Implementadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: '✓', label: 'Botão flutuante arrastável' },
                  { icon: '✓', label: 'Navegação em cascata por temas' },
                  { icon: '✓', label: 'Perguntas e respostas pré-configuradas' },
                  { icon: '✓', label: 'Chat interativo' },
                  { icon: '✓', label: 'Busca por palavras-chave' },
                  { icon: '✓', label: 'Integração com WhatsApp (placeholder)' },
                  { icon: '✓', label: 'Abertura de tickets (placeholder)' },
                  { icon: '✓', label: '8 temas com 40 perguntas' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="text-lg font-bold text-emerald-600">{item.icon}</span>
                    <span className="text-slate-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Temas Disponíveis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  '🎫 Gestão de Tickets',
                  '👥 Gestão de Clientes',
                  '💰 Comissões e Pagamentos',
                  '📊 Relatórios e Análises',
                  '🔐 Configurações da Conta',
                  '🛠️ Problemas Técnicos',
                  '🔗 Integração e APIs',
                  '💳 Faturamento',
                ].map((theme, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-blue-50 border border-blue-200 font-medium text-slate-700">
                    {theme}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-6">
            <Card className="p-8 border-red-200 bg-red-50/50">
              <div className="flex items-start gap-4 mb-6">
                <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-red-900 mb-2">Problemas Críticos</h3>
                  <p className="text-red-800">Estes problemas devem ser resolvidos imediatamente para melhorar a qualidade do projeto.</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: 'Falta de Integração com APIs Reais',
                    desc: 'WhatsApp está hardcoded com número placeholder. Abertura de tickets redireciona para /tickets/new (não existe).',
                  },
                  {
                    title: 'Falta de Persistência de Dados',
                    desc: 'Mensagens do chat não são salvas. Histórico é perdido ao recarregar a página.',
                  },
                  {
                    title: 'Falta de Busca/Filtro Avançada',
                    desc: 'Usuário não pode buscar por palavra-chave de forma eficiente. Deve navegar manualmente pelos temas.',
                  },
                  {
                    title: 'Problemas de Integração Sonner',
                    desc: 'Sonner está usando next-themes mas o app usa ThemeContext customizado. Pode causar problemas de renderização.',
                  },
                ].map((issue, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-white border border-red-200">
                    <h4 className="font-bold text-slate-900 mb-2">{issue.title}</h4>
                    <p className="text-slate-600">{issue.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            {/* Critical */}
            <Card className="p-8 border-red-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-600"></div>
                <h3 className="text-2xl font-bold text-slate-900">Melhorias Críticas (P0)</h3>
              </div>
              <div className="space-y-3">
                {[
                  'Completar a base de conhecimento - Adicionar todas as 40 perguntas e respostas',
                  'Adicionar tema "Integração e APIs" - Implementar o 8º tema faltante',
                  'Corrigir integração do Sonner - Usar o ThemeContext correto',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                    <span className="text-red-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* High Priority */}
            <Card className="p-8 border-amber-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                <h3 className="text-2xl font-bold text-slate-900">Melhorias Altas (P1)</h3>
              </div>
              <div className="space-y-3">
                {[
                  'Adicionar busca por palavras-chave - Permitir busca rápida entre todas as perguntas',
                  'Implementar persistência - Salvar histórico no localStorage',
                  'Melhorar feedback visual - Adicionar animações e estados de carregamento',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 border border-amber-200">
                    <span className="text-amber-600 font-bold mt-1">→</span>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Medium Priority */}
            <Card className="p-8 border-emerald-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                <h3 className="text-2xl font-bold text-slate-900">Melhorias Médias (P2)</h3>
              </div>
              <div className="space-y-3">
                {[
                  'Integração com backend - Conectar com API real para tickets e WhatsApp',
                  'Suporte a múltiplos idiomas - Implementar i18n',
                  'Analytics - Rastrear uso do chatbot e perguntas mais frequentes',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="text-emerald-600 font-bold mt-1">◆</span>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Technical Details */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Detalhes Técnicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Stack Tecnológico</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• React 19 + TypeScript</li>
                <li>• Tailwind CSS 4</li>
                <li>• Shadcn/UI Components</li>
                <li>• Wouter (Client-side routing)</li>
                <li>• Framer Motion (Animações)</li>
                <li>• Lucide Icons</li>
              </ul>
            </Card>

            <Card className="p-6 border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Arquivos Principais</h3>
              <ul className="space-y-2 text-slate-600 font-mono text-sm">
                <li>• HelpCenter.tsx (Widget principal)</li>
                <li>• Home.tsx (Landing page)</li>
                <li>• ThemeContext.tsx (Tema)</li>
                <li>• CHATBOT_KNOWLEDGE_BASE.md</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-20">
          <Card className="p-12 bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
              <p className="text-blue-100 mb-8 text-lg">
                Acesse o repositório no GitHub para contribuir com as melhorias planejadas ou implemente novas funcionalidades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://github.com/mayaraportovale/central-ajuda-portovale"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Ver no GitHub
                </a>
                <a
                  href="https://3000-irg6oqrle62vv0f4pzzkb-6501b7ca.us1.manus.computer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors"
                >
                  Visualizar Demo
                </a>
              </div>
            </div>
          </Card>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-12 text-center text-slate-600">
          <p>
            Documentação da Central de Ajuda Porto Vale • Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </footer>
      </main>
    </div>
  );
}
