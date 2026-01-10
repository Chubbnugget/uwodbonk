import os

# --- CONFIGURATION ---
DOCS_DIR = 'docs/Ports' # Will search all docs, including Ports and Quests
DRY_RUN = False    # Set to False to actually save changes
# ---------------------

# Mapping of "Wrong/Lower" -> "Correct/Upper"
HEADER_MAP = {
    "item": "Item",
    "group": "Group",
    "purchase price": "Purchase Price",
    "同盟時": "Allied Price",
    "remarks": "Remarks",
    # You can add more here, e.g., "sell price": "Sell Price"
}

def fix_table_headers():
    files_modified = 0
    
    print(f"--- Running Table Fixer in {'TEST MODE' if DRY_RUN else 'LIVE MODE'} ---")

    # Walk through all subdirectories in docs
    for root, dirs, files in os.walk(DOCS_DIR):
        for filename in files:
            if filename.endswith('.md'):
                file_path = os.path.join(root, filename)
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                new_content = content
                changes_in_this_file = False

                # Check for each header replacement
                for wrong, correct in HEADER_MAP.items():
                    # We search for the header surrounded by pipes to be safe
                    # This handles "| item |" and "|item|" and "|  item  |"
                    target = f" {wrong} "
                    replacement = f" {correct} "
                    
                    if target in new_content:
                        new_content = new_content.replace(target, replacement)
                        changes_in_this_file = True

                if changes_in_this_file:
                    files_modified += 1
                    if DRY_RUN:
                        print(f"[WOULD FIX] {os.path.relpath(file_path, DOCS_DIR)}")
                    else:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"[FIXED] {os.path.relpath(file_path, DOCS_DIR)}")

    print("\n---------------------------------------------")
    if DRY_RUN:
        print(f"Scan complete. Would have modified {files_modified} files.")
    else:
        print(f"Success. Modified {files_modified} files.")

if __name__ == "__main__":
    fix_table_headers()