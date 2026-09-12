"""
test_keys.py

Teste chaque clé présente dans .env avec un appel minimal et affiche
clairement ✅ ou ❌ pour chacune.

Volontairement indépendant de config.py (qui, lui, arrête le programme si
OPENAI_API_KEY est absente) : ce script doit pouvoir tourner même si
aucune clé n'est encore configurée, pour te dire précisément ce qui manque.

Usage : python Tools/test_keys.py
"""

import os
import sys

from dotenv import load_dotenv

# Force l'UTF-8 en sortie : évite un UnicodeEncodeError sur les consoles
# Windows (cp1252) qui ne savent pas afficher ✅ / ❌ nativement.
try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

load_dotenv()


def test_openai():
    key = os.getenv("OPENAI_API_KEY")
    if not key:
        return False, "OPENAI_API_KEY absente"
    try:
        from openai import OpenAI

        client = OpenAI(api_key=key)
        client.models.list()
        return True, "connexion OK"
    except Exception as e:
        return False, str(e)


def test_trigger():
    key = os.getenv("TRIGGER_API_KEY")
    project_id = os.getenv("TRIGGER_PROJECT_ID")
    if not key or not project_id:
        return False, "TRIGGER_API_KEY ou TRIGGER_PROJECT_ID absente"
    try:
        import requests

        response = requests.get(
            "https://api.trigger.dev/api/v1/projects",
            headers={"Authorization": f"Bearer {key}"},
            timeout=10,
        )
        return response.status_code == 200, f"status {response.status_code}"
    except Exception as e:
        return False, str(e)


def test_auth0():
    domain = os.getenv("AUTH0_DOMAIN")
    client_id = os.getenv("AUTH0_CLIENT_ID")
    client_secret = os.getenv("AUTH0_CLIENT_SECRET")
    if not (domain and client_id and client_secret):
        return False, "AUTH0_* absente (optionnel)"
    try:
        import requests

        response = requests.post(
            f"https://{domain}/oauth/token",
            json={
                "client_id": client_id,
                "client_secret": client_secret,
                "audience": f"https://{domain}/api/v2/",
                "grant_type": "client_credentials",
            },
            timeout=10,
        )
        return response.status_code == 200, f"status {response.status_code}"
    except Exception as e:
        return False, str(e)


def test_exa():
    key = os.getenv("EXA_API_KEY")
    if not key:
        return False, "EXA_API_KEY absente (optionnel)"
    try:
        import requests

        response = requests.post(
            "https://api.exa.ai/search",
            headers={"x-api-key": key},
            json={"query": "test", "numResults": 1},
            timeout=10,
        )
        return response.status_code == 200, f"status {response.status_code}"
    except Exception as e:
        return False, str(e)


def test_copilotkit():
    """
    CopilotKit Cloud n'expose pas d'endpoint public documenté pour
    valider une clé isolément (la clé publique ck_pub_... est vérifiée
    par leur SDK quand le provider React s'y connecte réellement).
    Ce test se limite donc à : format correct + service Copilot Cloud
    joignable. Ce n'est PAS une preuve que la clé est acceptée — seule
    l'UI branchée (voir copilotkit_setup.md) le confirmera vraiment.
    """
    key = os.getenv("COPILOTKIT_PUBLIC_API_KEY")
    if not key:
        return False, "COPILOTKIT_PUBLIC_API_KEY absente (optionnel)"
    if not key.startswith("ck_pub_"):
        return False, "format inattendu (attendu: préfixe ck_pub_)"
    try:
        import requests

        response = requests.get("https://api.cloud.copilotkit.ai/", timeout=10)
        reachable = response.status_code < 500
        detail = (
            "format valide, Copilot Cloud joignable — validation complète "
            "uniquement via le provider React (pas d'endpoint de test isolé)"
            if reachable
            else f"Copilot Cloud injoignable (status {response.status_code})"
        )
        return reachable, detail
    except Exception as e:
        return False, f"Copilot Cloud injoignable: {e}"


CHECKS = [
    ("OpenAI (obligatoire)", test_openai),
    ("Trigger.dev", test_trigger),
    ("Auth0 (optionnel)", test_auth0),
    ("Exa (optionnel)", test_exa),
    ("CopilotKit (optionnel)", test_copilotkit),
]


def main():
    print("Test des clés API — Tools/.env")
    print("-" * 44)
    for name, check in CHECKS:
        ok, detail = check()
        icon = "✅" if ok else "❌"
        print(f"{icon} {name:<22} {detail}")
    print("-" * 44)


if __name__ == "__main__":
    main()
