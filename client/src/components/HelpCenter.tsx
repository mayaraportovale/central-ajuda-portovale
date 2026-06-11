import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, ChevronLeft, Send, Phone, Mail } from 'lucide-react';
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

const THEMES: Theme[] = [
  {
    id: 'tickets',
    name: '🎫 Gestão de Tickets',
    questions: [
      { id: 't1', text: 'Como abrir um novo ticket?', answer: 'Para abrir um novo ticket, clique no botão "Abrir Novo Ticket" no menu principal. Preencha o formulário com assunto, categoria e descrição detalhada.' },
      { id: 't2', text: 'Como acompanhar meu ticket?', answer: 'Acesse a seção "Meus Tickets" no painel ou use o número de protocolo para buscar o status em tempo real.' },
      { id: 't3', text: 'Qual é o tempo de resposta?', answer: 'Suporte Técnico: até 2 horas | Faturamento: até 4 horas | Comercial: até 24 horas | Geral: até 48 horas' },
      { id: 't4', text: 'Como adicionar anexos ao ticket?', answer: 'Clique em "Adicionar Arquivo" e selecione arquivos de até 10MB. Formatos aceitos: PDF, DOC, XLS, JPG, PNG.' },
    ]
  },
  {
    id: 'clientes',
    name: '👥 Gestão de Clientes',
    questions: [
      { id: 'c1', text: 'Como adicionar um novo cliente?', answer: 'Acesse "Clientes" → "Novo Cliente" e preencha os dados obrigatórios (Nome, CPF/CNPJ, Email, Telefone).' },
      { id: 'c2', text: 'Como editar dados do cliente?', answer: 'Acesse a ficha do cliente, clique em "Editar" e faça as alterações necessárias. Clique em "Salvar".' },
      { id: 'c3', text: 'Como visualizar histórico do cliente?', answer: 'Na ficha do cliente, acesse a aba "Histórico" para ver tickets, transações, comunicações e alterações.' },
      { id: 'c4', text: 'Como exportar dados de clientes?', answer: 'Acesse "Clientes" → "Exportar" e escolha o formato (CSV ou Excel) e os campos desejados.' },
    ]
  },
  {
    id: 'comissoes',
    name: '💰 Comissões e Pagamentos',
    questions: [
      { id: 'com1', text: 'Como visualizar minhas comissões?', answer: 'Acesse "Minha Conta" → "Comissões" para ver comissões do mês atual e histórico.' },
      { id: 'com2', text: 'Qual é a data de pagamento?', answer: 'As comissões são pagas no 5º dia útil do mês seguinte. Você receberá um email de confirmação.' },
      { id: 'com3', text: 'Como gerar comprovante de pagamento?', answer: 'Na seção "Comissões", localize o pagamento e clique em "Gerar Comprovante". O PDF será baixado.' },
      { id: 'com4', text: 'Por que minha comissão não aparece?', answer: 'Possíveis razões: ainda não foi processada, há pendências na sua conta ou dados bancários incompletos.' },
    ]
  },
  {
    id: 'relatorios',
    name: '📊 Relatórios e Análises',
    questions: [
      { id: 'r1', text: 'Como gerar um relatório?', answer: 'Acesse "Relatórios", escolha o tipo desejado, configure os filtros e clique em "Gerar".' },
      { id: 'r2', text: 'Quais são os tipos de relatórios disponíveis?', answer: 'Vendas, Comissões, Clientes, Tickets, Financeiro e Performance.' },
      { id: 'r3', text: 'Como exportar relatórios?', answer: 'Após gerar o relatório, clique em "Exportar" e escolha o formato (PDF, Excel ou CSV).' },
      { id: 'r4', text: 'Como agendar relatórios automáticos?', answer: 'Acesse "Relatórios" → "Agendar", configure frequência e destinatários. Será enviado automaticamente.' },
    ]
  },
  {
    id: 'conta',
    name: '🔐 Configurações da Conta',
    questions: [
      { id: 'acc1', text: 'Como alterar minha senha?', answer: 'Acesse "Minha Conta" → "Segurança" → "Alterar Senha". Digite a senha atual e a nova (mínimo 8 caracteres).' },
      { id: 'acc2', text: 'Como atualizar meu perfil?', answer: 'Acesse "Minha Conta" → "Perfil" e edite seus dados (nome, email, telefone, foto).' },
      { id: 'acc3', text: 'Como habilitar autenticação de dois fatores?', answer: 'Acesse "Minha Conta" → "Segurança" → "Autenticação de Dois Fatores" e escolha SMS ou aplicativo.' },
      { id: 'acc4', text: 'Como fazer logout de todos os dispositivos?', answer: 'Acesse "Minha Conta" → "Segurança" → "Sessões Ativas" e clique em "Fazer Logout em Todos".' },
    ]
  },
  {
    id: 'tecnico',
    name: '🛠️ Problemas Técnicos',
    questions: [
      { id: 'tech1', text: 'O sistema está lento. O que fazer?', answer: 'Tente: limpar cache, fechar abas desnecessárias, usar outro navegador ou verificar sua conexão.' },
      { id: 'tech2', text: 'Recebi um erro ao fazer login. Como resolver?', answer: 'Verifique sua senha, se a conta não foi bloqueada, se tem permissão de acesso e se o navegador aceita cookies.' },
      { id: 'tech3', text: 'Meu navegador não carrega a página. O que fazer?', answer: 'Tente: atualizar a página, fazer hard refresh (Ctrl+Shift+R), limpar cache ou usar outro navegador.' },
      { id: 'tech4', text: 'Qual navegador é recomendado?', answer: 'Chrome (90+), Firefox (88+), Safari (14+) ou Edge (90+). Evite navegadores desatualizados.' },
    ]
  },
  {
    id: 'faturamento',
    name: '💳 Faturamento',
    questions: [
      { id: 'f1', text: 'Como visualizar minha fatura?', answer: 'Acesse "Faturamento" → "Faturas" para ver todas as suas faturas com status e datas.' },
      { id: 'f2', text: 'Qual é a forma de pagamento?', answer: 'Aceitamos: Cartão de crédito, Transferência bancária, Boleto e PIX.' },
      { id: 'f3', text: 'Como emitir uma segunda via?', answer: 'Na lista de faturas, clique em "Emitir Segunda Via". O PDF será gerado e baixado.' },
      { id: 'f4', text: 'Posso parcelar minha fatura?', answer: 'Sim, você pode parcelar em até 3 vezes. Acesse a fatura e clique em "Solicitar Parcelamento".' },
    ]
  },
];

