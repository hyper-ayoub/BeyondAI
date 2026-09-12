# Brancher CopilotKit sur l'interface

Ces étapes supposent une UI React (le frontend Next.js du projet, App Router).
Adapte les chemins si tu es sur Electron + React.

## 1. Installer les dépendances

```bash
npm install @copilotkit/react-core @copilotkit/react-ui
```

## 2. Créer une route API qui relaie vers OpenAI

Crée `src/app/api/copilotkit/route.ts` :

```ts
import { CopilotRuntime, OpenAIAdapter } from "@copilotkit/runtime";

const runtime = new CopilotRuntime();
const serviceAdapter = new OpenAIAdapter({ model: process.env.OPENAI_MODEL || "gpt-4o-mini" });

export async function POST(req: Request) {
  const { handleRequest } = runtime.streamHttpServerResponse(req, serviceAdapter);
  return handleRequest();
}
```

> Note : `OPENAI_API_KEY` doit être présente dans les variables d'environnement
> du frontend (`.env.local` à la racine du projet Next.js), pas seulement dans
> `Tools/.env` — ce sont deux runtimes séparés.

## 3. Envelopper l'app avec le provider

Dans `src/app/layout.tsx`, entoure `children` :

```tsx
import { CopilotKit } from "@copilotkit/react-core";

<CopilotKit runtimeUrl="/api/copilotkit">
  {children}
</CopilotKit>
```

> Alternative sans runtime auto-hébergé : si tu utilises Copilot Cloud
> (clé `ck_pub_...`, voir `COPILOTKIT_PUBLIC_API_KEY` dans `.env.example`),
> passe-la en `publicApiKey` et saute l'étape 2 :
> ```tsx
> <CopilotKit publicApiKey={process.env.NEXT_PUBLIC_COPILOTKIT_PUBLIC_API_KEY}>
> ```
> Rappel : côté Next.js, une variable lue dans le navigateur doit être
> préfixée `NEXT_PUBLIC_` et déclarée dans le `.env.local` du frontend
> (pas seulement dans `Tools/.env`, qui est côté Python/backend).

## 4. Ajouter l'UI (sidebar ou popup de chat)

```tsx
import "@copilotkit/react-ui/styles.css";
import { CopilotPopup } from "@copilotkit/react-ui";

<CopilotPopup
  instructions="Tu es l'agent de la session de focus active. Réponds brièvement."
  labels={{ title: "Momentum", initial: "Comment puis-je t'aider sur cette session ?" }}
/>
```

## 5. Exposer l'état de l'app à l'agent (human-in-the-loop)

C'est ce qui transforme CopilotKit d'un simple chat en agent contextuel :

```tsx
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";

// Donne à l'agent une lecture de l'état courant (goal, timer, contexte)
useCopilotReadable({
  description: "État de la session de focus en cours",
  value: { goal, durationMin, activeTab, elapsedMs },
});

// Déclare une action que l'agent peut PROPOSER (jamais exécuter seul)
useCopilotAction({
  name: "returnToWork",
  description: "Ramène l'utilisateur sur son onglet productif",
  handler: async () => {
    // toujours confirmée par l'utilisateur avant d'être appelée,
    // voir la section 14 (Human-in-the-loop) du cahier des charges
  },
});
```

## 6. Tester

```bash
npm run dev
```

Ouvre l'app, ouvre le popup CopilotKit, et vérifie qu'un message envoyé
déclenche bien une réponse (donc que la route `/api/copilotkit` atteint
OpenAI correctement).
