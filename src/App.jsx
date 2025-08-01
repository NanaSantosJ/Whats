import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Users, HelpCircle, Send, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/components/ui/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { supabase } from "./supabase";

const particlesInit = async (main) => {
  await loadFull(main);
};

const faqItems = [
  {
    question: "Como isso pode transformar meus resultados?",
    answer:
      "Nossa abordagem personalizada garante que suas necessidades específicas sejam atendidas, acelerando o crescimento e otimizando seus processos para alcançar o máximo potencial.",
  },
  {
    question: "O atendimento é rápido mesmo?",
    answer:
      "Sim! Priorizamos o contato direto e ágil via WhatsApp. Nosso objetivo é responder a todas as suas dúvidas em tempo recorde para que você não perca nenhuma oportunidade.",
  },
  {
    question: "Que tipo de suporte eu recebo?",
    answer:
      "Você recebe suporte completo, desde o esclarecimento de dúvidas iniciais até o acompanhamento contínuo dos seus resultados. Estamos aqui para garantir o seu sucesso.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

function App() {
  const [message, setMessage] = useState(
    "Oi, quero saber mais sobre o produto"
  );
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const { data, error } = await supabase
        .from("clicks")
        .select("count")
        .eq("id", 1)
        .single();

      if (error) {
        console.error("Erro ao buscar contador:", error);
        return;
      }

      if (data && data.count !== undefined) {
        setClickCount(data.count);
      } else {
        // Caso não exista o registro, cria ele com count = 0
        const { error: insertError } = await supabase
          .from("clicks")
          .insert([{ id: 1, count: 0 }]);

        if (insertError) {
          console.error("Erro ao criar contador inicial:", insertError);
          return;
        }

        setClickCount(0);
      }
    };

    fetchCount();
  }, []);

  const handleWhatsAppClick = async () => {
    if (window.fbq) {
      window.fbq("track", "Lead");
    }

    const newClickCount = clickCount + 1;

    const { error } = await supabase
      .from("clicks")
      .update({ count: newClickCount })
      .eq("id", 1);

    if (error) {
      console.error("Erro ao atualizar contador no Supabase:", error);
      toast({
        title: "Erro ao contar clique",
        description: "Não conseguimos atualizar o número de cliques. 😔",
        duration: 3000,
      });
      return;
    }

    setClickCount(newClickCount);

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5522997340446?text=${encodedMessage}`, "_blank");

    toast({
      title: "Redirecionando para o WhatsApp! 📱",
      description: "Você será direcionado para conversar comigo agora mesmo!",
      duration: 3000,
    });
  };

  return (
    <>
      <Helmet>
        <title>
          Fale Comigo no WhatsApp - Transforme Seus Resultados Agora
        </title>
        <meta
          name="description"
          content="Está pronto para transformar seus resultados? Clique e tire todas as suas dúvidas direto comigo no WhatsApp!"
        />
        {/* Pixel do Facebook */}
        <script>
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src='https://connect.facebook.net/en_US/fbevents.js';
              s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script');

            fbq('init', 'SEU_PIXEL_AQUI');
            fbq('track', 'PageView');
          `}
        </script>
        <noscript>
          {`<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=SEU_PIXEL_AQUI&ev=PageView&noscript=1"/>`}
        </noscript>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.1,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 50,
              },
              opacity: {
                value: 0.2,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 -z-10"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-2xl mx-auto text-center space-y-12"
        >
          {/* Main Card */}
          <motion.div variants={itemVariants} className="relative z-10">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full opacity-80 blur-sm"></div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-70 blur-sm"></div>

              <motion.div
                variants={itemVariants}
                className="mb-8 flex justify-center"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full blur-lg opacity-50 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-green-400 to-emerald-600 p-6 rounded-full">
                    <MessageCircle size={48} className="text-white" />
                  </div>
                </div>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-emerald-200 bg-clip-text text-transparent leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Fale Comigo Agora no{" "}
                <span className="bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
                  WhatsApp
                </span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-xl mx-auto"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Está pronto para{" "}
                <span className="text-yellow-300 font-semibold">
                  transformar seus resultados
                </span>
                ? Tire suas dúvidas{" "}
                <span className="text-green-300 font-semibold">
                  direto comigo
                </span>
                !
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-4">
                <div className="relative">
                  <Edit3
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
                    placeholder="Digite sua mensagem aqui..."
                  />
                </div>
                <Button
                  onClick={handleWhatsAppClick}
                  className="group w-full relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg px-8 py-6 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/25 border-0"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center gap-3">
                    <Send size={24} className="group-hover:animate-bounce" />
                    Enviar Mensagem
                  </span>
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="mt-8 flex items-center justify-center gap-4 text-sm text-yellow-300 bg-yellow-500/10 px-4 py-2 rounded-full"
              >
                <Users size={18} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={clickCount}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-bold"
                  >
                    {clickCount}
                  </motion.span>
                </AnimatePresence>
                <span>pessoas já iniciaram uma conversa!</span>
              </motion.div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 w-full max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-3">
                <HelpCircle className="text-green-400" />
                Perguntas Frequentes
              </h2>
            </div>
            <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </motion.div>
        </motion.div>

        <Toaster />
      </div>
    </>
  );
}

export default App;
