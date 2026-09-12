# Momentum — Cahier de charge MVP & vision produit

## 1. Résumé du projet

**Momentum** est un agent personnel de self-improvement conçu pour aider une personne à transformer ses intentions en comportements réels.

L'idée centrale est simple :

> **Un assistant classique attend une question. Momentum comprend le contexte dans lequel la personne travaille et agit dans cet environnement pour l'aider à atteindre son objectif.**

Au lieu de simplement dire :

> « Tu devrais te concentrer davantage. »

Momentum peut agir :

- lancer une session de focus ;
- ouvrir les ressources nécessaires ;
- réduire les distractions ;
- suivre l'avancement d'une tâche ;
- détecter une dérive ou une période d'inactivité ;
- proposer une intervention adaptée ;
- analyser les résultats ;
- apprendre progressivement les habitudes de l'utilisateur.

Le produit doit donc être pensé comme un **agent contextuel**, et non comme un chatbot de motivation.

---

# 2. Problème

Les applications de productivité et de self-improvement demandent généralement à l'utilisateur de :

1. définir ses objectifs ;
2. créer ses tâches ;
3. suivre son comportement ;
4. analyser ses statistiques ;
5. décider lui-même des actions à prendre.

Le problème est que l'utilisateur doit rester suffisamment discipliné pour utiliser correctement l'outil censé l'aider à devenir plus discipliné.

Momentum inverse cette logique.

### Approche traditionnelle

```text
Objectif
   ↓
Application
   ↓
Conseils / statistiques
   ↓
Utilisateur
   ↓
Action
```

### Approche Momentum

```text
Objectif
   ↓
Compréhension du contexte
   ↓
Agent
   ↓
Action dans l'environnement
   ↓
Résultat observé
   ↓
Apprentissage
```

L'objectif n'est donc pas uniquement de **mesurer la productivité**, mais de créer une boucle permettant d'améliorer progressivement le comportement.

---

# 3. Vision

## Mission

Aider les personnes à devenir la personne qu'elles ont décidé de devenir en intervenant au bon moment, dans le bon contexte.

## Vision long terme

Momentum pourrait évoluer d'un simple agent de productivité vers une sorte de :

> **Personal Behavior Intelligence Platform**

Une plateforme capable de comprendre les habitudes numériques d'une personne, d'identifier les facteurs qui influencent ses performances et de proposer ou exécuter des interventions personnalisées.

---

# 4. Positionnement

Momentum n'est pas :

- un chatbot ;
- une simple todo-list ;
- une application Pomodoro ;
- un tracker de temps ;
- une application de motivation ;
- un calendrier intelligent.

Momentum est :

> **un agent qui utilise le contexte réel de l'utilisateur pour transformer ses intentions en actions.**

La différence fondamentale est le passage de :

**"What should I do?"**

à :

**"Given what you're doing right now, what should the agent do?"**

---

# 5. Exemples d'objectifs utilisateur

L'utilisateur peut définir différents types d'objectifs.

### Productivité

> « Je veux terminer mon projet avant vendredi. »

### Apprentissage

> « Je veux apprendre les AI Agents. »

### Travail

> « Je veux consacrer deux heures par jour à mon projet. »

### Habitudes

> « Je veux lire 20 minutes par jour. »

### Développement personnel

> « Je veux réduire mon temps passé sur les réseaux sociaux. »

### Objectifs combinés

```text
Objectif :
Réussir mon projet personnel.

Contraintes :
- 2 h de travail / jour
- pas de réseaux sociaux pendant les sessions
- terminer avant vendredi
```

---

# 6. Concept central : Focus Session

Le cœur du MVP est la **Focus Session**.

L'utilisateur indique :

> « Je veux travailler sur mon projet pendant 2 heures. »

Momentum transforme cette intention en session structurée.

### Avant la session

L'agent :

- identifie le projet ;
- identifie les tâches associées ;
- prépare l'environnement ;
- ouvre les ressources utiles ;
- configure le navigateur ;
- lance le timer ;
- affiche l'objectif.

### Pendant la session

L'agent observe certains signaux :

- site actuellement ouvert ;
- temps passé ;
- changement de contexte ;
- activité/inactivité ;
- progression déclarée ;
- interruptions.

