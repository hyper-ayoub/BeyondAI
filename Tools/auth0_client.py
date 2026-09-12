"""
auth0_client.py

OPTIONNEL - à activer seulement si besoin de multi-utilisateurs.

Tant que l'app reste mono-utilisateur (usage personnel), ce fichier n'a
pas besoin d'être branché : ignore-le complètement.

Setup minimal : récupération d'un token M2M pour appeler l'API de gestion
Auth0 (utile pour créer/lister des utilisateurs côté serveur).
"""

import requests

from config import AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN


def get_management_token() -> str | None:
    """
    Récupère un access token M2M pour l'API de gestion Auth0.
    Retourne None (et prévient) si les variables AUTH0_* sont absentes ou
    si l'appel échoue — ne lève jamais d'exception non gérée.
    """
    if not (AUTH0_DOMAIN and AUTH0_CLIENT_ID and AUTH0_CLIENT_SECRET):
        print("[auth0_client] Variables AUTH0_* manquantes — Auth0 désactivé (normal si non utilisé).")
        return None

    try:
        response = requests.post(
            f"https://{AUTH0_DOMAIN}/oauth/token",
            json={
                "client_id": AUTH0_CLIENT_ID,
                "client_secret": AUTH0_CLIENT_SECRET,
                "audience": f"https://{AUTH0_DOMAIN}/api/v2/",
                "grant_type": "client_credentials",
            },
            timeout=10,
        )
        response.raise_for_status()
        return response.json().get("access_token")
    except Exception as e:
        print(f"[auth0_client] Erreur lors de l'authentification Auth0: {e}")
        return None
