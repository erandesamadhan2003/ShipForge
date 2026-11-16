# ShipForge Infrastructure Rules

## Docker Rules
- Always use multi-stage builds to keep image sizes small.
- Never run containers as root. Always create a dedicated `ShipForge` user inside the Dockerfile.
- Do not hardcode environment variables in the Dockerfile `ENV` instructions if they are secrets.

## Kubernetes Rules
- **Strict Isolation:** Every user project deployed on ShipForge must run in its own dedicated Kubernetes `Namespace`. 
- **Resource Limits:** Always define `requests` and `limits` for CPU and Memory for user deployments to prevent noisy neighbors from crashing the cluster.
- **Secrets:** Never write raw secrets in Kubernetes YAML manifests. Use Kubernetes `Secret` objects, and populate them dynamically via the ShipForge deployment worker.

## Terraform Rules
- Keep state files secure. Never commit `.tfstate` files to source control.
- Parameterize environments (staging, production) using `.tfvars` files.