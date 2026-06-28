import json
import os
import re
from typing import List, Optional

DATA_FILE = "contacts.json"


class Contact:
    def __init__(self, name: str, phone: str, email: str = "", address: str = ""):
        self.name = name.strip()
        self.phone = phone.strip()
        self.email = email.strip()
        self.address = address.strip()
        self.validate()

    def validate(self) -> None:
        if not self.name:
            raise ValueError("Name is required.")
        if not self.phone:
            raise ValueError("Phone is required.")
        if not re.match(r"^[\d\s\-\+\(\)]+$", self.phone):
            raise ValueError("Phone may only contain digits, spaces, plus, minus, and parentheses.")
        if self.email and "@" not in self.email:
            raise ValueError("Email appears invalid.")

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "phone": self.phone,
            "email": self.email,
            "address": self.address,
        }

    @classmethod
    def from_dict(cls, data: dict) -> "Contact":
        return cls(
            data.get("name", ""),
            data.get("phone", ""),
            data.get("email", ""),
            data.get("address", ""),
        )


class ContactManager:
    def __init__(self, filename: str = DATA_FILE):
        self.filename = filename
        self.contacts: List[Contact] = self.load()

    def load(self) -> List[Contact]:
        if not os.path.exists(self.filename):
            return []

        try:
            with open(self.filename, "r", encoding="utf-8") as file:
                data = json.load(file)
                if not isinstance(data, list):
                    return []
                return [Contact.from_dict(item) for item in data if isinstance(item, dict)]
        except (json.JSONDecodeError, FileNotFoundError, PermissionError):
            return []

    def save(self) -> None:
        with open(self.filename, "w", encoding="utf-8") as file:
            json.dump([contact.to_dict() for contact in self.contacts], file, indent=4)

    def _is_duplicate(self, contact: Contact, exclude: Optional[Contact] = None) -> bool:
        for existing in self.contacts:
            if existing is exclude:
                continue
            if existing.name.lower() == contact.name.lower() or existing.phone == contact.phone:
                return True
        return False

    def add(self, contact: Contact) -> None:
        if self._is_duplicate(contact):
            raise ValueError("Duplicate contact name or phone number.")
        self.contacts.append(contact)
        self.save()

    def view_all(self) -> List[Contact]:
        return sorted(self.contacts, key=lambda contact: contact.name.lower())

    def search(self, query: str) -> List[Contact]:
        query = query.strip().lower()
        if not query:
            return []
        return [
            contact
            for contact in self.contacts
            if query in contact.name.lower() or query in contact.phone.lower()
        ]

    def get_contact(self, name: str) -> Optional[Contact]:
        name = name.strip().lower()
        for contact in self.contacts:
            if contact.name.lower() == name:
                return contact
        return None

    def update(self, original_name: str, updated: Contact) -> None:
        existing_contact = self.get_contact(original_name)
        if existing_contact is None:
            raise ValueError("Contact not found.")
        if self._is_duplicate(updated, exclude=existing_contact):
            raise ValueError("Duplicate contact name or phone number.")
        existing_contact.name = updated.name
        existing_contact.phone = updated.phone
        existing_contact.email = updated.email
        existing_contact.address = updated.address
        self.save()

    def delete(self, name: str) -> bool:
        contact = self.get_contact(name)
        if contact is None:
            return False
        self.contacts.remove(contact)
        self.save()
        return True


def display_contact(contact: Contact) -> None:
    print("-" * 40)
    print(f"Name    : {contact.name}")
    print(f"Phone   : {contact.phone}")
    print(f"Email   : {contact.email or 'N/A'}")
    print(f"Address : {contact.address or 'N/A'}")


def prompt_non_empty(prompt_text: str) -> str:
    while True:
        value = input(prompt_text).strip()
        if value:
            return value
        print("This field is required. Please enter a value.")


def prompt_optional(prompt_text: str, default: str = "") -> str:
    value = input(prompt_text).strip()
    return value if value else default


def prompt_contact_details(existing: Optional[Contact] = None) -> Contact:
    if existing:
        print("Press Enter to keep the current value.")
        name = prompt_optional(f"Name [{existing.name}]: ", existing.name)
        phone = prompt_optional(f"Phone [{existing.phone}]: ", existing.phone)
        email = prompt_optional(f"Email [{existing.email}]: ", existing.email)
        address = prompt_optional(f"Address [{existing.address}]: ", existing.address)
    else:
        name = prompt_non_empty("Name: ")
        phone = prompt_non_empty("Phone: ")
        email = input("Email: ").strip()
        address = input("Address: ").strip()
    return Contact(name, phone, email, address)


def pause() -> None:
    input("\nPress Enter to continue...")


def menu() -> None:
    manager = ContactManager()

    while True:
        print("\n===== CONTACT MANAGEMENT SYSTEM =====")
        print("1. Add Contact")
        print("2. View All Contacts")
        print("3. Search Contacts")
        print("4. Update Contact")
        print("5. Delete Contact")
        print("6. Exit")
        choice = input("Choose an option [1-6]: ").strip()

        try:
            if choice == "1":
                contact = prompt_contact_details()
                manager.add(contact)
                print("Contact added successfully.")
                pause()
            elif choice == "2":
                contacts = manager.view_all()
                if not contacts:
                    print("No contacts found.")
                else:
                    for contact in contacts:
                        display_contact(contact)
                pause()
            elif choice == "3":
                query = input("Enter name or phone to search: ").strip()
                results = manager.search(query)
                if not results:
                    print("No matching contacts found.")
                else:
                    for contact in results:
                        display_contact(contact)
                pause()
            elif choice == "4":
                name = input("Enter the exact name of the contact to update: ").strip()
                contact = manager.get_contact(name)
                if contact is None:
                    print("Contact not found.")
                else:
                    updated_contact = prompt_contact_details(existing=contact)
                    manager.update(name, updated_contact)
                    print("Contact updated successfully.")
                pause()
            elif choice == "5":
                name = input("Enter the exact name of the contact to delete: ").strip()
                if not name:
                    print("Name is required.")
                elif manager.delete(name):
                    print("Contact deleted successfully.")
                else:
                    print("Contact not found.")
                pause()
            elif choice == "6":
                print("Goodbye!")
                break
            else:
                print("Invalid choice. Please select a number from 1 to 6.")
                pause()
        except ValueError as error:
            print(f"Error: {error}")
            pause()
        except Exception as error:
            print(f"Unexpected error: {error}")
            pause()


if __name__ == "__main__":
    menu()
