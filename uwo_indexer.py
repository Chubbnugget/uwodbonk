import os
import urllib.parse

def generate_local_index(output_filename="Index.md"):
    # The script looks at the folder it is currently sitting in
    root_dir = os.getcwd() 
    markdown_index = []
    markdown_index.append("# Local Project Index\n")
    
    # We strip 'md_english' for production, but only if it exists in the path
    target_strip = "md_english"

    # os.walk('.') ensures we only go DOWN into subdirectories
    for root, dirs, files in os.walk('.'):
        # Ignore hidden folders
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        
        for file in files:
            if file.endswith(".md") and file != output_filename:
                # 1. Get the path relative to the script's location
                rel_path = os.path.join(root, file)
                
                # 2. Clean up slashes for web/production (force forward slash)
                clean_path = rel_path.replace("\\", "/")
                
                # 3. Remove the "./" prefix that os.walk often adds
                if clean_path.startswith("./"):
                    clean_path = clean_path[2:]

                # 4. Remove the 'md_english/' part for the production link
                prod_path = clean_path.replace(f"{target_strip}/", "")
                
                file_id = os.path.splitext(file)[0]
                
                # Add to index list
                markdown_index.append(f"* **ID:** `{file_id}` | **Prod Link:** [{file_id}]({prod_path})")

    # Save the file in the current directory
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write('\n'.join(markdown_index))
    
    print(f"Indexing complete. Scanned subdirectories of: {root_dir}")
    print(f"Index saved to: {output_filename}")

if __name__ == "__main__":
    generate_local_index()