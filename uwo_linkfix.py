import os
import re
import tempfile
import sys

# --- CONFIG ---
INDEX_FILE = "Index.md"
BASE_DIR = "./docs"  # The root of your Docusaurus docs

def get_all_existing_files():
    """Creates a dictionary mapping filenames to their actual relative paths on disk."""
    file_map = {}
    for root, _, files in os.walk(BASE_DIR):
        for f in files:
            if f.endswith(".md"):
                # Store the relative path from BASE_DIR for Docusaurus compatibility
                rel_path = os.path.relpath(os.path.join(root, f), BASE_DIR).replace("\\", "/")
                file_map[f] = rel_path
    return file_map

def update_by_filename():
    link_map = {}
    existing_files = get_all_existing_files()
    
    # 1. Load the Index Map
    print(f"--- [1/3] Reading {INDEX_FILE} ---")
    index_pattern = re.compile(r"\[([^\]]+)\]\(([^\)]+\.md)\)")
    if os.path.exists(INDEX_FILE):
        with open(INDEX_FILE, 'r', encoding='utf-8') as f:
            for line in f:
                match = index_pattern.search(line)
                if match:
                    _, prod_path = match.groups()
                    filename = os.path.basename(prod_path)
                    link_map[filename] = prod_path
    
    print(f"SUCCESS: Mapped {len(link_map)} items from Index. Found {len(existing_files)} files on disk.")

    # Patterns
    general_link_pattern = re.compile(r"\[([^\]]+)\]\(([^)]+\.md)\)")
    frontmatter_name_pattern = re.compile(r"^(name:)\s*(.*)$")

    def validate_and_fix_link(match, current_file_path):
        display_text = match.group(1)
        old_path = match.group(2)
        filename = os.path.basename(old_path)

        # Logic A: Standardize Category IDs
        if filename.startswith(("item_group_", "ref_")):
            filename = re.sub(r'^(item_group_|ref_)', 'category_', filename)

        # Logic B: Check Index Map (highest priority)
        if filename in link_map:
            return f"[{display_text}]({link_map[filename]})"
        
        # Logic C: Check if file exists elsewhere on disk (Auto-recovery)
        if filename in existing_files:
            return f"[{display_text}]({existing_files[filename]})"

        # Logic D: Interactive Prompt for truly broken links
        # Ignore external links (http)
        if not old_path.startswith("http"):
            print(f"\n⚠️  BROKEN LINK in {current_file_path}")
            print(f"   Line: {match.group(0)}")
            print(f"   Target '{filename}' not found in Index or Disk.")
            choice = input("   Action: [s]kip, [d]elete link, or type new filename: ").strip()
            
            if choice.lower() == 'd':
                return display_text # Removes the [link](...) keep the text
            elif choice.endswith(".md"):
                return f"[{display_text}]({choice})"
            
        return match.group(0)

    print(f"--- [2/3] Scanning Files ---")
    files_scanned = 0
    files_updated = 0

    for root, dirs, files in os.walk(BASE_DIR):
        dirs[:] = [d for d in dirs if not d.startswith(('.', 'node_modules'))]
        for file in files:
            if file.endswith(".md") and file != INDEX_FILE:
                files_scanned += 1
                file_path = os.path.join(root, file)
                
                try:
                    fd, temp_path = tempfile.mkstemp(dir=root, text=True)
                    changed = False
                    in_frontmatter = False
                    
                    with os.fdopen(fd, 'w', encoding='utf-8') as temp_file:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            for line in f:
                                original_line = line
                                
                                # Frontmatter Quoting Logic
                                if line.strip() == "---":
                                    in_frontmatter = not in_frontmatter
                                    temp_file.write(line)
                                    continue
                                
                                if in_frontmatter:
                                    name_match = frontmatter_name_pattern.match(line)
                                    if name_match:
                                        key, val = name_match.groups()
                                        val = val.strip().replace('"', '\\"')
                                        if any(c in val for c in ":#'[]{}") and not (val.startswith('"') and val.endswith('"')):
                                            line = f'{key} "{val}"\n'

                                # Table Cleanup
                                if line.strip().startswith('|'):
                                    line = line.lstrip()

                                # Link Auditing
                                # We pass the match and the current file path to the validator
                                line = general_link_pattern.sub(lambda m: validate_and_fix_link(m, file_path), line)
                                
                                if line != original_line:
                                    changed = True
                                temp_file.write(line)
                    
                    if changed:
                        os.replace(temp_path, file_path)
                        files_updated += 1
                    else:
                        os.remove(temp_path)
                except Exception as e:
                    print(f"[ERROR] {file_path}: {e}")

    print(f"\nDone! Scanned {files_scanned} files. Updated {files_updated} files.")

if __name__ == "__main__":
    update_by_filename()