### Si l'utilisateur dérive

Exemple :

```text
Goal:
Finish the authentication module.

Current context:
You opened YouTube.

Momentum:
You're currently in a 90-minute focus session.
You've spent 8 minutes away from your task.

[Return to work]   [Take 5 min]
```

L'utilisateur conserve toujours le contrôle.

### Après la session

Momentum produit :

```text
Focus Session Completed

Planned:      90 min
Focused:      64 min
Distractions: 16 min
Idle:         10 min

Task progress:
Authentication → 70%

Next recommended action:
Finish OAuth callback tomorrow.
```

---

# 7. MVP — Objectif

Le MVP doit être suffisamment petit pour être développé pendant un hackathon tout en démontrant clairement la valeur du concept.

Le MVP ne doit PAS essayer de devenir un assistant qui contrôle tout l'ordinateur.

Il doit démontrer une seule boucle complète :

> **Goal → Context → Agent → Intervention → Action → Measurement**

---

# 8. Cahier des charges MVP

## 8.1 Interface utilisateur

Créer une application web avec :

### Dashboard

Afficher :

- objectifs actifs ;
- session actuelle ;
- progression ;
- temps de focus ;
- distractions ;
- historique ;
- recommandations.

### Goal creation

Formulaire :

```text
Goal title
Description
Target date
Daily focus target
Priority
```

Exemple :

```text
Title:
Build my hackathon MVP

Daily target:
120 minutes

Deadline:
September 14
```

---

# 9. Fonctionnalité principale : Start Focus

Bouton :

> **Start Focus Session**

L'utilisateur choisit :

```text
Goal
Duration
```

Exemple :

```text
Goal:
Build MVP

Duration:
90 minutes
```

Momentum crée une session.

---

# 10. Browser Agent

Le MVP doit intégrer un contexte navigateur.

Le navigateur permet de détecter :

- domaine actif ;
- URL ;
- temps passé ;
- changement de site ;
- navigation vers des domaines définis comme distractions.

Exemple :

```text
Productive domains
github.com
docs.google.com
localhost
notion.so

Distraction domains
youtube.com
instagram.com
tiktok.com
reddit.com
```

Le système doit permettre à l'utilisateur de personnaliser ces catégories.

---

# 11. Context Engine

Le Context Engine transforme les événements bruts en contexte compréhensible.

### Événements

```text
USER_STARTED_SESSION
USER_OPENED_SITE
USER_CHANGED_TAB
USER_IDLE
USER_RETURNED
SESSION_ENDED
```

### Contexte

```json
{
  "goal": "Build MVP",
  "session_duration": 90,
  "elapsed": 32,
  "current_domain": "youtube.com",
  "productive": false,
  "distraction_duration": 420,
  "last_productive_activity": 180
}
```

Ce contexte est envoyé à l'agent.

---

# 12. Agent Decision Engine

L'agent doit décider s'il faut intervenir.

Exemple :

```text
IF
focus_session = active
AND
current_domain = distraction
AND
distraction_duration > threshold

THEN
generate intervention
```

L'IA peut ensuite adapter le message selon le contexte.

Exemple :

> « Tu avais prévu de terminer l'authentification aujourd'hui. Tu es sur YouTube depuis 8 minutes. Retourner au travail ? »

---

# 13. Agentic Actions

Le MVP doit démontrer de vraies actions.

Actions possibles :

### Action 1 — Return to work

- fermer/masquer la distraction ;
- revenir au dernier site productif.

### Action 2 — Open workspace

Ouvrir :

- projet ;
- documentation ;
- GitHub ;
- outil de travail.

### Action 3 — Pause

L'utilisateur peut demander une pause.

### Action 4 — End session

L'agent termine proprement la session et sauvegarde les données.

---

# 14. Human-in-the-loop

Une règle importante :

> Momentum ne doit jamais donner l'impression de contrôler l'utilisateur.

Les actions sensibles doivent nécessiter une confirmation.

Exemple :

```text
Momentum wants to:
✓ close YouTube
✓ return to GitHub
✓ continue your focus session

[Approve]
[Cancel]
```

Le système doit prévoir des permissions.

---

# 15. Session Analytics

À la fin de chaque session :

### Métriques

