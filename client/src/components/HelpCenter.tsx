import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, ChevronLeft, Send, Phone, Mail, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string;
  timestamp: Date;
}

interface Theme {
  id: string;
  name: string;
  icon?: string;
  questions?: Question[];
}

interface Question {
  id: string;
  text: string;
  answer: string;
}

// Configurações de contato
const CONTACT_CONFIG = {
  whatsapp: '+5511999999999', // Substituir com número real
  email: 'suporte@portovale.com.br',
  phone: '+55 (XX) XXXX-XXXX',
};

const THEMES: Theme[] = [
  {
    id: 'tickets',
    name: '🎫 Gestão de Tickets',
    questions: [
      { id: 't1', text: 'Como abrir um novo ticket?', answer: 'Para abrir um novo ticket, clique no botão "Abrir Novo Ticket" no menu principal. Preencha o formulário com:\n- Assunto do ticket\n- Categoria (Suporte Técnico, Faturamento, Comercial, etc.)\n- Descrição detalhada do problema\n- Anexos (se necessário)\n\nApós enviar, você receberá um número de protocolo para acompanhamento.' },
      { id: 't2', text: 'Como acompanhar meu ticket?', answer: 'Você pode acompanhar seu ticket de duas formas:\n1. Acesse a seção "Meus Tickets" no painel\n2. Use o número de protocolo para buscar o status em tempo real\n\nVocê também receberá notificações por email a cada atualização.' },
      { id: 't3', text: 'Qual é o tempo de resposta?', answer: 'Nossos tempos de resposta são:\n- Suporte Técnico: até 2 horas\n- Faturamento: até 4 horas\n- Comercial: até 24 horas\n- Geral: até 48 horas' },
      { id: 't4', text: 'Como adicionar anexos ao ticket?', answer: 'Você pode adicionar anexos durante a criação do ticket ou após abri-lo. Clique em "Adicionar Arquivo" e selecione arquivos de até 10MB. Formatos aceitos: PDF, DOC, XLS, JPG, PNG.' },
      { id: 't5', text: 'Como reabrir um ticket fechado?', answer: 'Acesse o ticket fechado e clique em "Reabrir Ticket". Adicione um comentário explicando por que está reabrindo. O ticket retornará à fila de atendimento.' },
    ]
  },
  {
    id: 'clientes',
    name: '👥 Gestão de Clientes',
    questions: [
      { id: 'c1', text: 'Como adicionar um novo cliente?', answer: 'Para adicionar um novo cliente:\n1. Acesse "Clientes" no menu\n2. Clique em "Novo Cliente"\n3. Preencha os dados obrigatórios (Nome, CPF/CNPJ, Email, Telefone)\n4. Configure as preferências de contato\n5. Clique em "Salvar"\n\nO cliente receberá um email de confirmação.' },
      { id: 'c2', text: 'Como editar dados do cliente?', answer: 'Acesse a ficha do cliente, clique em "Editar" e faça as alterações necessárias. Clique em "Salvar" para confirmar. Alterações críticas requerem confirmação do cliente por email.' },
      { id: 'c3', text: 'Como visualizar histórico do cliente?', answer: 'Na ficha do cliente, acesse a aba "Histórico" para ver:\n- Tickets abertos\n- Transações realizadas\n- Comunicações\n- Alterações de dados' },
      { id: 'c4', text: 'Como inativar um cliente?', answer: 'Acesse a ficha do cliente e clique em "Inativar Cliente". Clientes inativos não aparecem em listas padrão, mas seus dados são preservados.' },
      { id: 'c5', text: 'Como exportar dados de clientes?', answer: 'Acesse "Clientes" → "Exportar". Escolha o formato (CSV, Excel) e os campos desejados. O arquivo será gerado em segundos.' },
    ]
  },
  {
    id: 'comissoes',
    name: '💰 Comissões e Pagamentos',
    questions: [
      { id: 'com1', text: 'Como visualizar minhas comissões?', answer: 'Acesse "Minha Conta" → "Comissões". Você verá:\n- Comissões do mês atual\n- Histórico de comissões anteriores\n- Detalhamento por produto/serviço\n- Status de pagamento' },
      { id: 'com2', text: 'Qual é a data de pagamento?', answer: 'As comissões são pagas no 5º dia útil do mês seguinte. Você receberá um email de confirmação com o comprovante.' },
      { id: 'com3', text: 'Como gerar comprovante de pagamento?', answer: 'Na seção "Comissões", localize o pagamento desejado e clique em "Gerar Comprovante". O PDF será baixado automaticamente.' },
      { id: 'com4', text: 'Por que minha comissão não aparece?', answer: 'Possíveis razões:\n- Ainda não foi processada (espere até o 5º dia útil)\n- Há pendências na sua conta\n- Dados bancários incompletos\n\nAcesse "Suporte" → "Fale Conosco" para investigar.' },
      { id: 'com5', text: 'Como solicitar ajuste de comissão?', answer: 'Abra um ticket em "Suporte" com:\n- Período da comissão em questão\n- Motivo do ajuste\n- Documentação de suporte\n- Valor solicitado\n\nNossa equipe de faturamento analisará em até 5 dias úteis.' },
    ]
  },
  {
    id: 'relatorios',
    name: '📊 Relatórios e Análises',
    questions: [
      { id: 'r1', text: 'Como gerar um relatório?', answer: 'Acesse "Relatórios" e escolha o tipo desejado. Configure os filtros (período, categoria, etc.) e clique em "Gerar". O relatório será exibido na tela e pode ser exportado.' },
      { id: 'r2', text: 'Quais são os tipos de relatórios disponíveis?', answer: 'Oferecemos:\n- Relatório de Vendas\n- Relatório de Comissões\n- Relatório de Clientes\n- Relatório de Tickets\n- Relatório Financeiro\n- Relatório de Performance' },
      { id: 'r3', text: 'Como exportar relatórios?', answer: 'Após gerar o relatório, clique em "Exportar" e escolha o formato (PDF, Excel, CSV). O arquivo será baixado automaticamente.' },
      { id: 'r4', text: 'Como filtrar dados nos relatórios?', answer: 'Use os filtros disponíveis:\n- Período (data inicial e final)\n- Categoria\n- Status\n- Vendedor\n- Cliente\n\nAplique os filtros e clique em "Atualizar".' },
      { id: 'r5', text: 'Como agendar relatórios automáticos?', answer: 'Acesse "Relatórios" → "Agendar". Configure:\n- Tipo de relatório\n- Frequência (diário, semanal, mensal)\n- Destinatários\n- Formato\n\nO relatório será enviado automaticamente.' },
    ]
  },
  {
    id: 'conta',
    name: '🔐 Configurações da Conta',
    questions: [
      { id: 'acc1', text: 'Como alterar minha senha?', answer: 'Acesse "Minha Conta" → "Segurança" → "Alterar Senha". Digite sua senha atual e a nova senha (mínimo 8 caracteres, com letras, números e símbolos). Clique em "Salvar".' },
      { id: 'acc2', text: 'Como atualizar meu perfil?', answer: 'Acesse "Minha Conta" → "Perfil". Edite seus dados e clique em "Salvar". Você pode atualizar:\n- Nome\n- Email\n- Telefone\n- Foto de perfil\n- Preferências de notificação' },
      { id: 'acc3', text: 'Como habilitar autenticação de dois fatores?', answer: 'Acesse "Minha Conta" → "Segurança" → "Autenticação de Dois Fatores". Escolha entre SMS ou aplicativo autenticador. Siga as instruções na tela.' },
      { id: 'acc4', text: 'Como gerenciar permissões de usuários?', answer: 'Se você é administrador, acesse "Administração" → "Usuários". Selecione o usuário e clique em "Editar Permissões". Configure o acesso a cada módulo.' },
      { id: 'acc5', text: 'Como fazer logout de todos os dispositivos?', answer: 'Acesse "Minha Conta" → "Segurança" → "Sessões Ativas". Clique em "Fazer Logout em Todos os Dispositivos". Você precisará fazer login novamente.' },
    ]
  },
  {
    id: 'tecnico',
    name: '🛠️ Problemas Técnicos',
    questions: [
      { id: 'tech1', text: 'O sistema está lento. O que fazer?', answer: 'Tente:\n1. Limpar cache e cookies do navegador\n2. Fechar abas desnecessárias\n3. Usar um navegador diferente\n4. Verificar sua conexão de internet\n5. Reiniciar o navegador\n\nSe o problema persistir, abra um ticket de suporte.' },
      { id: 'tech2', text: 'Recebi um erro ao fazer login. Como resolver?', answer: 'Verifique:\n1. Se sua senha está correta\n2. Se sua conta não foi bloqueada (tente "Esqueci minha senha")\n3. Se você tem permissão de acesso\n4. Se o navegador aceita cookies\n\nSe nada funcionar, abra um ticket com o código de erro.' },
      { id: 'tech3', text: 'Meu navegador não carrega a página. O que fazer?', answer: 'Tente:\n1. Atualizar a página (F5 ou Ctrl+R)\n2. Fazer hard refresh (Ctrl+Shift+R)\n3. Limpar cache e cookies\n4. Usar um navegador diferente\n5. Desabilitar extensões do navegador' },
      { id: 'tech4', text: 'Como limpar cache e cookies?', answer: '**Chrome/Edge:**\n1. Pressione Ctrl+Shift+Delete\n2. Selecione "Todos os tempos"\n3. Marque "Cookies" e "Arquivos em cache"\n4. Clique em "Limpar dados"\n\n**Firefox:**\n1. Pressione Ctrl+Shift+Delete\n2. Selecione o intervalo de tempo\n3. Clique em "Limpar agora"' },
      { id: 'tech5', text: 'Qual navegador é recomendado?', answer: 'Recomendamos:\n- Chrome (versão 90+)\n- Firefox (versão 88+)\n- Safari (versão 14+)\n- Edge (versão 90+)\n\nEvite navegadores desatualizados.' },
    ]
  },
  {
    id: 'integracao',
    name: '🔗 Integração e APIs',
    questions: [
      { id: 'api1', text: 'Como integrar meu sistema com a Porto Vale?', answer: 'Acesse "Integrações" → "Nova Integração". Escolha o tipo de integração desejada e siga o passo a passo. Você receberá uma chave de API para usar.' },
      { id: 'api2', text: 'Onde encontro a documentação da API?', answer: 'A documentação completa está em: https://api.portovale.com/docs\n\nInclui exemplos de código, autenticação e endpoints disponíveis.' },
      { id: 'api3', text: 'Como gerar uma chave de API?', answer: 'Acesse "Minha Conta" → "Integrações" → "Chaves de API". Clique em "Gerar Nova Chave". Copie a chave e guarde em local seguro.' },
      { id: 'api4', text: 'Qual é o limite de requisições?', answer: 'O limite padrão é 1.000 requisições por hora. Planos premium têm limites maiores. Verifique seu plano em "Minha Conta".' },
      { id: 'api5', text: 'Como reportar um erro de integração?', answer: 'Abra um ticket em "Suporte" com:\n- Tipo de integração\n- Endpoint utilizado\n- Mensagem de erro\n- Timestamp do erro\n- Código de requisição' },
    ]
  },
  {
    id: 'faturamento',
    name: '💳 Faturamento',
    questions: [
      { id: 'f1', text: 'Como visualizar minha fatura?', answer: 'Acesse "Faturamento" → "Faturas". Você verá todas as suas faturas com status e datas de vencimento.' },
      { id: 'f2', text: 'Qual é a forma de pagamento?', answer: 'Aceitamos:\n- Cartão de crédito\n- Transferência bancária\n- Boleto\n- PIX' },
      { id: 'f3', text: 'Como emitir uma segunda via?', answer: 'Na lista de faturas, clique em "Emitir Segunda Via". O PDF será gerado e baixado automaticamente.' },
      { id: 'f4', text: 'Posso parcelar minha fatura?', answer: 'Sim, você pode parcelar em até 3 vezes. Acesse a fatura e clique em "Solicitar Parcelamento". Escolha a quantidade de parcelas.' },
      { id: 'f5', text: 'Como solicitar reembolso?', answer: 'Abra um ticket em "Suporte" → "Faturamento" com:\n- Número da fatura\n- Motivo do reembolso\n- Documentação de suporte\n\nNossa equipe analisará em até 10 dias úteis.' },
    ]
  },
];

