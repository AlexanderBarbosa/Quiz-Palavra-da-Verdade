import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Bookmark, Sparkles, BookMarked, Share2, Plus, Trash2, Check } from 'lucide-react';
import { BIBLE_BOOKS, BIBLE_GLOSSARY, BIBLE_TOPICS, getTodayVerse, BibleBookOverview } from '../data/offlineBibleStudy';

interface BibleStudyViewProps {
  onClose: () => void;
  onStartQuiz: () => void;
}

export const BibleStudyView: React.FC<BibleStudyViewProps> = ({ onClose, onStartQuiz }) => {
  const [activeTab, setActiveTab] = useState<'books' | 'glossary' | 'topics' | 'daily' | 'notes'>('books');
  const [searchQuery, setSearchQuery] = useState('');
  const [testamentFilter, setTestamentFilter] = useState<'all' | 'Antigo Testamento' | 'Novo Testamento'>('all');
  const [selectedBook, setSelectedBook] = useState<BibleBookOverview | null>(null);
  const [todayVerse] = useState(getTodayVerse);
  const [copied, setCopied] = useState(false);

  // User Notes saved in localStorage
  const [notes, setNotes] = useState<{ id: string; title: string; content: string; date: string }[]>(() => {
    try {
      const saved = localStorage.getItem('quiz_biblico_user_notes');
      return saved ? JSON.parse(saved) : [
        {
          id: 'note_1',
          title: 'A Promessa de Romanos 8:28',
          content: 'Todas as coisas cooperam para o bem daqueles que amam a Deus. Um lembrete diário de confiança.',
          date: new Date().toLocaleDateString('pt-BR')
        }
      ];
    } catch {
      return [];
    }
  });

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('quiz_biblico_user_notes', JSON.stringify(notes));
    } catch {
      // Ignore
    }
  }, [notes]);

  const handleAddNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    const newEntry = {
      id: `note_${Date.now()}`,
      title: newNoteTitle.trim(),
      content: newNoteContent.trim(),
      date: new Date().toLocaleDateString('pt-BR')
    };
    setNotes([newEntry, ...notes]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setIsAddingNote(false);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [selectedBookCategory, setSelectedBookCategory] = useState<string>('all');

  // Filtered Books
  const filteredBooks = BIBLE_BOOKS.filter(book => {
    const matchesSearch = book.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTestament = testamentFilter === 'all' || book.testament === testamentFilter;
    const matchesCategory = selectedBookCategory === 'all' || book.category === selectedBookCategory;
    return matchesSearch && matchesTestament && matchesCategory;
  });

  // Filtered Glossary
  const filteredGlossary = BIBLE_GLOSSARY.filter(item => {
    return item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
           item.definition.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-40 bg-slate-950/95 flex flex-col backdrop-blur-md overflow-hidden text-white animate-fadeIn">
      {/* Top Header */}
      <header className="p-4 sm:p-5 border-b border-indigo-500/30 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-indigo-200 tracking-wide">
              Biblioteca de Estudos Bíblicos
            </h2>
            <p className="text-xs text-slate-400">
              Acesso 100% offline para aprofundar seu conhecimento na Palavra
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onStartQuiz}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-md transition active:scale-95"
          >
            Jogar Quiz
          </button>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs transition border border-slate-700"
          >
            Fechar
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-slate-800 px-4 sm:px-6 bg-slate-900/50 scrollbar-none">
        {[
          { id: 'books', label: 'Panorama dos Livros', icon: BookOpen },
          { id: 'glossary', label: 'Dicionário Bíblico', icon: Sparkles },
          { id: 'topics', label: 'Temas & Orações', icon: Bookmark },
          { id: 'daily', label: 'Versículo do Dia', icon: BookMarked },
          { id: 'notes', label: `Meu Caderno (${notes.length})`, icon: Plus },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as typeof activeTab);
                setSearchQuery('');
              }}
              className={`py-3 px-4 font-bold text-xs sm:text-sm border-b-2 flex items-center gap-2 whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'border-indigo-400 text-indigo-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* TAB 1: BOOKS PANORAMA */}
          {activeTab === 'books' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Buscar livro, autor ou tema..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-400"
                  />
                </div>

                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  {(['all', 'Antigo Testamento', 'Novo Testamento'] as const).map(testament => (
                    <button
                      key={testament}
                      onClick={() => {
                        setTestamentFilter(testament);
                        setSelectedBookCategory('all');
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                        testamentFilter === testament
                          ? 'bg-indigo-600 text-white border-indigo-400'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                      }`}
                    >
                      {testament === 'all' ? 'Todos (66)' : testament === 'Antigo Testamento' ? 'Antigo Testamento (39)' : 'Novo Testamento (27)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                {[
                  { id: 'all', label: 'Todas as Seções' },
                  { id: 'Pentateuco', label: 'Pentateuco (5)' },
                  { id: 'Históricos', label: 'Históricos (12)' },
                  { id: 'Poéticos', label: 'Poéticos (5)' },
                  { id: 'Profetas Maiores', label: 'Profetas Maiores (5)' },
                  { id: 'Profetas Menores', label: 'Profetas Menores (12)' },
                  { id: 'Evangelhos', label: 'Evangelhos (4)' },
                  { id: 'História da Igreja', label: 'História da Igreja (1)' },
                  { id: 'Epístolas', label: 'Epístolas (21)' },
                  { id: 'Profecia', label: 'Profecia (1)' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedBookCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap text-[11px] font-semibold border transition ${
                      selectedBookCategory === cat.id
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Total Books Banner */}
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>
                  Exibindo <strong className="text-amber-300">{filteredBooks.length}</strong> de <strong className="text-white">66 livros da Bíblia</strong>
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-amber-400 hover:underline"
                  >
                    Limpar busca
                  </button>
                )}
              </div>

              {/* Books Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredBooks.map(book => (
                  <button
                    key={book.name}
                    onClick={() => setSelectedBook(book)}
                    className="text-left p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-850 hover:border-indigo-500/50 transition p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-black text-base text-indigo-200">{book.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
                          {book.chapters} caps
                        </span>
                      </div>
                      <span className="text-xs text-amber-400/90 font-medium block mb-1">
                        {book.category} • {book.author}
                      </span>
                      <p className="text-xs text-slate-300 line-clamp-2 mt-1">
                        {book.summary}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-indigo-300/80 italic line-clamp-1">
                      {book.keyVerse}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: GLOSSARY */}
          {activeTab === 'glossary' && (
            <div className="space-y-4">
              <div className="relative w-full max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Buscar termo teológico bíblico..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-indigo-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredGlossary.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-indigo-500/40 transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-base text-amber-300">{item.term}</h4>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        {item.origin}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed mb-3">
                      {item.definition}
                    </p>
                    <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Passagem-chave: {item.keyPassage}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TOPICS & DEVOTIONALS */}
          {activeTab === 'topics' && (
            <div className="space-y-6">
              {BIBLE_TOPICS.map(topic => (
                <div
                  key={topic.id}
                  className="p-5 rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900"
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-black text-amber-300 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      {topic.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{topic.description}</p>
                  </div>

                  <div className="space-y-3">
                    {topic.verses.map((verse, vIdx) => (
                      <div
                        key={vIdx}
                        className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-indigo-300">{verse.reference}</span>
                          <button
                            onClick={() => copyToClipboard(`"${verse.text}" - ${verse.reference}`)}
                            className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 transition"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            Copiar
                          </button>
                        </div>
                        <p className="text-sm italic text-slate-200 mb-2 font-serif">
                          "{verse.text}"
                        </p>
                        <p className="text-xs text-emerald-300 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20">
                          <strong>Reflexão:</strong> {verse.reflection}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: DAILY DEVOTIONAL */}
          {activeTab === 'daily' && (
            <div className="max-w-xl mx-auto py-6">
              <div className="p-6 sm:p-8 rounded-3xl border-2 border-amber-400/80 bg-gradient-to-b from-indigo-950 to-slate-900 shadow-2xl relative text-center">
                <div className="w-14 h-14 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/50 flex items-center justify-center mx-auto mb-4">
                  <BookMarked className="w-7 h-7" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300 block mb-1">
                  Palavra do Dia • Devocional
                </span>
                <h3 className="text-2xl font-black text-white mb-4">{todayVerse.verse}</h3>

                <blockquote className="text-lg sm:text-xl font-serif italic text-amber-100 leading-relaxed my-4 p-4 rounded-2xl bg-black/20 border border-amber-500/20">
                  "{todayVerse.text}"
                </blockquote>

                <div className="p-4 rounded-xl bg-indigo-900/40 border border-indigo-500/30 text-left my-4">
                  <span className="text-xs font-bold text-indigo-300 block mb-1">Reflexão para o seu dia:</span>
                  <p className="text-sm text-slate-200 leading-relaxed">{todayVerse.devotional}</p>
                </div>

                <button
                  onClick={() => copyToClipboard(`"${todayVerse.text}" - ${todayVerse.verse}`)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wide shadow-lg transition active:scale-95"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                  {copied ? 'Copiado para compartilhar!' : 'Compartilhar Palavra'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: NOTES & STUDY JOURNAL */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h3 className="font-bold text-indigo-200">Caderno de Estudos Offline</h3>
                  <p className="text-xs text-slate-400">
                    Suas anotações bíblicas e versículos favoritos salvos no seu aparelho.
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingNote(!isAddingNote)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
                >
                  <Plus className="w-4 h-4" />
                  {isAddingNote ? 'Cancelar' : 'Nova Anotação'}
                </button>
              </div>

              {isAddingNote && (
                <div className="p-4 rounded-xl border border-indigo-400 bg-slate-900 space-y-3 animate-fadeIn">
                  <input
                    type="text"
                    value={newNoteTitle}
                    onChange={e => setNewNoteTitle(e.target.value)}
                    placeholder="Título ou Versículo Chave (ex: João 3:16)"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-400"
                  />
                  <textarea
                    rows={4}
                    value={newNoteContent}
                    onChange={e => setNewNoteContent(e.target.value)}
                    placeholder="O que Deus falou ao seu coração neste versículo ou estudo?"
                    className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-indigo-400 resize-none"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsAddingNote(false)}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleAddNote}
                      className="px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition"
                    >
                      Salvar no Caderno
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {notes.map(note => (
                  <div
                    key={note.id}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 flex flex-col justify-between hover:border-slate-700 transition"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-sm text-indigo-300">{note.title}</h4>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-slate-500 hover:text-rose-400 transition"
                          title="Excluir"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-3 pt-2 border-t border-slate-800/80">
                      Salvo em: {note.date}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Selected Book Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl border-2 border-indigo-400 bg-gradient-to-b from-slate-900 to-indigo-950 p-6 text-white shadow-2xl">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl"
            >
              ✕
            </button>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              {selectedBook.testament} • {selectedBook.category}
            </span>
            <h3 className="text-2xl font-black text-white mt-1 mb-2">{selectedBook.name}</h3>

            <div className="space-y-3 text-sm text-slate-300 my-4">
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                <span>Autor: <strong className="text-slate-200">{selectedBook.author}</strong></span>
                <span>Capítulos: <strong className="text-slate-200">{selectedBook.chapters}</strong></span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <span className="text-xs font-bold text-indigo-300 block mb-1">Tema Principal:</span>
                <p className="text-slate-200">{selectedBook.theme}</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <span className="text-xs font-bold text-amber-300 block mb-1">Versículo Chave:</span>
                <p className="text-amber-100 font-serif italic text-xs leading-relaxed">{selectedBook.keyVerse}</p>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedBook.summary}
              </p>
            </div>

            <button
              onClick={() => setSelectedBook(null)}
              className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
            >
              Concluir Leitura
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
