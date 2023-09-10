![Alt](https://repobeats.axiom.co/api/embed/6ae6cbb4b85145dd31153fbc72fd3d7f7af961a0.svg "Repobeats analytics image")




docker build -t mortezaeghbalicenta/centa-bee:latest .
docker run -d --name bee -v $(pwd)/front/.env:/app/.env -it  -p 80:3000 -d mortezaeghbalicenta/centa-bee