- durée prévue ;
- durée réelle ;
- temps productif ;
- temps de distraction ;
- temps d'inactivité ;
- nombre d'interruptions ;
- nombre de changements de contexte ;
- objectif concerné ;
- progression.

### Exemple

```text
Today's Session

90 min planned
71 min productive
12 min distractions
7 min idle

Productivity score:
79%

Main distraction:
YouTube

Most productive period:
09:15–10:05
```

---

# 16. Daily Reflection

À la fin de la journée, Momentum peut générer automatiquement :

> **Daily Reflection**

```text
Today

You planned 3 hours of focused work.
You completed 2h17.

Your strongest session:
10:00–11:30

Your biggest distraction:
YouTube

Observation:
Your focus decreased significantly after 16:00.

Recommendation:
Schedule difficult tasks before 15:00 tomorrow.
```

Cette fonctionnalité est importante car elle commence à transformer les données de tracking en **intelligence comportementale**.

---

# 17. Architecture MVP

Architecture recommandée :

```text
                    ┌────────────────────┐
                    │     User           │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ Web App            │
                    │ React / Next.js    │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │ Context Engine     │
                    │                    │
                    │ Events             │
                    │ Session state      │
                    │ User goals         │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ AI Agent           │
                    │ OpenAI             │
                    │                    │
                    │ Reasoning          │
                    │ Decision           │
                    │ Intervention       │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │ Action Layer       │
                    │                    │
                    │ Browser            │
                    │ Timer              │
                    │ Notifications      │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ Event / Data Store │
                    └────────────────────┘
```

---

# 18. Technologies possibles

## Frontend

- React / Next.js
- Tailwind CSS
- CopilotKit pour l'agentic UX

## Backend

- Python + FastAPI
- ou TypeScript / Node.js

## AI

- OpenAI
- éventuellement OpenRouter pour expérimenter plusieurs modèles

## Browser

- Chrome Extension pour le contexte navigateur
- Playwright pour certaines actions automatisées

## Database

- PostgreSQL
- ou Supabase pour accélérer le MVP

## Background jobs

- Trigger.dev

## Recherche

- Exa pour les objectifs nécessitant de la recherche.

Exemple :

> « Je veux apprendre les AI Agents. »

Momentum pourrait rechercher automatiquement :

- cours ;
- documentation ;
- articles ;
- papers ;
- GitHub ;
- ressources adaptées au niveau de l'utilisateur.

## Authentication

- Auth0

---

# 19. Utilisation des sponsors

## OpenAI

Rôle :

- raisonnement de l'agent ;
- compréhension du contexte ;
- génération d'interventions ;
- analyse des sessions ;
- personnalisation des recommandations.

## CopilotKit

Rôle :

- interface agentique ;
- interaction avec l'état de l'application ;
- affichage des actions de l'agent ;
- human-in-the-loop ;
- expérience utilisateur contextuelle.

## Trigger.dev

Rôle :

- daily reflection ;
- rappels ;
- analyse nocturne ;
- génération de rapports hebdomadaires ;
- tâches asynchrones.

## Exa

Rôle :

Transformer un objectif abstrait en plan d'apprentissage/action.

Exemple :

```text
Goal:
Become good at AI Agents.

Exa research
      ↓
Relevant resources
      ↓
Personalized learning path
      ↓
Weekly objectives
      ↓
Daily tasks
```

## Auth0

Rôle :

- authentification ;
- gestion de l'identité ;
- permissions ;
- contrôle des capacités de l'agent.

## Mozilla

Rôle potentiel :

Positionner Momentum comme un produit **privacy-first**.

Le tracking comportemental est extrêmement sensible.

Le produit doit donc donner à l'utilisateur une visibilité claire sur :

- ce qui est collecté ;
- pourquoi ;
- combien de temps ;
- ce qui est envoyé au modèle ;
- ce que l'agent peut faire.

## Google Cloud Run

Déploiement du backend et des services du MVP.

---

# 20. Cas d'utilisation

## Use Case 1 — Deep Work

Utilisateur :

> « Je veux travailler deux heures sans distraction. »

Momentum :

1. démarre une session ;
2. prépare l'environnement ;
3. surveille le contexte ;
4. détecte les distractions ;
5. intervient ;
6. mesure le résultat.

