"""
config.py

Charge et valide les variables d'environnement pour tous les clients de Tools/.
Si une clé OBLIGATOIRE manque, le programme affiche un message clair et
s'arrête au démarrage plutôt que d'échouer plus tard avec une erreur obscure.

Les clients optionnels (Auth0, Exa) ne font pas planter le démarrage :
ils se désactivent simplement si leur clé est absente (voir leurs fichiers).
"""

import os
import sys

from dotenv import load_dotenv

load_dotenv()

# Clés dont l'absence bloque le démarrage de l'application.
REQUIRED_KEYS = [
    "OPENAI_API_KEY",
]

# Clés optionnelles, avec une valeur par défaut appliquée si absentes.
OPTIONAL_KEYS = {
    "OPENAI_MODEL": "gpt-4o-mini",
    "TRIGGER_API_KEY": None,
    "TRIGGER_PROJECT_ID": None,
    "TRIGGER_EVENING_SUMMARY_TIME": "20:00",
    "AUTH0_DOMAIN": None,
    "AUTH0_CLIENT_ID": None,
    "AUTH0_CLIENT_SECRET": None,
    "EXA_API_KEY": None,
    "COPILOTKIT_PUBLIC_API_KEY": None,
}


def _load_and_validate() -> dict:
    values = {}
    missing = []

    for key in REQUIRED_KEYS:
        value = os.getenv(key)
        if not value:
            missing.append(key)
        values[key] = value

    for key, default in OPTIONAL_KEYS.items():
        values[key] = os.getenv(key, default)

    if missing:
        print("\n[config] Variables d'environnement obligatoires manquantes :")
        for key in missing:
            print(f"  - {key}")
        print(
            "\nCopie Tools/.env.example vers Tools/.env et renseigne ces clés "
            "avant de relancer.\n"
        )
        sys.exit(1)

    return values


_config = _load_and_validate()

OPENAI_API_KEY = _config["OPENAI_API_KEY"]
OPENAI_MODEL = _config["OPENAI_MODEL"]
TRIGGER_API_KEY = _config["TRIGGER_API_KEY"]
TRIGGER_PROJECT_ID = _config["TRIGGER_PROJECT_ID"]
TRIGGER_EVENING_SUMMARY_TIME = _config["TRIGGER_EVENING_SUMMARY_TIME"]
AUTH0_DOMAIN = _config["AUTH0_DOMAIN"]
AUTH0_CLIENT_ID = _config["AUTH0_CLIENT_ID"]
AUTH0_CLIENT_SECRET = _config["AUTH0_CLIENT_SECRET"]
EXA_API_KEY = _config["EXA_API_KEY"]
COPILOTKIT_PUBLIC_API_KEY = _config["COPILOTKIT_PUBLIC_API_KEY"]
