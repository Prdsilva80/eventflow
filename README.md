<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🎯 EventFlow - Backend Application

[![Tests](https://img.shields.io/badge/tests-passing-brightgreen.svg)](https://nestjs.com/)  

---

## 📖 Sobre o Projeto (Português)
O **EventFlow** é uma aplicação backend construída com **NestJS** + **Prisma ORM**, focada no **gerenciamento de eventos**, **inscrições de usuários** e **envio de notificações automáticas**.  
O objetivo é oferecer uma estrutura robusta, escalável e segura para sistemas que precisam lidar com múltiplos eventos e perfis de usuários.

---

## 🚀 O que o projeto resolve?
- Cadastro e autenticação segura de usuários.
- Gestão de eventos (criação, atualização e listagem).
- Inscrição de usuários em eventos.
- Feedbacks e avaliações de eventos.
- Notificações automáticas via e-mail para eventos e atualizações importantes.
- Atualização de perfil de usuários.

---

## 🔥 Problemas enfrentados e como solucionamos

| Problema | Solução |
| :------- | :------ |
| Complexidade na autenticação JWT + ResendService | Criamos mocks personalizados nos testes para isolar as dependências externas e garantir testes confiáveis. |
| Tipagem inconsistente no Express Request | Implementamos a interface `AuthenticatedRequest` para adicionar segurança e garantir acesso ao `userId`, `email` e `role`. |
| Conflito de testes duplicados no NotificationService | Refatoramos os testes para manter apenas a abordagem mockada corretamente, focando no Prisma + Resend. |
| Cobertura baixa em controllers e services | Escrevemos testes unitários e de integração para todos os fluxos principais (auth, events, notifications, feedback, profile, users). |

---

## ✅ Testes Automatizados
- **Cobertura geral: 45%**.
- **Módulos críticos** (auth, profile, feedback, notification, events, users) com **mais de 90% de cobertura**.
- Testes unitários e de integração com **Jest**.
- Ambiente de testes com **mock de PrismaService** e **ResendService**.

---

## 🔥 Próximas implementações
- Melhorar cobertura de testes dos guards (`jwt-auth.guard`, `roles.guard`).
- Implementar **paginação** na listagem de eventos e usuários.
- Adicionar **filtros dinâmicos** em eventos (data, categoria, organizador).
- Criar sistema de **reenvio automático de notificações** via cronjob.
- Implementar **WebSocket** para notificações em tempo real.

---

## 🛠️ Tecnologias utilizadas
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [Resend Email API](https://resend.com/)

---

# 📖 About the Project (English)
**EventFlow** is a backend application built with **NestJS** + **Prisma ORM**, focused on **event management**, **user registration** and **automatic email notifications**.  
The goal is to provide a robust, scalable, and secure structure for systems that handle multiple events and different user profiles.

---

## 🚀 What does this project solve?
- Secure user registration and authentication.
- Event management (create, update, list).
- User enrollment in events.
- Event feedback and rating system.
- Automatic email notifications for events and important updates.
- User profile updating.

---

## 🔥 Challenges and how we solved them

| Challenge | Solution |
| :-------- | :------- |
| Complex JWT + ResendService authentication integration | Created custom mocks during testing to isolate external dependencies and guarantee reliable unit tests. |
| Inconsistent typing in Express Request | Implemented an `AuthenticatedRequest` interface to securely access `userId`, `email`, and `role`. |
| Duplicate NotificationService tests | Refactored to keep only the correctly mocked approach using Prisma + Resend. |
| Low test coverage in some controllers and services | Wrote unit and integration tests for all main flows (auth, events, notifications, feedback, profile, users). |

---

## ✅ Automated Testing
- **Overall coverage: 45%**.
- **Critical modules** (auth, profile, feedback, notification, events, users) with **over 90% coverage**.
- Unit and integration tests written with **Jest**.
- Test environment with **mocked PrismaService** and **ResendService**.

---

## 🔥 Next implementations
- Improve test coverage on guards (`jwt-auth.guard`, `roles.guard`).
- Implement **pagination** in user and event listings.
- Add **dynamic filters** to events (by date, category, organizer).
- Create **automatic email resending system** using cronjobs.
- Implement **WebSocket** for real-time notifications.

---

## 🛠️ Tech Stack
- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [Resend Email API](https://resend.com/)

---


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
