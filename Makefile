# ===========================================
# Makefile for Personal Website
# ===========================================

.PHONY: dev build start stop logs shell clean

# Development
dev:
	pnpm dev

# Docker commands
build:
	docker compose build

start:
	docker compose up -d

stop:
	docker compose down

restart:
	docker compose restart

logs:
	docker compose logs -f

logs-web:
	docker compose logs -f web

logs-caddy:
	docker compose logs -f caddy

# Shell access
shell:
	docker compose exec web sh

shell-db:
	docker compose exec db psql -U $${POSTGRES_USER:-malik} -d $${POSTGRES_DB:-personal_website}

# Database
db-backup:
	docker compose exec db pg_dump -U $${POSTGRES_USER:-malik} $${POSTGRES_DB:-personal_website} > backup_$$(date +%Y%m%d_%H%M%S).sql

db-restore:
	@read -p "Enter backup file: " file; \
	docker compose exec -T db psql -U $${POSTGRES_USER:-malik} $${POSTGRES_DB:-personal_website} < $$file

# Cleanup
clean:
	docker compose down -v --rmi local
	rm -rf .next node_modules

# Production build test
build-test:
	docker compose build --no-cache
	docker compose up -d
	@echo "Waiting for services to start..."
	@sleep 10
	@curl -s http://localhost | head -20
	docker compose down

# Update
update:
	git pull
	docker compose build
	docker compose up -d

# Status
status:
	docker compose ps
	@echo ""
	@echo "Health checks:"
	@docker compose exec web wget -q --spider http://localhost:3000 && echo "Web: OK" || echo "Web: FAILED"
