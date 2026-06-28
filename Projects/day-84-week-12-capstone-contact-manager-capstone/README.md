# Contact Management System

This repository contains a complete terminal-based contact manager built in Python.

## Files

- `main.py` - contact manager application with add, view, search, update, delete, and JSON persistence.
- `challenges.py` - solutions for the Week 12 coding challenges.
- `contacts.json` - created automatically when you add contacts.

## Features

- Contact model with `name`, `phone`, `email`, and `address`
- Add, view, update, delete contacts
- Search contacts by name or phone
- JSON file persistence for saved contacts
- Duplicate prevention for name and phone
- Input validation and error handling
- Easy-to-use terminal menu interface

## Run the Capstone

```bash
python main.py
```

## Run the Challenge Solutions

```bash
python challenges.py
```

## Notes

- If `contacts.json` does not exist, it is created automatically.
- `main.py` stores contacts in the same directory as the script.
- `challenges.py` writes a sample CSV file when executed for the average calculation demo.