---

## Use Case 2 — Learning

Utilisateur :

> « Je veux apprendre Python. »

Momentum :

1. clarifie l'objectif ;
2. recherche les ressources ;
3. construit un parcours ;
4. planifie les sessions ;
5. suit les progrès ;
6. adapte le parcours.

---

## Use Case 3 — Procrastination

L'utilisateur commence une session.

Après 15 minutes :

```text
Current task:
Write project documentation

Current activity:
Social media

Momentum:
You've been away from your goal for 9 minutes.
```

Il propose une intervention.

---

## Use Case 4 — User stuck

L'utilisateur reste longtemps sur la même tâche.

Momentum détecte :

```text
No meaningful progress
for 18 minutes.
```

Il peut demander :

> « Are you stuck? »

Puis proposer :

- analyser le problème ;
- rechercher une solution ;
- ouvrir la documentation ;
- générer une première proposition.

---

## Use Case 5 — End-of-day reflection

L'agent analyse automatiquement la journée.

Il identifie :

- objectifs accomplis ;
- objectifs abandonnés ;
- distractions ;
- périodes efficaces ;
- habitudes ;
- problèmes récurrents.

---

## Use Case 6 — Weekly Personal Review

Chaque semaine :

```text
Weekly Review

Focus:
+18%

Average session:
74 min

Best day:
Tuesday

Most common distraction:
Social media

Goal completion:
6 / 8

Pattern:
You perform better before 14:00.
```

Puis :

> « I recommend moving your most difficult tasks to the morning. »

---

# 21. Données collectées

Le MVP peut collecter des événements relativement simples.

```text
timestamp
event_type
domain
session_id
goal_id
duration
productive/distraction classification
user_action
agent_action
agent_recommendation
session_result
```

Exemple :

```json
{
  "timestamp": "...",
  "event": "SITE_OPENED",
  "domain": "youtube.com",
  "session_id": "abc123",
  "classification": "distraction"
}
```

---

# 22. La vraie valeur à long terme : Behavioral Data

Le tracking n'est pas uniquement destiné à afficher des graphiques.

Avec suffisamment de données, Momentum pourrait construire un modèle du comportement de chaque utilisateur.

### Exemple

Après plusieurs semaines :

```text
User behavior profile

Best focus:
09:00–12:00

Average focus duration:
52 min

Typical distraction:
social media

Common trigger:
task difficulty

Recovery strategy:
short break + concrete next action

Highest completion rate:
tasks broken into <30 min units
```

Le produit passe alors de :

**Productivity tracker**

à :

**Behavioral intelligence system**

---

# 23. Personal Behavior Model

À long terme, chaque utilisateur pourrait avoir un modèle comportemental dynamique.

```text
                    USER
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Goals      Habits      Context
          │          │          │
          └──────────┼──────────┘
                     ▼
             Behavior Model
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
       Patterns   Triggers   Outcomes
          │          │          │
          └──────────┼──────────┘
                     ▼
                AI Agent
                     │
                     ▼
               Intervention
                     │
                     ▼
                 Outcome
                     │
                     └──────→ Learning
```

---

# 24. Perspectives produit

## Phase 1 — Focus Agent

MVP :

- goals ;
- focus sessions ;
- browser context ;
- distraction detection ;
- interventions ;
- analytics.

---

## Phase 2 — Personal Productivity Agent

Ajouter :

- calendrier ;
- tâches ;
- email ;
- Slack / Teams ;
- notifications ;
- documents ;
- project management.

Momentum devient capable de comprendre le contexte professionnel complet.

---

## Phase 3 — Personal Learning Agent

Ajouter :

- recherche intelligente ;
- learning paths ;
- adaptive learning ;
- tests ;
- spaced repetition ;
- recommandations de ressources.

L'agent peut suivre non seulement :

> « Combien de temps ai-je travaillé ? »

mais :

> « Est-ce que je progresse réellement ? »

---

## Phase 4 — Life Operating System

Momentum pourrait connecter :

```text
Calendar
Tasks
Browser
Email
Work apps
Learning
Fitness
Finance
Personal goals
```

Le système ne chercherait plus seulement à optimiser le temps.

Il chercherait à optimiser :

> **l'écart entre la vie souhaitée et le comportement réel.**

