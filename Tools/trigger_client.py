"""
trigger_client.py

Setup minimal pour déclencher le résumé du soir à heure fixe.

Deux modes, indépendants l'un de l'autre :

1. Scheduler local (par défaut, ne nécessite aucun compte externe) :
   une boucle légère basée sur la lib `schedule` qui appelle
   send_evening_summary() chaque jour à TRIGGER_EVENING_SUMMARY_TIME.
   -> pip install schedule requests

2. Trigger.dev (cloud) : si TRIGGER_API_KEY et TRIGGER_PROJECT_ID sont
   renseignés, trigger_cloud_event() envoie un event à Trigger.dev, qui
   exécutera le job correspondant défini côté Trigger.dev (dashboard / SDK).

Lancer le scheduler local : python Tools/trigger_client.py
"""

import time

import requests
import schedule

from config import TRIGGER_API_KEY, TRIGGER_PROJECT_ID, TRIGGER_EVENING_SUMMARY_TIME

TRIGGER_EVENT_URL = "https://api.trigger.dev/api/v1/events"


def send_evening_summary() -> None:
    """
    Callback exécuté chaque soir à l'heure programmée.
    À brancher sur la vraie logique (ex: openai_client.generate_mirror
    + envoi de notification), laissé volontairement simple ici.
    """
    print("[trigger_client] Génération du résumé du soir...")
    # from openai_client import generate_mirror
    # summary = generate_mirror(plan, activity_log)
    # -> notifier l'utilisateur avec `summary`


def trigger_cloud_event(event_name: str = "evening_summary", payload: dict | None = None):
    """
    Envoie un event à Trigger.dev pour déclencher un job défini côté cloud.
    Ne fait rien (et prévient) si TRIGGER_API_KEY/TRIGGER_PROJECT_ID sont absentes.
    """
    if not TRIGGER_API_KEY or not TRIGGER_PROJECT_ID:
        print("[trigger_client] TRIGGER_API_KEY ou TRIGGER_PROJECT_ID manquant — event non envoyé.")
        return None

    try:
        response = requests.post(
            TRIGGER_EVENT_URL,
            headers={"Authorization": f"Bearer {TRIGGER_API_KEY}"},
            json={"name": event_name, "payload": payload or {}, "projectId": TRIGGER_PROJECT_ID},
            timeout=10,
        )
        response.raise_for_status()
        print(f"[trigger_client] Event '{event_name}' envoyé à Trigger.dev.")
        return response.json()
    except Exception as e:
        print(f"[trigger_client] Erreur lors de l'envoi de l'event à Trigger.dev: {e}")
        return None


def run_local_scheduler() -> None:
    """Lance une boucle bloquante qui déclenche send_evening_summary() chaque jour."""
    schedule.every().day.at(TRIGGER_EVENING_SUMMARY_TIME).do(send_evening_summary)
    print(
        f"[trigger_client] Scheduler local démarré — résumé du soir prévu à "
        f"{TRIGGER_EVENING_SUMMARY_TIME} (Ctrl+C pour arrêter)."
    )
    while True:
        schedule.run_pending()
        time.sleep(30)


if __name__ == "__main__":
    run_local_scheduler()
