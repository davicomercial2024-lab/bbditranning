import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const generateQuizQuestionsFn = createServerFn({ method: "POST" })
  .inputValidator(z.string())
  .handler(async ({ data: lessonContent }) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Return mock response if no API key is provided
    return [
      {
        question: "Qual o tema principal do texto analisado?",
        options: ["Vendas", "Manutenção", "Integração e Cultura", "Desenvolvimento de Software"],
        correctIndex: 2
      },
      {
        question: "O que é esperado do colaborador durante a prática assistida?",
        options: ["Apenas ler manuais", "Observar e absorver conhecimento", "Substituir o instrutor", "Finalizar rapidamente"],
        correctIndex: 1
      },
      {
        question: "Qual é o primeiro passo da trajetória na empresa, segundo o material?",
        options: ["Assumir a liderança", "Criar novos processos", "Observar, aprender e colocar em prática", "Fazer uma prova escrita"],
        correctIndex: 2
      }
    ];
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Você é um gerador de questões para treinamentos corporativos. Leia o conteúdo abaixo e gere 3 a 5 perguntas de múltipla escolha focadas nos pontos mais importantes. 
            Retorne EXATAMENTE um array JSON contendo objetos no seguinte formato: 
            [{"question": "Pergunta", "options": ["Opcao 1", "Opcao 2", "Opcao 3", "Opcao 4"], "correctIndex": 0}] 
            onde correctIndex é o número da resposta certa (de 0 a 3).
            NÃO RETORNE NADA ALÉM DO JSON.
            
            Conteúdo:
            ${lessonContent.substring(0, 5000)}`
          }]
        }],
        generationConfig: {
          responseMimeType: "application/json",
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (resultText) {
      const parsed = JSON.parse(resultText);
      return Array.isArray(parsed) ? parsed : [];
    }
    return [];
  } catch (error) {
    console.error("AI Quiz Generation Error:", error);
    throw new Error("Falha ao gerar perguntas com IA.");
  }
});

export const askTutorFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ lessonContent: z.string(), question: z.string() }))
  .handler(async ({ data: { lessonContent, question } }) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    // Return mock response if no API key is provided
    return "Olá! Eu sou o Assistente Virtual (Modo de Teste). No momento, não tenho a Chave de API conectada, então não posso ler o conteúdo ou responder sua pergunta com precisão. Assim que o administrador inserir a chave do Gemini no painel, eu estarei pronto para te ajudar a dominar este treinamento!";
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Você é o Tutor Virtual do "BBDI Trainning", um ambiente de treinamento corporativo. Sua missão é responder à dúvida do aluno de forma clara, educada e direta, sempre baseando sua resposta PRINCIPALMENTE no material da aula atual. Se a dúvida não tiver relação com o material, guie o aluno educadamente de volta ao assunto do treinamento.

            Material da aula atual:
            ${lessonContent.substring(0, 10000)}

            Dúvida do aluno:
            ${question}`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    return resultText || "Desculpe, não consegui formular uma resposta no momento.";
  } catch (error) {
    console.error("AI Tutor Error:", error);
    throw new Error("Falha ao se comunicar com o Tutor.");
  }
});
