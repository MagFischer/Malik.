# Wichtige Befehle

## Server

```bash
# Einschalten (von zuhause)
wakeonlan bc:ee:7b:59:12:79

# Ausschalten
ssh king@10.0.0.1 "sudo shutdown now"

# Neustarten
ssh king@10.0.0.1 "sudo reboot"

# SSH Verbindung
ssh king@10.0.0.1
```

## Website

```bash
# Status prüfen
ssh king@10.0.0.1 "cd ~/personal-website && sudo docker compose ps"

# Logs anzeigen
ssh king@10.0.0.1 "cd ~/personal-website && sudo docker compose logs -f"

# Neustarten
ssh king@10.0.0.1 "cd ~/personal-website && sudo docker compose restart"

# Update & Deploy
ssh king@10.0.0.1 "cd ~/personal-website && git pull && sudo docker compose up -d --build"
```

## Lokal entwickeln

```bash
# Dev-Server starten
cd /Users/malik/Projects/personal-website && pnpm dev

# Änderungen pushen
git add . && git commit -m "Beschreibung" && git push
```

## VPN

Wireguard App auf Mac aktivieren/deaktivieren.

- **Von zuhause:** VPN optional, kannst auch `192.168.1.127` nutzen
- **Von unterwegs:** VPN aktivieren, dann `10.0.0.1` nutzen

## Wichtige Adressen

| Was | Adresse |
|-----|---------|
| Website | https://magnanmalik.com |
| E-Mail | info@magnanmalik.com |
| Server lokal | 192.168.1.127 |
| Server VPN | 10.0.0.1 |
| Server MAC | bc:ee:7b:59:12:79 |
