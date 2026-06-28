import csv
from typing import List, Optional


def first_non_repeating_char(s: str) -> Optional[str]:
    counts = {}
    for char in s:
        counts[char] = counts.get(char, 0) + 1

    for char in s:
        if counts[char] == 1:
            return char

    return None


even_numbers = [number for number in range(1, 51) if number % 2 == 0]


class Rectangle:
    def __init__(self, width: float, height: float):
        if width < 0 or height < 0:
            raise ValueError("Width and height must be non-negative.")
        self.width = width
        self.height = height

    def area(self) -> float:
        return self.width * self.height

    def perimeter(self) -> float:
        return 2 * (self.width + self.height)


def calculate_csv_column_average(filename: str, column_name: str) -> float:
    values: List[float] = []

    with open(filename, newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            raw_value = row.get(column_name, "")
            if raw_value is None:
                continue
            raw_value = raw_value.strip()
            if raw_value == "":
                continue
            try:
                values.append(float(raw_value))
            except ValueError:
                continue

    if not values:
        raise ValueError(f"No numeric values found in column '{column_name}'.")

    return sum(values) / len(values)


def safe_parse_int(value: str, default: Optional[int] = None) -> Optional[int]:
    try:
        return int(value)
    except (ValueError, TypeError):
        return default


def create_sample_csv(filename: str = "sample.csv") -> None:
    rows = [
        {"score": "85"},
        {"score": "92"},
        {"score": "78"},
        {"score": "invalid"},
        {"score": "100"},
    ]

    with open(filename, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=["score"])
        writer.writeheader()
        writer.writerows(rows)


if __name__ == "__main__":
    print("Challenge 1: first non-repeating character")
    print("Input: 'swiss' ->", first_non_repeating_char("swiss"))
    print()

    print("Challenge 2: even numbers from 1 to 50")
    print(even_numbers)
    print()

    rect = Rectangle(5, 7)
    print("Challenge 3: Rectangle area and perimeter")
    print("Area:", rect.area())
    print("Perimeter:", rect.perimeter())
    print()

    sample_csv = "sample.csv"
    create_sample_csv(sample_csv)
    average = calculate_csv_column_average(sample_csv, "score")
    print("Challenge 4: average score from CSV")
    print("Average:", average)
    print()

    print("Challenge 5: safe parse integer")
    print("safe_parse_int('42') ->", safe_parse_int("42"))
    print("safe_parse_int('abc', default=0) ->", safe_parse_int("abc", default=0))
