"""
exa_client.py

OPTIONNEL - à activer seulement si besoin de recherche de ressources externes.

Fonction find_productivity_tip(pattern) : cherche un conseil pertinent via
l'API Exa à partir d'un pattern comportemental détecté par l'agent
(ex: "procrastination sur les réseaux sociaux en fin d'après-midi").
"""

import requests

from config import EXA_API_KEY

EXA_SEARCH_URL = "https://api.exa.ai/search"


def find_productivity_tip(pattern: str) -> str:
    """
    Retourne un conseil de productivité pertinent pour le pattern donné.
    Ne lève jamais d'exception : retourne un message explicite en cas
    d'absence de clé ou d'erreur API.
    """
    if not EXA_API_KEY:
        return "EXA_API_KEY manquante — recherche de conseils désactivée (normal si non utilisé)."

    try:
        response = requests.post(
            EXA_SEARCH_URL,
            headers={"x-api-key": EXA_API_KEY},
            json={
                "query": f"conseil de productivité pour : {pattern}",
                "numResults": 1,
                "type": "neural",
            },
            timeout=10,
        )
        response.raise_for_status()
        results = response.json().get("results", [])
        if not results:
            return "Aucun conseil trouvé pour ce pattern."
        top = results[0]
        return top.get("title") or top.get("url", "Résultat trouvé sans titre.")
    except Exception as e:
        print(f"[exa_client] Erreur lors de la recherche Exa: {e}")
        return "Impossible de récupérer un conseil pour le moment (erreur API Exa)."
