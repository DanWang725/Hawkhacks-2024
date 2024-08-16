# Operation: Fiish Downfall

## Hawkhacks-2024

abungus alert

## Getting Started

### Installing Node Modules (Frontend)

```bash
yarn install
```

### Installing Python Libraries (Backend)

Run the commands

```bash
cd backend
python -m venv venv
./venv\Scripts\activate
pip install -r requirements.txt
```

## Running Dev Servers

### Frontend

```bash
yarn start
```

### Backend

```bash
cd backend
uvicorn main:app --reload
```

## .env

You will need to contact someone with access in order to get some of these environment variables

### Backend

Create file `.env` in `./backend/`.

1. USE_AI = 1
2. DATABASE_URL = ...
3. OPENAI_API_KEY = ...
