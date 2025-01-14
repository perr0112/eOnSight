# Back-end part of the project 🚀

## Description 📄

This is the back-end part of the project. It is a Django project that provides an API to the front-end part of the project.

## Requirements 📋

See the [requirements.txt](./requirements.txt) file for the full list of requirements. The main requirements are:

- Python 3.13.1 or higher
- PostgreSQL 14.15 or higher

## Installation 🛠️

1. Clone the repository
2. Create a virtual environment

```bash
python3 -m venv myenv
source myenv/bin/activate
```

3. Install the requirements
```bash
pip install -r requirements.txt
```

4. Start the server

```bash
python manage.py runserver
```

## Usage 📚

The API provides the following endpoints:

- GET - `/api/bridges/` <br />
List all bridges

- POST - `/api/bridges/` <br />
Create a new bridge

- GET -  `/api/bridges/<str:id>/` <br />
Retrieve details of a bridge

- PUT - `/api/bridges/<str:id>/` <br />
Update a bridge

- DELETE - `/api/bridges/<str:id>/` <br />
Delete a bridge
