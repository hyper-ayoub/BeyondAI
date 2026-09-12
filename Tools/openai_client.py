"""
openai_client.py

Client OpenAI réutilisable. Deux fonctions prêtes à l'emploi :
  - classify_activity(window_title) : classe une activité comme productive
    ou distraction à partir du titre de la fenêtre active.
  - generate_mirror(plan, activity_log) : compare le plan prévu au
    comportement réel et génère une réflexion (le "miroir").

Aucune clé en dur : tout vient de config.py -> .env.
"""

from openai import OpenAI

from config import OPENAI_API_KEY, OPENAI_MODEL

client = OpenAI(api_key=OPENAI_API_KEY)


def classify_activity(window_title: str) -> str:
    """
    Classe une activité comme "productive" ou "distraction" à partir du
    titre de la fenêtre/onglet actif.

    Retourne "productive", "distraction", ou "unknown" si la réponse du
    modèle est ambiguë ou si l'appel API échoue.
    """
    try:
        response = client.chat.completions.create(
            model=OPENAI_MODEL,
            temperature=0,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Tu classes une activité informatique comme "
                        "'productive' ou 'distraction' à partir du titre "
                        "de sa fenêtre. Réponds uniquement par l'un de ces "
                        "deux mots, sans ponctuation."
                    ),
                },
                {"role": "user", "content": f"Titre de la fenêtre active : {window_title}"},
            ],
        )
        result = (response.choices[0].message.content or "").strip().lower()
        return result if result in ("productive", "distraction") else "unknown"
    except Exception as e:
        print(f"[openai_client] Erreur lors de classify_activity: {e}")
        return "unknown"


def generate_mirror(plan: str, activity_log: list[str]) -> str:
    """
    Génère le "miroir" de la session : une réflexion courte et honnête qui
    compare le plan initial de l'utilisateur (plan) à ce qu'il a réellement
    fait (activity_log, une liste de lignes d'activité horodatées).

    Retourne toujours une chaîne de caractères, même en cas d'erreur API.
    """
    try:
        log_text = "\n".join(f"- {entry}" for entry in activity_log) or "(aucune activité enregistrée)"
        response = client.chat.completions.create(
            model=OPENAI_MODEL,
            temperature=0.4,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "Tu es Flow Mirror, un agent qui compare l'intention "
                        "d'un utilisateur à son comportement réel pendant une "
                        "session de travail. Réponds en 3 à 5 phrases, ton "
                        "honnête et bienveillant, toujours avec une "
                        "recommandation concrète pour la prochaine session."
                    ),
                },
                {
                    "role": "user",
                    "content": f"Plan prévu :\n{plan}\n\nActivité réelle :\n{log_text}",
                },
            ],
        )
        return (response.choices[0].message.content or "").strip()
    except Exception as e:
        print(f"[openai_client] Erreur lors de generate_mirror: {e}")
        return "Impossible de générer le miroir pour le moment (erreur API OpenAI)."
