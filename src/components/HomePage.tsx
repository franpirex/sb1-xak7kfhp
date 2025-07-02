import React from 'react';
import { Play, Star, Calendar, Users, Music2, Award, ExternalLink, ArrowRight, Zap, Music, Trophy, Settings, Instagram } from 'lucide-react';

interface HomePageProps {
  onBookNow: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onBookNow }) => {
  const goToAdmin = () => {
    // Add admin parameter to current URL
    const url = new URL(window.location.href);
    url.searchParams.set('admin', 'true');
    window.location.href = url.toString();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Debug Admin Access Button - Only in development */}
      {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={goToAdmin}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 text-sm font-medium"
            title="Acesso rápido ao painel admin (apenas desenvolvimento)"
          >
            <Settings className="h-4 w-4" />
            <span>Admin</span>
          </button>
        </div>
      )}

      {/* Hero Section - Brand Colors */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 to-white">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="/C22DF9CA-9429-40BF-A46A-234A1C643DF9.JPG"
            alt="Raio dos Cachopos em concerto ao vivo"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/20 to-white/80"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-black mb-6 tracking-tighter leading-none">
              Raio dos
              <br />
              <span className="text-yellow-500">Cachopos</span>
            </h1>
            <p className="text-xl md:text-2xl text-amber-800 font-light tracking-wide max-w-2xl mx-auto">
              Pop Tradicional Agrobeto do Alto Alentejo para o Mundo
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <button
              onClick={onBookNow}
              className="group px-8 py-4 bg-yellow-400 text-black font-medium text-lg rounded-full hover:bg-yellow-500 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Pedir Orçamento</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
            <a 
              href="https://open.spotify.com/intl-pt/track/684bofZtc7FWYckn5TC5i9?si=d94a47666e9d4e1c"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-8 py-4 border border-amber-600 text-amber-800 rounded-full hover:bg-amber-50 transition-all duration-300 shadow-sm"
            >
              <Play className="h-5 w-5" />
              <span>Ouvir "Só Queria"</span>
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="https://www.instagram.com/raiodoscachopos"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Instagram className="h-5 w-5" />
              <span className="font-medium">@raiodoscachopos</span>
              <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            
            <a
              href="https://www.tiktok.com/@raiodoscachopos"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="h-5 w-5 bg-white rounded-sm flex items-center justify-center">
                <span className="text-black text-xs font-bold">T</span>
              </div>
              <span className="font-medium">@raiodoscachopos</span>
              <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            
            <a
              href="https://www.facebook.com/raiodoscachopos"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="h-5 w-5 bg-white rounded-sm flex items-center justify-center">
                <span className="text-blue-600 text-sm font-bold">f</span>
              </div>
              <span className="font-medium">Raio dos Cachopos</span>
              <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>
        </div>
      </section>

      {/* About Section - Warm Tones */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-black mb-8 tracking-tighter">
              A Nossa História
            </h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-12"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 text-lg text-amber-800 leading-relaxed">
              <p className="text-xl">
                O nome "Raio dos Cachopos" tem origem alentejana e transporta-nos para um universo de jovens castiços, sempre metidos em aventuras.
              </p>
              <p>
                Banda composta por cinco músicos do Alto Alentejo, residentes no distrito de Portalegre, com a missão de divulgar o Cancioneiro Alentejano e a Música Portuguesa.
              </p>
              <p>
                Com um espírito animado e diferente, tocam um repertório que chega a todas as idades. O seu habitat natural é o palco, onde sobem sempre de boina castanha, sapatos de vela e camisa branca.
              </p>
            </div>
            <div className="relative">
              <div className="bg-amber-100 rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400/20">
                <img 
                  src="/399707102_17915163431829591_2022935285415877707_n.jpeg"
                  alt="Raio dos Cachopos em concerto"
                  className="w-full h-96 object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Brand Colors */}
      <section className="py-32 bg-gradient-to-b from-amber-50 to-yellow-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-black text-black mb-8 tracking-tighter">
              Em Números
            </h3>
            <div className="w-16 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl p-12 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-yellow-400/20">
              <div className="text-7xl md:text-8xl font-black text-yellow-500 mb-6 tracking-tighter">
                50+
              </div>
              <div className="text-xl text-amber-800 font-bold mb-2 tracking-wide">ATUAÇÕES</div>
              <div className="text-amber-600 text-sm font-medium">Em palcos por todo o país</div>
            </div>

            <div className="group bg-white rounded-3xl p-12 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-yellow-400/20">
              <div className="text-7xl md:text-8xl font-black text-yellow-500 mb-6 tracking-tighter">
                4
              </div>
              <div className="text-xl text-amber-800 font-bold mb-2 tracking-wide">ANOS</div>
              <div className="text-amber-600 text-sm font-medium">Desde 2021 a encantar</div>
            </div>

            <div className="group bg-white rounded-3xl p-12 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-yellow-400/20">
              <div className="text-7xl md:text-8xl font-black text-yellow-500 mb-6 tracking-tighter">
                5
              </div>
              <div className="text-xl text-amber-800 font-bold mb-2 tracking-wide">MÚSICOS</div>
              <div className="text-amber-600 text-sm font-medium">Unidos pela paixão</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Clean Cards with Brand Colors */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-black text-black mb-8 tracking-tighter">
              Os Nossos Serviços
            </h3>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mb-8"></div>
            <p className="text-xl text-amber-800 max-w-2xl mx-auto">
              Música ao vivo para todas as ocasiões especiais
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-amber-50 rounded-3xl p-10 hover:bg-amber-100 transition-all duration-300 border-2 border-yellow-400/20">
              <div className="mb-8">
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6">
                  <Music2 className="h-8 w-8 text-black" />
                </div>
                <h4 className="text-2xl font-bold text-black mb-4 tracking-tight">Casamentos</h4>
                <p className="text-amber-800 mb-8 leading-relaxed">
                  Torne o seu dia especial inesquecível com a nossa música tradicional portuguesa e repertório único.
                </p>
              </div>
              <button
                onClick={onBookNow}
                className="text-black font-semibold hover:text-amber-800 transition-colors duration-300 flex items-center space-x-2 group-hover:translate-x-1"
              >
                <span>Peça já o seu orçamento</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="group bg-amber-50 rounded-3xl p-10 hover:bg-amber-100 transition-all duration-300 border-2 border-yellow-400/20">
              <div className="mb-8">
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-black" />
                </div>
                <h4 className="text-2xl font-bold text-black mb-4 tracking-tight">Eventos Corporativos</h4>
                <p className="text-amber-800 mb-8 leading-relaxed">
                  Entretenimento profissional para conferências, galas e celebrações empresariais.
                </p>
              </div>
              <button
                onClick={onBookNow}
                className="text-black font-semibold hover:text-amber-800 transition-colors duration-300 flex items-center space-x-2 group-hover:translate-x-1"
              >
                <span>Peça já o seu orçamento</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="group bg-amber-50 rounded-3xl p-10 hover:bg-amber-100 transition-all duration-300 border-2 border-yellow-400/20">
              <div className="mb-8">
                <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-black" />
                </div>
                <h4 className="text-2xl font-bold text-black mb-4 tracking-tight">Festas Privadas</h4>
                <p className="text-amber-800 mb-8 leading-relaxed">
                  Atuações intimistas para aniversários, celebrações familiares e eventos especiais.
                </p>
              </div>
              <button
                onClick={onBookNow}
                className="text-black font-semibold hover:text-amber-800 transition-colors duration-300 flex items-center space-x-2 group-hover:translate-x-1"
              >
                <span>Peça já o seu orçamento</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Warm Tones with Captions */}
      <section className="py-32 bg-gradient-to-b from-amber-50 to-yellow-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-black text-black mb-8 tracking-tighter">
              Galeria
            </h3>
            <div className="w-16 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group">
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-yellow-400/20">
                <img 
                  src="/411427343_17919195239829591_961590045112153225_n.jpg"
                  alt="Evento Privado - Raio dos Cachopos"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h4 className="text-white font-bold text-lg">Evento Privado</h4>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-yellow-400/20">
                <img 
                  src="/411427881_17919195248829591_7333268829928203918_n.jpg"
                  alt="Casamento - Raio dos Cachopos"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h4 className="text-white font-bold text-lg">Casamento</h4>
                </div>
              </div>
            </div>
            <div className="group">
              <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-yellow-400/20">
                <img 
                  src="/317618679_121073740816313_7644471458695176227_n.jpg"
                  alt="Atuação ao Vivo - Raio dos Cachopos"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h4 className="text-white font-bold text-lg">Atuação ao Vivo</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Brand Colors */}
      <section className="py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-black text-black mb-8 tracking-tighter">
              Testemunhos
            </h3>
            <div className="w-16 h-1 bg-yellow-400 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-amber-50 rounded-3xl p-10 border-2 border-yellow-400/20">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-amber-800 mb-8 leading-relaxed text-lg">
                "Os Raio dos Cachopos fizeram do nosso casamento um momento verdadeiramente mágico. A música tradicional portuguesa criou uma atmosfera única."
              </p>
              <div className="text-black font-semibold">Maria & João</div>
            </div>

            <div className="bg-amber-50 rounded-3xl p-10 border-2 border-yellow-400/20">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-amber-800 mb-8 leading-relaxed text-lg">
                "Profissionais, talentosos e fantásticos para trabalhar. O nosso evento corporativo foi um grande sucesso!"
              </p>
              <div className="text-black font-semibold">Anónimo</div>
            </div>

            <div className="bg-amber-50 rounded-3xl p-10 border-2 border-yellow-400/20">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-amber-800 mb-8 leading-relaxed text-lg">
                "A energia que trouxeram à minha festa de aniversário foi incrível. Toda a gente esteve a dançar a noite toda!"
              </p>
              <div className="text-black font-semibold">Ana</div>
            </div>
          </div>
        </div>
      </section>

      {/* Single Release Section */}
      <section className="py-32 bg-gradient-to-b from-amber-50 to-yellow-100">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-5xl md:text-6xl font-black text-black mb-8 tracking-tighter">
            Primeiro Single Original
          </h3>
          <div className="w-16 h-1 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-xl text-amber-800 mb-12">
            Em 2024 lançámos o nosso primeiro Single Original - "Só Queria"
          </p>
          <a
            href="https://open.spotify.com/intl-pt/track/684bofZtc7FWYckn5TC5i9?si=d94a47666e9d4e1c"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-3 px-8 py-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Play className="h-5 w-5" />
            <span className="font-semibold">Ouvir no Spotify</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* CTA Section - Brand Colors */}
      <section className="py-32 bg-black">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">
            Pedir Orçamento
          </h3>
          <p className="text-xl text-yellow-200 mb-12 max-w-2xl mx-auto">
            Obtenha um orçamento personalizado e verifique a nossa disponibilidade para a sua data especial.
          </p>
          
          <button
            onClick={onBookNow}
            className="px-12 py-4 bg-yellow-400 text-black font-semibold text-xl rounded-full hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Pedir aqui
          </button>
        </div>
      </section>

      {/* Footer with Social Media */}
      <footer className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="bg-yellow-400 p-3 rounded-xl">
              <Zap className="h-6 w-6 text-black" />
            </div>
            <div className="text-left">
              <h4 className="text-xl font-bold text-white">Raio dos Cachopos</h4>
              <p className="text-yellow-400 text-sm font-medium">POP TRADICIONAL AGROBETO</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <a
              href="https://www.instagram.com/raiodoscachopos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Instagram className="h-5 w-5" />
              <span className="font-medium">@raiodoscachopos</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            
            <a
              href="https://www.tiktok.com/@raiodoscachopos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-black border border-white text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="h-5 w-5 bg-white rounded-sm flex items-center justify-center">
                <span className="text-black text-xs font-bold">T</span>
              </div>
              <span className="font-medium">@raiodoscachopos</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            
            <a
              href="https://www.facebook.com/raiodoscachopos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <div className="h-5 w-5 bg-white rounded-sm flex items-center justify-center">
                <span className="text-blue-600 text-sm font-bold">f</span>
              </div>
              <span className="font-medium">Raio dos Cachopos</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-sm">
              © 2024 Raio dos Cachopos. Todos os direitos reservados.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Pop Tradicional Agrobeto do Alto Alentejo para o Mundo
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;