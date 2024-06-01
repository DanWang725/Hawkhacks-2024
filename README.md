# Operation: Fiish Downfall

## Hawkhacks-2024

abungus alert

## Getting Started

### Installing Python Libraries

Run the commands

```bash
cd backend
python -m venv venv
./venv\Scripts\activate
pip install -r requirements.txt
```

Setup docker container for MySQL server

```bash
docker run --name my-database -p 3307:3306 -e MYSQL_ROOT_PASSWORD=root -d mysql:8.0

```

## Running Dev Servers

### Frontend

```bash
yarn start
```

### Backend

```bash
cd backend
python -m flask --app server run
```

or

```bash
cd backend
flask --app server run
```