---

# 25. Behavioral Digital Twin

Une évolution particulièrement intéressante serait la création d'un **Behavioral Digital Twin**.

Ce n'est pas un clone de la personne.

C'est un modèle probabiliste de ses comportements.

Exemple :

```text
When:
- task is difficult
- session > 45 min
- afternoon

Probability of distraction:
72%

Best intervention:
5-minute break

Probability of returning:
81%
```

Avec suffisamment de données, Momentum pourrait prédire :

- risque de procrastination ;
- risque d'abandon ;
- moment optimal pour travailler ;
- type d'intervention efficace ;
- durée optimale d'une session ;
- meilleur moment pour apprendre.

---

# 26. Personalization Loop

Le système pourrait expérimenter différentes interventions.

```text
Intervention A
"Return to work?"

Result:
user ignores

        ↓

Intervention B
"Take a 5-minute break?"

Result:
user accepts

        ↓

Intervention C
"Let's complete only the next 10 minutes."

Result:
user returns
```

Momentum apprend alors :

> « Pour cet utilisateur, les interventions concrètes fonctionnent mieux que les rappels génériques. »

Cela crée un système de **personalized behavioral intervention**.

---

# 27. Future AI Agent Marketplace

À très long terme, Momentum pourrait devenir une plateforme dans laquelle différents agents spécialisés collaborent.

```text
                  MOMENTUM
                      │
       ┌──────────────┼──────────────┐
       ▼              ▼              ▼
 Productivity      Learning        Career
    Agent            Agent          Agent
       │              │              │
       └──────────────┼──────────────┘
                      ▼
                Personal Agent
```

Exemple :

> « Je veux devenir AI Consultant dans 12 mois. »

Le système pourrait construire :

```text
Career Agent
     ↓
Skills gap

Learning Agent
     ↓
Learning plan

Productivity Agent
     ↓
Daily execution

Research Agent
     ↓
Resources / market intelligence

Reflection Agent
     ↓
Weekly adaptation
```

---

# 28. Data Flywheel

Le potentiel du produit repose sur une boucle de données.

```text
User behavior
      ↓
Context
      ↓
Agent decision
      ↓
Intervention
      ↓
User response
      ↓
Outcome
      ↓
Learning
      ↓
Better intervention
      ↓
More data
```

Plus le système est utilisé, plus il comprend :

- les habitudes ;
- les préférences ;
- les déclencheurs ;
- les périodes de performance ;
- les interventions efficaces.

La valeur ne vient donc pas uniquement du LLM.

Elle vient de la combinaison :

> **LLM + contexte + historique comportemental + feedback + actions.**

---

# 29. Privacy & Ethics

Cette partie doit être centrale.

Momentum manipule potentiellement des données extrêmement sensibles.

Le produit doit adopter une philosophie :

> **The user owns the data.**

Principes :

### Transparency

L'utilisateur doit savoir ce qui est collecté.

### Consent

Chaque capacité doit être explicitement autorisée.

### Control

L'utilisateur peut désactiver une source de contexte.

### Data minimization

Ne collecter que les données nécessaires.

### Local-first quand possible

Les événements bruts peuvent idéalement rester locaux et seuls les résumés/contextes nécessaires être transmis au modèle.

### No hidden surveillance

Momentum doit être présenté comme un outil personnel, pas comme un outil de surveillance.

---

# 30. Ce qu'il ne faut PAS faire dans le MVP

Pour éviter un projet trop ambitieux :

Ne pas essayer de construire immédiatement :

- intégration de toutes les applications ;
- contrôle complet de l'ordinateur ;
- suivi de santé ;
- suivi financier ;
- réseau social ;
- assistant vocal complet ;
- application mobile native ;
- modèle propriétaire ;
- système de prédiction complexe.

Le MVP doit prouver une seule chose :

> **Un agent qui comprend le contexte de travail peut réellement améliorer le comportement de l'utilisateur.**

---

# 31. Scénario de démonstration Hackathon

## Acte 1 — Intent

L'utilisateur saisit :

> « I want to finish my hackathon MVP in the next 90 minutes. »

---

## Acte 2 — Agent setup

Momentum affiche :

