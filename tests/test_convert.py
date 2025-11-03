"""Tests for Persian number conversion."""

import pytest

from num2persian import to_words


class TestToWords:
    """Test cases for to_words function."""

    def test_zero(self):
        """Test conversion of zero."""
        assert to_words(0) == "صفر"

    def test_single_digits(self):
        """Test conversion of single digits 1-9."""
        expected = ["یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"]
        for i, expected_word in enumerate(expected, 1):
            assert to_words(i) == expected_word

    def test_teens(self):
        """Test conversion of teens (10-19)."""
        expected = [
            "ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده",
            "شانزده", "هفده", "هجده", "نوزده"
        ]
        for i, expected_word in enumerate(expected, 10):
            assert to_words(i) == expected_word

    def test_tens(self):
        """Test conversion of tens (20, 30, ..., 90)."""
        expected = ["بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"]
        for i, expected_word in enumerate(expected, 2):
            assert to_words(i * 10) == expected_word

    def test_hundreds(self):
        """Test conversion of hundreds (100, 200, ..., 900)."""
        expected = [
            "یکصد", "دویست", "سیصد", "چهارصد", "پانصد",
            "ششصد", "هفتصد", "هشتصد", "نهصد"
        ]
        for i, expected_word in enumerate(expected, 1):
            assert to_words(i * 100) == expected_word

    def test_compound_numbers(self):
        """Test compound numbers with multiple parts."""
        test_cases = [
            (21, "بیست و یک"),
            (42, "چهل و دو"),
            (101, "یکصد و یک"),
            (123, "یکصد و بیست و سه"),
            (456, "چهارصد و پنجاه و شش"),
            (999, "نهصد و نود و نه"),
        ]
        for number, expected in test_cases:
            assert to_words(number) == expected

    def test_thousands(self):
        """Test thousands, millions, etc."""
        test_cases = [
            (1000, "یک هزار"),
            (10000, "ده هزار"),
            (100000, "یکصد هزار"),
            (1000000, "یک میلیون"),
            (1000000000, "یک میلیارد"),
            (1000000000000, "یک تریلیون"),
        ]
        for number, expected in test_cases:
            assert to_words(number) == expected

    def test_large_compound_numbers(self):
        """Test large compound numbers."""
        test_cases = [
            (1234, "یک هزار و دویست و سی و چهار"),
            (567890, "پانصد و شصت و هفت هزار و هشتصد و نود"),
            (1000001, "یک میلیون و یک"),
        ]
        for number, expected in test_cases:
            assert to_words(number) == expected

    def test_negative_numbers(self):
        """Test negative number conversion."""
        test_cases = [
            (-1, "منفی یک"),
            (-42, "منفی چهل و دو"),
            (-123, "منفی یکصد و بیست و سه"),
            (-1000, "منفی یک هزار"),
        ]
        for number, expected in test_cases:
            assert to_words(number) == expected

    def test_string_input(self):
        """Test string input conversion."""
        test_cases = [
            ("0", "صفر"),
            ("42", "چهل و دو"),
            ("  123  ", "یکصد و بیست و سه"),  # Test whitespace stripping
        ]
        for string_num, expected in test_cases:
            assert to_words(string_num) == expected

    def test_very_large_numbers(self):
        """Test very large numbers with scientific notation fallback."""
        # Test a number that exceeds our predefined units
        large_num = 10 ** (3 * len([
            "", "هزار", "میلیون", "میلیارد", "تریلیون", "کوادریلیون",
            "کوانتیلیون", "سکستیلیون", "سپتیلیون", "اکتیلیون",
            "نونیلیون", "دسیلیون", "اندسیلیون", "دودسیلیون",
            "تردسیلیون", "کوادردسیلیون", "کوانتدسیلیون"
        ]))
        result = to_words(large_num)
        assert "۱۰^" in result  # Should contain scientific notation

    def test_invalid_input(self):
        """Test invalid input handling."""
        invalid_inputs = [
            "abc",           # Non-numeric string
            "12.5",          # Float string
            12.5,            # Float number
            None,            # None type
            [],              # List
            {},              # Dict
        ]
        for invalid_input in invalid_inputs:
            with pytest.raises(ValueError):
                to_words(invalid_input)

    def test_float_without_fraction(self):
        """Test that integer floats are accepted."""
        assert to_words(42.0) == "چهل و دو"

    def test_float_with_fraction(self):
        """Test that floats with fractional parts are rejected."""
        with pytest.raises(ValueError, match="Float numbers with fractional parts are not supported"):
            to_words(12.5)
