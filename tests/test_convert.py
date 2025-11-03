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
        # TODO: Fix scientific notation for extremely large numbers
        # Test a number that exceeds our predefined units
        large_num = 10 ** (3 * len([
            "", "هزار", "میلیون", "میلیارد", "تریلیون", "کوادریلیون",
            "کوانتیلیون", "سکستیلیون", "سپتیلیون", "اکتیلیون",
            "نونیلیون", "دسیلیون", "اندسیلیون", "دودسیلیون",
            "تردسیلیون", "کوادردسیلیون", "کوانتدسیلیون"
        ]))
        result = to_words(large_num)
        # For now, just ensure it doesn't crash
        assert isinstance(result, str)
        assert len(result) > 0

    def test_decimal_numbers(self):
        """Test decimal number conversion."""
        test_cases = [
            (3.14, "سه ممیز چهارده صدم"),
            (0.5, "صفر ممیز پنج دهم"),
            (1.234, "یک ممیز دویست و سی و چهار هزارم"),
            (0.01, "صفر ممیز یک صدم"),
            (0.001, "صفر ممیز یک هزارم"),
            (-3.14, "منفی سه ممیز چهارده صدم"),
            (42.0, "چهل و دو"),  # Integer float should work
            (12.25, "دوازده ممیز بیست و پنج صدم"),
        ]
        for number, expected in test_cases:
            assert to_words(number) == expected

    def test_string_decimal_input(self):
        """Test string decimal input conversion."""
        test_cases = [
            ("3.14", "سه ممیز چهارده صدم"),
            ("0.5", "صفر ممیز پنج دهم"),
            ("  1.234  ", "یک ممیز دویست و سی و چهار هزارم"),  # Test whitespace stripping
            ("12.25", "دوازده ممیز بیست و پنج صدم"),
        ]
        for string_num, expected in test_cases:
            assert to_words(string_num) == expected

    def test_invalid_input(self):
        """Test invalid input handling."""
        invalid_inputs = [
            "abc",           # Non-numeric string
            None,            # None type
            [],              # List
            {},              # Dict
        ]
        for invalid_input in invalid_inputs:
            with pytest.raises(ValueError):
                to_words(invalid_input)
