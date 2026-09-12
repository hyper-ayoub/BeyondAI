# Tools/

Intégrations backend (OpenAI, Trigger.dev, Auth0, Exa, CopilotKit) pour le
projet. Ce dossier est indépendant du frontend Next.js : c'est du Python.

```
Tools/
├── .env.example        # variables à renseigner (aucune vraie clé ici)
├── config.py            # charge .env et valide les clés obligatoires
├── openai_client.py      # classify_activity() + generate_mirror()
├── trigger_client.py     # scheduler du résumé du soir
├── auth0_client.py       # optionnel — multi-utilisateurs
├── exa_client.py         # optionnel — recherche de conseils
├── copilotkit_setup.md   # branchement de CopilotKit sur l'UI React
├── test_keys.py          # teste chaque clé et affiche ✅ / ❌
└── README.md             # ce fichier
```

## 1. Copier .env.example vers .env

```bash
cd Tools
cp .env.example .env
```

`.env` est déjà couvert par le `.gitignore` du projet (pattern `.env*`) —
vérifie que `git status` ne le liste jamais avant de commit quoi que ce soit.

## 2. Où mettre chaque clé

| Variable | Où la récupérer |
|---|---|
| `OPENAI_API_KEY` | platform.openai.com → API keys |
| `OPENAI_MODEL` | nom du modèle à utiliser (défaut : `gpt-4o-mini`, pas besoin de compte) |
| `TRIGGER_API_KEY` / `TRIGGER_PROJECT_ID` | cloud.trigger.dev → Project settings → API keys |
| `TRIGGER_EVENING_SUMMARY_TIME` | heure fixe au format `HH:MM`, choisie par toi |
| `AUTH0_DOMAIN` / `AUTH0_CLIENT_ID` / `AUTH0_CLIENT_SECRET` | manage.auth0.com → Applications → ton app |
| `EXA_API_KEY` | dashboard.exa.ai → API keys |
| `COPILOTKIT_PUBLIC_API_KEY` | cloud.copilotkit.ai → Settings → API keys (clé publique `ck_pub_...`, utilisée côté frontend, voir `copilotkit_setup.md`) |

Colle chaque valeur directement dans `Tools/.env`, sur la ligne correspondante.

## 3. Installer les dépendances puis tester chaque clé

```bash
pip install python-dotenv openai requests schedule
python Tools/test_keys.py
```

Chaque ligne affiche ✅ si la clé fonctionne, ❌ sinon (avec la raison —
clé absente, rejetée par l'API, etc.). Le script ne plante jamais : il
teste tout ce qui est présent, sans s'arrêter sur la première erreur.

## 4. Ordre de priorité si le temps manque

1. **OpenAI — obligatoire.** Sans ça, `classify_activity()` et
   `generate_mirror()` ne fonctionnent pas : c'est le cœur de l'agent.
2. **Trigger.dev — ensuite.** Utile pour le résumé du soir automatique,
   mais l'app fonctionne très bien sans (déclenche-le manuellement en
   attendant via `send_evening_summary()` dans `trigger_client.py`).
3. **Auth0, Exa et CopilotKit — en dernier, optionnels.** Auth0 ne sert
   qu'au multi-utilisateurs ; Exa n'ajoute que des conseils externes ;
   CopilotKit n'est utile que si l'UI React/Electron doit devenir
   agentique. Les trois se désactivent proprement (message clair, pas de
   crash) si leurs clés sont absentes.

> Note sur `test_keys.py` et CopilotKit : contrairement à OpenAI/Exa/
> Trigger.dev/Auth0, CopilotKit Cloud n'a pas d'endpoint public isolé
> pour valider une clé. Le script vérifie donc le format de la clé et
> que Copilot Cloud est joignable, mais la vraie confirmation vient du
> provider React connecté (étape 6 de `copilotkit_setup.md`).
