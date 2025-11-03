"""Command-line interface for Num2Persian."""

import argparse
import sys

from . import __version__, to_words


def main() -> None:
    """Main CLI entry point."""
    parser = argparse.ArgumentParser(
        prog="num2persian",
        description="Convert numbers to Persian words"
    )
    parser.add_argument(
        "number",
        help="Number to convert to Persian words"
    )
    parser.add_argument(
        "--version",
        action="version",
        version=f"%(prog)s {__version__}"
    )

    args = parser.parse_args()

    try:
        result = to_words(args.number)
        print(result)
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
