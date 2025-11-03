"""Persian number to words converter."""

from typing import Union

# Persian number mappings
ONES = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"]
TENS = ["", "ده", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"]
TEENS = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"]
HUNDREDS = ["", "یکصد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"]

# Units for thousands, millions, etc.
THOUSANDS_UNITS = [
    "", "هزار", "میلیون", "میلیارد", "تریلیون", "کوادریلیون",
    "کوانتیلیون", "سکستیلیون", "سپتیلیون", "اکتیلیون",
    "نونیلیون", "دسیلیون", "اندسیلیون", "دودسیلیون",
    "تردسیلیون", "کوادردسیلیون", "کوانتدسیلیون"
]


def _normalize_input(number: Union[int, str, float]) -> int:
    """
    Normalize input to integer, rejecting floats with fractional parts.

    Args:
        number: Input number to normalize

    Returns:
        Integer representation of the input

    Raises:
        ValueError: If input cannot be converted to integer or has fractional part
    """
    if isinstance(number, float):
        if not number.is_integer():
            raise ValueError(f"Float numbers with fractional parts are not supported: {number}")
        number = int(number)

    if isinstance(number, str):
        try:
            number = int(number.strip())
        except ValueError:
            raise ValueError(f"Cannot convert string to integer: '{number}'")

    if not isinstance(number, int):
        raise ValueError(f"Input must be an integer or integer-convertible string, got {type(number)}: {number}")

    return number


def _three_digit_to_words(num: int) -> str:
    """
    Convert a 3-digit number (0-999) to Persian words.

    Args:
        num: Number between 0 and 999

    Returns:
        Persian words representation, empty string for 0
    """
    if num == 0:
        return ""

    if num < 0 or num > 999:
        raise ValueError(f"Number must be between 0 and 999, got {num}")

    parts = []
    h = num // 100
    t = (num % 100) // 10
    o = num % 10

    if h:
        parts.append(HUNDREDS[h])

    if t == 1:
        parts.append(TEENS[o])
    else:
        if t:
            parts.append(TENS[t])
        if o:
            parts.append(ONES[o])

    # Join with Persian "and" (و) - avoid empty parts
    return " و ".join([p for p in parts if p])


def to_words(number: Union[int, str, float]) -> str:
    """
    Convert a number to Persian words.

    Args:
        number: Integer to convert (accepts int, str that converts to int, or float without fractional part)

    Returns:
        Persian words representation of the number

    Raises:
        ValueError: If input cannot be converted to integer or is invalid

    Examples:
        >>> to_words(0)
        'صفر'
        >>> to_words(42)
        'چهل و دو'
        >>> to_words(-123)
        'منفی یکصد و بیست و سه'
        >>> to_words("456")
        'چهارصد و پنجاه و شش'
    """
    num = _normalize_input(number)

    if num == 0:
        return "صفر"

    # Handle negative numbers
    is_negative = num < 0
    if is_negative:
        num = -num

    # Convert to string and split into 3-digit chunks
    num_str = str(num)
    chunks = []
    while num_str:
        chunks.insert(0, num_str[-3:])
        num_str = num_str[:-3]

    parts = []
    for i, chunk in enumerate(chunks):
        chunk_val = int(chunk)
        if chunk_val > 0:
            part = _three_digit_to_words(chunk_val)
            unit_index = len(chunks) - i - 1
            if unit_index < len(THOUSANDS_UNITS):
                unit = THOUSANDS_UNITS[unit_index]
            else:
                # Scientific notation fallback for very large numbers
                unit = f"۱۰^{unit_index * 3}"

            if unit:
                part = f"{part} {unit}"
            parts.append(part)

    result = " و ".join(parts)

    # Add negative prefix if needed
    if is_negative:
        result = f"منفی {result}"

    return result
