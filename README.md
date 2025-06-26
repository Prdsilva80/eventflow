<p align="center">
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">🎯 EventFlow - Backend Application</h1>

<p align="center">
  <a href="https://eventflow-u837.onrender.com" target="_blank">
    <img src="https://img.shields.io/badge/Live-View%20API-blue?style=for-the-badge" alt="Live API" />
  </a>
  <br/>
  <a href="https://nestjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/tests-passing-brightgreen.svg" alt="Tests Passing" />
  </a>
</p>

---

## 🇧🇷 Sobre o Projeto

O **EventFlow** é uma aplicação backend construída com **NestJS** + **Prisma ORM**, focada no **gerenciamento de eventos**, **inscrições de usuários** e **envio de notificações automáticas**.  
O objetivo é oferecer uma estrutura robusta, escalável e segura para sistemas que lidam com múltiplos eventos e perfis de usuários.

---

## 🚀 O que o projeto resolve?

- Cadastro e autenticação segura de usuários.
- Gestão de eventos (criação, edição, listagem).
- Inscrição de usuários em eventos.
- Avaliação e feedback de eventos.
- Notificações automáticas via e-mail.
- Atualização de perfil de usuário.

---

## 🔧 Desafios enfrentados

| Problema | Solução |
|---------|---------|
| Integração complexa JWT + ResendService | Criamos mocks personalizados para isolar dependências externas nos testes. |
| Tipagem inconsistente no Express | Implementamos `AuthenticatedRequest` para garantir acesso seguro a `userId`, `email` e `role`. |
| Conflito em testes duplicados do NotificationService | Refatoramos os testes mantendo apenas a abordagem mockada com Prisma e Resend. |
| Baixa cobertura em controllers e services | Escrevemos testes unitários e de integração nos fluxos principais. |

---

## ✅ Testes Automatizados

- Cobertura total: **45%**
- Cobertura >90% nos módulos: **auth, profile, feedback, notification, events, users**
- Testes com **Jest** e ambiente com mocks de **PrismaService** e **ResendService**

---

## 🔮 Próximas funcionalidades

- Paginação em listagens
- Filtros dinâmicos em eventos
- Reenvio automático de e-mails com cronjob
- WebSocket para notificações em tempo real
- Cobertura de testes em guards

---

## 🛠️ Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [Resend API](https://resend.com/)

---

## 🇺🇸 About the Project

**EventFlow** is a backend application built with **NestJS** and **Prisma ORM**, focused on **event management**, **user enrollment**, and **automated email notifications**.  
Its goal is to provide a scalable and secure architecture for systems dealing with multiple events and user roles.

---

## 🚀 What problems does it solve?

- Secure user registration and authentication
- Full event CRUD operations
- User registration for events
- Feedback and rating system
- Email notifications for key updates
- Profile management

---

## 🧩 Challenges and Solutions

| Challenge | Solution |
|----------|----------|
| Complex JWT + ResendService integration | Created test mocks to isolate and ensure stability |
| Type inconsistencies in Express Request | Implemented `AuthenticatedRequest` for type-safe access |
| Duplicate NotificationService tests | Refactored to use a consistent mocked approach |
| Low coverage in core modules | Increased coverage via unit/integration tests |

---

## ✅ Testing Highlights

- Overall coverage: **45%**
- Critical modules: **90%+ coverage**
- Tests with **Jest** using mock services

---

## 🔮 Upcoming Features

- Event/user pagination
- Dynamic filtering
- Cronjob-based email resending
- WebSocket notifications
- Full guard test coverage

---

## 🌐 Live API

> 🔗 **[https://eventflow-u837.onrender.com](https://eventflow-u837.onrender.com)**

---

## 📜 License

NestJS is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
