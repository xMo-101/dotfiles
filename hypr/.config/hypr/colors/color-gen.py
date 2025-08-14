import tomllib
from types import FunctionType

# === PATH TO MASTER COLORS FILE: MUST BE TOML. ===
TOML_PATH = "./colors.toml"

# === FORMATTER FUNCTIONS ===
def scss_formatter(name, value) -> str:
    return f"${name}: {value};\n"

def conf_formatter(name, value) -> str:
    if isinstance(value, str) and value.startswith("#"):
        hex_value = value.lstrip("#")
        if len(hex_value) == 6:  # If no alpha provided, add ff
            hex_value += "ff"
        return f"${name} = rgba({hex_value.lower()})\n"
    return f"${name} = {value}\n"

# === FILE CREATION ===
def create_file(type: str, colors: dict) -> None:
    formatter: FunctionType = scss_formatter
    lines: list[str] = []

    if type == ".scss":
        formatter = scss_formatter
    elif type == ".conf":
        formatter = conf_formatter
    else:
        print("no filetype")
        return None

    with open(f"colors{type}", "w+") as f:
        for key, value in colors["palette"].items():
            lines.append(formatter(key, value))
        f.writelines(lines)


# === DATA PARSING ===
def parse_colors() -> dict:
    with open (TOML_PATH, "rb") as f:
        colors: dict = tomllib.load(f)
        return colors

# === MAIN ===
def main():
    colors = parse_colors()
    create_file(".scss", colors)
    create_file(".conf", colors)

# === ENTRY POINT ===
if __name__ == "__main__":
    main()