```text
Goal detected.

I'll prepare a 90-minute focus session.

Context:
✓ Project workspace
✓ Documentation
✓ GitHub

Distractions:
YouTube
Instagram
Reddit
```

---

## Acte 3 — Work

L'utilisateur travaille.

Le dashboard affiche en temps réel :

```text
Focus Session
42:18 remaining

Goal progress
68%

Current context
GitHub

Status
Focused
```

---

## Acte 4 — Distraction

L'utilisateur ouvre YouTube.

Momentum détecte le changement.

```text
You are in a focus session.

You've been on YouTube for 2 minutes.

Your goal is:
Finish the hackathon MVP.

[Return to work]
[Take 5 min]
```

---

## Acte 5 — Agent action

L'utilisateur choisit :

> Return to work

Momentum revient au workspace.

---

## Acte 6 — Reflection

Session terminée.

```text
Session completed.

Planned:
90 min

Focused:
76 min

Distraction:
9 min

Goal progress:
68% → 91%

Momentum learned:
You recover quickly when given a concrete next action.
```

Le jury comprend immédiatement :

**Le produit n'a pas seulement parlé à l'utilisateur. Il a compris son contexte et agi.**

---

# 32. Pourquoi le projet correspond au thème du hackathon

Le thème demande de sortir l'agent de la simple conversation.

Momentum le fait naturellement.

L'agent vit dans :

- le navigateur ;
- l'environnement de travail ;
- les tâches ;
- le calendrier ;
- les notifications ;
- éventuellement Slack / Teams.

La valeur de l'agent dépend directement du contexte.

Un chatbot pourrait répondre :

> « Essaie de ne pas aller sur YouTube. »

Momentum peut savoir :

> « Tu es actuellement dans une session de 90 minutes consacrée à ton projet, tu es sur YouTube depuis 8 minutes, et ton deadline est demain. »

Puis agir.

C'est cette différence qui constitue le cœur de l'innovation.

---

# 33. Critères de réussite du MVP

Le MVP est considéré comme réussi si un utilisateur peut :

1. créer un objectif ;
2. démarrer une session ;
3. travailler dans son navigateur ;
4. générer des événements de contexte ;
5. détecter une distraction ;
6. recevoir une intervention de l'agent ;
7. accepter/refuser l'action ;
8. terminer la session ;
9. consulter ses métriques ;
10. obtenir une réflexion générée par l'IA.

Le flow doit fonctionner **de bout en bout sans intervention manuelle des développeurs**.

---

# 34. KPI du futur produit

### Productivity

- focus time ;
- distraction time ;
- session completion rate ;
- goal completion rate.

### Behavior

- intervention acceptance rate ;
- recovery rate ;
- distraction recurrence ;
- context switching.

### Personalization

- intervention effectiveness ;
- predicted distraction probability ;
- optimal session duration ;
- optimal work period.

### Long-term

- goal achievement ;
- habit consistency ;
- behavior improvement over time.

---

# 35. Business Model potentiel

## Freemium

### Free

- objectifs ;
- focus sessions ;
- statistiques basiques.

### Pro

- AI behavioral analysis ;
- personalized interventions ;
- calendar integration ;
- learning agent ;
- advanced analytics ;
- long-term memory.

### Teams

Une version différente pourrait être créée pour les équipes, avec prudence sur la confidentialité :

- focus culture ;
- team productivity patterns ;
- workload analysis ;
- meeting optimization.

Important : les données individuelles ne devraient pas devenir un outil de surveillance des employés.

---

# 36. Vision finale

Momentum pourrait devenir beaucoup plus qu'une application de productivité.

Le concept final est :

> **A personal agent that understands how you actually behave, not just what you say you want.**

Aujourd'hui :

```text
"I want to work."
```

Momentum :

```text
Understands context
→ helps you start
→ detects drift
→ intervenes
→ measures outcome
→ learns
```

Demain :

```text
"I want to become X."
```

Momentum :

```text
Understands X
→ identifies what must change
→ builds a plan
→ manages the environment
→ observes behavior
→ adapts interventions
→ measures progress
→ learns what works for you
```

La vision ultime est donc :

# **Momentum — From intention to behavior.**

Le produit ne cherche pas à devenir un meilleur coach.

Il cherche à devenir un meilleur **système d'exécution personnel**.
