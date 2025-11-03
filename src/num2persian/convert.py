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

# Decimal suffixes
DECIMAL_SUFFIX = {
    1: "دهم",
    2: "صدم",
    3: "هزارم",
    4: "ده‌هزارم",
    5: "صد‌هزارم",
    6: "میلیونیم",
    7: "ده‌میلیونیم",
    8: "صد‌میلیونیم",
    9: "میلیاردم"
}


def _normalize_input(number: Union[int, str, float]) -> float:
    """
    Normalize input to float.

    Args:
        number: Input number to normalize

    Returns:
        Float representation of the input

    Raises:
        ValueError: If input cannot be converted to float
    """
    if isinstance(number, str):
        try:
            number = float(number.strip())
        except ValueError:
            raise ValueError(f"Cannot convert string to number: '{number}'")

    try:
        number = float(number)
    except (TypeError, ValueError):
        raise ValueError(f"Input must be a number or number-convertible string, got {type(number)}: {number}")

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
        number: Number to convert (accepts int, str that converts to number, or float)

    Returns:
        Persian words representation of the number

    Raises:
        ValueError: If input cannot be converted to number or is invalid

    Examples:
        >>> to_words(0)
        'صفر'
        >>> to_words(42)
        'چهل و دو'
        >>> to_words(-123)
        'منفی یکصد و بیست و سه'
        >>> to_words("456")
        'چهارصد و پنجاه و شش'
        >>> to_words(3.14)
        'سه ممیز چهارده صدم'
        >>> to_words(0.5)
        'صفر ممیز پنج دهم'
    """
    num = _normalize_input(number)

    if num == 0:
        return "صفر"

    # Handle negative numbers
    is_negative = num < 0
    if is_negative:
        num = -num

    # Split into integer and decimal parts
    integer_part = int(num)
    decimal_part = num - integer_part

    # Convert integer part
    if integer_part == 0:
        integer_words = "صفر"
    else:
        integer_words = _convert_integer_to_words(integer_part)

    # Convert decimal part
    decimal_words = ""
    if decimal_part > 0:
        # Convert decimal part to string and extract the decimal digits
        decimal_str = f"{decimal_part:.10f}".split('.')[1].rstrip('0')
        decimal_words = _convert_decimal_to_words(decimal_str)

    # Combine parts
    if decimal_words:
        result = f"{integer_words} ممیز {decimal_words}"
    else:
        result = integer_words

    # Add negative prefix if needed
    if is_negative:
        result = f"منفی {result}"

    return result


def _convert_integer_to_words(num: int) -> str:
    """
    Convert integer part to Persian words.

    Args:
        num: Integer to convert

    Returns:
        Persian words representation
    """
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

    return " و ".join(parts)


def _convert_decimal_to_words(decimal_str: str) -> str:
    """
    Convert decimal part to Persian words.

    Args:
        decimal_str: String representation of decimal part (without leading '0.')

    Returns:
        Persian words representation with appropriate suffixes
    """
    if not decimal_str:
        return ""

    # Convert the decimal part as a whole number
    decimal_num = int(decimal_str)

    # Convert to words (handle zero specially)
    if decimal_num == 0:
        decimal_words = "صفر"
    else:
        decimal_words = _convert_integer_to_words(decimal_num)

    # Get the appropriate suffix based on decimal places
    decimal_places = len(decimal_str)
    if decimal_places in DECIMAL_SUFFIX:
        suffix = DECIMAL_SUFFIX[decimal_places]
    else:
        # For positions beyond our defined suffixes, use scientific notation
        suffix = f"۱۰^{-decimal_places}"

    return f"{decimal_words} {suffix}"
