---
layout: page
pageClass: hub-landing-page
title: 大模型与智能体工程 (AI & Agent)
icon: 🤖
subtitle: AI & AGENT
sidebarKey: /hub/ai-agent
description: >-
  欢迎来到我的 AI 实验室。这里记录了我从传统软件工程向 AI 应用开发的系统性演进路线。坚信"知其然更知其所以然"，拒绝黑盒调用，致力于探索大模型应用层的工程化落地。
techTitle: 🎯 核心技术栈
techStack:
  - label: 运行环境
    value: WSL2 / Docker / 本地算力部署
  - label: 模型生态
    value: Ollama / 7B 级开源模型 (如 Qwen2.5) / AnythingLLM
  - label: 应用框架
    value: LangChain / RAG Pipeline
  - label: 开发语言
    value: Python
tracks:
  - icon: 🌟
    title: AI 应用架构与落地实战 (AI-Journey)
    desc: 系统性记录了从 API 基础到 Agent 智能体的四阶段演进：
    points:
      - "**Phase 1: API 基建** - 环境搭建、密钥安全 (.env)、Agent 规范驱动开发 (SDD) 认知。"
      - "**Phase 2: RAG 知识库** - 向量检索模块认知、LangChain 生态定位、PromptTemplate 核心解析。"
  - icon: 🛠️
    title: 本地私有知识库搭建 (Tech-Notes)
    desc: 彻底摆脱云端依赖，打造完全自主可控的本地 AI 大脑：
    links:
      - text: Docker 环境搭建与 WSL2 调优
        href: /tech-note/Published/01-AI-Agent/01-知识库搭建/1.Docker环境搭建
      - text: 本地私有知识库：基于 AnythingLLM 搭建全记录
        href: /tech-note/Published/01-AI-Agent/01-知识库搭建/3.本地私有知识库_基于AnythingLLM搭建学习笔记_详细版
  - icon: 📖
    title: 前沿论文与精读 (Reading)
    points:
      - 大语言模型 (LLM) 前沿架构精读与底层逻辑思考。
quote: AI 是肢体，工程化是神经，而架构思维才是灵魂。
---

<HubLanding />