// Flatten all questions for search
const getAllQuestions = (): (Question & { themeId: string; themeName: string })[] => {
  return THEMES.flatMap(theme =>
    (theme.questions || []).map(q => ({
      ...q,
      themeId: theme.id,
      themeName: theme.name
    }))
  );
};

// Carregar mensagens do localStorage
const loadMessagesFromStorage = (): Message[] => {
  try {
    const stored = localStorage.getItem('helpCenterMessages');
    if (stored) {
      return JSON.parse(stored).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    }
  } catch (e) {
    console.error('Erro ao carregar mensagens:', e);
  }
  return [
    {
      id: '1',
      type: 'bot',
      text: 'Olá! 👋 Bem-vindo à Central de Ajuda Porto Vale. Como posso ajudá-lo hoje?',
      timestamp: new Date(),
    },
  ];
};

export default function HelpCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(loadMessagesFromStorage());
  const [currentView, setCurrentView] = useState<'themes' | 'questions' | 'chat' | 'search'>('themes');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [userInput, setUserInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<(Question & { themeId: string; themeName: string })[]>([]);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    const maxX = window.innerWidth - containerRef.current.offsetWidth;
    const maxY = window.innerHeight - containerRef.current.offsetHeight;

    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY)),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as any);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  const handleThemeSelect = (theme: Theme) => {
    setSelectedTheme(theme);
    setCurrentView('questions');
    const botMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      text: `Ótimo! Você selecionou "${theme.name}". Qual é sua dúvida?`,
      timestamp: new Date(),
    };
    setMessages((prev) => {
      const updated = [...prev, botMessage];
      localStorage.setItem('helpCenterMessages', JSON.stringify(updated));
      return updated;
    });
  };

  const handleQuestionSelect = (question: Question) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: question.text,
      timestamp: new Date(),
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      text: question.answer,
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const updated = [...prev, userMessage, botMessage];
      localStorage.setItem('helpCenterMessages', JSON.stringify(updated));
      return updated;
    });
    setCurrentView('chat');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const results = getAllQuestions().filter(q =>
        q.text.toLowerCase().includes(query.toLowerCase()) ||
        q.answer.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setCurrentView('search');
    } else {
      setCurrentView('themes');
      setSearchResults([]);
    }
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: userInput,
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const updated = [...prev, userMessage];
      localStorage.setItem('helpCenterMessages', JSON.stringify(updated));
      return updated;
    });
    setUserInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: 'Obrigado pela sua pergunta! Parece que não encontrei uma resposta direta para isso. Gostaria de abrir um ticket ou falar com um analista?',
        timestamp: new Date(),
      };
      setMessages((prev) => {
        const updated = [...prev, botMessage];
        localStorage.setItem('helpCenterMessages', JSON.stringify(updated));
        return updated;
      });
    }, 500);
  };

  const handleOpenTicket = () => {
    window.open('/tickets/new', '_blank');
  };

  const handleWhatsApp = () => {
    const phoneNumber = CONTACT_CONFIG.whatsapp.replace(/\D/g, '');
    const message = encodeURIComponent('Olá, preciso de ajuda com a Central de Ajuda Porto Vale.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleBackToThemes = () => {
    setCurrentView('themes');
    setSelectedTheme(null);
    setSearchQuery('');
    setSearchResults([]);
    const botMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      text: 'Voltamos aos temas. Como posso ajudá-lo?',
      timestamp: new Date(),
    };
    setMessages((prev) => {
      const updated = [...prev, botMessage];
      localStorage.setItem('helpCenterMessages', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`fixed z-50 transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isOpen ? '400px' : 'auto',
        height: isOpen ? '600px' : 'auto',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 cursor-pointer"
          data-no-drag
        >
          <MessageCircle size={28} />
        </button>
      ) : (
        <div className="flex flex-col h-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
          {/* Header */}
          <div
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between cursor-grab active:cursor-grabbing"
            data-no-drag={false}
          >
            <div className="flex items-center gap-2">
              {currentView !== 'themes' && (
                <button
                  onClick={handleBackToThemes}
                  className="p-1 hover:bg-blue-500 rounded transition-colors"
                  data-no-drag
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <h2 className="font-semibold text-lg">Central de Ajuda</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-500 rounded transition-colors"
              data-no-drag
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9 text-sm"
                data-no-drag
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {currentView === 'themes' && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-4">Selecione um tema:</p>
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeSelect(theme)}
                    className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 text-sm font-medium text-gray-800"
                    data-no-drag
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            )}

            {currentView === 'questions' && selectedTheme && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 mb-4">Dúvidas frequentes:</p>
                {selectedTheme.questions?.map((question) => (
                  <button
                    key={question.id}
                    onClick={() => handleQuestionSelect(question)}
                    className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 text-sm text-gray-800"
                    data-no-drag
                  >
                    {question.text}
                  </button>
                ))}
              </div>
            )}

            {currentView === 'search' && (
              <div className="space-y-2">
                {searchResults.length > 0 ? (
                  <>
                    <p className="text-sm text-gray-600 mb-4">
                      {searchResults.length} resultado(s) encontrado(s):
                    </p>
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleQuestionSelect(result)}
                        className="w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200 text-sm"
                        data-no-drag
                      >
                        <div className="font-medium text-gray-800">{result.text}</div>
                        <div className="text-xs text-gray-500 mt-1">{result.themeName}</div>
                      </button>
                    ))}
                  </>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Nenhum resultado encontrado. Tente outra busca.
                  </p>
                )}
              </div>
            )}

            {currentView === 'chat' && (
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                        message.type === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          {currentView === 'chat' && (
            <div className="border-t border-gray-200 p-4 space-y-3">
              <div className="flex gap-2">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua pergunta..."
                  className="flex-1 text-sm"
                  data-no-drag
                />
                <Button
                  onClick={handleSendMessage}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  data-no-drag
                >
                  <Send size={16} />
                </Button>
              </div>

              {/* Fallback Options */}
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 font-medium">Não encontrou? Tente:</p>
                <div className="flex gap-2">
                  <Button
                    onClick={handleOpenTicket}
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    data-no-drag
                  >
                    🎫 Abrir Ticket
                  </Button>
                  <Button
                    onClick={handleWhatsApp}
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    data-no-drag
                  >
                    💬 WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
