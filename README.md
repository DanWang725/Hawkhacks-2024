# Operation: Fiish Downfall

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

## Configuring Environment (.env)

You will need to contact someone with access in order to get some of these environment variables

### Frontend

If you do not have a `.env` in your base directory, create one.

It must contain:

1. `REACT_APP_FASTAPI_URL = http://127.0.0.1:8000`

### Backend

Create file `.env` in `./backend/`.

It must contain:

1. `USE_AI = 1`
2. `DATABASE_URL = ...`
3. `OPENAI_API_KEY = ...`

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
