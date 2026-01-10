import os
import re

# --- CONFIGURATION ---
PORTS_DIR = os.path.join('docs', 'Ports')
DRY_RUN = False  # Set to False to actually save changes to files
# ---------------------

def capitalize_ports():
    # Matches 'name: value' in frontmatter
    frontmatter_name_re = re.compile(r'^(name:\s*)(.*)$', re.MULTILINE)
    
    # Matches '# Port: ...'
    header_name_re = re.compile(r'^(# Port:\s*).*$', re.MULTILINE)
    
    # Matches '| **Port Name** | value |'
    table_name_re = re.compile(r'(\|\s*\*\*Port Name\*\*\s*\|\s*)(.*?)(\s*\|)', re.MULTILINE)

    if not os.path.exists(PORTS_DIR):
        print(f"Error: {PORTS_DIR} not found.")
        return

    print(f"--- Running in {'TEST MODE (Dry Run)' if DRY_RUN else 'LIVE MODE'} ---")

    for filename in os.listdir(PORTS_DIR):
        if filename.endswith('.md'):
            file_path = os.path.join(PORTS_DIR, filename)
            
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()

            # Find the original name
            match = frontmatter_name_re.search(content)
            if not match:
                continue
                
            original_name = match.group(2).strip()
            proper_name = original_name.capitalize()

            # Prepare the new content
            new_content = frontmatter_name_re.sub(f'\\1{proper_name}', content)
            new_content = header_name_re.sub(f'\\1{proper_name}', new_content)
            new_content = table_name_re.sub(f'\\1{proper_name}\\3', new_content)

            if content != new_content:
                print(f"[CHANGE] {filename}: '{original_name}' -> '{proper_name}'")
                
                if not DRY_RUN:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
            else:
                print(f"[SKIP] {filename}: No changes needed.")

    if DRY_RUN:
        print("\n--- Test complete. No files were modified. Set DRY_RUN = False to apply. ---")

if __name__ == "__main__":
    capitalize_ports()