export default function HelpCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: 'Olá! 👋 Bem-vindo à Central de Ajuda Porto Vale. Como posso ajudá-lo hoje?',
      timestamp: new Date(),
    },
  ]);
  const [currentView, setCurrentView] = useState<'themes' | 'questions' | 'chat'>('themes');
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [userInput, setUserInput] = useState('');
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
    setMessages([...messages, botMessage]);
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

    setMessages([...messages, userMessage, botMessage]);
    setCurrentView('chat');
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: userInput,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setUserInput('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: 'Obrigado pela sua pergunta! Parece que não encontrei uma resposta direta para isso. Gostaria de abrir um ticket ou falar com um analista?',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleOpenTicket = () => {
    window.open('/tickets/new', '_blank');
  };

  const handleWhatsApp = () => {
    const phoneNumber = '5511999999999'; // Substituir com número real
    const message = encodeURIComponent('Olá, preciso de ajuda com a Central de Ajuda Porto Vale.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleBackToThemes = () => {
    setCurrentView('themes');
    setSelectedTheme(null);
    const botMessage: Message = {
      id: Date.now().toString(),
      type: 'bot',
      text: 'Voltamos aos temas. Como posso ajudá-lo?',
      timestamp: new Date(),
    };
    setMessages([...messages, botMessage]);
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

            {currentView === 'chat' && (
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
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
