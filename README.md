# 🎟️ EventFlow

A modern event management backend built with NestJS, Prisma ORM, and PostgreSQL. Designed for scalability, modularity, and secure access to manage users, events, feedbacks, and notifications.

---

## 🎯 Project Purpose

EventFlow is a backend API for an intelligent event platform, handling authentication, event creation, user registration, feedback, and email notifications. It showcases best practices for building scalable and secure backend services.

---

## 💡 Features

- Authentication with JWT  
- Role-based access (admin, organizer, attendee)  
- Event creation and management  
- User registrations for events  
- Feedback submission and star rating  
- Email notifications via Resend  
- Modular structure using NestJS best practices  
- Automated tests with Jest  

---

## 🚀 Live Deploy

The project is deployed and running in a production environment.  
For security reasons, the public link is not disclosed here.  
Access may be granted upon request for evaluation or collaboration purposes.

---

## 🛠️ Technologies

- NestJS  
- TypeScript  
- Prisma ORM  
- PostgreSQL  
- Resend (email service)  
- JWT & Guards for authentication  
- Jest for testing  

---

## 🧪 Running Locally

```bash
git clone https://github.com/seuusuario/eventflow.git
cd eventflow

npm install

# Set up your .env with database credentials and JWT secret

npx prisma generate
npx prisma migrate dev

npm run start:dev
```

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributions

Contributions are welcome! Feel free to fork the project, submit pull requests, or open issues.

> ⚠️ This project is built for portfolio use, but follows production-grade standards and architecture.

# 🎟️ EventFlow (Versão em Português)

Um backend moderno para gerenciamento de eventos, construído com NestJS, Prisma ORM e PostgreSQL. Projetado com foco em escalabilidade, modularidade e segurança no acesso a usuários, eventos, avaliações e notificações.

---

## 🎯 Propósito do Projeto

EventFlow é uma API backend para uma plataforma inteligente de eventos, responsável pela autenticação de usuários, criação de eventos, inscrições, envio de feedbacks e notificações por e-mail. O projeto demonstra boas práticas no desenvolvimento de backends escaláveis e seguros.

---

## 💡 Funcionalidades

- Autenticação com JWT  
- Acesso baseado em papéis (administrador, organizador, participante)  
- Criação e gerenciamento de eventos  
- Inscrição de usuários em eventos  
- Envio de feedback com classificação por estrelas  
- Notificações por e-mail via Resend  
- Estrutura modular seguindo boas práticas do NestJS  
- Testes automatizados com Jest  

---

## 🚀 Deploy em Produção

O projeto está em produção e operando normalmente.  
Por motivos de segurança, o link público não está sendo divulgado aqui.  
Acesso sob solicitação, para fins de demonstração ou colaboração.

---

## 🛠️ Tecnologias

- NestJS  
- TypeScript  
- Prisma ORM  
- PostgreSQL  
- Resend (serviço de e-mails)  
- JWT & Guards para autenticação  
- Jest para testes automatizados  

---

## 🧪 Como Rodar Localmente

```bash
git clone https://github.com/seuusuario/eventflow.git
cd eventflow

npm install

# Configure o seu .env com credenciais do banco de dados e segredo JWT

npx prisma generate
npx prisma migrate dev

npm run start:dev
```

---

## 📄 Licença

Este projeto está sob a Licença MIT.

---

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para fazer fork, enviar pull requests ou abrir issues.

> ⚠️ Este projeto foi desenvolvido para fins de portfólio, mas segue padrões profissionais e prontos para uso em produção.