
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MYDO - Lista de Tarefas",
  description: "Organize suas tarefas diárias de forma eficiente com o MyDO. Adicione e gerencie suas atividades em uma interface intuitiva e fácil de usar. Mantenha-se produtivo e nunca perca um prazo com nosso aplicativo de lista de tarefas."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="shortcut icon" href="./favicon.svg" type="image/x-icon" />
      </head>
      <body>{children}</body>
    </html>
  );
}
