import os
import json

BASE_DIR = "."  # Root folder

CATEGORY_MAP = {
    "Animals": "Animals",
    "Food": "Food",
    "General": "general",
    "Household": "household",
    "Jatra": "jatra"
}

def normalize_filename(name):
    return name.strip().replace(" ", "").lower()


def build_category_data(folder_name, category):
    folder_path = os.path.join(BASE_DIR, folder_name)

    image_folder = os.path.join(folder_path, "Images")
    audio_folder = os.path.join(folder_path, "Recordings")

    # Find JSON file (you can also hardcode if needed)
    json_files = [f for f in os.listdir(folder_path) if f.lower().endswith(".json")]

    if not json_files:
        print(f"⚠️ No JSON found in {folder_name}")
        return []

    json_path = os.path.join(folder_path, json_files[0])

    # ❗ SAFE JSON LOADING
    with open(json_path, "r", encoding="utf-8") as f:
        content = f.read().strip()

        if not content:
            print(f"⚠️ Empty JSON in {json_path}")
            return []

        try:
            data = json.loads(content)
        except json.JSONDecodeError:
            print(f"❌ Invalid JSON: {json_path}")
            return []

    result = []
    global_id = 1

    for item in data:
        english = item.get("english") or item.get("name")
        newari = item.get("newari")

        if not english:
            continue

        file_base = english.strip()

        image_name = None
        audio_name = None

        # Find image
        if os.path.exists(image_folder):
            for file in os.listdir(image_folder):
                if normalize_filename(file).startswith(normalize_filename(file_base)):
                    image_name = file
                    break

        # Find audio
        if os.path.exists(audio_folder):
            for file in os.listdir(audio_folder):
                if normalize_filename(file).startswith(normalize_filename(file_base)):
                    audio_name = file
                    break

        image_path = f"/media/{category}/Images/{image_name}" if image_name else ""
        audio_path = f"/media/{category}/Recordings/{audio_name}" if audio_name else ""

        result.append({
            "id": global_id,
            "english": english,
            "newari": newari,
            "category": category,
            "level": item.get("level", 1),
            "image_path": image_path,
            "audio_path": audio_path
        })

        global_id += 1

    return result


def main():
    for folder_name, category in CATEGORY_MAP.items():
        folder_path = os.path.join(BASE_DIR, folder_name)

        if not os.path.exists(folder_path):
            print(f"⚠️ Folder not found: {folder_path}")
            continue

        print(f"📦 Processing: {folder_name}")

        data = build_category_data(folder_name, category)

        output_file = os.path.join(folder_path, "data.json")

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)

        print(f"✅ Saved: {output_file} ({len(data)} items)")


if __name__ == "__main__":
    main()